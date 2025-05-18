import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';
import { Venue }             from '../../models/venue.model';

@Component({
  selector: 'app-venue-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss']
})
export class VenueCardComponent {
  @Input() venue!: Venue;

  @Input() showDates = false;

  @Input() highlight = false;
}