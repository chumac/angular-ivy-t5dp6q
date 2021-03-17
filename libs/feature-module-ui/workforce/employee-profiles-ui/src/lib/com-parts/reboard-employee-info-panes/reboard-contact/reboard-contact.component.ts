import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { IReboardContact } from '@nutela/models/workforce/employee-profiles';
import { ReboardContactService } from '../../../components/my-reboard-data/services';
import { LoadDataReboardContact, LoadNextOfKinPhotoReboardContact, showEditorReboardContact, showViewerReboardContact, getReboardNextOfKinPhoto, getReboardContactDocument, HideEditorReboardContact, HideViewerReboardContact, getReboardContactData } from '../../../store/my-reboard-data';
import { ReboardContactEditorComponent } from './reboard-contact-editor/reboard-contact-editor.component';

@Component({
  selector: 'x365-fm-workforce-reboard-contact',
  templateUrl: './reboard-contact.component.html',
  styleUrls: ['./reboard-contact.component.scss']
})
export class ReboardContactComponent implements OnInit {

  private subscriptions: ISubscriptions = {};

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  nextOfKinPhoto$: Observable<any>;
  documentData$: Observable<any>;
  contactData$: Observable<IReboardContact>;
  awaitingApprovalData$: Observable<IReboardContact>;
  awaitingApprovalDocument$: Observable<any>;


  @Input() data: any = null;
  @Input() reboardMode: number;

  @ViewChild('editor') editor: ReboardContactEditorComponent;

  constructor(private contactService: ReboardContactService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardContact());
    this.store.dispatch(new LoadNextOfKinPhotoReboardContact());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardContact));
    this.showViewer$ = this.store.pipe(select(showViewerReboardContact));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.nextOfKinPhoto$ = this.store.pipe(select(getReboardNextOfKinPhoto));
    this.contactData$ = this.store.pipe(select(getReboardContactData));
    this.documentData$ = this.store.pipe(select(getReboardContactDocument));
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
    this.contactService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardContact());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardContact());
  }
}
