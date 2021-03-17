import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule, DxLookupModule, DxSelectBoxModule } from 'devextreme-angular';
import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';

// import { rootReducers, rootEffects } from './store';

import { UploadComponent } from './components/upload/upload.component';
import { UploadsComponent } from './components/uploads/uploads.component';

import { PermittedGuard } from '@nutela/core';
import { dataUploadEffects, dataUploadReducer } from './store/root';
import { TemplateComponent } from './components/template/template.component';
import { TemplateViewerComponent } from './components/template/template-viewer/template-viewer.component';
import { UploadReportComponent } from './components/upload-report/upload-report.component';
import { UploadsViewerComponent } from './components/uploads/uploads-viewer/uploads-viewer.component';

const routes: Routes = [
  {
    path: 'admin', data: { role: 'HR_DATA_ADMINISTRATION', breadcrumb: 'HR Data Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'data', pathMatch: 'full' },
      { path: 'data', component: UploadsComponent, data: { state: 'uploads', breadcrumb: 'Uploads' } },
      { path: 'template', component: TemplateComponent, data: { state: 'template', breadcrumb: 'Templates' } },
      { path: 'upload-status/:id', component: UploadReportComponent, data: { state: 'upload-status', breadcrumb: 'Upload Status' } }
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
    SharedUiModule,
    SharedAppGlobalModule,
    StoreModule.forFeature('data-upload', dataUploadReducer),
    EffectsModule.forRoot(dataUploadEffects),
    RouterModule.forChild(routes)
  ],
  declarations: [UploadComponent, UploadsComponent, TemplateComponent, TemplateViewerComponent, UploadReportComponent, UploadsViewerComponent,]
})
export class FeatureModuleUiPlatformDataUploadUiModule {}
