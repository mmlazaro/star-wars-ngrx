import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

import * as starWarsEffects from './store/star-wars.effects';
import * as fromStartWarsReducer from './store/star-wars.reducer';
import { API_URL } from './services/api-url.token';

@NgModule({
	declarations: [
		AppComponent,
		MoviesListComponent,
		MovieDetailsComponent,
		CharacterDetailsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatListModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule,
		MatCardModule,
		StoreModule.forRoot({
			starWars: fromStartWarsReducer.reducer,
		}),
		EffectsModule.forRoot(starWarsEffects),
	],
	providers: [
		{
			provide: API_URL,
			useValue: 'https://swapi.dev/api/',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
