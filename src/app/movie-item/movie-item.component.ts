import { ImageOptions } from './../../../node_modules/log-update/node_modules/ansi-escapes/base.d';
import { Component, input } from '@angular/core';
import { Movie } from '../model/movie.model';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-movie-item',
  template: `
    <div appHighlight>
      <div class="movie-item">
        <div>
          <h4>{{ movie()?.title }}</h4>
          <small class="subtitle">
            <span>Release date: {{ movie()?.release_date }}</span>
            <span>Budget: $ {{ movie()?.budget }} million</span>
            <span>Duration: {{ movie()?.duration }} min</span>
          </small>
        </div>
        <button>Details</button>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['movie-item.component.scss'],
  imports: [HighlightDirective],
})
export class MovieItemComponent {
  readonly movie = input<Movie>();
}
