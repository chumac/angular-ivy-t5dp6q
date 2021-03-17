
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ILoanSchedule } from '@nutela/models/compensation/loans';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../store/root';
import { isProcessingLastRun, ProcessingLastRunItem, HideViewerLastRunStatus, getLastRunStatusData, LoadLastRunStatusData } from '../../../../store/execution/last-run-item';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';


@Component({
  selector: 'x365-fm-payrl-last-run-item-status-viewer',
  templateUrl: './last-run-item-status-viewer.component.html',
  styleUrls: ['./last-run-item-status-viewer.component.scss']
})
export class LastRunItemStatusViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public runId: number;

  @Input() public data: any;
  @Input() public statusData: any[];
  @Input() public dataDoc: any;
  statusData$: Observable<any[]>;

  isProcessing$: Observable<boolean>;

  constructor(public utilService: UtilService, private store: Store<IRootState>) {}

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLastRun))
    this.statusData$ = this.store.pipe(select(getLastRunStatusData))
    this.store.dispatch(new ProcessingLastRunItem());
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerLastRunStatus());
    this.statusData = [];
  }

  onRefresh() {
    this.store.dispatch(new LoadLastRunStatusData({ payrollRunID: this.runId }))
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }
}
