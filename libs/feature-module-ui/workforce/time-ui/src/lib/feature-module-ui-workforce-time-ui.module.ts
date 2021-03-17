import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';

import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';

import { TimeSheetsComponent } from './components/time-sheets/time-sheets.component';
import { PermittedGuard } from '@nutela/core';
import { Routes, RouterModule } from '@angular/router';

import { rootEffects, rootReducer } from './store/root';
import { TimeSheetsEditorComponent } from './components/time-sheets/time-sheets-editor/time-sheets-editor.component';
import { TimeSheetsViewerComponent } from './components/time-sheets/time-sheets-viewer/time-sheets-viewer.component';
import { CreateTimeSheetComponent } from './components/common/create-time-sheet/create-time-sheet.component';
import { MatDialogModule } from '@angular/material';
import { WorkStreamCardComponent } from './com-parts/work-stream-card/work-stream-card.component';
import { WorkStreamPanelComponent } from './com-parts/work-stream-panel/work-stream-panel.component';
import { CreateWorkActivityComponent } from './components/common/create-work-activity/create-work-activity.component';
import { RecallTimeSheetComponent } from './components/common/recall-time-sheet/recall-time-sheet.component';
import { TimeSheetProjectsComponent } from './components/setups/time-sheet-projects/time-sheet-projects.component';
import { TimesheetProjectEditorComponent } from './components/setups/time-sheet-projects/timesheet-project-editor/timesheet-project-editor.component';
import { TimesheetProjectViewerComponent } from './components/setups/time-sheet-projects/timesheet-project-viewer/timesheet-project-viewer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'time-sheets', component: TimeSheetsComponent, data: { state: 'time-sheets', breadcrumb: 'Time Sheets' } },
      { path: 'time-sheets-editor/:id', component: TimeSheetsEditorComponent, data: { state: 'time-sheets-editor', breadcrumb: 'Time Sheets Editor' } }
    ]
  },
  {
    path: 'admin', data: { role: 'HR_ADMINISTRATION', breadcrumb: 'HR Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'time-sheet-projects', pathMatch: 'full'},
      { path: 'time-sheet-projects', component: TimeSheetProjectsComponent, data: { state: 'time-sheet-projects', breadcrumb: 'Time Sheet Projects' } },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    StoreModule.forFeature('time', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild(routes)
  ],
  declarations: [TimeSheetsComponent, TimeSheetsEditorComponent, TimeSheetsViewerComponent, CreateTimeSheetComponent, RecallTimeSheetComponent, WorkStreamCardComponent, WorkStreamPanelComponent, CreateWorkActivityComponent, TimeSheetProjectsComponent, TimesheetProjectEditorComponent, TimesheetProjectViewerComponent],
  entryComponents: [CreateTimeSheetComponent, CreateWorkActivityComponent, RecallTimeSheetComponent]
})
export class FeatureModuleUiWorkforceTimeUiModule {}
