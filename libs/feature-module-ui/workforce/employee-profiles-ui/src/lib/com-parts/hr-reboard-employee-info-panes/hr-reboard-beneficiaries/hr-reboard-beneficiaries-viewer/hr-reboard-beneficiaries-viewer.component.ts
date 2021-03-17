
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from '@nutela/core-services';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-beneficiaries-viewer',
  templateUrl: './hr-reboard-beneficiaries-viewer.component.html',
  styleUrls: ['./hr-reboard-beneficiaries-viewer.component.scss']
})
export class HrReboardBeneficiariesViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IBeneficiary;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  @Output() public cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
