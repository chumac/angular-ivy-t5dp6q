import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { ITimeAttendance } from '@nutela/models/workforce/leave';
import { HideViewerTimeAttendance } from '../../../store/time-attendance';


@Component({
  selector: 'x365-fm-workforce-time-attendances-viewer',
  templateUrl: './time-attendances-viewer.component.html',
  styleUrls: ['./time-attendances-viewer.component.scss']
})
export class TimeAttendancesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ITimeAttendance;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerTimeAttendance());
  }
  
}
