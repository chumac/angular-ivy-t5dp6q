import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoanRepayment, IApprovedLoan } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import { RepaymentEditorComponent } from './repayment-editor/repayment-editor.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorRepayment, getDataRepayments, getRunningRepayment, LoadDataRepayments, LoadRunningLoansRepayments, ShowEditorRepayment, HideEditorRepayment, showViewerPaymentsHistory, ShowViewerPaymentsHistory, HideViewerPaymentsHistory, LoadPaymentsHistory, getDataPaymentsHistory, isLoadingRepayments, LoadingRepayments, showRepaymentViewer, showViewerRepaymentSchedule, ShowViewerRepayment, NotProcessingRepayments, LoadRepaymentsScheduleData, ShowViewerRepaymentScheduleRepayment, HideViewerRepayment, getRepaymentSchedule } from '../../store/repayments';
import { RepaymentsService } from './repayments.service';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { RepaymentViewerComponent } from './repayment-viewer';
import { ILoanState } from '../../store';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-repayments',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss'],
  providers: [RepaymentsService],
})
export class RepaymentsComponent implements OnInit {

  dropDownFilterValue: string;

  showRepaymentEditor$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showPayments$: Observable<boolean>;
  paymentsHistory$: Observable<ILoanRepayment[]>;
  repaymentsData$: Observable<ILoanRepayment[]>;
  repaymentsScheduleData$: Observable<any[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  runningLoansData$: Observable<IApprovedLoan[]>


  @ViewChild('repaymentEditor') repaymentEditor: RepaymentEditorComponent;
  @ViewChild('viewer') viewer: RepaymentViewerComponent;
  @ViewChild('loansDataGrid', { read: IgxGridComponent }) loansDataGrid: IgxGridComponent;
  @ViewChild("repaymentsDataGrid") repaymentsDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: RepaymentsService, private store: Store<ILoanState>, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Loan Repayments'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingRepayments));
    this.showRepaymentEditor$ = this.store.pipe(select(showEditorRepayment));
    this.repaymentsData$ = this.store.pipe(select(getDataRepayments));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.runningLoansData$ = this.store.pipe(select(getRunningRepayment));
    this.showPayments$ = this.store.pipe(select(showViewerPaymentsHistory));
    this.paymentsHistory$ = this.store.pipe(select(getDataPaymentsHistory));
    this.showViewerRepaymentSchedule$ = this.store.pipe(select(showViewerRepaymentSchedule));
    this.showViewer$ = this.store.pipe(select(showRepaymentViewer));
    this.repaymentsScheduleData$ = this.store.pipe(select(getRepaymentSchedule));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingRepayments());
    this.store.dispatch(new LoadDataRepayments());
    this.store.dispatch(new LoadRunningLoansRepayments());
  }


  getRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.runningLoansData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.store.dispatch(new ShowEditorRepayment())
  }

  onRefresh() {
    this.store.dispatch(new LoadDataRepayments());
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

    if (this.loansDataGrid) {
      this.service.search(
        this.loansDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onMakeRepaymentIconClicked(rowId: number) {
    this.repaymentEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.repaymentEditor.data = result;
          this.repaymentEditor.reset();
          this.store.dispatch(new ShowEditorRepayment());
        }
      );
  }

  onViewRepaymentIconClicked(val) {

  }
  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerRepayment());
          this.store.dispatch(new NotProcessingRepayments());
        }
      );
  }

  onViewActualScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadPaymentsHistory({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}))
    })
    this.store.dispatch(new ShowViewerPaymentsHistory());
  }


  onViewRepaymentScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadRepaymentsScheduleData({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
    })
    this.store.dispatch(new ShowViewerRepaymentScheduleRepayment());
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        // this.store.dispatch(new DeleteDataLoanDefinition({recordId: rowId}));
      }
    });
  }
  onCancelEditor() {
    this.store.dispatch(new HideEditorRepayment());

  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPaymentsHistory());
    this.store.dispatch(new HideViewerRepayment());
  }

}
