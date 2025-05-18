import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app/material.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Application config with routing and change detection
import { appConfig } from './app/app.config';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Enable production mode in production environment
if (environment.production) {
  enableProdMode();
}

// Bootstrap the application with required providers
bootstrapApplication(AppComponent, {
  providers: [
    // Angular Material + Animations
    importProvidersFrom(
      BrowserAnimationsModule,
      MaterialModule
    ),

    // Providers from appConfig (routing and optimized change detection)
    ...appConfig.providers,

    // Firebase App initialization and Firestore provider
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ]
})
  .catch(err => console.error('Bootstrap failed:', err));