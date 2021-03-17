import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IEmployeesProfileState } from '../../../../store';
import { LoadAwaitingApprovalSignatureImage, HideViewerHRIdentification } from '../../../../store/employee-detailed-area';



@Component({
  selector: 'x365-fm-workforce-hr-identification-viewer',
  templateUrl: './hr-identification-viewer.component.html',
  styleUrls: ['./hr-identification-viewer.component.scss']
})
export class HrIdentificationViewerComponent implements OnInit {
  awaitingApprovalsSignatureImage$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IIdentification;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerHRIdentification());
  }
}
