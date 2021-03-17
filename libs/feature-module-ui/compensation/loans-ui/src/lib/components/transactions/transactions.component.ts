import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IApprovedLoan, ILoanRepayment, ILoanDefinition } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import { TransactionApplyEditorComponent } from './transaction-apply-editor/transaction-apply-editor.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowEditorTransactionApply, HideEditorTransactionApply, LoadAwaitingApprovalDataTransactions, LoadApprovedDataTransactions, ProcessingDataTransactions, getAwaitingApprovalDataTransactions, getApprovedDataTransactions, isProcessingTransactions, showTransactionEditor, LoadDataTransactions, getDataTransactions, ShowViewerRepaymentScheduleTransaction, LoadRepaymentsScheduleDataTransaction, showViewerRepaymentSchedule, getRepaymentScheduleTransaction, isLoadingTransactions, LoadingDataTransactions, LoadLoanTypesDataTransactions, showTransactionViewer, NotProcessingTransactions, ShowViewerTransactionApply, HideViewerTransactionApply, getLoanTypesDataTransactions, LoadCurrenciesDataTransactions, LoadGenericScheduleData, showViewerGenericSchedule, ShowViewerGenericScheduleTransaction, LoadActualScheduleData, ShowViewerActualScheduleTransaction, getActualSchedule, showViewerActualSchedule, DeleteApprovedLoanTransaction, DeleteAwaitingApprovalLoanTransaction, LoadDocumentTransaction, getTransactionDocument } from '../../store/transactions';
import { TransactionsService } from './transactions.service';
import { TransactionApplyViewerComponent } from './transaction-apply-viewer';
import { UtilService, formatDate } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { RUNNING_STATUS } from '../../constants';
import { ILoanState } from '../../store';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  runningStatus = RUNNING_STATUS;
  dropDownFilterValue: string;
  employee_id: number;
  loanTypesSelect: ISelectOption[];

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  showRepaymentScheduleViewer$: Observable<boolean>;
  showGenericScheduleViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  applicationsData$: Observable<IApprovedLoan[]>
  approvedApplicationsData$: Observable<any[]>;
  awaitingApprovalTransactionsData$: Observable<any[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  repaymentScheduleData$: Observable<ILoanRepayment[]>;
  loanDefinitions$: Observable<ILoanDefinition[]>;

  genericScheduleData$: Observable<any[]>;
  repaymentsScheduleData$: Observable<any[]>;
  showViewerGenericSchedule$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  actualScheduleData$: Observable<any[]>;
  showViewerActualSchedule$: Observable<boolean>;
  documentData$: Observable<any>;

  private subscriptions: ISubscriptions = {};

  @ViewChild('transactionApplyEditor') transactionApplyEditor: TransactionApplyEditorComponent;
  @ViewChild("awaitingApprovalDataGrid") awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild("transactionsDataGrid") transactionsDataGrid: IgxGridComponent;
  @ViewChild('viewer') viewer: TransactionApplyViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: TransactionsService, private store: Store<ILoanState>, private dialogBoxService: DialogBoxService,
  public utilService: UtilService) {
    titleService.setTitle(
      `${'Loan Transactions'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingTransactions));
    this.isProcessing$ = this.store.pipe(select(isProcessingTransactions));
    this.showEditor$ = this.store.pipe(select(showTransactionEditor));
    this.showViewer$ = this.store.pipe(select(showTransactionViewer));
    this.showRepaymentScheduleViewer$ = this.store.pipe(select(showViewerRepaymentSchedule))
    this.showGenericScheduleViewer$ = this.store.pipe(select(showViewerGenericSchedule))
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.applicationsData$ = this.store.pipe(select(getDataTransactions));
    this.loanDefinitions$ = this.store.pipe(select(getLoanTypesDataTransactions));
    this.approvedApplicationsData$ = this.store.pipe(select(getApprovedDataTransactions))
    this.awaitingApprovalTransactionsData$ = this.store.pipe(select(getAwaitingApprovalDataTransactions));
    this.repaymentScheduleData$ = this.store.pipe(select(getRepaymentScheduleTransaction));
    this.actualScheduleData$ = this.store.pipe(select(getActualSchedule));
    this.showViewerActualSchedule$ = this.store.pipe(select(showViewerActualSchedule));
    this.documentData$ = this.store.pipe(select(getTransactionDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDataTransactions());
    this.store.dispatch(new LoadDataTransactions())
    this.store.dispatch(new LoadApprovedDataTransactions());
    this.store.dispatch(new LoadAwaitingApprovalDataTransactions());
    this.store.dispatch(new LoadLoanTypesDataTransactions());
    this.store.dispatch(new LoadCurrenciesDataTransactions());
  }

  getRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.applicationsData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IApprovedLoan> {
    return this.awaitingApprovalTransactionsData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.store.dispatch(new ShowEditorTransactionApply())
  }

  onRefresh() {
    this.store.dispatch(new LoadDataTransactions())
    this.store.dispatch(new LoadApprovedDataTransactions());
    this.store.dispatch(new LoadAwaitingApprovalDataTransactions());
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

    if (this.transactionsDataGrid) {
      this.service.search(
        this.transactionsDataGrid,
        searchString,
        filterBy
      );
    } else if (this.awaitingApprovalDataGrid) {
      this.service.search(
        this.awaitingApprovalDataGrid,
        searchString,
        filterBy
      )
    }
  }

  onAwaitingEditIconClicked(rowId: number) {
    this.transactionApplyEditor.data = null;
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.transactionApplyEditor.data = result;
          this.transactionApplyEditor.reset();
          this.store.dispatch(new ShowEditorTransactionApply());
        }
      );
  }

  onApprovedEditIconClicked(rowId: number) {
    this.transactionApplyEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.transactionApplyEditor.data = result;
          this.transactionApplyEditor.reset();
          this.store.dispatch(new ShowEditorTransactionApply());
        }
      );
  }

  onRepaymentIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadRepaymentsScheduleDataTransaction({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}))
    })
    this.store.dispatch(new ShowViewerRepaymentScheduleTransaction())
  }


  onViewAwaitingIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log('awaitin', result)
          this.viewer.data = result;
          if (result.doc_url !== null && result.doc_url !== '') {
            this.store.dispatch(new LoadDocumentTransaction({loanDetailId: rowId, employeeId: result.EmployeeInfo.employee_id, isApproved: false}));
          }
          this.store.dispatch(new ShowViewerTransactionApply());
          this.store.dispatch(new NotProcessingTransactions());
        }
      );
   }

  onViewApprovedIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log('approved', result)
          this.viewer.data = result;
          if (result.doc_url !== null && result.doc_url !== '') {
            this.store.dispatch(new LoadDocumentTransaction({loanDetailId: rowId, employeeId: result.EmployeeInfo.employee_id, isApproved: true}));
          }
          this.store.dispatch(new ShowViewerTransactionApply());
          this.store.dispatch(new NotProcessingTransactions());
        }
      );
   }

   onAwaitingViewGenericScheduleClicked(rowId: number) {
    this.getAwaitingApprovalData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadGenericScheduleData({
        loanId: loan.loanDefInfo.loan_id,
        loanAmount: loan.initial_loan_amount,
        interestRate: loan.interest_rate,
        tenor: loan.tenor_months,
        effectiveDate: formatDate(loan.effective_date)
      }))
    })
    this.store.dispatch(new ShowViewerGenericScheduleTransaction());
  }


  onViewActualScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadActualScheduleData({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}))
    })
    this.store.dispatch(new ShowViewerActualScheduleTransaction());
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
      this.store.dispatch(new ShowViewerGenericScheduleTransaction());
     })

   }


  isApprovedLoanRunning(rowId: number):boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.status !== null && result.status == 0) {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  isAwaitingLoanRunning(rowId: number):boolean {
    let status = false;

    this.subscriptions['status'] = this.getAwaitingApprovalData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.status !== null && result.status == 0) {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getRowData$(rowId)
        .subscribe(loan => {
          this.store.dispatch(new DeleteApprovedLoanTransaction({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
        })
      }
    });
  }

  onAwaitingDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getAwaitingApprovalData$(rowId)
        .subscribe(loan => {
          this.store.dispatch(new DeleteAwaitingApprovalLoanTransaction({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
        })
      }
    });
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTransactionApply());
    this.viewer.dataDoc = null;
  }

  onCancelApplicationEditor() {
    this.store.dispatch(new HideEditorTransactionApply());
  }

  unsubscribe() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  ngOnDestroy() {
    this.unsubscribe();

  }

}
