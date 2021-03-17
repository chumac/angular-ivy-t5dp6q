
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IPayrollIntegration } from '@nutela/models/compensation/payment';

@Component({
  selector: 'x365-fm-payrl-payroll-integration-viewer',
  templateUrl: './payroll-integration-viewer.component.html',
  styleUrls: ['./payroll-integration-viewer.component.scss']
})
export class PayrollIntegrationViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IPayrollIntegration;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
