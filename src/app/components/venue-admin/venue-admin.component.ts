// src/app/components/venue-admin/venue-admin.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MatTableModule }  from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { VenueService } from '../../services/venue.service';
import { Venue }        from '../../models/venue.model';
import { Subscription } from 'rxjs';
import { VenueEditDialogComponent } from './venue-edit-dialog.component';

@Component({
  selector: 'app-venue-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './venue-admin.component.html',
  styleUrls:   ['./venue-admin.component.scss']
})
export class VenueAdminComponent implements OnInit, OnDestroy {
  venues: Venue[] = [];
  private sub?: Subscription;
  columns = ['name','location','price','capacity','actions'];

  constructor(
    private vs:     VenueService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sub = this.vs.getVenues()
      .subscribe(data => this.venues = data);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  add(): void {
    this.dialog.open(VenueEditDialogComponent, {
      data: { mode: 'create' }
    });
  }

  edit(v: Venue): void {
    this.dialog.open(VenueEditDialogComponent, {
      data: { mode: 'edit', venue: v }
    });
  }

  delete(v: Venue): void {
    this.vs['deleteVenue'](v.id)
      .then(() => this.venues = this.venues.filter(x => x.id !== v.id))
      .catch((err: any) => console.error('Törlési hiba:', err));
  }
}
