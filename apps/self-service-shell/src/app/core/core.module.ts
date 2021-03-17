import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutUiModule } from '@nutela/layout/ui';
import { SharedNavigationModule } from '@nutela/shared/navigation';

import { BaseLayoutComponent } from './base-layout/base-layout.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutUiModule,
    SharedNavigationModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  exports: [RouterModule],
  declarations: [BaseLayoutComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
