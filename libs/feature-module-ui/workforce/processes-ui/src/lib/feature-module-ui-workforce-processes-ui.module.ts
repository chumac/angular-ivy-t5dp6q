import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermittedGuard } from '@nutela/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxLookupModule, DxPopupModule, DxScrollViewModule, DxTemplateModule } from 'devextreme-angular';
import { AccordionModule, MDBBootstrapModulesPro, WavesModule } from 'ng-uikit-pro-standard';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { IgxGridModule } from 'igniteui-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { processesReducer } from './store/root/processes.reducers';
import { processesEffects } from './store/root/processes.effects';
// Common
import { ProcessFormWizardComponent } from './components/processes/common/process-form-wizard/process-form-wizard.component';
import { CustomProcessLookupComponent } from './components/processes/common/custom-process-lookup/custom-process-lookup.component';
import { HrProcessTransactionsEditorComponent } from './components/processes/hr-process-transactions/hr-process-transactions-editor/hr-process-transactions-editor.component';
import { HrProcessTransactionsViewerComponent } from './components/processes/hr-process-transactions/hr-process-transactions-viewer/hr-process-transactions-viewer.component';
import { HrProcessTransactionsComponent } from './components/processes/hr-process-transactions/hr-process-transactions.component';
import { ReviewerProcessTransactionsEditorComponent } from './components/processes/reviewer-process-transactions/reviewer-process-transactions-editor/reviewer-process-transactions-editor.component';
import { ReviewerProcessTransactionsViewerComponent } from './components/processes/reviewer-process-transactions/reviewer-process-transactions-viewer/reviewer-process-transactions-viewer.component';
import { ReviewerProcessTransactionsComponent } from './components/processes/reviewer-process-transactions/reviewer-process-transactions.component';
import { SelfProcessTransactionsEditorComponent } from './components/processes/self-process-transactions/self-process-transactions-editor/self-process-transactions-editor.component';
import { SelfProcessTransactionsViewerComponent } from './components/processes/self-process-transactions/self-process-transactions-viewer/self-process-transactions-viewer.component';
import { SelfProcessTransactionsComponent } from './components/processes/self-process-transactions/self-process-transactions.component';
import { TeamProcessTransactionsEditorComponent } from './components/processes/team-process-transactions/team-process-transactions-editor/team-process-transactions-editor.component';
import { TeamProcessTransactionsViewerComponent } from './components/processes/team-process-transactions/team-process-transactions-viewer/team-process-transactions-viewer.component';
import { TeamProcessTransactionsComponent } from './components/processes/team-process-transactions/team-process-transactions.component';
import { FormBuilderComponent } from './com-parts/form-builder/form-builder.component';
import { FormBuilderEditorComponent } from './com-parts/form-builder/form-builder-editor/form-builder-editor.component';
import { FormBuilderViewerComponent } from './com-parts/form-builder/form-builder-viewer/form-builder-viewer.component';
// import { FormRendererComponent } from './com-parts/form-renderer/form-renderer.component';
import { CustomFormsComponent } from './components/common/custom-forms/custom-forms.component';
import { CustomFormsBuilderComponent } from './components/common/custom-forms/custom-forms-builder/custom-forms-builder.component';
import { ProcessFormDefinitionsComponent } from './components/common/process-form-definitions/process-form-definitions.component';
import { CustomProcessMapsComponent } from './components/common/custom-process-maps/custom-process-maps.component';
import { ProcessFormDefinitionsEditorComponent } from './components/common/process-form-definitions/process-form-definitions-editor/process-form-definitions-editor.component';
import { ProcessFormDefinitionsViewerComponent } from './components/common/process-form-definitions/process-form-definitions-viewer/process-form-definitions-viewer.component';
import { CustomProcessMapsEditorComponent } from './components/common/custom-process-maps/custom-process-maps-editor/custom-process-maps-editor.component';
import { CustomProcessMapsViewerComponent } from './components/common/custom-process-maps/custom-process-maps-viewer/custom-process-maps-viewer.component';
import { CustomFormsEditorComponent } from './components/common/custom-forms/custom-forms-editor/custom-forms-editor.component';
import { CustomFormsViewerComponent } from './components/common/custom-forms/custom-forms-viewer/custom-forms-viewer.component';

const routes: Routes = [ 
  {
    path: '',
    data: {
      breadcrumb: 'Processes'
    },
    children: [
      { path: '', redirectTo: 'self-process-transaction' },
      {
        path: 'self-process-transaction',
        component: SelfProcessTransactionsComponent,
        data: { state: 'self-process-transaction', breadcrumb: 'self-process-transaction' }
      },
      {
        path: 'team-process-transaction',
        component: TeamProcessTransactionsComponent,
        data: { state: 'team-process-transaction', breadcrumb: 'team-process-transaction' }
      },
      {
        path: 'reviewer-process-transaction',
        component: ReviewerProcessTransactionsComponent,
        data: { state: 'reviewer-process-transaction', breadcrumb: 'reviewer-process-transaction' }
      },
      {
        path: 'custom-process-lookup',
        component: CustomProcessLookupComponent,
        data: { state: 'custom-process-lookup', breadcrumb: 'custom-process-lookup' }
      },
      {
        path: 'process-form-wizard',
        component: ProcessFormWizardComponent,
        data: { state: 'process-form-wizard', breadcrumb: 'process-form-wizard' }
      },    
    ]
  },
  {
    path: 'admin', data: { role: 'HR_CUSTOM_PROCESS', breadcrumb: 'HR Processes' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'hr-process-transactions' },
      {
        path: 'custom-forms',
        component: CustomFormsComponent,
        data: { state: 'custom-forms' }
      },
      {
        path: 'custom-form-builder/:id',
        component: CustomFormsBuilderComponent,
        data: { state: 'custom-form-builder' }
      },
      {
        path: 'process-form-definition',
        component: ProcessFormDefinitionsComponent,
        data: { state: 'process-form-definition' }
      },
      {
        path: 'custom-process-map/:id',
        component: CustomProcessMapsComponent,
        data: { state: 'custom-process-map' }
      },
      {
        path: 'hr-process-transactions',
        component: HrProcessTransactionsComponent,
        data: { state: 'hr-process-transactions' }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxLookupModule,
    AccordionModule,
    WavesModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    // InfiniteScrollModule,
    MatDialogModule,
    MatMenuModule,
    MDBBootstrapModulesPro.forRoot(),
    IgxGridModule.forRoot(),
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
    SharedUiModule,
    SharedAppGlobalModule,
    Ng2SearchPipeModule,
    StoreModule.forFeature('custom-process', processesReducer),
    EffectsModule.forRoot(processesEffects),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProcessFormDefinitionsComponent,
    ProcessFormDefinitionsEditorComponent,
    ProcessFormDefinitionsViewerComponent,
    CustomProcessMapsComponent,
    CustomProcessMapsEditorComponent,
    CustomProcessMapsViewerComponent,
    CustomFormsComponent,
    CustomFormsEditorComponent,
    CustomFormsViewerComponent,
    CustomFormsBuilderComponent,
    FormBuilderComponent,
    FormBuilderEditorComponent,
    FormBuilderViewerComponent,
    // FormRendererComponent,
    CustomProcessLookupComponent,
    ProcessFormWizardComponent,
    SelfProcessTransactionsComponent,
    SelfProcessTransactionsEditorComponent,
    SelfProcessTransactionsViewerComponent,
    TeamProcessTransactionsComponent,
    TeamProcessTransactionsEditorComponent,
    TeamProcessTransactionsViewerComponent,
    ReviewerProcessTransactionsComponent,
    ReviewerProcessTransactionsEditorComponent,
    ReviewerProcessTransactionsViewerComponent,
    HrProcessTransactionsComponent,
    HrProcessTransactionsEditorComponent,
    HrProcessTransactionsViewerComponent,
  ],
  entryComponents: [FormBuilderEditorComponent],
  exports: [
    // FormRendererComponent,
    FormBuilderEditorComponent
  ]
})
export class FeatureModuleUiWorkforceProcessesUiModule {}
