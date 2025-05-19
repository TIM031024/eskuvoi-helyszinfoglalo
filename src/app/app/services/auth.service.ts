// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // vagy a projektedben használt Fire auth import
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** Firebase-beli authState Observable: vagy user, vagy null */
  public user$: Observable<firebase.default.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  /**
   * Belépett-e a felhasználó?
   * @returns Observable<boolean>
   */
  public isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  /**
   * Bejelentkezés email/jelszó párossal
   */
  public signIn(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Kijelentkezés
   */
  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
