import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles'
import { IEmployeesProfileState } from '../../../../store/root';
import { HideViewerHRBeneficiary, ClearViewerPhotoHRBeneficiary } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-beneficiaries-viewer',
  templateUrl: './hr-beneficiaries-viewer.component.html',
  styleUrls: ['./hr-beneficiaries-viewer.component.scss']
})
export class HrBeneficiariesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IBeneficiary;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerHRBeneficiary());
    this.store.dispatch(new ClearViewerPhotoHRBeneficiary());
  }
}
