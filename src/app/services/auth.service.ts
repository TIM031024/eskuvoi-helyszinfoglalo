import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loggedIn = false;

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