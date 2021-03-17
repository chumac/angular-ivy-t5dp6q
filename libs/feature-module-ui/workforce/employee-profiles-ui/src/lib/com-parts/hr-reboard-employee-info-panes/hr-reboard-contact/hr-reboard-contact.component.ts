import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { HrReboardContactService } from '../../../components/hr-reboard-data/services';
import { LoadDataHrReboardContact, LoadNextOfKinPhotoHrReboardContact, showEditorHrReboardContact, showViewerHrReboardContact, getHrReboardNextOfKinPhoto, getHrReboardContactDocument, HideEditorHrReboardContact, HideViewerHrReboardContact, getHrReboardContactData } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-contact',
  templateUrl: './hr-reboard-contact.component.html',
  styleUrls: ['./hr-reboard-contact.component.scss']
})
export class HrReboardContactComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  nextOfKinPhoto$: Observable<any>;
  documentData$: Observable<any>;
  contactData$: Observable<IContact>;
  awaitingApprovalData$: Observable<IContact>;
  awaitingApprovalDocument$: Observable<any>;


  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor(private contactService: HrReboardContactService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardContact({ employeeId: this.employeeId}));
    this.store.dispatch(new LoadNextOfKinPhotoHrReboardContact({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardContact));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardContact));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.nextOfKinPhoto$ = this.store.pipe(select(getHrReboardNextOfKinPhoto));
    this.contactData$ = this.store.pipe(select(getHrReboardContactData));
    this.documentData$ = this.store.pipe(select(getHrReboardContactDocument));
  }

  showEditor() {
    this.contactService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardContact());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardContact());
  }
}
