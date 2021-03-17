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
import { IgxGridModule } from 'igniteui-angular';

import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { rootReducer, rootEffects } from './store/root';

import { DocumentsComponent } from './components/documents/documents.component'; 
import { MatIconModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot(),
    SharedUiModule,
    SharedAppGlobalModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    StoreModule.forFeature('documents', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild([
       { path: '', component: DocumentsComponent, data: { state: 'documents' } }
    ])
  ],
  declarations: [DocumentsComponent],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModuleUiPlatformDocumentsUiModule {}
