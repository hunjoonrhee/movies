import { Component, inject } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { FavoritesService } from '../services/favorites.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly moviesService = inject(MoviesService);
  readonly favoritesService = inject(FavoritesService);

  readonly movies = this.moviesService.getMovies();

  isMovieFavorite(movie: Movie) {
    this.favoritesService.toggleFavorite(movie);
  }
}
