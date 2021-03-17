import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { ApplicationsService } from './applications.service';
import {
  showEditorApplication,
  getApprovedDataApplication,
  getAwaitingApprovalDataApplication,
  LoadApprovedDataApplication,
  LoadAwaitingApprovalDataApplication,
  ShowEditorApply,
  HideViewerApplication,
  HideEditorApply,
  showViewerStandardSchedule,
  showViewerActualSchedule,
  showViewerRepaymentSchedule,
  getStandardScheduleData,
  LoadStandardScheduleData,
  ShowViewerStandardSchedule,
  ShowViewerActualSchedule,
  ShowViewerRepaymentSchedule,
  getRepaymentSchedule,
  LoadRepaymentsScheduleData,
  LoadActualScheduleData,
  getActualSchedule,
  getLoanDefinitionsDataApplication,
  LoadLoanDefinitionDataApplication,
  isLoadingApplication,
  LoadingApplication,
  LoadLoanCurrencyDataApplication,
  NotProcessingApplication,
  showApplyViewer,
  ShowViewerApply,
  LoadGenericScheduleData,
  ShowViewerGenericSchedule,
  getApplicationDocument,
  LoadDocumentApplication
} from '../../store/applications';
import {
  getActivePersonnel
} from '@nutela/store/modules/foundation';
import { ApplyEditorComponent } from './apply-editor/apply-editor.component';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import {
  ILoanSchedule,
  ILoanDefinition,
  IApprovedLoan
} from '@nutela/models/compensation/loans';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { UtilService, formatDate } from '@nutela/core-services';
import { map, take } from 'rxjs/operators';
import { ApplyViewerComponent } from './apply-viewer';
import { SwitchComponent } from '@nutela/shared/ui';
import { ILoanState } from '../../store';
import { DISBURSE_STATUS } from '../../constants';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  providers: [ApplicationsService]
})
export class ApplicationsComponent implements OnInit {
  dropDownFilterValue: string;
  loanDetailId: number;
  hideValues: boolean;
  disburseStatus = DISBURSE_STATUS;

  showViewer$: Observable<boolean>;
  showApplicationEditor$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showViewerStandardSchedule$: Observable<boolean>;
  showViewerActualSchedule$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  approvedApplicationsData$: Observable<any[]>;
  awaitingApprovalApplicationsData$: Observable<any[]>;
  standardScheduleData$: Observable<ILoanSchedule[]>;
  repaymentScheduleData$: Observable<any[]>;
  actualScheduleData$: Observable<any[]>;
  actualSchedule$: Observable<any>;
  loanTypes$: Observable<ILoanDefinition[]>;
  documentData$: Observable<any>;

  activePersonnel$: Observable<ISelectOption[]>;

  @ViewChild('applyEditor') applyEditor: ApplyEditorComponent;

  @ViewChild('awaitingApprovalDataGrid')
  awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('viewer') viewer: ApplyViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: ApplicationsService,
    private store: Store<ILoanState>
  ) {
    titleService.setTitle(`${'Loan Applications'}${this.partialDocumentTitle}`);
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingApplication));
    this.showApplicationEditor$ = this.store.pipe(
      select(showEditorApplication)
    );
    this.showViewerStandardSchedule$ = this.store.pipe(
      select(showViewerStandardSchedule)
    );
    this.showViewerActualSchedule$ = this.store.pipe(
      select(showViewerActualSchedule)
    );
    this.showViewerRepaymentSchedule$ = this.store.pipe(
      select(showViewerRepaymentSchedule)
    );
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.approvedApplicationsData$ = this.store.pipe(
      select(getApprovedDataApplication)
    );
    this.awaitingApprovalApplicationsData$ = this.store.pipe(
      select(getAwaitingApprovalDataApplication)
    );
    this.standardScheduleData$ = this.store.pipe(
      select(getStandardScheduleData)
    );
    this.repaymentScheduleData$ = this.store.pipe(select(getRepaymentSchedule));
    this.actualSchedule$ = this.store.pipe(select(getActualSchedule));
    this.loanTypes$ = this.store.pipe(
      select(getLoanDefinitionsDataApplication)
    );
    this.showViewer$ = this.store.pipe(select(showApplyViewer));
    this.documentData$ = this.store.pipe(select(getApplicationDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingApplication());
    this.store.dispatch(new LoadApprovedDataApplication());
    this.store.dispatch(new LoadAwaitingApprovalDataApplication());
    this.store.dispatch(new LoadLoanDefinitionDataApplication());
    this.store.dispatch(new LoadLoanCurrencyDataApplication());
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
      this.service.search(this.approvedDataGrid, searchString, filterBy);
    } else if (this.awaitingApprovalDataGrid) {
      this.service.search(
        this.awaitingApprovalDataGrid,
        searchString,
        filterBy
      );
    }
  }

  getApprovedRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.approvedApplicationsData$.pipe(
      map(d => d.filter(v => v.loandetail_id === rowId)),
      map(e => e.shift())
    );
  }

  getAwaitingApprovalRowData$(rowId: number): Observable<IApprovedLoan> {
    return this.awaitingApprovalApplicationsData$.pipe(
      map(d => d.filter(v => v.ess_loandetail_id === rowId)),
      map(e => e.shift())
    );
  }

  get loanTypesSelect(): ISelectOption[] {
    let transformed: ISelectOption[];
    this.loanTypes$.pipe(take(1)).subscribe(val => {
      if (val) {
        transformed = this.utilService.transformToSelectDataList(
          val,
          'loan_id',
          'description'
        );
      } else {
        transformed = [];
      }
    });
    return transformed;
  }

  onAdd() {
    this.store.dispatch(new ShowEditorApply());
  }

  isSelectionValid(): boolean {
    return true;
  }

  onRefresh() {
    this.store.dispatch(new LoadAwaitingApprovalDataApplication());
    this.store.dispatch(new LoadApprovedDataApplication());
    this.store.dispatch(
      new ShowToast({
        title: null,
        message: `Data is being refreshed.`,
        type: ToastTypes.INFO
      })
    );
  }

  onAwaitingViewGenericScheduleClicked(rowId: number) {
    this.getAwaitingApprovalRowData$(rowId)
      .pipe(take(1))
      .subscribe(loan => {
        this.store.dispatch(
          new LoadGenericScheduleData({
            loanId: loan.loanDefInfo.loan_id,
            loanAmount: loan.loan_amount,
            interestRate: loan.interest_rate,
            tenor: loan.tenor_months,
            effectiveDate: formatDate(loan.effective_date)
          })
        );
      });
    this.store.dispatch(new ShowViewerGenericSchedule());
  }

  onApprovedViewRepaymentsScheduleIconClicked(rowId) {
    this.store.dispatch(new LoadRepaymentsScheduleData({ recordId: rowId }));
    this.store.dispatch(new ShowViewerRepaymentSchedule());
  }

  onApprovedViewActualScheduleClicked(rowId: number) {
    this.store.dispatch(new LoadActualScheduleData({ recordId: rowId }));
    this.store.dispatch(new ShowViewerActualSchedule());
  }

  onApprovedViewStandardScheduleClicked(rowId: number) {
    this.loanDetailId = rowId;
    this.store.dispatch(new LoadStandardScheduleData({ recordId: rowId }));
    this.store.dispatch(new ShowViewerStandardSchedule());
  }

  onViewAwaitingIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingApprovalRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.viewer.data = result;
        if (result.doc_url !== null && result.doc_url !== '') {
          this.store.dispatch(
            new LoadDocumentApplication({
              loanDetailId: rowId,
              isApproved: false
            })
          );
        }
        this.store.dispatch(new ShowViewerApply());
        this.store.dispatch(new NotProcessingApplication());
      });
  }

  onViewApprovedIconClicked(rowId: number) {
    this.hideValues = true;
    this.viewer.data = null;
    this.getApprovedRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.viewer.data = result;
        if (result.doc_url !== null && result.doc_url === '') {
          this.store.dispatch(
            new LoadDocumentApplication({
              loanDetailId: rowId,
              isApproved: true
            })
          );
        }
        this.store.dispatch(new ShowViewerApply());
        this.store.dispatch(new NotProcessingApplication());
      });
  }

  //  onApprovedDownloadIconClicked(rowId: number) {
  //   this.getApprovedRowData$(rowId).pipe(take(1))
  //     .subscribe((result) => {
  //         if (result.doc_url === null || result.doc_url === '') {
  //           this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
  //         } else {
  //           this.store.dispatch(new LoadInlineDocumentApplication({recordId: rowId, isApproved: true}));
  //         }
  //       }
  //     );
  // }

  // onAwaitingApprovalDownloadIconClicked(rowId: number) {
  //   this.getAwaitingApprovalRowData$(rowId).pipe(take(1))
  //     .subscribe((result) => {
  //         if (result.doc_url === null || result.doc_url === '') {
  //           this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
  //         } else {
  //           this.store.dispatch(new LoadInlineDocumentApplication({recordId: rowId, isApproved: false}));
  //         }
  //       }
  //     );
  // }

  // hasDocumentApproved(rowId: number):boolean {
  //   let status = false;

  //   this.getApprovedRowData$(rowId).pipe(take(1))
  //     .subscribe((result) => {
  //         if (result.doc_url !== null || result.doc_url === '') {
  //           status = true;
  //         } else {
  //           status = false;
  //         }
  //       }
  //     );

  //   return status;
  // }

  onCancelViewer() {
    this.store.dispatch(new HideViewerApplication());
    this.viewer.dataDoc = null;
  }

  onCancelApplicationEditor() {
    this.store.dispatch(new HideEditorApply());
  }
}
