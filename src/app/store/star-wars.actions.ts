import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.interface';
import { Movie } from '../models/movie.interface';

export const loadMovies = createAction('Load movies');
export const loadMoviesSuccess = createAction(
	'Load movies success',
	props<{ movies: Movie[] }>()
);
export const loadMoviesError = createAction('Load movies error');
export const loadMovieDetail = createAction(
	'Load movie detail id',
	props<{ id: string }>()
);

export const loadCharacterDetails = createAction(
	'loadCharacterDetails',
	props<{ id: string }>()
);
export const loadCharacterError = createAction('Load character error');
export const loadMultipleCharactersSuccess = createAction(
	'loadMultipleCharactersSuccess',
	props<{ characters: Record<string, Character> }>()
);

export const cachedAction = createAction('Cached action - all data cached');
