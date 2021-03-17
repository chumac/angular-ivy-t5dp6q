import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';

import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store';
import { HideViewerSeparation } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-separation-viewer',
  templateUrl: './hr-separation-viewer.component.html',
  styleUrls: ['./hr-separation-viewer.component.scss']
})
export class HrSeparationViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISeparation;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerSeparation());
  }
}
