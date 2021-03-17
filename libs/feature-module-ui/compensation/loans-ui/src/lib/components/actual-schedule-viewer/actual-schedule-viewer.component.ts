
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ILoanRepayment } from '@nutela/models/compensation/loans';
import { HideViewerActualSchedule, isProcessingApplication, ProcessingApplication } from '../../store/applications';
import { Observable } from 'rxjs';
import { HideViewerPaymentsHistory } from '../../store/repayments';
import { HideViewerActualScheduleProxy } from '../../store/proxy-applications';
import { ILoanState } from '../../store';

@Component({
  selector: 'x365-fm-loans-actual-schedule-viewer',
  templateUrl: './actual-schedule-viewer.component.html',
  styleUrls: ['./actual-schedule-viewer.component.scss']
})
export class ActualScheduleViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILoanRepayment;
  @Input() public actualScheduleList: any[];
  isProcessing$: Observable<boolean>

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingApplication));
    this.store.dispatch(new ProcessingApplication());
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerActualSchedule());
    this.store.dispatch(new HideViewerActualScheduleProxy());
    this.store.dispatch(new HideViewerPaymentsHistory());
    this.actualScheduleList = [];
  }
}
