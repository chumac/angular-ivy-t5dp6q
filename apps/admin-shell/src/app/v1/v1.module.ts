import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { V1RoutingModule } from './v1-routing.module';

import { CoreModule } from '@nutela/core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    V1RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
  schemas: []
})
export class V1Module {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: V1Module
  ) {
    if (parentModule) {
      throw new Error('V1 module is already loaded.');
    }
  }
}
