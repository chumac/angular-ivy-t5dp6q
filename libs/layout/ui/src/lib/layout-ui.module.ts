import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedUiModule } from '@nutela/shared/ui';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { AppInfoBarComponent } from './components/app-info-bar/app-info-bar.component';
import { AppNavHeaderComponent } from './components/app-nav-header/app-nav-header.component';
import { AppNavHeaderNineboxComponent } from './components/app-nav-header-ninebox/app-nav-header-ninebox.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MDBBootstrapModulesPro.forRoot(),
    SharedUiModule
  ],
  declarations: [
    AppInfoBarComponent,
    AppNavHeaderComponent,
    AppNavHeaderNineboxComponent
  ],
  exports: [
    AppInfoBarComponent,
    AppNavHeaderComponent,
    AppNavHeaderNineboxComponent
  ]
})
export class LayoutUiModule {}
