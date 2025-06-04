import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollar',
  standalone: true,
})
export class MillionDollar implements PipeTransform {
  transform(value: number | undefined): string {
    const valueStr = value?.toString();
    const hasValueDash = valueStr?.includes('-');
    if (hasValueDash) {
      const valueFrom = valueStr?.split('-')[0];
      const valueTo = valueStr?.split('-')[1];
      return '$ ' + valueFrom + ' to ' + '$ ' + valueTo + ' million';
    } else {
      return '$ ' + value + ' million';
    }
  }
}
