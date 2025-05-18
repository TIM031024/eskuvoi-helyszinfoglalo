import { Component, OnInit }     from '@angular/core';
import { CommonModule }           from '@angular/common';
import { MatFormFieldModule }     from '@angular/material/form-field';
import { MatSelectModule }        from '@angular/material/select';
import { MatCardModule }          from '@angular/material/card';
import { MatButtonModule }        from '@angular/material/button';
import { MatIconModule }          from '@angular/material/icon';
import { MatDividerModule }       from '@angular/material/divider';

import { VenueService }           from '../../services/venue.service';
import { Venue }                  from '../../models/venue.model';
import { VenueCardComponent }     from '../venue-card/venue-card.component';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    VenueCardComponent,
  ],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];
  sortKey: 'price' | 'capacity' = 'price';

  constructor(private venueService: VenueService) {}

  ngOnInit() {
    this.venueService.getVenues().subscribe(list => this.venues = list);
  }

  // Most STRING-et várunk, nem Event-et
  onBook(venueId: string) {
    console.log('Foglalás indítva helyszínre:', venueId);
  }

  onMoreInfo(venueId: string) {
    console.log('Részletek kérése helyszínre:', venueId);
  }
}
