import {
  NgModule
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
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { ManageDetailDashboardComponent, EnterpriseStructureTypeComponent, EnterpriseStructureDetailComponent, EnterpriseStructureTypeEditorComponent, EnterpriseStructureDetailEditorComponent, VirtualLinkPickerComponent, VirtualLinkEditorComponent, ConnectEditorComponent, ManageStructureDetailCardComponent, SharedCodeEditorComponent, AddCostCentresEditorComponent, RemoveCostCentresEditorComponent, ConnectChildrenEditorComponent } from './components';
import { enterpriseStructureReducers, enterpriseStructureEffects } from './store';
import { EnterpriseStructureSharedDataService } from './services';
import { DxLookupModule, DxListModule } from 'devextreme-angular';
import { AdminGuard, PermittedGuard } from '@nutela/core';

const routes: Routes = [
  {
    // path: 'admin', canActivate: [AdminGuard], canActivateChild: [AdminGuard],
    path: 'admin', data: { role: 'HR_ENTERPRISE', breadcrumb: 'HR Admin' }, canActivateChild: [],
    children: [
      { path: '', redirectTo: 'types', pathMatch: 'full' },
      { path: 'types', component: EnterpriseStructureTypeComponent, data: { state: 'enterprise-sturcture-types', breadcrumb: 'Enterprise Structure Types' }},

      { path: 'details/:name/:id', component: EnterpriseStructureDetailComponent, data: { state: 'enterprise-structure-details', breadcrumb: { alias: 'structureName'} }},
      { path: 'manage', component: ManageDetailDashboardComponent, data: { state: 'manage-enterprise-sturcture', breadcrumb: 'Manage Enterprise Structure' }}
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
    DxListModule,
    StoreModule.forFeature('enterpriseStructure', enterpriseStructureReducers),
    EffectsModule.forFeature(enterpriseStructureEffects),
    RouterModule.forChild(routes)
  ],
  declarations: [
    EnterpriseStructureTypeComponent,
    EnterpriseStructureTypeEditorComponent,
    EnterpriseStructureDetailComponent,
    EnterpriseStructureDetailEditorComponent,
    VirtualLinkEditorComponent,
    VirtualLinkPickerComponent,
    ManageDetailDashboardComponent,
    ManageStructureDetailCardComponent,
    ConnectEditorComponent,
    ConnectChildrenEditorComponent,
    SharedCodeEditorComponent,
    AddCostCentresEditorComponent,
    RemoveCostCentresEditorComponent,
  ],
  providers: [
    EnterpriseStructureSharedDataService
  ]
})
export class FeatureModuleUiEnterprisePlanningEnterpriseStructureUiModule {}
