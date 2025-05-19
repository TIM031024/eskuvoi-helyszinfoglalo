import { Component, OnInit }                        from '@angular/core';
import { CommonModule }                             from '@angular/common';
import { MatCardModule }                            from '@angular/material/card';
import { MatListModule }                            from '@angular/material/list';

import { Reservation }                              from '../../models';
import { ReservationService }                       from '../../services/reservation.service';
import { ReservationActionsComponent }              from '../reservation-actions/reservation-actions.component';

@Component({
  selector: 'app-booking-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    ReservationActionsComponent
  ],
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss']
})
export class BookingOverviewComponent implements OnInit {
  bookings: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getAll().subscribe({
      next: (data: Reservation[]) => this.bookings = data,
      error: (err: any)          => console.error('Hiba a foglalások lekérésekor:', err)
    });
  }

  handleConfirm(id: string): void {
    this.reservationService.updateStatus(id, 'CONFIRMED')
      .then(() => console.log(`Reservation ${id} megerősítve`))
      .catch((err: any) => console.error(err));
  }

  handleCancel(id: string): void {
    this.reservationService.updateStatus(id, 'CANCELLED')
      .then(() => console.log(`Reservation ${id} lemondva`))
      .catch((err: any) => console.error(err));
  }

  handleEdit(id: string): void {
    console.log(`Szerkesztés: reservation ${id}`);
  }
}
