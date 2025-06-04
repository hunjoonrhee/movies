import { MillionDollar } from '../pipes/million-dollar.pipe';
import { ImageOptions } from './../../../node_modules/log-update/node_modules/ansi-escapes/base.d';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Movie } from '../model/movie.model';
import { HighlightDirective } from '../directives/highlight.directive';
import { MinToDuration } from '../pipes/min-to-duration.pipe';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  template: `
    <div appHighlight>
      <div class="movie-item">
        <div>
          <h4>
            <span
              class="icon-star"
              [ngClass]="favoritesService.isFavorite(movie()) ? 'active' : ''"
              (click)="toggle(movie())"
            ></span>
            {{ movie().title }}
          </h4>
          <small class="subtitle">
            <span>Release date: {{ movie().release_date }}</span>
            <span>Budget: {{ movie().budget | millionDollar }}</span>
            <span>Duration: {{ movie().duration | minToDuration }}</span>
          </small>
        </div>
        <button (click)="goToDetail(movie().id)">Details</button>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['movie-item.component.scss'],
  imports: [HighlightDirective, MillionDollar, MinToDuration, CommonModule],
})
export class MovieItemComponent {
  readonly movie = input.required<Movie>();
  readonly favoritesService = inject(FavoritesService);
  readonly router = inject(Router);

  @Output() toggleFavorite = new EventEmitter<Movie>();
  toggle(movie: Movie) {
    this.toggleFavorite.emit(movie);
  }

  goToDetail(id: string) {
    this.router.navigateByUrl(`/details/${id}`);
  }
}
