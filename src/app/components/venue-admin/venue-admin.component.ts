import { Component, OnInit } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { MatCardModule }           from '@angular/material/card';
import { MatTableModule }          from '@angular/material/table';
import { MatButtonModule }         from '@angular/material/button';
import { MatIconModule }           from '@angular/material/icon';
import { MatTooltipModule }        from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { Venue }        from '../../models';
import { VenueService } from '../../services/venue.service';
import { VenueEditDialogComponent } from './venue-edit-dialog/venue-edit-dialog.component';

@Component({
  selector: 'app-venue-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './venue-admin.component.html',
  styleUrls: ['./venue-admin.component.scss']
})
export class VenueAdminComponent implements OnInit {
  venues: Venue[] = [];
  displayedColumns = ['name', 'address', 'capacity', 'actions'];

  constructor(
    private venueService: VenueService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadVenues();
  }

  private loadVenues(): void {
    this.venueService.getAll()
      .then((data: Venue[]) => this.venues = data)
      .catch((err: any) => console.error('Error loading venues', err));
  }

  addVenue(): void {
    const ref = this.dialog.open(VenueEditDialogComponent, {
      width: '400px',
      data: { venue: null }
    });
    ref.afterClosed().subscribe((result: any) => {
      if (result?.venue) {
        this.venueService.create(result.venue)
          .then(() => this.loadVenues())
          .catch((err: any) => console.error('Error adding venue', err));
      }
    });
  }

  editVenue(v: Venue): void {
    const ref = this.dialog.open(VenueEditDialogComponent, {
      width: '400px',
      data: { venue: v }
    });
    ref.afterClosed().subscribe((result: any) => {
      if (result?.venue) {
        const updated = result.venue as Venue;
        this.venueService.update(updated.id, updated)
          .then(() => this.loadVenues())
          .catch((err: any) => console.error('Error updating venue', err));
      }
    });
  }

  deleteVenue(id: string): void {
    this.venueService.delete(id)
      .then(() => this.loadVenues())
      .catch((err: any) => console.error('Error deleting venue', err));
  }
}
