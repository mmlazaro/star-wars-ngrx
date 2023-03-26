import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMovies } from '../store/star-wars.actions';
import { StarWarsState } from '../store/star-wars.reducer';
import { selectLoading, selectMovies } from '../store/star-wars.selectors';

@Component({
	selector: 'app-movies-list',
	templateUrl: './movies-list.component.html',
	styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
	movies$ = this.store.select(selectMovies);
	isLoading$ = this.store.select(selectLoading);

	constructor(private store: Store<StarWarsState>, private router: Router) {}

	ngOnInit() {
		this.store.dispatch(loadMovies());
	}

	goToMovie(id: number) {
		this.router.navigate(['/movies', id]);
	}
}
