import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { IgxListModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDialogModule } from '@angular/material/dialog';


import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';

import { LeaveCardComponent } from './com-parts/leave-card/leave-card.component';
import { LeaveDashboardComponent } from './components/leave/leave-dashboard/leave-dashboard.component';
import { LeaveHourlyDashboardComponent } from './components/leave-hourly/leave-hourly-dashboard/leave-hourly-dashboard.component';
import { LeaveHourlyApplyComponent } from './components/leave-hourly/leave-hourly-apply/leave-hourly-apply.component';
import { LeaveAvailabilityChartComponent } from './com-parts/leave-availability-chart/leave-availability-chart.component';
import { LeaveApplyComponent } from './components/leave/leave-apply/leave-apply.component';
import { LeaveReturnComponent } from './components/leave/leave-return/leave-return.component';
import { LeaveCancelApprovedComponent } from './components/leave/leave-cancel-approved/leave-cancel-approved.component';
import { LeaveHourlyCancelApprovedComponent } from './components/leave-hourly/leave-hourly-cancel-approved/leave-hourly-cancel-approved.component';
import { LeavePlanComponent } from './components/leave-plan/leave-plan.component';
import { LeavePlanEditorComponent } from './components/leave-plan/leave-plan-editor/leave-plan-editor.component';
import { LeavePlanViewerComponent } from './components/leave-plan/leave-plan-viewer/leave-plan-viewer.component';
import { LeaveDetailModalComponent } from './components/leave-plan/leave-detail-modal/leave-detail-modal.component';
import { LeaveDetailEditorComponent } from './components/leave-plan/leave-detail-editor/leave-detail-editor.component';



import { LeaveProxyApplyComponent } from './components/leave/leave-proxy-apply/leave-proxy-apply.component';
import { LeaveProxyApplyEditorComponent } from './components/leave/leave-proxy-apply/leave-proxy-apply-editor/leave-proxy-apply-editor.component';
import { LeaveProxyApplyViewerComponent } from './components/leave/leave-proxy-apply/leave-proxy-apply-viewer/leave-proxy-apply-viewer.component';
import { LeaveHistoricalComponent } from './components/leave/leave-historical/leave-historical.component';

import { RouterModule, Routes } from '@angular/router';
import { absenceEffects, absenceReducer } from './store/root';

import {
  LeaveDaysComponent,
  LeaveDaysEditorComponent,
  LeaveDefinitionComponent,
  LeaveDefinitionEditorComponent,
  LeaveLimitComponent,
  LeaveLimitEditorComponent,
  LeaveProrationComponent,
  LeaveProrationEditorComponent,
  HolidayManagementComponent,
  HolidayManagementEditorComponent,
  LeaveDefinitionViewerComponent
} from './components/setups';
import { AdminGuard, PermittedGuard } from '@nutela/core';
import { LeaveStaggeredComponent } from './components/leave-staggered/leave-staggered.component';
import { LeaveStaggeredEditorComponent } from './components/leave-staggered/leave-staggered-editor/leave-staggered-editor.component';
import { LeaveStaggeredDetailEditorComponent } from './components/leave-staggered/leave-staggered-detail-editor/leave-staggered-detail-editor.component';
import { LeaveDetailPipe } from './pipes';
import { ValidLocationsComponent } from './components/setups/valid-locations/valid-locations.component';
import { ValidLocationsEditorComponent } from './components/setups/valid-locations/valid-locations-editor/valid-locations-editor.component';
import { ValidLocationsViewerComponent } from './components/setups/valid-locations/valid-locations-viewer/valid-locations-viewer.component';
import { TimeAttendancesComponent } from './components/time-attendances/time-attendances.component';
import { TimeAttendancesEditorComponent } from './components/time-attendances/time-attendances-editor/time-attendances-editor.component';
import { TimeAttendancesViewerComponent } from './components/time-attendances/time-attendances-viewer/time-attendances-viewer.component';
import { LeaveProxyResetEditorComponent } from './components/leave/leave-proxy-apply/leave-proxy-reset-editor/leave-proxy-reset-editor.component';

const routes: Routes = [
  {
    path: 'leave',
    data: {
      breadcrumb: 'Leave'
    },
    children: [
      { path: 'daily', component: LeaveDashboardComponent, data: { state: 'leave-daily', breadcrumb: 'Leave Daily' } },
      { path: 'hourly', component: LeaveHourlyDashboardComponent, data: { state: 'leave-hourly', breadcrumb: 'Leave Hourly' } },
      { path: 'plan', component: LeavePlanComponent, data: { state: 'leave-plan', breadcrumb: 'Leave Plan' } },
      { path: 'staggered', component: LeaveStaggeredComponent, data: { state: 'leave-staggered', breadcrumb: 'Staggered Leave' } },

    ]
  },
  {
    path: 'admin', data: { role: 'HR_LEAVE', breadcrumb: 'HR Leave' }, canActivateChild: [PermittedGuard],
    children: [
      { path: 'leave',
        children: [
          { path: 'definitions', component: LeaveDefinitionComponent, data: { state: 'leave-definition', breadcrumb: 'Leave Definition' } },
          { path: 'limits', component: LeaveLimitComponent, data: { state: 'leave-limits', breadcrumb: 'Leave Limits' } },
          { path: 'days', component: LeaveDaysComponent, data: { state: 'leave-days', breadcrumb: 'Leave Days' } },
          { path: 'proration', component: LeaveProrationComponent, data: { state: 'leave-proration', breadcrumb: 'Leave Proration' } },
          { path: 'holidays', component: HolidayManagementComponent, data: { state: 'holiday', breadcrumb: 'Holiday' } },
          { path: 'details', component: LeaveProxyApplyComponent, data: { state: 'leave-detail', breadcrumb: 'Leave Details' } },
          { path: 'valid-locations', component: ValidLocationsComponent, data: { state: 'valid-location', breadcrumb: 'valid-locations' } },
          { path: 'time-attendances', component: TimeAttendancesComponent, data: { state: 'time-attendance', breadcrumb: 'time-attendances' } }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    IgxListModule,
    DxDateBoxModule,
    DxLookupModule,
    CarouselModule,
    MatDialogModule,
    StoreModule.forFeature('absence', absenceReducer),
    EffectsModule.forRoot(absenceEffects),
    RouterModule.forChild(routes)
  ],

  declarations: [
    LeaveDetailPipe,
    LeaveDaysComponent,
    LeaveDaysEditorComponent,
    LeaveDefinitionComponent,
    LeaveDefinitionEditorComponent,
    LeaveLimitComponent,
    LeaveLimitEditorComponent,
    LeaveProrationComponent,
    LeaveProrationEditorComponent,
    HolidayManagementComponent,
    HolidayManagementEditorComponent,
    LeaveDefinitionViewerComponent,
    LeaveProxyApplyComponent,
    LeaveProxyApplyEditorComponent,
    LeaveProxyApplyViewerComponent,
    LeaveHistoricalComponent,
    LeavePlanComponent,
    LeavePlanEditorComponent,
    LeavePlanViewerComponent,
    LeaveDetailModalComponent,
    LeaveDetailEditorComponent,
    LeaveStaggeredComponent,
    LeaveStaggeredEditorComponent,
    LeaveStaggeredDetailEditorComponent,
    LeaveCardComponent,
    LeaveDashboardComponent,
    LeaveHourlyDashboardComponent,
    LeaveApplyComponent,
    LeaveReturnComponent,
    LeaveCancelApprovedComponent,
    LeaveHourlyApplyComponent,
    LeaveHourlyCancelApprovedComponent,
    LeaveAvailabilityChartComponent,
    ValidLocationsComponent,
    ValidLocationsEditorComponent,
    ValidLocationsViewerComponent,
    TimeAttendancesComponent,
    TimeAttendancesEditorComponent,
    TimeAttendancesViewerComponent,

    LeaveProxyResetEditorComponent,
  ],
  exports: [LeaveCardComponent, LeaveAvailabilityChartComponent],
  providers: [],
  entryComponents: [LeaveDetailModalComponent]
})
export class FeatureModuleUiWorkforceAbsenceUiModule {}
