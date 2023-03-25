import { createReducer, on } from "@ngrx/store";
import { Character } from "../models/character.interface";
import { Movie } from "../models/movie.interface";
import { loadCharacter, loadCharacterError, loadCharacterSuccess, loadMovieDetail, loadMovies, loadMoviesError, loadMoviesSuccess } from "./star-wars.actions";

interface StarWarsState {
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

export const starWarsReducer = createReducer(
    initialState,
    on(loadMovies, (state) => ({...state, isLoading: true, isError: false})),
    on(loadMoviesSuccess, (state, {movies}) => ({
        ...state,
        isLoading: false,
        movies,
    })),
    on(loadMoviesError, (state) => ({
        ...state,
        isLoading: false,
        isError: true
    })),
    on(loadMovieDetail, (state, {selectedMovie}) => ({
        ...state,
        selectedMovie
    })),
    on(loadCharacter, (state) => ({...state, isLoading: true, isError: false})),
    on(loadCharacterSuccess, (state, { character}) => ({
        ...state,
        isLoading: false,
        selectedCharacter: character,
        characters: {
            [character.id]: character
        }
    })),
    on(loadCharacterError, (state) => ({
        ...state,
        isLoading: false,
        isError: true
    })),

);