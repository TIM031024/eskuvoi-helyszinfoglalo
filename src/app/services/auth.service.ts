import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private _loggedIn = false;
    signIn: any;

  constructor(private router: Router) {}

  login(): void {
    this._loggedIn = true;
  }

  logout(): void {
    this._loggedIn = false;
    this.router.navigate(['/venues']);
  }

  isAuthenticated(): boolean {
    return this._loggedIn;
  }
}