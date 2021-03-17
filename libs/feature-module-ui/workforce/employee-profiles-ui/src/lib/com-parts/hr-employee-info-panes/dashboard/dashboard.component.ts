
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { LoadEmployeesDataChart, LoadActiveEmployeesData, LoadInactiveEmployeesData,
         LoadEmployeesDataItem, getSelectedEmployeeDataSummary, ShowViewerEmployeesDataSummary,
         LoadEmployeesProfilePicture, HideViewerEmployeesDataSummary, showViewerEmployeeDataSummary,
         getSelectedEmployeeProfilePicture, getEmployeesChartData, getActiveEmployeesData,
         getInactiveEmployeesData } from '../../../store/employees-data-home';

import { Observable } from 'rxjs';

import * as constants from '../../../constants';
import { Router } from '@angular/router';
import { IgxGridComponent, IgxStringFilteringOperand, FilteringLogic } from 'igniteui-angular';
import { IDashboardChart, IEmployeeSummary } from '@nutela/models/workforce/employee-profiles';
import { SummaryViewerComponent } from './summary-viewer/summary-viewer.component';

const DEFAULT_EMPLOYEEGROUP = 'Workforce';
const DEFAULT_SEARCH_OPTION = 'employee_firstname'

export enum searchOptions {
  ALL_COLUMNS = 'All Columns',
  EMPLOYEE_NUMBER = 'Employee Number',
  SURNAME = 'Surname',
  FIRST_NAME = 'First Name',
  OTHER_NAME = 'Other Name'
};

@Component({
  selector: 'x365-fm-workforce-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public show: boolean = false;
  public loading: boolean = true;
  public searchOptions = searchOptions;
  public searchOptionLabel: string = searchOptions.ALL_COLUMNS;
  searchOption: string = DEFAULT_SEARCH_OPTION;

  public employeesGroupChart = constants.DASHBOARD_CHART_TYPES;
  public employeesGroupData = constants.EMPLOYEES_DATA_SUMMARY;
  public employeeGroup: string = DEFAULT_EMPLOYEEGROUP;

  public chart: any = {
    type: 'pie',
    options: {
      responsive: true
    }
  }

  public dashboardData: IDashboardChart;

  activeEmployeesData$: Observable<IEmployeeSummary[]>;
  inactiveEmployeesData$: Observable<IEmployeeSummary[]>
  imageData$: Observable<any>;
  summaryData$: Observable<any>;
  showViewer$: Observable<boolean>;


  @ViewChild('viewer') dataSummaryViewer: SummaryViewerComponent;
  @ViewChild('activeEmployees', { read: IgxGridComponent }) activeEmployees: IgxGridComponent;
  @ViewChild('inactiveEmployees', { read: IgxGridComponent }) inactiveEmployees: IgxGridComponent;


  constructor(private store: Store<IEmployeesProfileState>, private router: Router) {
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    this.getDashboardData();
  }

  selectSearchOption(label: string) {
    this.searchOptionLabel = label;

    switch (this.searchOptionLabel) {
      case this.searchOptions.FIRST_NAME:
        this.searchOption = 'employee_firstname'
        break;
      case this.searchOptions.OTHER_NAME:
        this.searchOption = 'employee_midname'
        break;
      case this.searchOptions.SURNAME:
        this.searchOption = 'employee_surname'
        break;
      case this.searchOptions.EMPLOYEE_NUMBER:
        this.searchOption = 'employee_number'
        break;
      default:
        this.searchOption = 'employee_firstname'
        break;
    }
  }

  filter(term: string, searchOption = this.searchOption) {

    if (this.searchOptionLabel === this.searchOptions.ALL_COLUMNS) {

      if (this.activeEmployees) {
        this.activeEmployees.filteringLogic = FilteringLogic.Or;
        this.activeEmployees
          .filterGlobal(term, IgxStringFilteringOperand
            .instance()
            .condition("contains"), false);
      }

      if (this.inactiveEmployees) {
        this.inactiveEmployees.filteringLogic = FilteringLogic.Or;
        this.inactiveEmployees
          .filterGlobal(term, IgxStringFilteringOperand.instance()
            .condition("contains"), false);
      }

    } else {
      if (this.activeEmployees) {
        this.activeEmployees
          .filter(searchOption, term, IgxStringFilteringOperand
            .instance()
            .condition('contains'));
      }

      if (this.inactiveEmployees) {
        this.inactiveEmployees
          .filter(searchOption, term, IgxStringFilteringOperand
            .instance()
            .condition('contains'));
      }
    }
  }

  storeDispatches() {
    this.store.dispatch(new LoadEmployeesDataChart({ sourceId: constants.DASHBOARD_CHART_TYPES.workforce }));
    this.store.dispatch(new LoadActiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.workforce }));
    this.store.dispatch(new LoadInactiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.workforce }));
  }

  getDashboardData() {
    this.store
      .pipe(select(getEmployeesChartData))
      .subscribe(
        (data: any) => {
          this.dashboardData = data;
          console.log('this data', data);
          this.loading = false;
        }
      );
  }

  storeSelects() {
    this.activeEmployeesData$ = this.store.pipe(select(getActiveEmployeesData));
    this.inactiveEmployeesData$ = this.store.pipe(select(getInactiveEmployeesData));
    this.showViewer$ = this.store.pipe(select(showViewerEmployeeDataSummary));
    this.summaryData$ = this.store.pipe(select(getSelectedEmployeeDataSummary));
    this.imageData$ = this.store.pipe(select(getSelectedEmployeeProfilePicture));
  }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }

  selectEmployeeGroup(type: number) {
    this.loading = true;

    switch (type) {
      case 1:
        this.store.dispatch(new LoadEmployeesDataChart({ sourceId: constants.DASHBOARD_CHART_TYPES.contingent }));
        this.store.dispatch(new LoadActiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.contingent }));
        this.store.dispatch(new LoadInactiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.contingent }));
        this.employeeGroup = 'Contingent';
        break;
      case 2:
        this.store.dispatch(new LoadEmployeesDataChart({ sourceId: constants.DASHBOARD_CHART_TYPES.fulltime }));
        this.store.dispatch(new LoadActiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.fulltime }));
        this.store.dispatch(new LoadInactiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.fulltime }));
        this.employeeGroup = 'Full-Time'
        break;
      default:
        this.store.dispatch(new LoadEmployeesDataChart({ sourceId: constants.DASHBOARD_CHART_TYPES.workforce }));
        this.store.dispatch(new LoadActiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.workforce }));
        this.store.dispatch(new LoadInactiveEmployeesData({ sourceId: constants.EMPLOYEES_DATA_SUMMARY.workforce }));
        this.employeeGroup = 'Workforce';
        break;
    }
  }

  onSummaryInfoClicked(rowId: number) {
     this.dataSummaryViewer.data = null;

    this.store.dispatch(new LoadEmployeesDataItem({employeeId: rowId}));
    this.store.dispatch(new LoadEmployeesProfilePicture({ employeeId: rowId }));
    this.summaryData$ = this.store.pipe(select(getSelectedEmployeeDataSummary));
    this.store.dispatch(new ShowViewerEmployeesDataSummary());
  }

  onDetailedAreaClicked(rowId: number) {
    this.router.navigate([`/dsktp/self-service/workforce/employees/${rowId}`], { skipLocationChange: false });
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerEmployeesDataSummary());
  }
}
