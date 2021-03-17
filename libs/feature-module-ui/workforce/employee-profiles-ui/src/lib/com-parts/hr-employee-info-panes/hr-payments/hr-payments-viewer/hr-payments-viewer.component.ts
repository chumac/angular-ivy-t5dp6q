import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerPayment } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-payments-viewer',
  templateUrl: './hr-payments-viewer.component.html',
  styleUrls: ['./hr-payments-viewer.component.scss']
})
export class HrPaymentsViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPayment;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerPayment());
  }
}
