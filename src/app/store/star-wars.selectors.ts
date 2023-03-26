import { createFeatureSelector, createSelector } from '@ngrx/store';
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