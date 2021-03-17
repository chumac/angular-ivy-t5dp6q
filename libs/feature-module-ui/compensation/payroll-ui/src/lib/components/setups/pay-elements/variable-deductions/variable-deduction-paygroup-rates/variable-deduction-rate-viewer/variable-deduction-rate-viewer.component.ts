import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IVariableDeductionRate } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-rate-viewer',
  templateUrl: './variable-deduction-rate-viewer.component.html',
  styleUrls: ['./variable-deduction-rate-viewer.component.scss']
})
export class VariableDeductionRateViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IVariableDeductionRate;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
