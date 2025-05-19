import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private auth: Auth,
    private injector: Injector
  ) {}

  register(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(
      this.injector,
      () => createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  login(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(
      this.injector,
      () => signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  logout(): Promise<void> {
    return runInInjectionContext(
      this.injector,
      () => this.auth.signOut()
    );
  }
}
