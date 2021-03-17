
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UtilService } from '@nutela/core-services';
import {  IVariableAllowance } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-viewer',
  templateUrl: './variable-allowance-viewer.component.html',
  styleUrls: ['./variable-allowance-viewer.component.scss']
})
export class VariableAllowanceViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IVariableAllowance;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
