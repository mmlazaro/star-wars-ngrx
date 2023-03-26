import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { Movie } from '../models/movie.interface';
import { loadMovieDetail, loadMovies } from '../store/star-wars.actions';
import { StarWarsState } from '../store/star-wars.reducer';
import { selectCharactersForMovie, selectLoading, selectMovie, selectMovies } from '../store/star-wars.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  selectedMovie$ = this.store.select(selectMovie);
  movieCharacters$ = this.store.select(selectCharactersForMovie);
  subscription?: Subscription; 
  constructor(private store: Store<StarWarsState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
     // this.store.dispatch(loadMovieDetail({id}));
    })
  }

  goToCharacterPage(id: string) {
    this.router.navigate(['character', id])
  }


  //this.store.dispatch(loadMovieDetail({selectedMovie: movie}))

}
