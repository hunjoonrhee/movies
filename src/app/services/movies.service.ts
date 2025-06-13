import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { Movie, MovieDetails } from '../model/movie.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  protected httpClient = inject(HttpClient);

  //   getMovies(): Signal<Movie[]> {
  //     return toSignal(this.httpClient.get<Movie[]>('/movies'), {
  //       initialValue: [],
  //     });
  //   }
  //   getMovieDetails(movieId: string): Signal<MovieDetails | undefined> {
  //     return toSignal(this.httpClient.get<MovieDetails>('/movies/' + movieId));
  //   }

  // Observables
  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('/movies');
  }

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>('/movies/' + movieId);
  }
}
