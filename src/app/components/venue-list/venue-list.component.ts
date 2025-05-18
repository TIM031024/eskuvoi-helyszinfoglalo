import { Component, OnInit }     from '@angular/core';
import { CommonModule }           from '@angular/common';
import { VenueCardComponent }     from '../venue-card/venue-card.component';
import { VenueService }           from '../../services/venue.service';
import { Venue }                  from '../../models/venue.model';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [
    // ngFor, *ngIf, pipe-ok
    CommonModule,
    // a kártya‐komponens
    VenueCardComponent
  ],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.venueService.getVenues().subscribe(v => (this.venues = v));
  }
}