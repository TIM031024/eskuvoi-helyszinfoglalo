import { Routes } from '@angular/router';
import { VenueListComponent } from './components/venue-list/venue-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

export const routes: Routes = [
  { path: 'venues',   component: VenueListComponent },
  { path: 'bookings', component: BookingFormComponent },
  { path: '', redirectTo: 'venues', pathMatch: 'full' },
  { path: '**', redirectTo: 'venues' }  // fallback
];
