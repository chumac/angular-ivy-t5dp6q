import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root';
import { HideViewerFamily, ClearViewerPhotoFamily, ClearDocumentFamily } from '../../../../store/employee-detailed-area';

@Component({
  selector: 'x365-fm-workforce-hr-family-viewer',
  templateUrl: './hr-family-viewer.component.html',
  styleUrls: ['./hr-family-viewer.component.scss']
})
export class HrFamilyViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: any;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerFamily());
    this.store.dispatch(new ClearViewerPhotoFamily());
    this.store.dispatch(new ClearDocumentFamily());
  }
}
