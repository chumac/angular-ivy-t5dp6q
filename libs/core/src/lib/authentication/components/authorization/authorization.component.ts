import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorage } from '@ngx-pwa/local-storage';

import * as constants from '@nutela/shared/app-global';
import { AuthService } from '../../auth.service';
import { AdalService } from 'adal-angular4';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import {
  WorkLifeDataLoad, ComprehensiveDataLoad, WorkLifeDataLoadSecurityRoles, WorkLifeDataMyAnalysisDetail, getMyReboardMode,
} from '@nutela/store/modules/workforce/employee-profiles';
import { BusinessOptionDataLoad, LookupDataLoad, LoadActivePersonnel, LoadActivePersonnelHR, LoadFaculties, LoadDepartments, LoadCountries, LoadOrganisations } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DOCUMENT } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { UtilService } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { isUndefined } from 'util';

@Component({
  selector: 'x365-core-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  private subscriptions: ISubscriptions = {};
  reboardMode$: Observable<number>;
  // comprehensiveData$: Observable<IComprehensiveData>;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private adalService: AdalService,
    private authService: AuthService,
    protected localStorage: LocalStorage,
    private store: Store<IAppState>,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    if (!this.adalService.userInfo.authenticated) {
      this.router.navigate([constants.STANDARD_ROUTES.signin]);
    } else if (this.authService.isAuthorized()) {
      this.router.navigate([this.authService.returnUrl]);
    }
  }

  ngOnInit() {
    this.verifyToken();
  }

  storeSelects() {
    this.reboardMode$ = this.store.pipe(select(getMyReboardMode))
  }

  verifyToken() {
    console.log('Pre verification check: ' + new Date());

    this.subscriptions['verifyToken'] = this.authService.verifyToken().subscribe(data => {
      console.log('Pre verification check: Returned: ' + new Date());

      if (data.Success) {
        console.log('Pre verification check: Success');

        this.licenseCheck();
        this.storeSelects();
        this.reboardCheck();
      } else {
        console.log('Error has occured. Organization is not registered');
        //
        // Notify user organization as not registered: Toast
        //
        this.signOut();
      }
    },
      error => {
        console.log('Error occured; VT: ' + new Date());
        console.log('Error has occured. VT check failed' + error);
        console.log(error);

        this.signOut();
      }
    );
  }

  licenseCheck() {
    console.log('Pre license check');

    this.subscriptions['licenseCheck'] = this.authService.licenseCheck().subscribe(data => {
      console.log('Pre license check: Return');

      if (data.Success && data.Results && (data.Results[0].orgLicenseStatus === '0')) {
        console.log('Pre license check: Success');

        this.authService.authorized = true;
        this.navigateToPage();
        this.performInit();
        // this.initBeaconChat();
      } else {
        console.log('Error has occured. License expired.');
        //
        // Notify user organization license has expired: Toast
        //
        this.signOut();
      }
    },
      error => {
        console.log('Error occured; Lic: ' + new Date());
        console.log('Error has occured. Lic check failed' + error);
        console.log(error);
        this.signOut();
      }
    );
  }

  reboardCheck() {
    this.subscriptions['reboardMode'] = this.reboardMode$.subscribe(mode => {
      if (!isUndefined(mode)) {
        if (mode === 0) {
          this.authService.cannotReboard = true
        } else {
          this.authService.cannotReboard = false;
        }
      }
    });
  }

  performInit() {
    this.store.dispatch(new ComprehensiveDataLoad());
    this.store.dispatch(new BusinessOptionDataLoad());
    this.store.dispatch(new LookupDataLoad());
    this.store.dispatch(new WorkLifeDataLoad());

    this.store.dispatch(new WorkLifeDataLoadSecurityRoles());

    this.store.dispatch(new WorkLifeDataMyAnalysisDetail());

    this.store.dispatch(new LoadActivePersonnel());
    this.store.dispatch(new LoadActivePersonnelHR());

    this.store.dispatch(new LoadFaculties());
    this.store.dispatch(new LoadDepartments());
    this.store.dispatch(new LoadCountries());
    this.store.dispatch(new LoadOrganisations());
  }

  navigateToPage() {
    this.subscriptions['reboardNavigateCheck'] = this.reboardMode$.subscribe(v => {
      this.localStorage.getItem(constants.GENERAL.returnUrl).subscribe(data => {
        if (!isUndefined(v)) {
          if (v === 0) {
            this.router.navigate([constants.STANDARD_ROUTES.landingPage]);
            this.localStorage
              .removeItem(constants.GENERAL.returnUrl)
              .subscribe(() => { });
          } else {
            this.router.navigate([constants.STANDARD_ROUTES.reboardLandingPage]);
            this.localStorage
              .removeItem(constants.GENERAL.returnUrl)
              .subscribe(() => { });
          }
        }
      });
    })
  }

  private signOut() {
    this.store.dispatch(new ShowToast({title: null, message: `You may not have a valid Xceed365 account. Please, contact your administrator.`, type: ToastTypes.INFO}));

    if (this.adalService.userInfo.authenticated) {
      this.authService.clear();
      this.adalService.logOut();
    }
  }

  private handleError(error: any) {
    console.error('server error:', error);

    if (error instanceof Response) {
      let errMessage = '';
      try {
        // errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'server error');
  }

  initBeaconChat() {

    // let script = this._renderer2.createElement('script');
    // script.type = `text/javascript`;
    // script.text = `
    // !function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],
    // n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",
    // e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],
    // "complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});
    // `;

    // let div: HTMLElement = this._renderer2.createElement('div');
    // div.setAttribute('style', 'position: relative; z-index: 1;');
    // div.setAttribute('class', 'pubble-app');
    // div.setAttribute('data-app-id', '55722');
    // div.setAttribute('data-app-identifier', '55722');
    // let script = this._renderer2.createElement('script');
    // script.type = `text/javascript`;
    // script.src = `https://cdn.pubble.io/javascript/loader.js`;

    // this._renderer2.appendChild(this._document.body, div);
    // this._renderer2.appendChild(this._document.body, script);

    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        window.HFCHAT_CONFIG = {
          EMBED_TOKEN: '2d7afa70-5cbd-11ea-b80d-51df050297c4',
          ASSETS_URL: 'https://widget.happyfoxchat.com/v2/visitor'
        };
        (function () {
          var scriptTag = document.createElement('script')
          scriptTag.type = 'text/javascript'
          scriptTag.async = true
          scriptTag.src = window.HFCHAT_CONFIG.ASSETS_URL + '/js/widget-loader.js'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(scriptTag, s)
        })()
    `;
    this._renderer2.appendChild(this._document.body, script);
  }

  unsubscribe() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
