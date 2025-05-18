import { Routes } from '@angular/router';

// komponensek
import { VenueListComponent }     from './components/venue-list/venue-list.component';
import { BookingFormComponent }   from './components/booking-form/booking-form.component';

// most hozzuk létre a login és admin komponenseket!
import { LoginComponent }         from './components/login/login.component';
import { VenueAdminComponent }    from './components/venue-admin/venue-admin.component';

import { AuthGuard }              from './guards/auth.guard';

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
    canActivate: [AuthGuard]      // csak bejelentkezett felhasználó láthatja
  },
  {
    path: 'admin',
    component: VenueAdminComponent,
    canActivate: [AuthGuard]      // admin oldalt is védjük
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
