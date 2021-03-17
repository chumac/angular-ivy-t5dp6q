import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { IgxCalendarModule, IgxGridModule } from 'igniteui-angular';

import { NoticeBoardCardComponent } from './notice-board-card/notice-board-card.component';
import { EventCalendarCardComponent } from './event-calendar-card/event-calendar-card.component';
import { TodoCardComponent } from './todo-card/todo-card.component';

@NgModule({
  imports: [CommonModule, MDBBootstrapModulesPro, IgxCalendarModule, IgxGridModule],
  declarations: [
    EventCalendarCardComponent,
    TodoCardComponent,
    NoticeBoardCardComponent
  ],
  exports: [
    EventCalendarCardComponent,
    TodoCardComponent,
    NoticeBoardCardComponent
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }
  ]
})
export class ComponentUiModule {}
