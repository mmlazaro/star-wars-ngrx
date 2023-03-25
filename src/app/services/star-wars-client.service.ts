import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarWarsClientService {

  apiUrl = 'https://swapi.dev/api/';
  constructor(private httpClient: HttpClient) { }

  getMovies() {
    return this.httpClient.get(`${this.apiUrl}films/`)
  }

  getMovieDetails(id: string) {
    return this.httpClient.get(`${this.apiUrl}films/${id}/`);
  }

  getCharacter(characterUrl: string) {
    return this.httpClient.get(characterUrl);
  }
}
