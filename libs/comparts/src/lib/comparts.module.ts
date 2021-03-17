import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxCalendarModule, IgxGridModule } from 'igniteui-angular';

import { NoticeBoardCardComponent } from './notice-board-card/notice-board-card.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { EventCalendarCardComponent } from './event-calendar-card/event-calendar-card.component';
import { LeaveCardComponent } from './leave-card/leave-card.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { EmployeeProfileXsCardComponent } from './employee-profile-xs-card/employee-profile-xs-card.component';
import { NoticeBoardCardModalComponent } from './notice-board-card-modal/notice-board-card-modal.component';
import { CustomFormBuilderComponent } from './custom-form-builder/custom-form-builder.component';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { StoreModule } from '@ngrx/store';
import { employeesProfileReducer, employeesProfileEffects } from '../../../feature-module-ui/workforce/employee-profiles-ui/src/lib/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    MatDialogModule,
    MDBBootstrapModulesPro,
    IgxCalendarModule,
    IgxGridModule,
    SharedAppGlobalModule,
    StoreModule.forFeature('employeesProfile', employeesProfileReducer),
    EffectsModule.forRoot(employeesProfileEffects),
  ],
  entryComponents: [NoticeBoardCardModalComponent],
  declarations: [NoticeBoardCardComponent, NoticeBoardCardModalComponent, TodoCardComponent, EventCalendarCardComponent, LeaveCardComponent, TeamCardComponent, EmployeeProfileXsCardComponent, CustomFormBuilderComponent],
  exports: [NoticeBoardCardComponent, NoticeBoardCardModalComponent, TodoCardComponent, EventCalendarCardComponent, LeaveCardComponent, TeamCardComponent, EmployeeProfileXsCardComponent, CustomFormBuilderComponent]
})
export class CompartsModule {}
