import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFixedAllowance } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-viewer',
  templateUrl: './fixed-allowance-viewer.component.html',
  styleUrls: ['./fixed-allowance-viewer.component.scss']
})
export class FixedAllowanceViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IFixedAllowance;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
