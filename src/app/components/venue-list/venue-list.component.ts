import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';

import { Venue }        from '../../models';
import { VenueService } from '../../services/venue.service';

import { HoverHighlightDirective } from '../../directives/hover-highlight.directive';
import { LazyLoadImageDirective }  from '../../directives/lazy-load-image.directive';
import { TooltipDirective }        from '../../directives/tooltip.directive';
import { AutoScrollDirective }     from '../../directives/auto-scroll.directive';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HoverHighlightDirective,
    LazyLoadImageDirective,
    TooltipDirective,
    AutoScrollDirective
  ],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.venueService.getAll()
      .then((data: Venue[]) => this.venues = data)
      .catch((err: any) => console.error('Hiba a helyszínek lekérésekor:', err));
  }
}
