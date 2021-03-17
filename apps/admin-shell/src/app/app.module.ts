import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NxModule } from '@nrwl/nx';
import { localStorageProviders } from '@ngx-pwa/local-storage';

import { AdalService, AdalGuard, AdalInterceptor } from 'adal-angular4';

import { V1Module } from './v1/v1.module';

import * as constants from '@nutela/shared/app-global';
import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { MatDialogRef } from '@angular/material';
// import { DialogService } from 'libs/shared/ui/src/lib/services/dialog.service';

export function initializeAppConfig(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NxModule.forRoot(),
    NgHttpLoaderModule,
    V1Module
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: initializeAppConfig, deps: [AppConfigService], multi: true },
    AdalService,
    AdalGuard,
    localStorageProviders({ prefix: 'x365-hcm-r2.1' }),
    { provide: HTTP_INTERCEPTORS, useClass: AdalInterceptor, multi: true },
    { provide: 'partialDocumentTitle', useValue: `${constants.GENERAL.appTitleSeparator}${constants.APP.name}` },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    // DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
