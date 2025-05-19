import { Routes } from '@angular/router';
import { VenueListComponent }    from './components/venue-list/venue-list.component';
import { BookingOverviewComponent } from './components/booking-overview/booking-overview.component';
import { VenueAdminComponent }   from './components/venue-admin/venue-admin.component';
import { UserFormComponent }     from './components/user-form/user-form.component';
import { LoginComponent }        from './components/login/login.component';
import { AuthGuard }             from './guards/auth.guard';

export const routes: Routes = [
  { path: 'venues', component: VenueListComponent },
  { path: 'bookings', component: BookingOverviewComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: VenueAdminComponent, canActivate: [AuthGuard] },
  { path: 'user/new', component: UserFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/venues', pathMatch: 'full' },
  { path: '**', redirectTo: '/venues' }
];
