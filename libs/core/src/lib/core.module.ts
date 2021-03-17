import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ToastModule, ToastService, MDBModalRef } from 'ng-uikit-pro-standard';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { LayoutUiModule } from '@nutela/layout/ui';
import { SharedNavigationModule } from '@nutela/shared/navigation';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SsvMasterPageComponent } from './master-pages/ssv-master-page/ssv-master-page.component';
import { AdmMasterPageComponent } from './master-pages/adm-master-page/adm-master-page.component';
import { SigninComponent } from './authentication/components/signin/signin.component';
import { AuthorizationComponent } from './authentication/components/authorization/authorization.component';

import { throwIfAlreadyLoaded } from './guards/module-import-guard';

import { AuthService } from './authentication/auth.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthorizedGuard } from './guards/authorized.guard';
import { AdminGuard } from './guards/admin.guard';
import { PermittedGuard } from './guards/permitted.guard';

import { appRreducers, appEffects } from '@nutela/store/app-state';
import { CoreServicesModule } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';

import { environment } from 'apps/admin-shell/src/environments/environment';
import { DialogBoxComponent, PictureCropperComponent } from '@nutela/shared/ui';
import { interceptorProviders } from './interceptors/interceptors';
import { ReboardGuard } from './guards/reboard.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutUiModule,
    SharedNavigationModule,
    MDBBootstrapModulesPro.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    ToastModule.forRoot(),
    CoreServicesModule,
    StoreModule.forRoot(appRreducers),
    EffectsModule.forRoot(appEffects),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [
    SsvMasterPageComponent,
    AdmMasterPageComponent,
    SigninComponent,
    AuthorizationComponent
  ],
  providers: [Title, ToastService, MDBModalRef, interceptorProviders],
  exports: [
    RouterModule,
    SsvMasterPageComponent,
    AdmMasterPageComponent,
    SigninComponent,
    AuthorizationComponent
  ],
  entryComponents: [DialogBoxComponent, PictureCropperComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        AuthenticatedGuard,
        AuthorizedGuard,
        AdminGuard,
        PermittedGuard,
        ReboardGuard
      ]
    };
  }
}
