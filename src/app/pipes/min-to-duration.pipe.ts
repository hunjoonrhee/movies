import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'minToDuration',
  standalone: true,
})
export class MinToDuration implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) return '';
    const hour = Math.floor(value / 60);
    const minutes = value % 60;

    return hour + 'h ' + minutes + 'min';
  }
}
