import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule }                      from '@angular/common';
import { MatButtonModule }                   from '@angular/material/button';
import { MatIconModule }                     from '@angular/material/icon';
import { MatTooltipModule }                  from '@angular/material/tooltip';

@Component({
  selector: 'app-reservation-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './reservation-actions.component.html',
  styleUrls: ['./reservation-actions.component.scss']
})
export class ReservationActionsComponent {
  @Input() reservationId!: string;
  @Input() reservationStatus!: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  @Input() reservationUser!: string;

  @Output() confirm = new EventEmitter<string>();
  @Output() cancel  = new EventEmitter<string>();
  @Output() edit    = new EventEmitter<string>();

  onConfirm() { this.confirm.emit(this.reservationId); }
  onCancel()  { this.cancel.emit(this.reservationId); }
  onEdit()    { this.edit.emit(this.reservationId); }
}
