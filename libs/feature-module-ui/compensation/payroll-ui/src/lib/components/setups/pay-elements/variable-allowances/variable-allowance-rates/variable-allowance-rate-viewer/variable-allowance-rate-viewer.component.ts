import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IVariableAllowanceRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-rate-viewer',
  templateUrl: './variable-allowance-rate-viewer.component.html',
  styleUrls: ['./variable-allowance-rate-viewer.component.scss']
})
export class VariableAllowanceRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IVariableAllowanceRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
