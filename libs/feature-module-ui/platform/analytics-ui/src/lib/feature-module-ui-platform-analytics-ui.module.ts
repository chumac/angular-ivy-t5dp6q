import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { CompartsModule } from '@nutela/comparts';

import { rootEffects, rootReducer } from './store/root';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    CompartsModule,
    StoreModule.forFeature('analytics', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { state: 'dashboard', breadcrumb: 'Dashboard' }
      },
    ])
  ],
  declarations: [DashboardComponent],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModuleUiPlatformAnalyticsUiModule {}
