import { Character } from '../models/character.interface';
import { Movie } from '../models/movie.interface';
import { loadCharacterDetails, loadMovieDetail, loadMovies, loadMoviesSuccess, loadMultipleCharactersSuccess } from './star-wars.actions';
import { initialState, reducer } from './star-wars.reducer';

fdescribe('Star wars reducer', () => {
	it('should set loading for loadMovies action', () => {
		const state = initialState;
        const expected = {
            ...state, isLoading: true
        }
		const action = loadMovies();
        expect(reducer(state, action)).toEqual(expected);
	});

    it('should set movies for loadMoviesSuccess action', () => {
        const state = {
            ...initialState, isLoading: true
        }
        const movie = {title: 'test'} as any as Movie;
        const expected = {
            ...initialState, 
            movies: [movie]
        };
		const action = loadMoviesSuccess({movies: [movie] });
        expect(reducer(state, action)).toEqual(expected);
	});

    it('should set selected character for action loadCharacterDetails', () => {
        const character =  {
            name: 'Luke Skywalker',
        } as any as Character;
        const state = {
            ...initialState,
            characters: {
                '1': character
            }
        };

        const expected = {
            ...state, 
            selectedCharacter: character
        };

        const action = loadCharacterDetails({id: '1'});
        expect(reducer(state, action)).toEqual(expected);
    });

    it('should set selected movie for action loadMovieDetail', () => {
        const movie = {title: 'test', episode_id: 6} as any as Movie;
        const state = {
            ...initialState,
            movies: [movie]
        };
        const expected = {
            ...state, 
            selectedMovie: movie,
            isLoading: true
        };
        const action = loadMovieDetail({id: '6' });
        expect(reducer(state, action)).toEqual(expected);
    });

    it('should set characters for action loadMultipleCharactersSuccess', () => {
        const characters = {
            '1': {name: 'Luke Skywalker',
            } as any as Character
        };
        const state = {
            ...initialState,
            characters: {
                '2': {
                    name: 'Mas Amedda' 
                } as any as Character
            }
        };
        const action = loadMultipleCharactersSuccess({characters});
        const expected = {
            ...state,
            characters: {
                ...state.characters,
                ...characters
            }
        };
        expect(reducer(state, action)).toEqual(expected);
    });
});
