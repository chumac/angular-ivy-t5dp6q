
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UtilService } from '@nutela/core-services';
import {  ICalendar } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-calendar-viewer',
  templateUrl: './calendar-viewer.component.html',
  styleUrls: ['./calendar-viewer.component.scss']
})
export class CalendarViewerComponent {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICalendar;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
