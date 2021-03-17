
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';

import { IVacationHistory } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerVacationHistory } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-vacation-history-viewer',
  templateUrl: './hr-vacation-history-viewer.component.html',
  styleUrls: ['./hr-vacation-history-viewer.component.scss']
})
export class HrVacationHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IVacationHistory;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerVacationHistory());
  }
}
