import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../authentication/auth.service';

import * as constants from '@nutela/shared/app-global';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate([constants.STANDARD_ROUTES.signin], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
