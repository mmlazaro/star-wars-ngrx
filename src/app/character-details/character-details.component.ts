import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadCharacterDetails } from '../store/star-wars.actions';
import { StarWarsState } from '../store/star-wars.reducer';
import { selectCurrentCharacter } from '../store/star-wars.selectors';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  selectedCharacter$ = this.store.select(selectCurrentCharacter);
  //movieCharacters$ = this.store.select(selectCharactersForMovie);
  subscription?: Subscription;
  constructor(private store: Store<StarWarsState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(loadCharacterDetails({id}));
    })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  goToMoviePage(id: string) {
   // this.router.navigate(['character', id])
  }
}
