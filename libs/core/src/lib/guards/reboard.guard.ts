import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { Observable } from "rxjs";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowToast, HideRoutingProgressBar } from "@nutela/store/shared";
import { Store, select } from "@ngrx/store";
import { IAppState } from "@nutela/store/app-state";

@Injectable({
  providedIn: 'root'
})
export class ReboardGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService, private store: Store<IAppState>) {

   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkClaimsAccess(state, route);
  }

  private checkClaimsAccess(state: RouterStateSnapshot, route: ActivatedRouteSnapshot) {
    if (this.authService.userCannotReboard()) {
      return true;
    } else {
      const nextSubmenu = this.getNextSubmenuState(state, route);
      this.router.navigate(nextSubmenu)
      return false;
    }
  }

  private getNextSubmenuState(state: RouterStateSnapshot, route: ActivatedRouteSnapshot): string[] {
    let parentUrl = state.url
      .slice(0, state.url.indexOf(route.url[0].path));
    return [parentUrl, 'my-reboarding'];
    //Some logic to figure out which submenu state you would like to go to next
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(childRoute);
    return this.canActivate(childRoute, state);
  }
}
