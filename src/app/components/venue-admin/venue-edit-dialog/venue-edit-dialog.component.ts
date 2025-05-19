import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';

import { Venue } from '../../../models';

export interface VenueDialogData {
  venue: Venue | null;
}

@Component({
  selector: 'app-venue-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './venue-edit-dialog.component.html',
  styleUrls: ['./venue-edit-dialog.component.scss']
})
export class VenueEditDialogComponent {
  venue: Partial<Venue> = {};
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<VenueEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VenueDialogData
  ) {
    if (data.venue) {
      this.isEditMode = true;
      this.venue = { ...data.venue };
    }
  }

  onSave(form: NgForm): void {
    if (!form.valid) return;
    const result = this.isEditMode
      ? ({ id: this.data.venue!.id, ...this.venue } as Venue)
      : (this.venue as Omit<Venue, 'id'>);
    this.dialogRef.close({ venue: result });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
