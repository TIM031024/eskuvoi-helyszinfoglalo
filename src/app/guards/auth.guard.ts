// src/app/guards/auth.guard.ts
import { Injectable }                         from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable }                         from 'rxjs';
import { take, map, tap }                     from 'rxjs/operators';
import { AuthService }                        from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn().pipe(
      take(1),                 // csak egyszer kérdezzük le
      map(isLogged => isLogged),
      tap(isLogged => {
        if (!isLogged) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }
}
