import { Injectable, signal } from '@angular/core';
import { Movie } from '../model/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  readonly favorites = signal<Movie[]>([]);

  toggleFavorite(movie: Movie) {
    if (!this.isFavorite(movie)) {
      const updatedMovies = [...this.favorites(), movie];
      this.favorites.set(updatedMovies);
    } else {
      console.log(this.favorites());
      const filteredMovies = this.favorites().filter((m) => m.id !== movie.id);
      this.favorites.set(filteredMovies);
    }
  }

  isFavorite(movie: Movie) {
    return this.favorites().includes(movie) ? true : false;
  }
}
