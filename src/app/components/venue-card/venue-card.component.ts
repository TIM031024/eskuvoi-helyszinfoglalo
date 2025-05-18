// src/app/components/venue-card/venue-card.component.ts
import { Component, Input } from '@angular/core';
import { Venue } from '../../models/venue.model';

@Component({
  selector: 'app-venue-card',
  standalone: true,
  imports: [
  ],
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss']
})
export class VenueCardComponent {
  @Input() venue!: Venue;


  showDates = false;
}
