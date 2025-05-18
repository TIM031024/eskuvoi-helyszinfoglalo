import { bootstrapApplication }        from '@angular/platform-browser';
import { importProvidersFrom }         from '@angular/core';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';
import { provideRouter }               from '@angular/router';
import { provideZoneChangeDetection }  from '@angular/core';

import { provideFirebaseApp, initializeApp }         from '@angular/fire/app';
import { provideFirestore, initializeFirestore }     from '@angular/fire/firestore';

import { AppComponent }       from './app/app.component';
import { environment }        from './environments/environment';
import { routes }             from './app/app.routes';

// Bootstrap immár az új route-okkal és AuthGuard-dal
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),

    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => initializeFirestore(
      initializeApp(environment.firebase),
      { experimentalForceLongPolling: true }
    )),
  ]
}).catch(err => console.error(err));
