import { inject } from '@angular/core';
import { catchError, concat, concatMap, exhaustMap, forkJoin, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StarWarsClientService } from '../services/star-wars-client.service';
import { cachedAction, finishLoading, loadCharacter, loadCharacterError, loadCharacterSuccess, loadMovieDetail, loadMovieDetailId, loadMovies, loadMoviesError, loadMoviesSuccess, loadMultipleCharactersSuccess } from './star-wars.actions';
import { StarWarsState } from './star-wars.reducer';
import { selectCharacters, selectMovie, selectMovies } from './star-wars.selectors';
import { API_URL } from '../services/api-url.token';
import { Character } from '../models/character.interface';
 

export const loadStarWarsMovies = createEffect(
  (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService), 
  store = inject(Store<StarWarsState>), apiUrl = inject(API_URL)) => {
    return actions$.pipe(
      ofType(loadMovies),
      switchMap(action => 
        of(action).pipe(withLatestFrom(store.select(selectMovies))
        )),
      exhaustMap(([, movies]) =>{
        if (movies.length > 0) {
            return of(cachedAction());
        }
        return starWarsService.getMovies().pipe(
            map(({results}) =>{ ; return loadMoviesSuccess({ movies: results })}),
            catchError((error: { message: string }) =>
                of(loadMoviesError())
            )
        )
      }
      )
    );
  },
  { functional: true }
);

// export const loadCharacters = createEffect(
//     (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService), store = inject(Store<StarWarsState>), ) => {
//         return actions$.pipe(
//             ofType(
//                 loadMovieDetailId
//             ),
//             switchMap(action => of(action).pipe(withLatestFrom(store.select(selectMovie)))),
//             concatMap(([, movie]) => {
//                 if (!movie) return of(loadCharacterError());
//                 return (movie.characters.map(char => loadCharacter({characterUrl: char})) )})  
//             )
//     },
//     {functional: true}
// );

export const loadCharacters = createEffect(
    (actions$ = inject(Actions), apiUrl = inject(API_URL), starWarsService = inject(StarWarsClientService), store = inject(Store<StarWarsState>), ) => {
        return actions$.pipe(
            ofType(
                loadMovieDetailId
            ),
            switchMap(action => of(action).pipe(withLatestFrom(store.select(selectMovie), store.select(selectCharacters)))),
            concatMap(([, movie, characters]) => {
                if (!movie) return of(loadCharacterError());
                // add caching
                const notCachedCharacters = movie.characters.filter(chUrl => {
                    console.log('char obj', characters)
                    console.log(Object.values(characters))
                    const existingUrls = Object.values(characters).map(ch => ch.url)
                    return !existingUrls.includes(chUrl);
                });
                console.log('not cached chars', notCachedCharacters)
               // const id = curr.split(`${apiUrl}people`)[1].replaceAll('/', '');

               if (notCachedCharacters.length === 0) return of(cachedAction());
               // const characters$ = movie.characters.map(char => starWarsService.getCharacter(char));
               const characters$ = notCachedCharacters.map(char => starWarsService.getCharacter(char));
    
               return forkJoin(characters$).pipe(
                    map(characters => {
                        const charctersObj = notCachedCharacters.reduce((acc, curr, i) => {
                            const id = curr.split(`${apiUrl}people`)[1].replaceAll('/', '');
                            acc[id] = characters[i];
                            return acc;
                        }, {} as Record<string, Character>);
                        return loadMultipleCharactersSuccess({characters: charctersObj})
                        return loadCharacterError();
                    })
                )
            }
        )
        )
    },
    {functional: true}
);


// export const loadCharacterEf = createEffect(
//     (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService), store = inject(Store<StarWarsState>), apiUrl = inject(API_URL)) => {
//         return actions$.pipe(
//             ofType(
//                 loadCharacter
//             ),
//             exhaustMap(action => 
//                 of(action).pipe(withLatestFrom(store.select(selectCharacters))
//                 )),
//             concatMap(([{characterUrl}, characters]) => {
//                 const characterId = characterUrl.split(`${apiUrl}people`)[1].replaceAll('/', '');
//                 if (characters[characterId]) {
//                     return of(cachedAction());
//                 } else {
//                     return starWarsService.getCharacter(characterUrl).pipe(
//                         map(character => loadCharacterSuccess({character, id: characterId} ),
//                         catchError(error => of(loadCharacterError())

//                     )))
//                 }
//             })
//             )
//     },
//     {functional: true}
// )