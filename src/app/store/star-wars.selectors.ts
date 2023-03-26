import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Character } from '../models/character.interface';
import { StarWarsState } from './star-wars.reducer';

export const selectFeature = createFeatureSelector<StarWarsState>('starWars');


export const selectMovies = createSelector(
    selectFeature, (state) => state.movies
);

export const selectMovie = createSelector(
    selectFeature, (state) => state.selectedMovie
);

export const selectLoading = createSelector(
    selectFeature, (state) => state.isLoading
);

export const selectCharacters = createSelector(
    selectFeature, (state) => state.characters
);

export const selectCharactersForMovie = createSelector(
    selectFeature, (state => {
        return Object.entries(state.characters).reduce((acc, characterEntr) => {
            const [id, character] = characterEntr;
            acc.push({
                ...character, 
                id
            })
            return acc;
        }, [] as (Character & {id: string})[]);
    })
);

export const selectCurrentCharacter = createSelector(selectFeature, (state) => {
    return state.selectedCharacter
});

export const selectListOfMoviesForCharacter = createSelector(selectFeature, (state) => {
    return state.movies.filter(movie => 
        state.selectedCharacter?.films.includes(movie.url));
});