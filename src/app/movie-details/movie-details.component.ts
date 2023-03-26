import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Movie } from '../models/movie.interface';
import { loadMovieDetail, loadMovies } from '../store/star-wars.actions';
import { StarWarsState } from '../store/star-wars.reducer';
import { selectLoading, selectMovie, selectMovies } from '../store/star-wars.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  selectedMovie$ = this.store.select(selectMovie);
  constructor(private store: Store<StarWarsState>, private router: Router) {}

}
