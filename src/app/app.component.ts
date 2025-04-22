import { Component } from '@angular/core';
import { VenueListComponent } from './components/venue-list/venue-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { Booking } from './models/booking.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VenueListComponent,
    BookingFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // ✅ Ez kell a teszt sikeres lefutásához
  title = 'eskuvoi-helyszinfoglalo';

  handleBooking(booking: Booking) {
    console.log('Foglalás érkezett:', booking);
  }
}
