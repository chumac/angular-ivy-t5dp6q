import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedAllowanceEmployeeRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-employee-rate-viewer',
  templateUrl: './fixed-allowance-employee-rate-viewer.component.html',
  styleUrls: ['./fixed-allowance-employee-rate-viewer.component.scss']
})
export class FixedAllowanceEmployeeRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedAllowanceEmployeeRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
