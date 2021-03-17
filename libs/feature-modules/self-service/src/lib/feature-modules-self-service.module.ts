import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComponentUiModule } from '@nutela/component-ui';
import {
  FeatureModuleUiWorkforceEmployeeProfilesUiModule,
  MyPersonalDataComponent
} from '@nutela/feature-module-ui/workforce/employee-profiles-ui';
import { FeatureModuleUiWorkforceAbsenceUiModule } from '@nutela/feature-module-ui/workforce/absence-ui';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FeatureModuleUiWorkforceEmployeeProfilesUiModule,
    FeatureModuleUiWorkforceAbsenceUiModule,
    ComponentUiModule,
    // StoreModule.forFeature('self-service', selfServiceReducer),
    // EffectsModule.forRoot(selfServiceEffects),
    // RouterModule.forChild([
    //   { path: '', redirectTo: 'leave' },
    //   {
    //     path: 'dashboard',
    //     component: DashboardComponent,
    //     data: { state: 'dashboard' }
    //   },
    //   {
    //     path: 'my-data',
    //     component: MyPersonalDataComponent,
    //     data: { state: 'myData' }
    //   },
    //   { path: 'people', component: MyPersonalDataComponent, data: { state: 'people' } },
    //   // { path: 'leave', component: LeaveDashboardComponent, data: { state: 'leave' } },
    //   // { path: 'leave-hourly', component: LeaveHourlyDashboardComponent, data: { state: 'leaveHourly' } },
    //   {
    //     path: 'approvals',
    //     component: MyPersonalDataComponent,
    //     data: { state: 'approvals' }
    //   },
    //   {
    //     path: 'reports',
    //     component: MyPersonalDataComponent,
    //     data: { state: 'reports' }
    //   },
    //   {
    //     path: 'documents',
    //     component: MyPersonalDataComponent,
    //     data: { state: 'documents' }
    //   }
    // ])
  ],
  declarations: [DashboardComponent, HomeComponent],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModulesSelfServiceModule {}
