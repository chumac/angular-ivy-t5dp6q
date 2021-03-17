import { Component, OnInit, Input, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import {
  IComprehensiveData,
  IContact
} from '@nutela/models/workforce/employee-profiles';
import { toastOptionsInformation } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { isUndefined } from 'util';
import { LoadApprovedDataContact, showEditorContact, showViewerContact, getComprehensiveData, LoadAwaitingApprovalDataContact, HideViewerContact, ShowEditorContact, HideEditorContact, getContactApprovedData, getContactAwaitingApprovalData } from '../../../store/employee-detailed-area';
import { IEmployeesProfileState } from '../../../store';
import { take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-contact',
  templateUrl: './hr-contact.component.html',
  styleUrls: ['./hr-contact.component.scss']
})
export class HrContactComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;

  approvedData$: Observable<IContact>;
  awaitingApprovalData$: Observable<IContact>;
  awaitingApprovalDocument$: Observable<any>;

  @Input() data: any = null;
  @Input() employeeId: number;
  dat:any=null;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,) {
                titleService.setTitle(
                  `${'HR Contact Information'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataContact({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadAwaitingApprovalDataContact({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorContact));
    this.showViewer$ = this.store.pipe(select(showViewerContact));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getContactApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getContactAwaitingApprovalData));
    this.approvedData$.subscribe(res=>{
      this.dat=res;
    })
  }

  showEditor() {
    this.awaitingApprovalData$
    .pipe(take(1))
    .subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorContact());
      } else {
        this.store.dispatch(
          new ShowToast({
            title: null,
            message:
              'You have data awaiting approval. You must discard pending data before you can update your data again.',
            options: toastOptionsInformation()
          })
        );
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorContact());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerContact());
  }
}
