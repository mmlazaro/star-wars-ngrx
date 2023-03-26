import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Character } from '../models/character.interface';
import { Movie } from '../models/movie.interface';
import { PaginatedContent } from '../models/paginated-content.interface';
import { API_URL } from './api-url.token';

@Injectable({
  providedIn: 'root'
})
export class StarWarsClientService {

  constructor(private httpClient: HttpClient, @Inject(API_URL) private apiUrl: string) { }

  getMovies() {
    return this.httpClient.get<PaginatedContent<Movie>>(`${this.apiUrl}films/`)
  }


  getCharacter(characterUrl: string) {
    return this.httpClient.get<Character>(characterUrl);
  }

}
