import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.interface';
import { Movie } from '../models/movie.interface';
import { PaginatedContent } from '../models/paginated-content.interface';

@Injectable({
  providedIn: 'root'
})
export class StarWarsClientService {

  apiUrl = 'https://swapi.dev/api/';
  constructor(private httpClient: HttpClient) { }

  getMovies() {
    return this.httpClient.get<PaginatedContent<Movie>>(`${this.apiUrl}films/`)
  }

  // getMovieDetails(id: string) {
  //   return this.httpClient.get(`${this.apiUrl}films/${id}/`);
  // }

  getCharacter(characterUrl: string) {
    return this.httpClient.get<Character>(characterUrl);
  }
}
