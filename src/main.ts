import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }               from '@angular/platform-browser';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations';
import { provideRouter }                      from '@angular/router';

import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
import { provideAuth, getAuth }               from '@angular/fire/auth';
import { provideFirestore, getFirestore }     from '@angular/fire/firestore';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';
import { environment }  from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),

    // Firebase App inicializáció a környezeti beállításokkal
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Auth & Firestore moduláris provider-ek
    provideAuth     (() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
}).catch(err => console.error(err));
