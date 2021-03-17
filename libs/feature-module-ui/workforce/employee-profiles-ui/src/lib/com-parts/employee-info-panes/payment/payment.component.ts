import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LoadApprovedDataPayment, LoadAwaitingApprovalDataPayment, showEditorPayment, showViewerPayment, getPaymentApprovedData, getPaymentAwaitingApprovalData, HideEditorPayment, HideViewerPayment } from '@nutela/store/modules/workforce/employee-profiles';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, permOption01 } from '@nutela/store/modules/foundation';
import { PaymentService } from '../../../components/my-personal-data/services';

@Component({
  selector: 'x365-fm-workforce-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  permOption01$: Observable<string>;

  selectOptionData$: Observable<ISelectOptionData>;

  approvedData$: Observable<IPayment>;
  awaitingApprovalData$: Observable<IPayment>;

  @Input() data: any = null;

  constructor(private paymentService: PaymentService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataPayment());
    this.store.dispatch(new LoadAwaitingApprovalDataPayment());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPayment));
    this.showViewer$ = this.store.pipe(select(showViewerPayment));

    this.permOption01$ = this.store.pipe(select(permOption01));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getPaymentApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getPaymentAwaitingApprovalData));
  }

  showEditor() {
    this.paymentService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPayment());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPayment());
  }
}
