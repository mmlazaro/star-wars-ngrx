import { Action, createReducer, on } from "@ngrx/store";
import { Character } from "../models/character.interface";
import { Movie } from "../models/movie.interface";
import { cachedAction, loadCharacter, loadCharacterDetails, loadCharacters, loadCharactersError, loadCharactersSuccess, loadCharacterSuccess, loadMovieDetail, loadMovieDetailId, loadMovies, loadMoviesError, loadMoviesSuccess } from "./star-wars.actions";

export interface StarWarsState {
    movies: Movie[],
    characters: {
        [key: string]: Character,
    }
    isLoading: boolean,
    isError: boolean,
    selectedMovie : Movie | undefined;
    selectedCharacter: Character | undefined;
};

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
    on(loadMovies, (state) => ({...state, isLoading: true, isError: false})),
    on(loadMoviesSuccess, (state, {movies}) => {
        ;
        return {
        ...state,
        isLoading: false,
        movies,
        }
    }),
    on(loadMoviesError, (state) => ({
        ...state,
        isLoading: false,
        isError: true
    })),
    on(loadMovieDetail, (state, {selectedMovie}) => ({
        ...state,
        selectedMovie
    })),
    on(loadCharacters, (state) => ({...state, isLoading: true, isError: false})),
    on(loadCharacter, (state) => ({...state, isLoading: true})),
    on(loadCharacterSuccess, (state, {character, id}) => {
        return {
        ...state,
        isLoading: false,
        characters: {
            ...state.characters, 
            [id]: character
        }
    }}),
    on(loadCharactersError, (state) => ({
        ...state,
        isLoading: false,
        isError: true
    })),
    on(cachedAction, (state) => ({
        ...state, 
        isLoading: false
    })),
    on(loadCharacterDetails, (state, {id}) => ({
        ...state, 
        selectedCharacter: state.characters[id]
    })),
    on(loadMovieDetailId, (state, {id}) => {
        return {
            ...state,
            selectedMovie: state.movies.find(movie => movie.episode_id == +id)
        }
    })
);

export function reducer(state: StarWarsState | undefined, action: Action) {
    return starWarsReducer(state, action);
  }