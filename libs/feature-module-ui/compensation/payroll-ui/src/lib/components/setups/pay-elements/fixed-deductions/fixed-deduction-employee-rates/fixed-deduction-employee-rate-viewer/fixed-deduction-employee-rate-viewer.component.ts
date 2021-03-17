import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedDeductionEmployeeRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-employee-rate-viewer',
  templateUrl: './fixed-deduction-employee-rate-viewer.component.html',
  styleUrls: ['./fixed-deduction-employee-rate-viewer.component.scss']
})
export class FixedDeductionEmployeeRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedDeductionEmployeeRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
