
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root';
import { ClearDocumentEducation, HideViewerEducation } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-educational-history-viewer',
  templateUrl: './hr-educational-history-viewer.component.html',
  styleUrls: ['./hr-educational-history-viewer.component.scss']
})
export class HrEducationalHistoryViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IEducation;
  @Input() public dataDoc: any;
  @Input() public view: boolean;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentEducation());
    this.store.dispatch(new HideViewerEducation());
  }
}
