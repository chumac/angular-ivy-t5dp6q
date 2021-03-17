import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, permOption01 } from '@nutela/store/modules/foundation';
import { showEditorReboardPayment, showViewerReboardPayment, HideEditorReboardPayment, HideViewerReboardPayment, LoadDataReboardPayment, getReboardPaymentData } from '../../../store/my-reboard-data';
import { ReboardPaymentService } from '../../../components/my-reboard-data/services';

@Component({
  selector: 'x365-fm-workforce-reboard-payment',
  templateUrl: './reboard-payment.component.html',
  styleUrls: ['./reboard-payment.component.scss']
})
export class ReboardPaymentComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  permOption01$: Observable<string>;

  selectOptionData$: Observable<ISelectOptionData>;

  paymentData$: Observable<IPayment>;
  awaitingApprovalData$: Observable<IPayment>;

  @Input() data: any = null;
  @Input() reboardMode: number;

  constructor(private paymentService: ReboardPaymentService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardPayment());
    // this.store.dispatch(new LoadAwaitingApprovalDataPayment());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardPayment));
    this.showViewer$ = this.store.pipe(select(showViewerReboardPayment));

    this.permOption01$ = this.store.pipe(select(permOption01));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.paymentData$ = this.store.pipe(select(getReboardPaymentData));
  }

  showEditor() {
    this.paymentService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardPayment());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardPayment());
  }
}
