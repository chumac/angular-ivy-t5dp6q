import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeSummary } from '@nutela/models/workforce/employee-profiles';
import { IgxGridComponent, IgxStringFilteringOperand, FilteringLogic } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../store/root';
import { Router } from '@angular/router';
import { LoadActiveEmployeesData, LoadInactiveEmployeesData, getActiveEmployeesData, getInactiveEmployeesData, showViewerEmployeeDataSummary, getSelectedEmployeeDataSummary, getSelectedEmployeeProfilePicture, isLoadingEmployeeData, LoadingEmployeeData, ReboardAllEmployees, ReboardEmployee, CancelReboardEmployee, CancelReboardAllEmployees } from '../../store/employees-data-home';
import { EMPLOYEES_DATA_SUMMARYS } from '../../constants';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { EmployeeProfileService } from './employee-profile.service';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { DialogService } from '@nutela/shared/ui';



@Component({
  selector: 'x365-fm-workforce-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  public show: boolean = false;
  public loading: boolean = true;
  dropDownFilterValue: string;
  employeeSummary = EMPLOYEES_DATA_SUMMARYS;
  selectedValue='workforce';

  activeEmployeesData$: Observable<IEmployeeSummary[]>;
  inactiveEmployeesData$: Observable<IEmployeeSummary[]>;
  isLoading$: Observable<boolean>;
  imageData$: Observable<any>;
  summaryData$: Observable<any>;
  showViewer$: Observable<boolean>;


  @ViewChild('activeEmployees', { read: IgxGridComponent }) activeEmployees: IgxGridComponent;
  @ViewChild('inactiveEmployees', { read: IgxGridComponent }) inactiveEmployees: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  // @ViewChild('filterByEmployeeData') filterByEmployeeData: SelectComponent;


  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<IEmployeesProfileState>,
              public service: EmployeeProfileService,
              private dialogService: DialogService,
              private router: Router) {
                titleService.setTitle(
                  `${'HR Employee Profile'}${this.partialDocumentTitle}`
                );
    }


    ngOnInit() {
      this.storeDispatches();
      this.storeSelects();
      // this.getDashboardData();
    }

    storeDispatches() {
      // this.store.dispatch(new LoadEmployeesDataChart({ sourceId: constants.DASHBOARD_CHART_TYPES.workforce }));
      this.store.dispatch(new LoadActiveEmployeesData({ sourceId: this.selectedValue}));
      this.store.dispatch(new LoadInactiveEmployeesData({ sourceId: this.selectedValue }));
    }


    storeSelects() {
      this.activeEmployeesData$ = this.store.pipe(select(getActiveEmployeesData));
      this.inactiveEmployeesData$ = this.store.pipe(select(getInactiveEmployeesData));
      this.showViewer$ = this.store.pipe(select(showViewerEmployeeDataSummary));
      this.summaryData$ = this.store.pipe(select(getSelectedEmployeeDataSummary));
      this.imageData$ = this.store.pipe(select(getSelectedEmployeeProfilePicture));
      this.isLoading$ = this.store.pipe(select(isLoadingEmployeeData))
    }

    onRefresh(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Employee Profile data is being refreshed.`, type: ToastTypes.INFO}));
    }

  onReboardIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'This action will initiate reboard for this employee. Continue?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingEmployeeData());
        this.store.dispatch(new ReboardEmployee({employeeId: rowId}));
      }
    });
  }

  onCancelReboardIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'This action will cancel reboard for this employee. Continue?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingEmployeeData());
        this.store.dispatch(new CancelReboardEmployee({employeeId: rowId}));
      }
    });
  }

  filter(term: string, filterValue: string) {
    // let termLength = term.length;
    if (this.activeEmployees) {
      if (filterValue) {
        this.activeEmployees.clearFilter();
        this.activeEmployees.filteringLogic = FilteringLogic.Or;
        this.activeEmployees.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.activeEmployees.clearFilter();
        this.activeEmployees.filteringLogic = FilteringLogic.Or;
        this.activeEmployees.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
    else if(this.inactiveEmployees){
      if (filterValue) {
        this.inactiveEmployees.clearFilter();
        this.inactiveEmployees.filteringLogic = FilteringLogic.Or;
        this.inactiveEmployees.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.inactiveEmployees.clearFilter();
        this.inactiveEmployees.filteringLogic = FilteringLogic.Or;
        this.inactiveEmployees.filterGlobal(
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

  onEmployeeData($event){
    this.store.dispatch(new LoadActiveEmployeesData({ sourceId: $event}));
    this.store.dispatch(new LoadInactiveEmployeesData({ sourceId: $event}));
  }

  onDetailedAreaClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.hrEmployeeDetails}/${rowId}`], { skipLocationChange: false });
  }

  onReboardButtonClicked() {
    this.router.navigate([`${STANDARD_ROUTES.hrReboardActiveEmployees}`], { skipLocationChange: false });
  }
}
