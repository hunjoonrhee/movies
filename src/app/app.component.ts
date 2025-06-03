import { Component, inject, signal } from '@angular/core';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { Movie } from './model/movie.model';
import { MoviesService } from './services/movies.service';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: 'app.component.html',
  imports: [MovieItemComponent],
})
export class AppComponent {
  readonly moviesService = inject(MoviesService);
  readonly favoritesService = inject(FavoritesService);

  readonly movies = this.moviesService.getMovies();

  isMovieFavorite(movie: Movie) {
    this.favoritesService.toggleFavorite(movie);
  }
}
