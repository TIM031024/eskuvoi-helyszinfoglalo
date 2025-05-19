import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private auth: Auth,
    private injector: Injector
  ) {}

  /** Regisztráció */
  register(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(
      this.injector,
      () => createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  /** Bejelentkezés */
  login(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(
      this.injector,
      () => signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  /** Kijelentkezés */
  logout(): Promise<void> {
    return runInInjectionContext(
      this.injector,
      () => signOut(this.auth)
    );
  }
}
