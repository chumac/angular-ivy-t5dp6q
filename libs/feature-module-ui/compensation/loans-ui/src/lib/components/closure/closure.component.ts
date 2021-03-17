import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { take, map } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IgxGridComponent } from 'igniteui-angular';
import { ClosureService } from './closure.service';
import { CloseEditorComponent } from './close-editor/close-editor.component';
import { Title } from '@angular/platform-browser';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { ITransaction } from '@nutela/models/compensation/loans';
import { isProcessingClosure, showEditorClosure, getApplicationsDataClosures, LoadApplicationsDataClosure, ShowEditorClosure, HideEditorClosure, isLoadingClosure, LoadingClosures, LoadAwaitingApprovalDataClosure, NotProcessingClosures, ShowViewerClosure, HideViewerClosure, showViewerClosure, getAwatingApprovalDataClosures, ShowViewerRepaymentScheduleClosure, LoadRepaymentsScheduleData, ShowViewerGenericScheduleClosure, LoadGenericScheduleData, getGenericSchedule, getRepaymentSchedule, showViewerRepaymentSchedule, showViewerGenericSchedule } from '../../store/closure';
import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';
import { CloseViewerComponent } from './close-viewer';
import { formatDate } from '@nutela/core-services';
import { ILoanState } from '../../store';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-transactions-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.scss'],
  providers: [ClosureService],
})
export class ClosureComponent implements OnInit {

  dropDownFilterValue: string;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  showViewerGenericSchedule$: Observable<boolean>;
  transactionsData$: Observable<ITransaction[]>;
  loanDefinitions$: Observable<ISelectOption[]>
  comprehensiveData$: Observable<IComprehensiveData>
  loanApplications$: Observable<IApprovedLoan[]>
  awaitingApprovalData$: Observable<IApprovedLoan[]>
  showRepaymentsScheduleViewer$: Observable<boolean>;
  repaymentsScheduleData$: Observable<any[]>
  activePersonnel$: Observable<ISelectOption[]>;
  genericScheduleData$: Observable<any[]>;


  @ViewChild('closeEditor') closeEditor: CloseEditorComponent;

  @ViewChild("closureDataGrid") closureDataGrid: IgxGridComponent;
  @ViewChild("awaitingApprovalDataGrid") awatingApprovalDataGrid: IgxGridComponent;
  @ViewChild('viewer') viewer: CloseViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: ClosureService, private store: Store<ILoanState>) {
    titleService.setTitle(
      `${'Loan Closure'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingClosure));
    this.isLoading$ = this.store.pipe(select(isLoadingClosure))
    this.showEditor$ = this.store.pipe(select(showEditorClosure));
    this.showViewer$ = this.store.pipe(select(showViewerClosure));
    this.showViewerRepaymentSchedule$ = this.store.pipe(select(showViewerRepaymentSchedule))
    this.showViewerGenericSchedule$ = this.store.pipe(select(showViewerGenericSchedule));
    this.loanApplications$ = this.store.pipe(select(getApplicationsDataClosures))
    this.awaitingApprovalData$ = this.store.pipe(select(getAwatingApprovalDataClosures))
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.genericScheduleData$ = this.store.pipe(select(getGenericSchedule));
    this.repaymentsScheduleData$ = this.store.pipe(select(getRepaymentSchedule));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingClosures());
    this.store.dispatch(new LoadApplicationsDataClosure());
    this.store.dispatch(new LoadAwaitingApprovalDataClosure());
  }


  getRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.loanApplications$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IApprovedLoan> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.store.dispatch(new ShowEditorClosure())
  }

  onRefresh() {
    this.store.dispatch(new LoadApplicationsDataClosure());
    this.store.dispatch(new LoadAwaitingApprovalDataClosure());
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

    if (this.closureDataGrid) {
      this.service.search(
        this.closureDataGrid,
        searchString,
        filterBy
      );
    } else if(this.awatingApprovalDataGrid) {
      this.service.search(
        this.awatingApprovalDataGrid,
        searchString,
        filterBy
      )
    }
  }

  onCloseIconClicked(rowId: number) {
    this.closeEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.closeEditor.data = result;
          this.closeEditor.reset();
          this.store.dispatch(new ShowEditorClosure());
        }
      );
  }

  onViewAwaitingApprovalIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerClosure());
          this.store.dispatch(new NotProcessingClosures());
        }
      );
   }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerClosure());
          this.store.dispatch(new NotProcessingClosures());
        }
      );
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
     this.store.dispatch(new ShowViewerGenericScheduleClosure());
    })

  }

  onViewAwaitingGenericScheduleClicked(rowId: number) {
    this.getAwaitingApprovalData$(rowId).pipe(take(1)).subscribe(loan => {
     this.store.dispatch(new LoadGenericScheduleData({
       loanId: loan.loanDefInfo.loan_id,
       loanAmount: loan.loan_amount,
       interestRate: loan.interest_rate,
       tenor: loan.tenor_months,
       effectiveDate: formatDate(loan.effective_date)
     }))
     this.store.dispatch(new ShowViewerGenericScheduleClosure());
    })

  }

  onViewRepaymentsScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
     this.store.dispatch(new LoadRepaymentsScheduleData({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
    })
   this.store.dispatch(new ShowViewerRepaymentScheduleClosure());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorClosure());
  }
  onCancelViewer() {
    this.store.dispatch(new HideViewerClosure())
  }

  unsubscribe() {

  }

  ngOnDestroy() {
    this.unsubscribe();

  }
}
