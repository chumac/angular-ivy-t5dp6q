
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import {  IPayGroup } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-pay-group-viewer',
  templateUrl: './pay-group-viewer.component.html',
  styleUrls: ['./pay-group-viewer.component.scss']
})
export class PayGroupViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IPayGroup;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
