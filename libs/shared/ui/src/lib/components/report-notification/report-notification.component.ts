import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getReportData, LoadDataReport, GotoReportUrl } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { IReport } from '@nutela/models/platform/report';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-shared-ui-report-notification',
  templateUrl: './report-notification.component.html',
  styleUrls: ['./report-notification.component.scss']
})
export class ReportNotificationComponent implements OnInit {
  reportData$: Observable<IReport[]>;
  term: string;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.reportData$ = this.store.pipe(select(getReportData));
  }

  loadReport() {
    this.store.dispatch(new LoadDataReport());
  }

  goToReport(key: number) {
    this.store.dispatch(new GotoReportUrl(key));
    this.store.dispatch(new ShowToast({
      title: null,
      message: 'Loading report ...',
      type: ToastTypes.INFO
    }));
  }


}
