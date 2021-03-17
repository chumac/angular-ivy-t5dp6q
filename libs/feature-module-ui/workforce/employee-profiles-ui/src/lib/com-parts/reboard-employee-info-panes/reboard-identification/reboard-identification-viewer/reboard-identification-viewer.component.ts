import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-reboard-identification-viewer',
  templateUrl: './reboard-identification-viewer.component.html',
  styleUrls: ['./reboard-identification-viewer.component.scss']
})
export class ReboardIdentificationViewerComponent implements OnInit {
  awaitingApprovalsSignatureImage$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IIdentification;
  @Input() public dataDoc: any;

  @Output() public cancelClick: EventEmitter<any> = new EventEmitter();

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    // this.store.dispatch(new LoadAwaitingApprovalSignatureImage());
    // this.awaitingApprovalsSignatureImage$ = this.store.pipe(select(getAwaitingApprovalSignatureImage));
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
