import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedAllowanceRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-global-rate-viewer',
  templateUrl: './fixed-allowance-global-rate-viewer.component.html',
  styleUrls: ['./fixed-allowance-global-rate-viewer.component.scss']
})
export class FixedAllowanceGlobalRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedAllowanceRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
