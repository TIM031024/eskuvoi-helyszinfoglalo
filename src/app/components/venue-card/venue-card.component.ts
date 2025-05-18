import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Venue } from '../../models/venue.model';
import { DateRangePipe } from '../../shared/date-range.pipe';

@Component({
  selector: 'app-venue-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DateRangePipe
  ],
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss']
})
export class VenueCardComponent {
  @Input() venue!: Venue;
  @Input() highlight = false;
  @Input() showDates = true;

  @Output() book = new EventEmitter<string>();
  @Output() moreInfo = new EventEmitter<string>();

  onBook()     { this.book.emit(this.venue.id); }
  onMoreInfo() { this.moreInfo.emit(this.venue.id); }
}
