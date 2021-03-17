import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { DxListModule } from 'devextreme-angular/ui/list';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { rootReducer, rootEffects } from './store/root';

import { EmailTemplateComponent } from './components/email-template/email-template.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationEditorComponent } from './components/notification/notification-editor/notification-editor.component';
import { SystemProcessComponent } from './components/notification/system-process/system-process.component';
import { OptionsComponent } from './components/options/options.component';
import { CustomOptionsEditorComponent } from './components/options/custom-options-editor/custom-options-editor.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationEditorComponent } from './components/organization/organization-editor/organization-editor.component';
import { WorkflowDefinitionComponent } from './components/workflow-definition/workflow-definition.component';
import { WorkflowDefinitionEditorComponent } from './components/workflow-definition/workflow-definition-editor/workflow-definition-editor.component';
import { WorkflowDetailsComponent } from './components/workflow-details/workflow-details.component';
import { WorkflowDetailsViewerComponent } from './components/workflow-details/workflow-details-viewer/workflow-details-viewer.component';
import { WorkflowMapComponent } from './components/workflow-map/workflow-map.component';
import { WorkflowMapEditorComponent } from './components/workflow-map/workflow-map-editor/workflow-map-editor.component';
import { WorkflowMapAltComponent } from './components/workflow-map-alt/workflow-map-alt.component';
import { AddstepComponent } from './components/workflow-definition/addstep/addstep.component';
import { ReportPermissionComponent } from './components/report-permission/report-permission.component';
import { SecurityComponent } from './components/security/security.component';
import { SecurityEditorComponent } from './components/security/security-editor/security-editor.component';
import {SecurityViewerComponent} from './components/security/security-viewer/security-viewer.component';
import { NotificationService } from './components/notification/notification.service';
import { ReportPermissionEditorComponent } from './components/report-permission/report-permission-editor/report-permission-editor.component';
// import { AdvanceSecurityComponent } from './components/user/advance-security/advance-security.component';
// import { UserListComponent } from './components/user/user-list/user-list.component';
// import { SelectedUserComponent } from './components/user/selected-user/selected-user.component';
import { PermittedGuard } from '@nutela/core';
import { WorkflowMapAltEditorComponent } from './components/workflow-map-alt/workflow-map-alt-editor/workflow-map-alt-editor.component';
// import { MultiSelectItemsComponent } from './components/user/multi-select-items/multi-select-items.component';
import { BulkSecurityEditorComponent } from './components/security/bulk-security-editor/bulk-security-editor.component';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

const routes: Routes = [
  {
    path: 'admin', data: { role: 'HR_FOUNDATIONS', breadcrumb: 'HR Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'organizations', pathMatch: 'full' },
      { path: 'organizations', component: OrganizationComponent, data: { state: 'organizations', breadcrumb: 'Organizations' } },
      { path: 'notification-entities', component: SystemProcessComponent, data: { state: 'notifications', breadcrumb: 'Notifications' } },
      { path: 'notifications/:entityId/:entityKey/:entityDescription', component: NotificationComponent, data: { state: 'notification', breadcrumb: { alias: 'notificationName'} }},
      { path: 'options', component: OptionsComponent, data: { state: 'options', breadcrumb: 'Options' } },
      { path: 'report-permissions', component: ReportPermissionComponent, data: { state: 'report-permissions', breadcrumb: 'Report Permissions' } },
      { path: 'users', component: SecurityComponent, data: { state: 'users', breadcrumb: 'Users' } },
      { path: 'workflow-alternate-maps', component: WorkflowMapAltComponent, data: { state: 'workflow-alternate-maps', breadcrumb: 'Workflow Alternate Maps' } },
      { path: 'workflow-definitions', component: WorkflowDefinitionComponent, data: { state: 'workflow-definitions', breadcrumb: 'Workflow Definitions' } },
      { path: 'workflow-definition-details/:id', component: WorkflowDetailsComponent, data: { state: 'workflow-definition-details', breadcrumb: 'Workflow Definition Details' } },
      { path: 'workflow-maps', component: WorkflowMapComponent, data: { state: 'workflow-map', breadcrumb: 'Workflow Map' } },
      // { path: 'advanced-security', component: AdvanceSecurityComponent, data: { state: 'advanced-security', breadcrumb: 'Advanced Security' }}
    ]
  }
]

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
    DxDropDownBoxModule,
    DxDataGridModule,
    DxListModule,
    StoreModule.forFeature('hr-foundations', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [NotificationService],
  declarations: [EmailTemplateComponent, NotificationComponent, NotificationEditorComponent, SystemProcessComponent, OptionsComponent, CustomOptionsEditorComponent, OrganizationComponent, OrganizationEditorComponent, WorkflowDefinitionComponent, WorkflowDefinitionEditorComponent, WorkflowDetailsComponent, WorkflowDetailsViewerComponent, WorkflowMapComponent, WorkflowMapEditorComponent, AddstepComponent, WorkflowMapAltComponent, ReportPermissionComponent, SecurityComponent, SecurityEditorComponent, SecurityViewerComponent, ReportPermissionEditorComponent, WorkflowMapAltEditorComponent, BulkSecurityEditorComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class FeatureModuleUiPlatformHrFoundationsUiModule {}
