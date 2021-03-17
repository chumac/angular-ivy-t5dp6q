import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { DialogService } from '@nutela/shared/ui';
import { LoadingEmployeeData, ReboardAllEmployees, CancelReboardAllEmployees, CancelReboardEmployee, LoadActiveReboardEmployeesData, isLoadingEmployeeData, getActiveReboardEmployeesData } from '../../store/employees-data-home';
import { take } from 'rxjs/operators';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../store';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IEmployeeSummary } from '@nutela/models/workforce/employee-profiles';
import { ReboardEmployeeProfileService } from './reboard-employee-profile.service';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-reboard-employee-profile',
  templateUrl: './reboard-employee-profile.component.html',
  styleUrls: ['./reboard-employee-profile.component.scss'],
  providers: [ReboardEmployeeProfileService]
})
export class ReboardEmployeeProfileComponent implements OnInit {

  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  activeEmployeesData$: Observable<IEmployeeSummary[]>;
  isLoading$: Observable<boolean>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string, private titleService: Title, public service: ReboardEmployeeProfileService, private dialogService: DialogService, private store: Store<IEmployeesProfileState>, private router: Router, private location: Location) {
    titleService.setTitle(`${'Employee Reboarding'}${this.partialDocumentTitle}`);
   }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.activeEmployeesData$ = this.store.pipe(select(getActiveReboardEmployeesData));
    this.isLoading$ = this.store.pipe(select(isLoadingEmployeeData))
  }
  storeDispatches() {
    this.store.dispatch(new LoadActiveReboardEmployeesData());
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.dataGrid) {
      this.service.search(this.dataGrid, searchString, filterBy);
    }
  }

  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: `Employee Profile data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onReboardButtonClicked() {
    this.dialogService.show(this.dialogService.options(), 'This action will initiate reboard for all employees. Continue?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingEmployeeData());
        this.store.dispatch(new ReboardAllEmployees());
      }
    });
  }

  onCancelReboardButtonClicked() {
    this.dialogService.show(this.dialogService.options(), 'This action will cancel reboard for all employees. Continue?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingEmployeeData());
        this.store.dispatch(new CancelReboardAllEmployees());
      }
    });
  }


  onCancelReboardIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'This action will cancel reboard for this employee. Continue?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingEmployeeData());
        this.store.dispatch(new CancelReboardEmployee({ employeeId: rowId }));
      }
    });
  }

  backButtonClicked() {
    this.location.back();
  }

  onDetailedAreaClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.hrReboardEmployeeDetails}/${rowId}`], { skipLocationChange: false });
  }
}
