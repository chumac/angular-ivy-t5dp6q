
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root';
import { HideViewerHRWorkHistory, ClearDocumentHRWorkHistory } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-work-history-viewer',
  templateUrl: './hr-work-history-viewer.component.html',
  styleUrls: ['./hr-work-history-viewer.component.scss']
})
export class HrWorkHistoryViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPreviousEmployer;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentHRWorkHistory());
    this.store.dispatch(new HideViewerHRWorkHistory());
  }
}
