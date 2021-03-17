import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IApprovedLoan } from '@nutela/models/compensation/loans';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ClosedService } from './closed.service';
import { LoadClosedData, LoadingClosedData, showViewerClosed, getClosedData, ShowViewerClosed, HideViewerClosed, isLoadingClosed, LoadGenericScheduleData, ShowViewerGenericScheduleClosed, LoadRepaymentsScheduleData, ShowViewerRepaymentScheduleClosed, getGenericSchedule, getRepaymentSchedule, showViewerRepaymentSchedule, showViewerGenericSchedule } from '../../store/closed';
import { ClosedViewerComponent } from './closed-viewer/closed-viewer.component';
import { formatDate } from '@nutela/core-services';
import { ILoanState } from '../../store';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss']
})
export class ClosedComponent implements OnInit {

  dropDownFilterValue: string;
  employee_id: number;

  showViewer$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  showViewerGenericSchedule$: Observable<boolean>
  isLoading$: Observable<boolean>;
  closedData$: Observable<IApprovedLoan[]>;
  repaymentsScheduleData$: Observable<any[]>;
  genericScheduleData$: Observable<any[]>;

  @ViewChild("closedDataGrid") closedDataGrid: IgxGridComponent;
  @ViewChild("closedViewer") closedViewer: ClosedViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: ClosedService, private store: Store<ILoanState>) {
    titleService.setTitle(
      `${'Loan Closed'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingClosed));
    this.showViewer$ = this.store.pipe(select(showViewerClosed));
    this.showViewerRepaymentSchedule$ = this.store.pipe(select(showViewerRepaymentSchedule))
    this.showViewerGenericSchedule$ = this.store.pipe(select(showViewerGenericSchedule));
    this.closedData$ = this.store.pipe(select(getClosedData));
    this.genericScheduleData$ = this.store.pipe(select(getGenericSchedule));
    this.repaymentsScheduleData$ = this.store.pipe(select(getRepaymentSchedule));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingClosedData());
    this.store.dispatch(new LoadClosedData());
  }


  getRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.closedData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {

  }

  onRefresh() {
    this.store.dispatch(new LoadClosedData());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
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

    if (this.closedDataGrid) {
      this.service.search(
        this.closedDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onViewIconClicked(rowId: number) {
    this.closedViewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.closedViewer.data = result;
          this.store.dispatch(new ShowViewerClosed());
        }
      );
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerClosed());
  }

  onViewRepaymentsScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadRepaymentsScheduleData({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id }));
    })
    this.store.dispatch(new ShowViewerRepaymentScheduleClosed());
   }

  onViewGenericScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
     this.store.dispatch(new LoadGenericScheduleData({
       loanId: loan.loanDefInfo.loan_id,
       loanAmount: loan.initial_loan_amount,
       interestRate: loan.interest_rate,
       tenor: loan.tenor_months,
       effectiveDate: formatDate(loan.effective_date)
     }))
     this.store.dispatch(new ShowViewerGenericScheduleClosed());
    })

  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();

  }

}
