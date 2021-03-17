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
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast, HideRoutingProgressBar } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable({
  providedIn: 'root'
})
export class PermittedGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService, private store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let role = '';

    if (next.data && next.data.role) {
      role = next.data.role;
    }

    return this.authService.rolePermission(role).pipe(
      tap(data => !!data),
      map(data => {
        if (data && data.has_access) {
        return true;
      }

      this.store.dispatch(new HideRoutingProgressBar());
      this.store.dispatch(new ShowToast({title: 'Access Denied', message: `You don't have the required permissions.`, type: ToastTypes.WARNING}),);

      return false;
    }));
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
