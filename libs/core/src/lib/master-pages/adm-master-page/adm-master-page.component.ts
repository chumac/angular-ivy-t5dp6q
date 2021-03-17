import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as constants from '@nutela/shared/app-global';
import { AdalService } from 'adal-angular4';
import { AuthService } from '../../authentication/auth.service';

import {
  slideStaggerAnimation,
  fadeInAnimation,
  slideInOutAnimation,
  openCloseAnimation
} from '@nutela/shared/animations';
import { Store, select } from '@ngrx/store';
import { getEmployeePhoto, getEmployeeName, getWorkflowMessageCount, isAdmin, getSecurityRoles } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IName } from '@nutela/models/core-data';
import { IAppState } from '@nutela/store/app-state';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { isRoutingProgressBarShowing, ShowRoutingProgressBar, HideRoutingProgressBar } from '@nutela/store/shared';
import { orgData } from '@nutela/store/modules/foundation';
import { IOrganization, ISecurityRole } from '@nutela/models/common';
import { UtilService, ApiService } from '@nutela/core-services';

@Component({
  selector: 'x365-core-adm-master-page',
  templateUrl: './adm-master-page.component.html',
  styleUrls: ['./adm-master-page.component.scss'],
  animations: [
    slideStaggerAnimation,
    fadeInAnimation,
    slideInOutAnimation,
    openCloseAnimation
  ]
})
export class AdmMasterPageComponent implements OnInit {
  appBarHeight = constants.APP_BAR_HEIGHT + 'px';
  appVersionContainerHeight = constants.APP_VERSION_CONTAINER_HEIGHT + 'px';
  appNavigationGutter = constants.APP_NAVIGATON_GUTTER + 'px';

  appNavigationHeight =
    'calc(100% - ' + this.appBarHeight + this.appVersionContainerHeight + constants.APP_NAVIGATON_GUTTER + 'px)';

  selectedModuleId = constants.APP_AREAS.SELF_SERVICE;

  loading = false;

  isOpen = false;
  escKeyPressed: boolean = false;
  clickedOutside: boolean = false;
  clickedRouterLink: boolean = false;

  orgData$: Observable<IOrganization>;
  showLoadingBar$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  securityRoles$: Observable<ISecurityRole[]>;

  employeeName$: Observable<IName>;
  employeePhoto$: Observable<any>;
  workflowMessageCount$: Observable<number>;

  @ViewChild('megaMenu') megaMenu: ElementRef;

  nineBoxtoggle(value) {
    if (this.escKeyPressed) {
      this.isOpen = true;
      this.escKeyPressed = false;
    } else if (this.clickedOutside) {
      this.isOpen = true;
      this.clickedOutside = false;
    } else if (this.clickedRouterLink) {
      this.isOpen = true;
      this.clickedRouterLink = false;
    } else {
      this.isOpen = value;
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  get isSelfServiceMode(): boolean {
    if (this.selectedModuleId === constants.APP_AREAS.SELF_SERVICE) {
      return true;
    } else {
      return false;
    }
  }

  // Escape Key Eventhandler
  @HostListener('document:keydown', ['$event'])
  escKeyHandler(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.isOpen === true && !this.escKeyPressed) {
      this.isOpen = false;
      this.escKeyPressed = true;
    }
  }

  // Click Outside Eventhandler
  @HostListener('document:click', ['$event'])
  clickOutsideHandler(event) {
    if (event.target && event.target.firstChild) {
      if (
        !(event.target.className === 'nine-box') ||
        !(event.target.firstChild.className === 'nine-box')
      ) {
        if (this.isOpen && !this.clickedOutside) {
          const value = this.megaMenu.nativeElement.contains(event.target);
          if (!value) {
            this.isOpen = false;
            this.clickedOutside = true;
          }
        }
      }
    }
  }

  constructor(
    private adalService: AdalService,
    public authService: AuthService,
    public utilService: UtilService,
    public apiService: ApiService,
    private route: Router,
    private store: Store<IAppState>,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.orgData$ = this.store.pipe(select(orgData));
    this.showLoadingBar$ = this.store.pipe(select(isRoutingProgressBarShowing));
    this.isAdmin$ = this.store.pipe(select(isAdmin));
    this.securityRoles$ = this.store.pipe(select(getSecurityRoles));

    this.employeeName$ = this.store.pipe(select(getEmployeeName));
    this.employeePhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.workflowMessageCount$ = this.store.pipe(select(getWorkflowMessageCount));

    this.routeEvent(this.route);
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.store.dispatch(new ShowRoutingProgressBar());
      } else if (e instanceof NavigationEnd) {
        this.store.dispatch(new HideRoutingProgressBar());
      }
    });
  }

  onMenuItemClicked($event) {
    this.selectedModuleId = $event;
  }

  onClick() {
    this.selectedModuleId = constants.PLATFORM_MODULES.WIP;
  }

  getChatBotIframeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://webchat.botframework.com/embed/xceed365qna-bot?s=KR1lW8klAcU.z-RPy_0aqiPTDUr2osDco0EydeXhC_eFTeVpylV8qlw');
  }

  closeMegamenuOnRouterLink() {
    this.clickedRouterLink = true;
    this.isOpen = false;
  }

  onSignout() {
    if (this.adalService.userInfo.authenticated) {
      this.authService.clear();
      this.adalService.logOut();
    }
  }
}
