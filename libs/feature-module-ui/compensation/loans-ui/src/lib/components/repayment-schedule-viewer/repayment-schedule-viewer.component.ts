
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ILoanRepayment } from '@nutela/models/compensation/loans';
import { HideViewerRepaymentSchedule, ProcessingApplication } from '../../store/applications';
import { Observable } from 'rxjs';
import { HideViewerRepaymentScheduleTransaction } from '../../store/transactions';
import { HideViewerRepaymentScheduleProxy } from '../../store/proxy-applications';
import { HideViewerRepaymentScheduleClosed } from '../../store/closed';
import { HideViewerRepaymentScheduleRepayment } from '../../store/repayments';
import { HideViewerRepaymentScheduleClosure } from '../../store/closure';
import { ILoanState } from '../../store';

@Component({
  selector: 'x365-fm-loans-repayment-schedule-viewer',
  templateUrl: './repayment-schedule-viewer.component.html',
  styleUrls: ['./repayment-schedule-viewer.component.scss']
})
export class RepaymentScheduleViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILoanRepayment;
  @Input() public repaymentsScheduleList: ILoanRepayment[];

  isProcessing$: Observable<boolean>

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {
    this.store.dispatch(new ProcessingApplication());
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerRepaymentSchedule());
    this.store.dispatch(new HideViewerRepaymentScheduleTransaction());
    this.store.dispatch(new HideViewerRepaymentScheduleProxy());
    this.store.dispatch(new HideViewerRepaymentScheduleClosed());
    this.store.dispatch(new HideViewerRepaymentScheduleRepayment());
    this.store.dispatch(new HideViewerRepaymentScheduleClosure());
    this.repaymentsScheduleList = [];
  }
}
