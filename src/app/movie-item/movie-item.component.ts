import { MillionDollor } from './../pipes/million-dollor.pipe';
import { ImageOptions } from './../../../node_modules/log-update/node_modules/ansi-escapes/base.d';
import { Component, input } from '@angular/core';
import { Movie } from '../model/movie.model';
import { HighlightDirective } from '../directives/highlight.directive';
import { MinToDuration } from '../pipes/min-to-duration.pipe';

@Component({
  selector: 'app-movie-item',
  template: `
    <div appHighlight>
      <div class="movie-item">
        <div>
          <h4>{{ movie()?.title }}</h4>
          <small class="subtitle">
            <span>Release date: {{ movie()?.release_date }}</span>
            <span>Budget: {{ movie()?.budget | millionDollor }}</span>
            <span>Duration: {{ movie()?.duration | minToDuration }}</span>
          </small>
        </div>
        <button>Details</button>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['movie-item.component.scss'],
  imports: [HighlightDirective, MillionDollor, MinToDuration],
})
export class MovieItemComponent {
  readonly movie = input<Movie>();
}
