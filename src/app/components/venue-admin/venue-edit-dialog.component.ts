import { Component, Inject }                          from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }              from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { VenueService }                               from '../../services/venue.service';
import { Venue }                                      from '../../models/venue.model';
import { MatFormFieldModule }                         from '@angular/material/form-field';
import { MatInputModule }                             from '@angular/material/input';
import { MatButtonModule }                            from '@angular/material/button';

export interface VenueDialogData {
  mode:  'create' | 'edit';
  venue?: Venue;
}

@Component({
  selector: 'app-venue-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './venue-edit-dialog.component.html',
  styleUrls: ['./venue-edit-dialog.component.scss']
})
export class VenueEditDialogComponent {
  form: FormGroup;

  constructor(
    private vs: VenueService,
    private dialogRef: MatDialogRef<VenueEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VenueDialogData
  ) {
    // Ha van editelésre kapott venue, előtöltjük
    const v = data.venue;
    this.form = new FormGroup({
      name:       new FormControl(v?.name ?? '', [Validators.required]),
      location:   new FormControl(v?.location ?? '', [Validators.required]),
      price:      new FormControl(v?.price ?? 0, [Validators.required, Validators.min(0)]),
      capacity:   new FormControl(v?.capacity ?? 0, [Validators.required, Validators.min(1)]),
      imageUrl:   new FormControl(v?.imageUrl ?? '', []),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const payload = this.form.value as Omit<Venue, 'id' | 'availableDates'> & { availableDates?: Date[] };
    if (this.data.mode === 'create') {
      // új doksi létrehozása
      this.vs.addVenue({ ...payload, availableDates: [] }).then(() => this.dialogRef.close(true));
    } else {
      // meglévő frissítése
      const updated: Venue = {
        ...this.data.venue!,
        ...payload
      };
      this.vs.updateVenue(updated).then(() => this.dialogRef.close(true));
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
