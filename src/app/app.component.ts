import { Component, inject, signal } from '@angular/core';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { Movie } from './model/movie.model';
import { MoviesService } from './services/movies.service';
import { FavoritesService } from './services/favorites.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: 'app.component.html',
  imports: [RouterModule],
})
export class AppComponent {}
