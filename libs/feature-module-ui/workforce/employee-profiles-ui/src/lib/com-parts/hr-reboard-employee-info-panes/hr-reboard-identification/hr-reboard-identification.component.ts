import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { HrReboardIdentificationService } from '../../../components/hr-reboard-data/services';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { LoadSignatureImageHrReboardIdentification, showEditorHrReboardIdentification, showViewerHrReboardIdentification, getSignatureImageHrReboardIdentification, HideEditorHrReboardIdentification, HideViewerHrReboardIdentification, LoadDataHrReboardIdentification, getHrReboardIdentificationData } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-identification',
  templateUrl: './hr-reboard-identification.component.html',
  styleUrls: ['./hr-reboard-identification.component.scss']
})
export class HrReboardIdentificationComponent implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  signatureImage$: Observable<any>;

  identificationData$: Observable<IIdentification>;
  activePersonnel$: Observable<ISelectOption[]>;

  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor(private identificationService: HrReboardIdentificationService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardIdentification({employeeId: this.employeeId}));
    this.store.dispatch(new LoadSignatureImageHrReboardIdentification({employeeId: this.employeeId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardIdentification));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardIdentification));
    this.signatureImage$ = this.store.pipe(select(getSignatureImageHrReboardIdentification));
    this.identificationData$ = this.store.pipe(select(getHrReboardIdentificationData));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
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
    this.store.dispatch(new HideEditorHrReboardIdentification());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardIdentification());
  }

  ngOnDestroy() {
  }
}
