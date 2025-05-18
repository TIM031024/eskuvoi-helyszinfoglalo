import { Component, OnInit, OnDestroy }       from '@angular/core';
import { VenueService }                       from '../../services/venue.service';
import { Venue }                              from '../../models/venue.model';
import { Subscription }                       from 'rxjs';
import { MatTableModule }                     from '@angular/material/table';
import { MatButtonModule }                    from '@angular/material/button';
import { MatIconModule }                      from '@angular/material/icon';
import { MatDialog, MatDialogModule }         from '@angular/material/dialog';
import { VenueEditDialogComponent }           from './venue-edit-dialog.component';

@Component({
  selector: 'app-venue-admin',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    VenueEditDialogComponent
  ],
  templateUrl: './venue-admin.component.html',
  styleUrls: ['./venue-admin.component.scss']
})
export class VenueAdminComponent implements OnInit, OnDestroy {
  venues: Venue[] = [];
  sub?: Subscription;
  columns = ['name','location','price','capacity','actions'];

  constructor(private vs: VenueService, private dlg: MatDialog) {}

  ngOnInit() {
    this.sub = this.vs.getVenues().subscribe(data => this.venues = data);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  add() {
    this.dlg.open(VenueEditDialogComponent, { data: { mode: 'create' } });
  }

  edit(v: Venue) {
    this.dlg.open(VenueEditDialogComponent, { data: { mode: 'edit', venue: v } });
  }

  delete(v: Venue) {
    this.vs.deleteVenue(v.id).then(() => this.venues = this.venues.filter(x => x.id !== v.id));
  }
}
