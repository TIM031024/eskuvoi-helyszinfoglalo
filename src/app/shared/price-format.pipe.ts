import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priceFormat' })
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('hu-HU') + ' Ft';
  }
}
