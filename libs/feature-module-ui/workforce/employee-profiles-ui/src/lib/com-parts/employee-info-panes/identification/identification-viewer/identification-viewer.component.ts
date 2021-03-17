import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerIdentification, LoadSignatureImage, getSignatureImage, LoadAwaitingApprovalSignatureImage, getAwaitingApprovalSignatureImage } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-identification-viewer',
  templateUrl: './identification-viewer.component.html',
  styleUrls: ['./identification-viewer.component.scss']
})
export class IdentificationViewerComponent implements OnInit {
  awaitingApprovalsSignatureImage$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IIdentification;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadAwaitingApprovalSignatureImage());
    this.awaitingApprovalsSignatureImage$ = this.store.pipe(select(getAwaitingApprovalSignatureImage));
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerIdentification());
  }
}
