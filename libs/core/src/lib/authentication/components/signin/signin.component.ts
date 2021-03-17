import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdalService } from 'adal-angular4';

import * as constants from '@nutela/shared/app-global';
import { AuthService } from '../../auth.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ApiService } from '@nutela/core-services';

@Component({
  selector: 'x365-core-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private adalService: AdalService,
    public apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    protected localStorage: LocalStorage
  ) {
    const returnUrl =
      this.route.snapshot.queryParams[constants.GENERAL.returnUrl] ||
      constants.STANDARD_ROUTES.landingPage;
    this.localStorage
      .setItem(constants.GENERAL.returnUrl, returnUrl)
      .subscribe(() => {}, () => {});

    if (this.authService.isAuthorized()) {
      this.router.navigate([this.authService.returnUrl]);
    } else if (this.authService.isAuthenticated()) {
      this.router.navigate([constants.STANDARD_ROUTES.authorization]);
    }
  }

  ngOnInit() {}

  submit(): void {
    this.adalService.login();
  }
}
