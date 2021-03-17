
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';
import { IProvisioning } from '../../../models/interfaces';
import { ProvisioningUtilService } from '../../../services';

@Component({
  selector: 'x365-fm-plf-prov-provisioned-employee-viewer',
  templateUrl: './provisioned-employee-viewer.component.html',
  styleUrls: ['./provisioned-employee-viewer.component.scss']
})
export class ProvisionedEmployeeViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProvisioning;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: ProvisioningUtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
