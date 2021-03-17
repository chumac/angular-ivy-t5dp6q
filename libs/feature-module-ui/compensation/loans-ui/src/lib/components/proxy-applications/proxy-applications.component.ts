import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoanSchedule, IApprovedLoan, ILoanDefinition } from '@nutela/models/compensation/loans';
import { ISubscriptions } from '@nutela/models/common';
import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent } from 'igniteui-angular';
import { ProxyApplyEditorComponent } from './proxy-apply-editor/proxy-apply-editor.component';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes, SwitchComponent } from '@nutela/shared/ui';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowEditorProxyApply, showProxyApplyEditor, getDataProxyApplications, HideEditorProxyApply, LoadApprovedDataProxyApplications, LoadAwaitingApprovalDataProxyApplications, getApprovedDataProxyApplications, getAwaitingApprovalDataProxyApplications, LoadDataProxyApplications, isLoadingProxyApplications, LoadingDataProxyApplications, LoadRepaymentsScheduleData, LoadActualScheduleData, ShowViewerActualScheduleProxy, ShowViewerRepaymentScheduleProxy, getStandardScheduleData, getRepaymentSchedule, getActualSchedule, showViewerStandardSchedule, showViewerActualSchedule, showViewerRepaymentSchedule, ShowViewerProxyApply, NotProcessingProxyApplications, showProxyApplyViewer, HideViewerProxyApply, LoadLoanTypesDataProxyApplications, LoadCurrenciesDataProxyApplications, getLoanTypesDataProxyApplications, LoadGenericScheduleData, ShowViewerGenericScheduleProxy, showViewerGenericSchedule, getGenericSchedule, DeleteApprovedLoanProxy, DeleteAwaitingApprovalLoanProxy, getProxyApplicationDocument, LoadDocumentProxyApplication } from '../../store/proxy-applications';
import { ProxyApplicationsService } from './proxy-applications.service';
import { ProxyApplyViewerComponent } from './proxy-apply-viewer';
import { UtilService, formatDate } from '@nutela/core-services';
import { ILoanState } from '../../store';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-proxy-applications',
  templateUrl: './proxy-applications.component.html',
  styleUrls: ['./proxy-applications.component.scss'],
  providers: [ProxyApplicationsService],
})
export class ProxyApplicationsComponent implements OnInit {

  dropDownFilterValue: string;
  employee_id: number;
  showSecondaryButton: boolean;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  showViewerStandardSchedule$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  showViewerActualSchedule$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  proxyApplicationsData$: Observable<IApprovedLoan[]>;
  approvedProxyApplicationsData$: Observable<any[]>;
  awaitingApprovalProxyApplicationsData$: Observable<any[]>;
  standardSchedule$: Observable<ILoanSchedule[]>;
  repaymentsScheduleData$: Observable<any[]>;
  paymentsScheduleData$: Observable<any[]>;
  genericScheduleData$: Observable<any[]>;
  showViewerGenericSchedule$: Observable<boolean>;
  documentData$: Observable<any>;
  actualScheduleData$: Observable<any[]>;
  actualSchedule$: Observable<any>;
  standardScheduleData$: Observable<ILoanSchedule[]>;

  activePersonnel$: Observable<ISelectOption[]>;
  loanDefinitions$: Observable<ILoanDefinition[]>;

  private subscriptions: ISubscriptions = {};

  @ViewChild('proxyApplyEditor') proxyApplyEditor: ProxyApplyEditorComponent;
  @ViewChild("awaitingApprovalDataGrid") awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild("approvedDataGrid") approvedDataGrid: IgxGridComponent;
  @ViewChild('viewer') viewer: ProxyApplyViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: ProxyApplicationsService, private store: Store<ILoanState>, private dialogBoxService: DialogBoxService, public utilService: UtilService) {
    titleService.setTitle(
      `${'Loan Proxy Transactions'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showViewerStandardSchedule$ = this.store.pipe(select(showViewerStandardSchedule));
    this.showViewerActualSchedule$ = this.store.pipe(select(showViewerActualSchedule));
    this.showViewerRepaymentSchedule$ = this.store.pipe(select(showViewerRepaymentSchedule))
    this.showViewerGenericSchedule$ = this.store.pipe(select(showViewerGenericSchedule));
    this.isLoading$ = this.store.pipe(select(isLoadingProxyApplications));
    this.showEditor$ = this.store.pipe(select(showProxyApplyEditor));
    this.showViewer$ = this.store.pipe(select(showProxyApplyViewer));
    this.proxyApplicationsData$ = this.store.pipe(select(getDataProxyApplications));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.loanDefinitions$ = this.store.pipe(select(getLoanTypesDataProxyApplications));
    this.approvedProxyApplicationsData$ = this.store.pipe(select(getApprovedDataProxyApplications))
    this.awaitingApprovalProxyApplicationsData$ = this.store.pipe(select(getAwaitingApprovalDataProxyApplications));
    this.standardScheduleData$ = this.store.pipe(select(getStandardScheduleData));
    this.repaymentsScheduleData$ = this.store.pipe(select(getRepaymentSchedule));
    this.actualSchedule$ = this.store.pipe(select(getActualSchedule));
    this.genericScheduleData$ = this.store.pipe(select(getGenericSchedule));
    this.documentData$ = this.store.pipe(select(getProxyApplicationDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDataProxyApplications());
    this.store.dispatch(new LoadDataProxyApplications());
    this.store.dispatch(new LoadApprovedDataProxyApplications());
    this.store.dispatch(new LoadAwaitingApprovalDataProxyApplications());
    this.store.dispatch(new LoadLoanTypesDataProxyApplications());
    this.store.dispatch(new LoadCurrenciesDataProxyApplications());
  }

  getRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.proxyApplicationsData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingData$(rowId: number): Observable<IApprovedLoan> {
    return this.awaitingApprovalProxyApplicationsData$.pipe(
      map(d => d.filter(v => v.ess_loandetail_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.store.dispatch(new ShowEditorProxyApply())
  }

  onRefresh() {
    this.store.dispatch(new LoadApprovedDataProxyApplications());
    this.store.dispatch(new LoadAwaitingApprovalDataProxyApplications());
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

    if (this.approvedDataGrid) {
      this.service.search(
        this.approvedDataGrid,
        searchString,
        filterBy
      );
    } else if(this.awaitingApprovalDataGrid) {
      this.service.search(
        this.awaitingApprovalDataGrid,
        searchString,
        filterBy
      )
    }
  }

  onEditIconClicked(rowId: number) {
    this.proxyApplyEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.proxyApplyEditor.data = result;
          this.proxyApplyEditor.reset();
          this.store.dispatch(new ShowEditorProxyApply());
        }
      );
  }

  // onDeleteIconClicked(rowId: number) {
  //   this.dialogBoxService.show(`Are you sure you want to delete your data?`)
  //   .subscribe((command: string) => {
  //     if (command === DialogBoxCommandTypes.COMMAND1) {
  //       this.store.dispatch(new DeleteDataProxyApplication({recordId: rowId}));
  //       this.store.dispatch(new RemoveDataProxyApplication({recordId: rowId}));
  //     }
  //   });
  // }

  onViewActualScheduleClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadActualScheduleData({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}))
    })
    this.store.dispatch(new ShowViewerActualScheduleProxy());
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
      this.store.dispatch(new ShowViewerGenericScheduleProxy());
     })

   }

   onViewAwaitingGenericScheduleClicked(rowId: number) {
     this.getAwaitingData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadGenericScheduleData({
        loanId: loan.loanDefInfo.loan_id,
        loanAmount: loan.loan_amount,
        interestRate: loan.interest_rate,
        tenor: loan.tenor_months,
        effectiveDate: formatDate(loan.effective_date)
      }))
      this.store.dispatch(new ShowViewerGenericScheduleProxy());
     })

   }
   onViewRepaymentsScheduleClicked(rowId: number) {
     this.getRowData$(rowId).pipe(take(1)).subscribe(loan => {
      this.store.dispatch(new LoadRepaymentsScheduleData({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
     })
    this.store.dispatch(new ShowViewerRepaymentScheduleProxy());
   }

   onViewAwaitingIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          if (result.doc_url !== '' && result.doc_url !== null) {
            this.store.dispatch(new LoadDocumentProxyApplication({loanDetailId: rowId, employeeId: result.EmployeeInfo.employee_id, isApproved: false}));
          }
          else {
          }
          this.store.dispatch(new ShowViewerProxyApply());
          this.store.dispatch(new NotProcessingProxyApplications());
        }
      );
   }

   onViewApprovedIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          if (result.doc_url !== '' && result.doc_url !== null) {
            this.store.dispatch(new LoadDocumentProxyApplication({loanDetailId: rowId, employeeId: result.EmployeeInfo.employee_id, isApproved: true}));
          }
          this.store.dispatch(new ShowViewerProxyApply());
          this.store.dispatch(new NotProcessingProxyApplications());
        }
      );
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

    this.subscriptions['status'] = this.getAwaitingData$(rowId)
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

  onAwaitingEditIconClicked(rowId: number) {
    this.proxyApplyEditor.data = null;
    this.getAwaitingData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.proxyApplyEditor.data = result;
          this.proxyApplyEditor.reset();
          this.store.dispatch(new ShowEditorProxyApply());
        }
      );
  }

  onApprovedEditIconClicked(rowId: number) {
    this.proxyApplyEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.proxyApplyEditor.data = result;
          this.proxyApplyEditor.reset();
          this.store.dispatch(new ShowEditorProxyApply());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getRowData$(rowId)
        .subscribe(loan => {
          this.store.dispatch(new DeleteApprovedLoanProxy({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
        })
      }
    });
  }

  onAwaitingDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getAwaitingData$(rowId)
        .subscribe(loan => {
          this.store.dispatch(new DeleteAwaitingApprovalLoanProxy({loanDetailId: rowId, employeeId: loan.EmployeeInfo.employee_id}));
        })
      }
    });
  }

  onCancelApplicationEditor() {
    this.store.dispatch(new HideEditorProxyApply());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerProxyApply())
    this.viewer.data = null;
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();

  }

}
