import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { loadMovieDetail, loadMovies } from '../store/star-wars.actions';
import { StarWarsState } from '../store/star-wars.reducer';
import {
	selectCharactersForMovie,
	selectLoading,
	selectMovie,
	selectMovies,
} from '../store/star-wars.selectors';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
	movies$ = this.store.select(selectMovies);
	selectedMovie$ = this.store.select(selectMovie);
	movieCharacters$ = this.store.select(selectCharactersForMovie);
	isLoading$ = this.store.select(selectLoading);
	private subscription?: Subscription;

	constructor(
		private store: Store<StarWarsState>,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.store.dispatch(loadMovies());

		this.subscription = combineLatest([
			this.route.params,
			this.movies$,
		]).subscribe(([params]) => {
			const id = params['id'];
			this.store.dispatch(loadMovieDetail({ id }));
		});
	}

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}

	goToCharacterPage(id: string) {
		this.router.navigate(['character', id]);
	}
}
