
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import {  IVariableDeductionTransaction } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-transaction-viewer',
  templateUrl: './variable-deduction-transaction-viewer.component.html',
  styleUrls: ['./variable-deduction-transaction-viewer.component.scss']
})
export class VariableDeductionTransactionViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IVariableDeductionTransaction;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
