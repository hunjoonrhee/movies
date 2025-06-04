import { Component, inject, input, InputSignal } from '@angular/core';
import { MovieDetails } from '../model/movie.model';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { MinToDuration } from '../pipes/min-to-duration.pipe';
import { MillionDollar } from '../pipes/million-dollar.pipe';

@Component({
  selector: 'app-movie-details',
  template: `
    <h1>{{ (movie$ | async)?.title }}</h1>
    <div class="details">
      @if ((movie$ | async)?.poster) {
      <img
        [ngSrc]="(movie$ | async)?.poster || ''"
        width="200"
        height="100"
        alt="Poster"
      />
      }
      <div>
        <p>
          <span>Summary: </span>
          <span>{{ (movie$ | async)?.summary }}</span>
        </p>
      </div>
    </div>
    <table class="horizontal">
      <caption>
        Details
      </caption>
      <thead>
        <tr>
          <th>Box office</th>
          <th>Budget</th>
          <th>Duration</th>
          <th>Producers</th>
          <th>Cinematographers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Box office">
            {{ (movie$ | async)?.box_office | millionDollar }}
          </td>
          <td data-label="Budget">
            {{ (movie$ | async)?.budget | millionDollar }}
          </td>
          <td data-label="Duration">
            {{ (movie$ | async)?.duration | minToDuration }}
          </td>
          <td data-label="Producers">
            {{ (movie$ | async)?.producers?.join(', ') }}
          </td>
          <td data-label="Cinematographers">
            {{ (movie$ | async)?.cinematographers?.join(', ') }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  standalone: true,
  styleUrls: ['movie-details.component.scss'],
  imports: [NgOptimizedImage, MillionDollar, MinToDuration, AsyncPipe],
})
export class MovieDetailsComponent {
  private movieId = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  protected movie$ = inject(MoviesService).getMovieDetails(this.movieId);
}
