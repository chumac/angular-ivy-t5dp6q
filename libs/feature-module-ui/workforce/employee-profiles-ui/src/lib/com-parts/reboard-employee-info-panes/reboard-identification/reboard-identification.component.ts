import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { LoadSignatureImageReboardIdentification, showEditorReboardIdentification, showViewerReboardIdentification, getSignatureImageReboardIdentification, HideEditorReboardIdentification, HideViewerReboardIdentification, LoadDataReboardIdentification, getReboardIdentificationData } from '../../../store/my-reboard-data';
import { ReboardIdentificationService } from '../../../components/my-reboard-data/services';

@Component({
  selector: 'x365-fm-workforce-reboard-identification',
  templateUrl: './reboard-identification.component.html',
  styleUrls: ['./reboard-identification.component.scss']
})
export class ReboardIdentificationComponent implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  signatureImage$: Observable<any>;

  identificationData$: Observable<IIdentification>;
  activePersonnel$: Observable<ISelectOption[]>;

  @Input() data: any = null;
  @Input() reboardMode: number;

  constructor(private identificationService: ReboardIdentificationService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardIdentification());
    this.store.dispatch(new LoadSignatureImageReboardIdentification());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardIdentification));
    this.showViewer$ = this.store.pipe(select(showViewerReboardIdentification));
    this.signatureImage$ = this.store.pipe(select(getSignatureImageReboardIdentification));
    this.identificationData$ = this.store.pipe(select(getReboardIdentificationData));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
  }

  canEdit(): boolean {
    let status: boolean;
    if (this.reboardMode === 1 || this.reboardMode === 2) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  showEditor() {
    this.identificationService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardIdentification());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardIdentification());
  }

  ngOnDestroy() {
  }
}
