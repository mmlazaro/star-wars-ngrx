import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

import * as starWarsEffects from './store/star-wars.effects';
import { starWarsReducer } from './store/star-wars.reducer';
@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(starWarsReducer),
    EffectsModule.forRoot(starWarsEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
