import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule, DxLookupModule, DxSelectBoxModule, DxListModule } from 'devextreme-angular';
import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { provisioningReducers, provisioningEffects } from './store';

import { ProvisioningComponent, ProvisioningEmployeeEditorComponent, ProvisionedEmployeeViewerComponent, RolesPickerComponent } from './components';
import { PermittedGuard } from '@nutela/core';
import { ProvisionedEmployeeEditorComponent } from './components/provisioning/provisioned-employee-editor/provisioned-employee-editor.component';

const routes: Routes = [
  {
    path: 'admin', data: { role: 'HR_PROVISIONING', breadcrumb: 'HR Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: ProvisioningComponent, data: { state: 'employees', breadcrumb: 'Employees' } },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    IgxGridModule.forRoot(),
    DxDateBoxModule,
    DxLookupModule,
    DxSelectBoxModule,
    DxListModule,
    SharedUiModule,
    SharedAppGlobalModule,
    StoreModule.forFeature('provisioning', provisioningReducers),
    EffectsModule.forRoot(provisioningEffects),
    RouterModule.forChild(routes)
  ],
    declarations: [
     ProvisioningComponent,
     ProvisioningEmployeeEditorComponent,
     ProvisionedEmployeeViewerComponent,
     RolesPickerComponent,
     ProvisionedEmployeeEditorComponent
    ]
})
export class FeatureModuleUiPlatformProvisioningUiModule {}


