import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }               from '@angular/platform-browser';
import { BrowserModule }                      from '@angular/platform-browser';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations';
import { provideRouter }                      from '@angular/router';

import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
import { provideAuth, getAuth }               from '@angular/fire/auth';
import { provideFirestore, getFirestore }     from '@angular/fire/firestore';

import { AppComponent }  from './app/app.component';
import { routes }        from './app/app.routes';
import { environment }   from './environments/environment';
console.log('FIREBASE CONFIG:', environment.firebase);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(routes),
    // Firebase inicializáció környezeti beállításokkal:
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth     (() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
