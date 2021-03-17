import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedDeductionRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-global-rate-viewer',
  templateUrl: './fixed-deduction-global-rate-viewer.component.html',
  styleUrls: ['./fixed-deduction-global-rate-viewer.component.scss']
})
export class FixedDeductionGlobalRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedDeductionRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
