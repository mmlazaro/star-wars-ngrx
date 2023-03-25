import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StarWarsClientService } from '../services/star-wars-client.service';
import { loadMovies, loadMoviesError, loadMoviesSuccess } from './star-wars.actions';
 

export const loadActors = createEffect(
  (actions$ = inject(Actions), starWarsService = inject(StarWarsClientService)) => {
    return actions$.pipe(
      ofType(loadMovies),
      exhaustMap(() =>
      starWarsService.getMovies().pipe(
          map(({results}) => loadMoviesSuccess({ movies: results })),
          catchError((error: { message: string }) =>
            of(loadMoviesError())
          )
        )
      )
    );
  },
  { functional: true }
);
 