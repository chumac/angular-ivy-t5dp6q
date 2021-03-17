import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';

import { ITransferHistory } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerTransferHistory } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-transfer-history-viewer',
  templateUrl: './hr-transfer-history-viewer.component.html',
  styleUrls: ['./hr-transfer-history-viewer.component.scss']
})
export class HrTransferHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITransferHistory;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerTransferHistory());
  }
}
