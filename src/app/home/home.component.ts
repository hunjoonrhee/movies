import { Component, inject } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { FavoritesService } from '../services/favorites.service';
import { MoviesService } from '../services/movies.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieItemComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly moviesService = inject(MoviesService);
  readonly favoritesService = inject(FavoritesService);

  readonly movies$ = this.moviesService.getMovies();
  readonly titleControl = new FormControl<string>('');
  readonly yearControl = new FormControl<string>('');

  isMovieFavorite(movie: Movie) {
    this.favoritesService.toggleFavorite(movie);
  }
  constructor() {
    this.filteredMovies$.subscribe((m) => console.log(m));
  }

  filteredMovies$ = combineLatest([
    this.titleControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.yearControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ),
  ]).pipe(
    map(
      ([title, year]) =>
        [title?.trim(), year?.toString().trim()] as [string, string]
    ),
    switchMap(([title, year]) =>
      this.movies$.pipe(
        map((movies) => {
          const hasTitle = title ? title.length > 0 : false;
          const hasYear = year ? year.length > 0 : false;
          console.log(title, year);
          if (!hasTitle && !hasYear) {
            return null;
          }
          return movies.filter(
            (m) =>
              m.title.toLowerCase().includes(title?.toLowerCase() || '') &&
              m.release_date.includes(year || '')
          );
        })
      )
    )
  );
}
