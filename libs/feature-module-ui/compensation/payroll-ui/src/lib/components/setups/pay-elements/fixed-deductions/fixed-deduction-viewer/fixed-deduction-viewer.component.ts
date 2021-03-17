
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import {  IFixedDeduction } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-viewer',
  templateUrl: './fixed-deduction-viewer.component.html',
  styleUrls: ['./fixed-deduction-viewer.component.scss']
})
export class FixedDeductionViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedDeduction;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
