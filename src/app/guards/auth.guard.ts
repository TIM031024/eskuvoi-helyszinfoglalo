import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Observable }      from 'rxjs';
import { map }             from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return authState(this.auth).pipe(
      map(user =>
        user
          ? true
          : this.router.createUrlTree(['/login'])
      )
    );
  }
}