import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root/employees-profile.state';
import { HideViewerGeneral } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-general-information-viewer',
  templateUrl: './hr-general-information-viewer.component.html',
  styleUrls: ['./hr-general-information-viewer.component.scss']
})
export class HrGeneralInformationViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGeneral;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() {
  }

  onDoneClicked() {
    console.log(this.data);
    console.log(this.data.date_of_birth);
    this.store.dispatch(new HideViewerGeneral());
  }
}
