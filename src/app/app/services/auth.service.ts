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

  /** email/password regisztráció – moduláris UserCredential-t ad */
  register(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(
      this.injector,
      () => createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  /** email/password bejelentkezés – moduláris UserCredential-t ad */
  login(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(
      this.injector,
      () => signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  /** kijelentkezés */
  logout(): Promise<void> {
    return runInInjectionContext(
      this.injector,
      () => signOut(this.auth)
    );
  }
}
