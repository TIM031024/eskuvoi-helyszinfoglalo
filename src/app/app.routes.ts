import { Routes } from '@angular/router';
import { VenueListComponent } from './components/venue-list/venue-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { LoginComponent } from './components/login/login.component';
import { VenueAdminComponent } from './components/venue-admin/venue-admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: VenueListComponent },
  { path: 'book/:id', component: BookingFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/venues', component: VenueAdminComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
