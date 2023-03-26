import { Action, createReducer, on } from '@ngrx/store';
import { Character } from '../models/character.interface';
import { Movie } from '../models/movie.interface';
import {
	cachedAction,
	loadCharacterDetails,
	loadCharacterError,
	loadMovieDetail,
	loadMovies,
	loadMoviesError,
	loadMoviesSuccess,
	loadMultipleCharactersSuccess,
} from './star-wars.actions';

export interface StarWarsState {
	movies: Movie[];
	characters: {
		[key: string]: Character;
	};
	isLoading: boolean;
	isError: boolean;
	selectedMovie: Movie | undefined;
	selectedCharacter: Character | undefined;
}

export const initialState: StarWarsState = {
	movies: [],
	characters: {},
	selectedMovie: undefined,
	selectedCharacter: undefined,
	isLoading: false,
	isError: false,
};

const starWarsReducer = createReducer(
	initialState,
	on(loadMovies, state => ({ ...state, isLoading: true, isError: false })),
	on(loadMoviesSuccess, (state, { movies }) => {
		return {
			...state,
			isLoading: false,
			movies,
		};
	}),
	on(loadMoviesError, state => ({
		...state,
		isLoading: false,
		isError: true,
	})),
	on(cachedAction, state => ({
		...state,
		isLoading: false,
	})),
	on(loadCharacterDetails, (state, { id }) => ({
		...state,
		selectedCharacter: state.characters[id],
	})),
	on(loadMovieDetail, (state, { id }) => {
		return {
			...state,
			isLoading: true,
			selectedMovie: state.movies.find(movie => movie.episode_id == +id),
		};
	}),
	on(loadCharacterError, state => ({
		...state,
		isError: true,
	})),
	on(loadMultipleCharactersSuccess, (state, { characters }) => {
		return {
			...state,
			isLoading: false,
			characters: {
				...state.characters,
				...characters,
			},
		};
	})
);

export function reducer(state: StarWarsState | undefined, action: Action) {
	return starWarsReducer(state, action);
}
