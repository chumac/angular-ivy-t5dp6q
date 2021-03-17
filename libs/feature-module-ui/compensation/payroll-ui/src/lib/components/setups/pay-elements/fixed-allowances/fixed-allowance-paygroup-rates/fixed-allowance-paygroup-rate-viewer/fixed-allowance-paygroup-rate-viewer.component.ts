import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedAllowancePaygroupRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-paygroup-rate-viewer',
  templateUrl: './fixed-allowance-paygroup-rate-viewer.component.html',
  styleUrls: ['./fixed-allowance-paygroup-rate-viewer.component.scss']
})
export class FixedAllowancePaygroupRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedAllowancePaygroupRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
