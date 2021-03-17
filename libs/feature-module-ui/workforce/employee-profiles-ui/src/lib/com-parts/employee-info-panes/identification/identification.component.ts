import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LoadApprovedDataIdentification, LoadAwaitingApprovalDataIdentification, showEditorIdentification, showViewerIdentification, getIdentificationApprovedData, getIdentificationAwaitingApprovalData, ShowEditorIdentification, HideEditorIdentification, HideViewerIdentification, getSignatureImage, LoadSignatureImage } from '@nutela/store/modules/workforce/employee-profiles';
import { isUndefined } from 'util';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { IdentificationService } from '../../../components/my-personal-data/services';

@Component({
  selector: 'x365-fm-workforce-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  signatureImage$: Observable<any>;

  approvedData$: Observable<IIdentification>;
  awaitingApprovalData$: Observable<IIdentification>;

  @Input() data: any = null;

  constructor(private identificationService: IdentificationService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataIdentification());
    this.store.dispatch(new LoadAwaitingApprovalDataIdentification());
    this.store.dispatch(new LoadSignatureImage());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorIdentification));
    this.showViewer$ = this.store.pipe(select(showViewerIdentification));

    this.signatureImage$ = this.store.pipe(select(getSignatureImage));

    this.approvedData$ = this.store.pipe(select(getIdentificationApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getIdentificationAwaitingApprovalData));
  }

  showEditor() {
    this.identificationService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorIdentification());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerIdentification());
  }

  ngOnDestroy() {
  }
}
