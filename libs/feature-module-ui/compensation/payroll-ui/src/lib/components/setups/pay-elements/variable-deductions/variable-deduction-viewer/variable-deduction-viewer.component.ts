
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import {  IVariableDeduction } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-viewer',
  templateUrl: './variable-deduction-viewer.component.html',
  styleUrls: ['./variable-deduction-viewer.component.scss']
})
export class VariableDeductionViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IVariableDeduction;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
