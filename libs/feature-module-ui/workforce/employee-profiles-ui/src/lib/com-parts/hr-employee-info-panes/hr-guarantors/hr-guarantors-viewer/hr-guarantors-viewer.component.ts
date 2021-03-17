import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IEmployeesProfileState } from '../../../../store/root';
import { ClearDocumentGuarantor, ClearViewerPhotoGuarantor, HideViewerGuarantor } from '../../../../store/employee-detailed-area';

@Component({
  selector: 'x365-fm-workforce-hr-guarantors-viewer',
  templateUrl: './hr-guarantors-viewer.component.html',
  styleUrls: ['./hr-guarantors-viewer.component.scss']
})
export class HrGuarantorsViewerComponent implements OnInit {
  approvalPhoto$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGuarantor;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentGuarantor());
    this.store.dispatch(new HideViewerGuarantor());
    this.store.dispatch(new ClearViewerPhotoGuarantor());
  }
}
