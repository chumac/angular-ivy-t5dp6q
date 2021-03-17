import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';

import { IPerformanceHistory } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerPerformanceHistory } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-performance-history-viewer',
  templateUrl: './hr-performance-history-viewer.component.html',
  styleUrls: ['./hr-performance-history-viewer.component.scss']
})
export class HrPerformanceHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPerformanceHistory;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerPerformanceHistory());
  }
}
