
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ILoanRepayment } from '@nutela/models/compensation/loans';
import { HideViewerGenericSchedule, isProcessingApplication, ProcessingApplication } from '../../store/applications';
import { Observable } from 'rxjs';
import { HideViewerGenericScheduleProxy, isProcessingProxyApplications, ProcessingDataProxyApplications } from '../../store/proxy-applications';
import { HideViewerGenericScheduleTransaction } from '../../store/transactions';
import { HideViewerGenericScheduleClosed } from '../../store/closed';
import { HideViewerGenericScheduleClosure } from '../../store/closure';
import { ILoanState } from '../../store';

@Component({
  selector: 'x365-fm-loans-generic-schedule-viewer',
  templateUrl: './generic-schedule-viewer.component.html',
  styleUrls: ['./generic-schedule-viewer.component.scss']
})
export class GenericScheduleViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILoanRepayment;
  @Input() public genericScheduleList: any[];
  isProcessing$: Observable<boolean>

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingApplication));
    this.isProcessing$ = this.store.pipe(select(isProcessingProxyApplications));
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingApplication());
    this.store.dispatch(new ProcessingDataProxyApplications());
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerGenericSchedule());
    this.store.dispatch(new HideViewerGenericScheduleProxy());
    this.store.dispatch(new HideViewerGenericScheduleTransaction());
    this.store.dispatch(new HideViewerGenericScheduleClosed());
    this.store.dispatch(new HideViewerGenericScheduleClosure());
    this.genericScheduleList = [];

  }
}
