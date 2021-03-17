import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import { AdalService } from 'adal-angular4';
import { AppConfigService } from './services/app-config.service';
import { AuthService } from '@nutela/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'x365-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private appConfigService: AppConfigService, private adalService: AdalService, private authService: AuthService) {
    this.adalService.init(this.signinCoordinates);
  }

  ngOnInit(): void {
    this.adalService.handleWindowCallback();
    this.heartBeatCheck();
  }

  get signinCoordinates(): adal.Config {
    const appConfig = this.appConfigService.config;

    let redirectUri = '';
    let postLogoutRedirectUri = '';
    let resourceUri = '';

    if (appConfig && appConfig.authUri && appConfig.data) {
      redirectUri = appConfig.authUri.redirectUri;
      postLogoutRedirectUri = appConfig.authUri.postLogoutRedirectUri;
      resourceUri = appConfig.data.api;
    }

    let partialCoordinates = {
      tenant: environment.signinCoordinates.tenant,
      instance: environment.signinCoordinates.instance,
      clientId: environment.signinCoordinates.clientId,
      redirectUri: redirectUri,
      postLogoutRedirectUri: postLogoutRedirectUri,
      endpoints: {}
    };

    partialCoordinates.endpoints[resourceUri] = environment.appIdUri;

    return partialCoordinates;
  }

  heartBeatCheck() {
    this.subscription = this.authService.heartBeat().subscribe(data => {}, error => { });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
