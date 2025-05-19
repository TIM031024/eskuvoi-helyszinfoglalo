import { Routes } from '@angular/router';

// komponensek
import { VenueListComponent }     from './components/venue-list/venue-list.component';
import { BookingFormComponent }   from './components/booking-form/booking-form.component';

// most hozzuk létre a login és admin komponenseket!
import { LoginComponent }         from './components/login/login.component';
import { VenueAdminComponent }    from './components/venue-admin/venue-admin.component';



// A Routes tömb, minden útvonal teljes beállítása
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'venues',
    pathMatch: 'full'
  },
  {
    path: 'venues',
    component: VenueListComponent
  },
  {
    path: 'bookings',
    component: BookingFormComponent,
  },
  {
    path: 'admin',
    component: VenueAdminComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'venues'
  }
];
