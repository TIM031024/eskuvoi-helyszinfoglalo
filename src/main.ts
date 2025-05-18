import { bootstrapApplication }        from '@angular/platform-browser';
import { importProvidersFrom }         from '@angular/core';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';
import { provideRouter }               from '@angular/router';
import { provideZoneChangeDetection }  from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, initializeFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app/app.component';
import { environment }  from './environments/environment';
import { routes }       from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Angular Material animációk
    importProvidersFrom(BrowserAnimationsModule),

    // Routing + optimalizált change detection
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Firebase App
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Firestore longPolling-gal
    provideFirestore(() => {
      // initializeApp() újrahívása biztonságos, mert singleton marad
      const app = initializeApp(environment.firebase);

      return initializeFirestore(app, {
        experimentalForceLongPolling: true
        // a useFetchStreams: false opciót eltávolítottuk,
        // mert a FirestoreSettings definíciója ma már nem tartalmazza
      });
    }),
  ]
}).catch(err => console.error(err));
