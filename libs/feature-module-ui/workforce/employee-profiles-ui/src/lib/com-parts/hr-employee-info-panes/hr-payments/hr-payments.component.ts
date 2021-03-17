import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';

import { isUndefined } from 'util';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, permOption01 } from '@nutela/store/modules/foundation';
import { IEmployeesProfileState } from '../../../store';
import { LoadApprovedDataPayment, LoadAwaitingApprovalDataPayment, showEditorPayment, showViewerPayment, getPaymentApprovedData, getPaymentAwaitingApprovalData, ShowEditorPayment, HideEditorPayment, HideViewerPayment } from '../../../store/employee-detailed-area';
import { take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-payments',
  templateUrl: './hr-payments.component.html',
  styleUrls: ['./hr-payments.component.scss']
})
export class HrPaymentsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  permOption01$: Observable<string>;

  selectOptionData$: Observable<ISelectOptionData>;

  approvedData$: Observable<IPayment>;
  awaitingApprovalData$: Observable<IPayment>;

  @Input() data: any = null;
  @Input() public employeeId: number;

  dat:any;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Payments'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataPayment({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadAwaitingApprovalDataPayment({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPayment));
    this.showViewer$ = this.store.pipe(select(showViewerPayment));

    this.permOption01$ = this.store.pipe(select(permOption01));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getPaymentApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getPaymentAwaitingApprovalData));
    this.approvedData$.subscribe(
      res=>{
        this.dat=res;
      }
    )
  }

  showEditor() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorPayment());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: 'You have data awaiting approval. You must discard pending data before you can update your data again.', options: toastOptionsInformation()}));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPayment());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPayment());
  }
}
