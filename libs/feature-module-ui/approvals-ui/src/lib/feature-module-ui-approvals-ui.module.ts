
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ApproveEditorComponent } from './components/approvals/approve-editor/approve-editor.component';
import { DeclineEditorComponent } from './components/approvals/decline-editor/decline-editor.component';
import { RemoveEditorComponent } from './components/approvals/remove-editor/remove-editor.component';
import { RedirectEditorComponent } from './components/approvals/redirect-editor/redirect-editor.component';
import { ApprovalViewerComponent } from './components/approvals/approval-viewer/approval-viewer.component';
import { RequestEditorComponent } from './components/approvals/request-editor/request-editor.component';
import { ApprovalPathViewerComponent } from './components/approvals/approval-path-viewer/approval-path-viewer.component';
import { ApprovalsService } from './components/approvals/approvals.service';

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
    StoreModule.forFeature('approvals', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild([
      { path: '', component: ApprovalsComponent, data: { state: 'approvals', id: '1 '} }
    ])
  ],
  declarations: [ApprovalsComponent, ApproveEditorComponent, DeclineEditorComponent, RemoveEditorComponent, RedirectEditorComponent, ApprovalViewerComponent, RequestEditorComponent, ApprovalPathViewerComponent],
  exports: [RouterModule, ApproveEditorComponent, DeclineEditorComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ApprovalPathViewerComponent]
})
export class FeatureModuleUiApprovalsUiModule {}
