import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root';
import { ClearDocumentReferee, HideViewerReferee, ClearViewerPhotoReferee } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-referee-viewer',
  templateUrl: './hr-referee-viewer.component.html',
  styleUrls: ['./hr-referee-viewer.component.scss']
})
export class HrRefereeViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IReferee;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentReferee());
    this.store.dispatch(new HideViewerReferee());
    this.store.dispatch(new ClearViewerPhotoReferee());
  }
}
