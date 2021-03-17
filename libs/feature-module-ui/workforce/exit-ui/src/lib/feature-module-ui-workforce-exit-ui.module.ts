import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ResignComponent } from './components/resignation/resign/resign.component';
import { ProcessStepsComponent } from './components/process-steps/process-steps.component';
import { HrProcessStepsComponent } from './components/hr-process-steps/hr-process-steps.component';
import { PermittedGuard } from '@nutela/core';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { IgxGridModule } from 'igniteui-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DxDateBoxModule, DxLookupModule, DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ChecklistComponent } from './components/setup/checklist/checklist.component';
import { QuestionsComponent } from './components/setup/interviews/question/questions.component';
import { exitEffects, exitReducer } from './store/root';
import { ResignationViewerComponent } from './components/resignation-viewer/resignation-viewer.component';
import { RespondComponent } from './components/respond/respond.component';
import { ResponseViewerComponent } from './components/response-viewer/response-viewer.component';
import { ChecklistViewerComponent } from './components/checklist-viewer/checklist-viewer.component';
import { MatDialogModule, MatMenuModule } from '@angular/material';
import { SubmittedComponent } from './components/submitted/submitted.component';
import { FormsComponent } from './components/setup/interviews/forms/forms.component';
import { ChecklistEditorComponent } from './components/setup/checklist/checklist-editor/checklist-editor.component';
import { QuestionEditorComponent } from './components/setup/interviews/question/question-editor/question-editor.component';
import { FormEditorComponent } from './components/setup/interviews/forms/form-editor/form-editor.component';
import { ResignationComponent } from './components/resignation/resignation.component';
import { ValidateEditorComponent } from './components/checklist-viewer/validate-editor/validate-editor.component';
import { MyResponseQueueComponent } from './components/my-response-queue/my-response-queue.component';
import { ProxyResignationComponent } from './components/proxy-resignation/proxy-resignation.component';
import { LetterDataPanelComponent } from './components/letter-data-panel/letter-data-panel.component';
import { FeatureModuleUiApprovalsUiModule } from '@nutela/feature-module-ui/approvals-ui';
import { ResponseRowTemplateComponent } from './components/response-row-template/response-row-template.component';
import { HrResponseQueueComponent } from './components/hr-response-queue/hr-response-queue.component';
import { HrRespondComponent } from './components/hr-respond/hr-respond.component';
import { HrProxyResignComponent } from './components/submitted/hr-proxy-resign/hr-proxy-resign.component';
import { ChecklistSetupViewerComponent } from './components/setup/checklist/checklist-setup-viewer/checklist-setup-viewer.component';
import { LMRespondComponent } from './components/lm-respond/lm-respond.component';
import { PendingResponsesViewerComponent } from './components/pending-responses-viewer/pending-responses-viewer.component';
import { FeatureModuleUiWorkforceEmployeeProfilesUiModule } from '@nutela/feature-module-ui/workforce/employee-profiles-ui';
import { LMProcessStepsComponent } from './components/lm-process-steps/lm-process-steps.component';
import { EmployeeSelectorComponent } from './components/employee-selector/employee-selector.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-resignation',
        component: ResignationComponent,
        data: { state: 'my-resign', breadcrumb: 'My Resignation' }
      },
      {
        path: 'resign',
        component: ResignComponent,
        data: { state: 'resign', breadcrumb: 'Resignation Letter' }
      },
      {
        path: 'process-steps',
        component: ProcessStepsComponent,
        data: { state: 'review-status', breadcrumb: 'Process Steps' }
      },
      {
        path: 'proxy-process-steps/:employeeId',
        component: LMProcessStepsComponent,
        data: { state: 'proxy-process-steps', breadcrumb: 'Proxy Process View' }
      },
      {
        path: 'respond/:resignationId',
        component: RespondComponent,
        data: { state: 'respond', breadcrumb: 'Respond' }
      },
      {
        path: 'my-response-queue',
        component: MyResponseQueueComponent,
        data: { state: 'my-response-queue', breadcrumb: 'My Queue' }
      },
      {
        path: 'proxy-resignation',
        component: ProxyResignationComponent,
        data: { state: 'proxy-resignation', breadcrumb: 'Proxy Resignation (LM)' }
      },
      {
        path: 'proxy-respond/:employeeId/:resignationId',
        component: LMRespondComponent,
        data: { state: 'lm-respond-forms', breadcrumb: 'Line Manager Interview Forms' }
      },
    ]
  },
  {
    path: 'admin',
    data: { role: 'HR_EXIT' },
    // canActivateChild: [PermittedGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'employees-resignations',
            component: SubmittedComponent,
            data: { state: 'submitted', breadcrumb: 'Submitted' }
          },
          {
            path: 'response-queue',
            component: HrResponseQueueComponent,
            data: { state: 'hr-response-queue', breadcrumb: 'Response Queue' }
          },
          {
            path: 'process-view/:employeeId',
            component: HrProcessStepsComponent,
            data: { state: 'hr-process-view', breadcrumb: 'HR Process View' }
          },
          {
            path: 'checklist',
            component: ChecklistComponent,
            data: { state: 'checklist', breadcrumb: 'Checklist' }
          },
          {
            path: 'hr-respond/:employeeId/:resignationId',
            component: HrRespondComponent,
            data: { state: 'hr-respond-forms', breadcrumb: 'HR Interview Forms' }
          },
          {
            path: 'interview-questions/:name',
            component: QuestionsComponent,
            data: { state: 'interview-forms', breadcrumb: { alias: 'interviewFormName'} }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    DxPopupModule,
    DxScrollViewModule,
    MatDialogModule,
    FeatureModuleUiApprovalsUiModule,
    FeatureModuleUiWorkforceEmployeeProfilesUiModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    StoreModule.forFeature('exit', exitReducer),
    EffectsModule.forFeature(exitEffects),
    RouterModule.forChild(routes),
    MatMenuModule,
    AngularEditorModule
  ],
  declarations: [
    ResignComponent,
    RespondComponent,
    ProcessStepsComponent,
    ChecklistComponent,
    ChecklistEditorComponent,
    QuestionsComponent,
    QuestionEditorComponent,
    ResignationViewerComponent,
    ResponseViewerComponent,
    ChecklistViewerComponent,
    SubmittedComponent,
    FormsComponent,
    FormEditorComponent,
    ResignationComponent,
    ValidateEditorComponent,
    MyResponseQueueComponent,
    ProxyResignationComponent,
    LetterDataPanelComponent,
    HrProcessStepsComponent,
    HrProxyResignComponent,
    ResponseRowTemplateComponent,
    HrResponseQueueComponent,
    HrRespondComponent,
    ChecklistSetupViewerComponent,
    LMRespondComponent,
    PendingResponsesViewerComponent,
    LMProcessStepsComponent,
    EmployeeSelectorComponent
  ],
  entryComponents: [ResignationViewerComponent, EmployeeSelectorComponent]
})
export class FeatureModuleUiWorkforceExitUiModule { }
