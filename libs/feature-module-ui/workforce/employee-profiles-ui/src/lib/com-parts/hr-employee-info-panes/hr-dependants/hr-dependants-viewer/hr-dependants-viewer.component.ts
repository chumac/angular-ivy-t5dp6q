import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root';
import { HideViewerDependant, ClearViewerPhotoDependant } from '../../../../store/employee-detailed-area';

@Component({
  selector: 'x365-fm-workforce-hr-dependants-viewer',
  templateUrl: './hr-dependants-viewer.component.html',
  styleUrls: ['./hr-dependants-viewer.component.scss']
})
export class HrDependantsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: any;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerDependant());
    this.store.dispatch(new ClearViewerPhotoDependant());
  }
}
