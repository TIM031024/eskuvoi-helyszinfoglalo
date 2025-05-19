import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }                 from '@angular/platform-browser';
import { BrowserAnimationsModule }              from '@angular/platform-browser/animations';
import { provideRouter }                        from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth,      getAuth      } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app/app.component';
import { environment }  from './environments/environment';
import { routes }       from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),

    // Modular AngularFire
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth     (() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Routing
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
