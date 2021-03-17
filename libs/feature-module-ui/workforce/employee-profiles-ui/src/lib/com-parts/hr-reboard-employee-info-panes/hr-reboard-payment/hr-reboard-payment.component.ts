import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, permOption01 } from '@nutela/store/modules/foundation';
import { HrReboardPaymentService } from '../../../components/hr-reboard-data/services';
import { showEditorHrReboardPayment, showViewerHrReboardPayment, HideEditorHrReboardPayment, HideViewerHrReboardPayment, LoadDataHrReboardPayment, getHrReboardPaymentData } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-payment',
  templateUrl: './hr-reboard-payment.component.html',
  styleUrls: ['./hr-reboard-payment.component.scss']
})
export class HrReboardPaymentComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  permOption01$: Observable<string>;

  selectOptionData$: Observable<ISelectOptionData>;

  paymentData$: Observable<IPayment>;
  awaitingApprovalData$: Observable<IPayment>;

  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor(private paymentService: HrReboardPaymentService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardPayment({employeeId: this.employeeId}));
    // this.store.dispatch(new LoadAwaitingApprovalDataPayment());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardPayment));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardPayment));

    this.permOption01$ = this.store.pipe(select(permOption01));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.paymentData$ = this.store.pipe(select(getHrReboardPaymentData));
    // this.awaitingApprovalData$ = this.store.pipe(select(getPaymentAwaitingApprovalData));
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
    this.paymentService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardPayment());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardPayment());
  }
}
