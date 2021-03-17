import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayDeskComponent } from './components/setups/pay-desk/pay-desk.component';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModulesPro, ModalModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule, DxLookupModule } from 'devextreme-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootEffects, rootReducer } from './store/root';
import { PayDeskEditorComponent } from './components/setups/pay-desk/pay-desk-editor/pay-desk-editor.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';
import { ScheduleDetailEditorComponent } from './components/schedule-detail/schedule-detail-editor/schedule-detail-editor.component';
import { PendingComponent } from './components/pending/pending.component';
import { ScheduleDataPanelComponent } from './com-parts/schedule-data-panel/schedule-data-panel.component';
import { ScheduleDetailViewerComponent } from './components/schedule-detail/schedule-detail-viewer/schedule-detail-viewer.component';
import { PermittedGuard } from '@nutela/core';
import { PendingEditorComponent } from './components/pending/pending-editor/pending-editor.component';
import { ScheduleViewerComponent } from './components/schedule-viewer/schedule-viewer.component';
import { CompletedComponent } from './components/completed/completed.component';
import { ProcessingComponent } from './components/processing/processing.component';
import { ClosedComponent } from './components/closed/closed.component';
import { PayEditorComponent } from './components/schedule-detail/pay-editor/pay-editor.component';

const routes: Routes = [
  {
    path: 'admin',
    data: { role: 'HR_PAYMENT_ADMINISTRATION', breadcrumb: 'Admin' }, canActivateChild: [PermittedGuard],
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'setup',
        data: { breadcrumb: 'Setup' },
        children: [
          { path: '', data: { breadcrumb: 'Pay Desk' }, redirectTo: 'pay-desk', pathMatch: 'full' },
          { path: 'pay-desk', component: PayDeskComponent, data: { state: 'pay-desk', breadcrumb: 'Pay Desk' } }
        ]
      },
      {
        path: 'schedule', children: [
          { path: '', redirectTo: 'pending', pathMatch: 'full' },
          { path: 'pending', component: PendingComponent, data: { state: 'schedule', breadcrumb: 'Schedule Awaiting Submission' } },
          { path: 'processing', component: ProcessingComponent, data: { state: 'schedule', breadcrumb: 'Schedule Processing' } },
          { path: 'completed', component: CompletedComponent, data: { state: 'schedule', breadcrumb: 'Schedule Completed' } },
          { path: 'closed', component: ClosedComponent, data: { state: 'schedule', breadcrumb: 'Schedule Closed' } },
          { path: 'detail/:id', component: ScheduleDetailComponent, data: { state: 'schedule-detail', breadcrumb: {alias: 'detailName'} } }
        ]
      },
    ]
  }
]

@NgModule({
  imports: [CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    StoreModule.forFeature('payments', rootReducer),
    EffectsModule.forRoot(rootEffects), RouterModule.forChild(routes)],
  entryComponents: [PayEditorComponent],
  declarations: [
    PayDeskComponent,
    ProcessingComponent,
    CompletedComponent,
    ClosedComponent,
    PayDeskEditorComponent,
    PendingEditorComponent,
    ScheduleDetailComponent,
    ScheduleDetailEditorComponent,
    ScheduleViewerComponent,
    PayEditorComponent,
    PendingComponent,
    ScheduleDataPanelComponent,
    ScheduleDetailViewerComponent
  ]
})
export class FeatureModuleUiCompensationPaymentUiModule { }
