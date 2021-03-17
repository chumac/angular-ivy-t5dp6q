import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';

import { ILoanHistory } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerLoanHistory } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-loan-history-viewer',
  templateUrl: './hr-loan-history-viewer.component.html',
  styleUrls: ['./hr-loan-history-viewer.component.scss']
})
export class HrLoanHistoryViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ILoanHistory;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerLoanHistory());
  }
}
