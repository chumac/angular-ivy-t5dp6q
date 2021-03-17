import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';

import { ICompetencyProfile } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerCompetencyProfile } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-competency-profile-viewer',
  templateUrl: './hr-competency-profile-viewer.component.html',
  styleUrls: ['./hr-competency-profile-viewer.component.scss']
})
export class HrCompetencyProfileViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICompetencyProfile;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerCompetencyProfile());
  }
}
