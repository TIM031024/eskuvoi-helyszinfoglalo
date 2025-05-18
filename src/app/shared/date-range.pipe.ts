import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  transform(dates: string[], sep: string = '–'): string {
    if (!dates || dates.length === 0) return '';
    const fmt = (d: string) => formatDate(d, 'yyyy.MM.dd', 'hu');
    return fmt(dates[0]) + sep + fmt(dates[dates.length - 1]);
  }
}
