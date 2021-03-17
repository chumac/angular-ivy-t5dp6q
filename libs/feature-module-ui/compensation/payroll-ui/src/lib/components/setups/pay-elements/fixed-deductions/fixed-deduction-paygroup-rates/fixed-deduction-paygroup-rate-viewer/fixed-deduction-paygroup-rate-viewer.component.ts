import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedDeductionPaygroupRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-paygroup-rate-viewer',
  templateUrl: './fixed-deduction-paygroup-rate-viewer.component.html',
  styleUrls: ['./fixed-deduction-paygroup-rate-viewer.component.scss']
})
export class FixedDeductionPaygroupRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedDeductionPaygroupRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
