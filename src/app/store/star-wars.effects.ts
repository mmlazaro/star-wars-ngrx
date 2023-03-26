import { inject } from '@angular/core';
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StarWarsClientService } from '../services/star-wars-client.service';
import { cachedAction, loadCharacterError, loadMovieDetail, loadMovies, loadMoviesError, loadMoviesSuccess, loadMultipleCharactersSuccess } from './star-wars.actions';
import { StarWarsState } from './star-wars.reducer';
import { selectCharacters, selectMovie, selectMovies } from './star-wars.selectors';
import { API_URL } from '../services/api-url.token';
import { Character } from '../models/character.interface';
 

export const loadStarWarsMovies = createEffect(
  (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService), 
  store = inject(Store<StarWarsState>)) => {
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
            map(({results}) =>{  return loadMoviesSuccess({ movies: results })}),
            catchError(() =>
                of(loadMoviesError())
            )
        )
      }
      )
    );
  },
  { functional: true }
);

export const loadStarWarsCharacters = createEffect(
    (actions$ = inject(Actions), apiUrl = inject(API_URL), starWarsService = inject(StarWarsClientService), store = inject(Store<StarWarsState>), ) => {
        return actions$.pipe(
            ofType(
                loadMovieDetail
            ),
            switchMap(action => of(action).pipe(withLatestFrom(store.select(selectMovie), store.select(selectCharacters)))),
            concatMap(([, movie, characters]) => {
                if (!movie) return of(loadCharacterError());
                const notCachedCharacters = movie.characters.filter(chUrl => {
                    const existingUrls = Object.values(characters).map(ch => ch.url)
                    return !existingUrls.includes(chUrl);
                });
               if (notCachedCharacters.length === 0) return of(cachedAction());
               const characters$ = notCachedCharacters.map(char => starWarsService.getCharacter(char));

               return forkJoin(characters$).pipe(
                    map(characters => {
                        const charactersObj = notCachedCharacters.reduce((acc, curr, i) => {
                            const id = curr.split(`${apiUrl}people`)[1].replaceAll('/', '');
                            acc[id] = characters[i];
                            return acc;
                        }, {} as Record<string, Character>);
                        return loadMultipleCharactersSuccess({characters: charactersObj})
                    }),
                    catchError(() => of(loadCharacterError()))
                )
            }
        )
        )
    },
    {functional: true}
);
