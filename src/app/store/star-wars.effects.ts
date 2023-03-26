import { inject } from '@angular/core';
import { catchError, concatMap, exhaustMap, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StarWarsClientService } from '../services/star-wars-client.service';
import { cachedAction, loadCharacter, loadCharacterError, loadCharacterSuccess, loadMovieDetail, loadMovieDetailId, loadMovies, loadMoviesError, loadMoviesSuccess } from './star-wars.actions';
import { StarWarsState } from './star-wars.reducer';
import { selectCharacters, selectMovie, selectMovies } from './star-wars.selectors';
import { API_URL } from '../services/api-url.token';
 

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

export const loadCharacters = createEffect(
    (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService), store = inject(Store<StarWarsState>), ) => {
        return actions$.pipe(
            ofType(
                loadMovieDetailId
            ),
            switchMap(action => of(action).pipe(withLatestFrom(store.select(selectMovie)))),
            concatMap(([, movie]) => {
                if (!movie) return of(loadCharacterError());
                return (movie.characters.map(char => loadCharacter({characterUrl: char})) )})  
            )
    },
    {functional: true}
);

export const loadCharacterEf = createEffect(
    (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService), store = inject(Store<StarWarsState>), apiUrl = inject(API_URL)) => {
        return actions$.pipe(
            ofType(
                loadCharacter
            ),
            switchMap(action => 
                of(action).pipe(withLatestFrom(store.select(selectCharacters))
                )),
            concatMap(([{characterUrl}, characters]) => {
                const characterId = characterUrl.split(`${apiUrl}people`)[1].replaceAll('/', '');
                if (characters[characterId]) {
                    return of(cachedAction());
                } else {
                    return starWarsService.getCharacter(characterUrl).pipe(
                        map(character => loadCharacterSuccess({character, id: characterId} ),
                        catchError(error => of(loadCharacterError())

                    )))
                }
            })
            )
    },
    {functional: true}
)