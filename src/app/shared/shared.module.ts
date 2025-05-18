import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from './price-format.pipe';
import { DateRangePipe } from './date-range.pipe';

@NgModule({
  declarations: [
    PriceFormatPipe,
    DateRangePipe
  ],
  exports: [
    CommonModule,
    PriceFormatPipe,
    DateRangePipe
  ]
})
export class SharedModule {}
