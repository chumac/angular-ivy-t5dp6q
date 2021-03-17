
import * as constants from '@nutela/shared/app-global';
import { Component, OnInit, HostListener, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ISecurityRole } from '@nutela/models/common';
import { APP_AREAS } from '@nutela/shared/app-global';
import { environment } from 'apps/admin-shell/src/environments/environment';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getMyReboardMode } from '@nutela/store/modules/workforce/employee-profiles';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-shared-nav-mega-menu-content',
  templateUrl: './mega-menu-content.component.html',
  styleUrls: ['./mega-menu-content.component.scss']
})
export class MegaMenuContentComponent implements OnInit {
  moduleIdConstants = constants;
  environment = environment;
  landingRoute: string;

  @Input() public securityRoles: ISecurityRole[];
  @Input() public securityRolesMap: Map<string, string>;
  @Input() public reboardMode$: Observable<number>;

  @Output() menuItemClick = new EventEmitter<string>();
  @Output() routerLinkClick = new EventEmitter<boolean>();

  @ViewChild('megaMenuContent') megaMenuContent: ElementRef;

  // Routerlink Click
  @HostListener('document:click', ['$event'])
  clickOutsideHandler(event) {
    const value = this.megaMenuContent.nativeElement.contains(event.target)
    const tag = event.target.tagName === 'A';
    if (value && tag) {
      this.routerLinkClick.emit(false);
    }
  }

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit() {
    this.reboardMode$ = this.store.pipe(select(getMyReboardMode));
  }

  getSelfServiceLandingRoute() {
    let subscription: Subscription;
    this.reboardMode$.subscribe(mode => {
      if (typeof mode === 'number') {
        mode === 0 ? this.router.navigate([constants.STANDARD_ROUTES.landingPage]) : this.router.navigate([constants.STANDARD_ROUTES.reboardLandingPage]);
      }
    })
  }

  onMenuItemClicked(moduleId: string) {
    if (moduleId === APP_AREAS.SELF_SERVICE) {
      this.menuItemClick.emit(moduleId);
    } else if (this.hasModulePermission(moduleId)) {
      this.menuItemClick.emit(moduleId);
    } 
    this.routerLinkClick.emit(false);
  }

  hasModulePermission(moduleId: string): boolean {
    let role = this.securityRolesMap.get(moduleId);
    role = role ? role : '';
    const securityRole = this.securityRoles.filter(securityRole => securityRole.module === role).shift();
    if (securityRole) {
      return securityRole.has_access;
    } else {
      return false;
    }
  }
}
