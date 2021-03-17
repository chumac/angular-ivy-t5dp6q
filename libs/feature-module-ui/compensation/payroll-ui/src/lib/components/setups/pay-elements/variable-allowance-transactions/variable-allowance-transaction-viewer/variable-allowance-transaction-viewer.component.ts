
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import {  IVariableAllowanceTransaction } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-transaction-viewer',
  templateUrl: './variable-allowance-transaction-viewer.component.html',
  styleUrls: ['./variable-allowance-transaction-viewer.component.scss']
})
export class VariableAllowanceTransactionViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IVariableAllowanceTransaction;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
