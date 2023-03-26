import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Movie } from '../models/movie.interface';
import { loadMovieDetail, loadMovies } from '../store/star-wars.actions';
import { StarWarsState } from '../store/star-wars.reducer';
import { selectLoading, selectMovies } from '../store/star-wars.selectors';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies$ = this.store.select(selectMovies).pipe(tap(movies => console.log(movies)));
  isLoading$ = this.store.select(selectLoading).pipe(tap(loading => console.log(loading)));

  constructor(private store: Store<StarWarsState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(loadMovies());
  }

  goToMovie(movie: Movie, index: number) {
    this.store.dispatch(loadMovieDetail({selectedMovie: movie}))
    this.router.navigate(['/movies', index ]);
    console.log('navigate')
  }
}
