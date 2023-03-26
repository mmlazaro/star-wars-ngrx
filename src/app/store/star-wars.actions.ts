import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.interface';
import { Movie } from '../models/movie.interface';

export const loadMovies = createAction('Load movies');
export const loadMoviesSuccess = createAction('Load movies success', props<{movies: Movie[]}>());
export const loadMoviesError = createAction('Load movies error');

export const loadMovieDetail = createAction('Load movie detail', props<{selectedMovie: Movie}>() );
// export const loadMovieDetailSuccess = createAction('Load movie detail success');
// export const loadMovieDetailError = createAction('Load movie detail error');

export const loadCharacters = createAction('Load characters');
export const loadCharactersSuccess = createAction('Load characters success', props<{characters: Character[]}>());
export const loadCharactersError = createAction('Load characters error');

// todo select character
export const loadCharacter = createAction('Load character', props<{characterUrl: string}>());
export const loadCharacterSuccess = createAction('Load character success', props<{character: Character, id: string}>());
export const loadCharacterError = createAction('Load character error');

export const cachedAction = createAction('Cached action')

export const loadCharacterDetails =  createAction('loadCharacterDetails', props<{id: string}>());