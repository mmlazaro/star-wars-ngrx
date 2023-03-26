import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { StarWarsState } from './store/star-wars.reducer';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  loadingRequests = 0;
  constructor(
    private store: Store<StarWarsState>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingRequests += 1;
    console.log('loading');
    return next.handle(request).pipe(
      catchError((error) => {
        this.loadingRequests -= 1;
        return of(error);
      }),tap(evt => {
        if (evt instanceof HttpResponse) {
          this.loadingRequests -= 1;
          if (this.loadingRequests === 0) {
            console.log(' loaded all');
          }
          
        }
      })
    );
    
  }
}
