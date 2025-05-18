import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  /** Valósidejű user‐stream */
  user$: Observable<any> = new Observable(subscriber => {
    onAuthStateChanged(this.auth, user => subscriber.next(user));
  });

  /** Bejelentkezés email/jelszó párossal */
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /** Kijelentkezés */
  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  /** Szinkron ellenőrzés: van‐e user */
  isLoggedIn(): boolean {
    return this.auth.currentUser != null;
  }
}
