import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITimeSheetProject } from '@nutela/models/workforce/time-sheet';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-workforce-time-timesheet-project-viewer',
  templateUrl: './timesheet-project-viewer.component.html',
  styleUrls: ['./timesheet-project-viewer.component.scss']
})
export class TimesheetProjectViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITimeSheetProject;
  @Output() cancelClick = new EventEmitter<any>();

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.cancelClick.emit(true);
  }

}
