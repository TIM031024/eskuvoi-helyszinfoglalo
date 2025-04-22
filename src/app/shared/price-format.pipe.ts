import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return value.toLocaleString('hu-HU') + ' Ft';
  }
}
