import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { ReportsService } from './reports.service';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import {
  LoadDataReport,
  getReportData,
  ProcessingReport,
  GotoReportUrl,
  isProcessingReport
} from '../../store';
import { IReport } from '@nutela/models/platform/report';
import { Router } from '@angular/router';
import { STANDARD_ROUTES } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  reportData$: Observable<IReport[]>;
  isProcessing$: Observable<boolean>;
  dropDownFilterValue: string;
  @ViewChild('reportsGrid') reportsGrid: IgxGridComponent;

  constructor(
    public service: ReportsService,
    private store: Store<IAppState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReport());
    this.store.dispatch(new ProcessingReport());
  }

  storeSelects() {
    this.reportData$ = this.store.pipe(select(getReportData));
    this.isProcessing$ = this.store.pipe(select(isProcessingReport));
  }

  filter(term: string, filterValue: string) {
    if (this.reportsGrid) {
      if (filterValue) {
        this.reportsGrid.clearFilter();
        this.reportsGrid.filteringLogic = FilteringLogic.Or;
        this.reportsGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.reportsGrid.clearFilter();
        this.reportsGrid.filteringLogic = FilteringLogic.Or;
        this.reportsGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  navigateToAddress(row: number) {
    if (row) {
      this.store.dispatch(new ProcessingReport());
      this.store.dispatch(new GotoReportUrl(row));
    }
  }

  onDashboardIconClicked(rowId: number) {
    if (rowId) {
      // console.log(rowId);
      this.router.navigate([STANDARD_ROUTES.reports, rowId ])
    }
  }

}
