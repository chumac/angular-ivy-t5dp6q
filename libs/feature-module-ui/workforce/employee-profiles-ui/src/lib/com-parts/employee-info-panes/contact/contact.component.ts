import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import {
  LoadApprovedDataContact,
  LoadAwaitingApprovalDataContact,
  getComprehensiveData,
  HideEditorContact,
  getContactApprovedData,
  getContactAwaitingApprovalData,
  showEditorContact,
  showViewerContact,
  HideViewerContact,
  getNextOfKinPhoto,
  LoadNextOfKinPhoto,
  getContactDocument
} from '@nutela/store/modules/workforce/employee-profiles';
import {
  IComprehensiveData,
  IContact
} from '@nutela/models/workforce/employee-profiles';
import { ContactService } from '../../../components/my-personal-data/services';

@Component({
  selector: 'x365-fm-workforce-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;
  nextOfKinPhoto$: Observable<any>;
  documentData$: Observable<any>;


  approvedData$: Observable<IContact>;
  awaitingApprovalData$: Observable<IContact>;
  awaitingApprovalDocument$: Observable<any>;


  @Input() data: any = null;

  constructor(private contactService: ContactService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataContact());
    this.store.dispatch(new LoadAwaitingApprovalDataContact());
    this.store.dispatch(new LoadNextOfKinPhoto());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorContact));
    this.showViewer$ = this.store.pipe(select(showViewerContact));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.nextOfKinPhoto$ = this.store.pipe(select(getNextOfKinPhoto));

    this.approvedData$ = this.store.pipe(select(getContactApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getContactAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getContactDocument));
  }

  showEditor() {
    this.contactService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorContact());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerContact());
  }
}
