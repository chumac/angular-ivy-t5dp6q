import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorReviewerProcessTransaction, showViewerReviewerProcessTransaction, getReviewerProcessTransactionData, LoadDataReviewerProcessTransaction, ShowEditorReviewerProcessTransaction, HideEditorReviewerProcessTransaction, DeleteDataReviewerProcessTransaction, ShowViewerReviewerProcessTransaction, isProcessingReviewerProcessTransaction, ProcessingReviewerProcessTransaction, HideViewerReviewerProcessTransaction } from '../../../store/processes/reviewer-process-transaction';
import { ReviewerProcessTransactionsEditorComponent } from './reviewer-process-transactions-editor/reviewer-process-transactions-editor.component';
import { ReviewerProcessTransactionsViewerComponent } from './reviewer-process-transactions-viewer/reviewer-process-transactions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ReviewerProcessTransactionsService } from './reviewer-process-transactions.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IProcessTransactionMaster, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { Router } from '@angular/router';
import { PROCESS_TRANSACTION_REDIRECT_URLs, PROCESS_FORM_ROLE, PROCESS_FORM_FLAG } from '../../../constants';
import { LoadMasterDataProcessFormWizardSuccess, LoadDetailDataProcessFormWizardSuccess, LoadMetaDataProcessFormWizardSuccess } from '../../../store/processes/process-form-wizard';
import { LoadMetaDataCustomProcessLookupSuccess } from '../../../store/processes/custom-process-lookup';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-workforce-reviewer-process-transactions',
  templateUrl: './reviewer-process-transactions.component.html',
  styleUrls: ['./reviewer-process-transactions.component.scss'],
  providers: [ReviewerProcessTransactionsService],

})
export class ReviewerProcessTransactionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  reviewerProcessTransactionData$: Observable<IProcessTransactionMaster[]>;
  approvedData$: Observable<IProcessTransactionMaster[]>;
  awaitingApprovalData$: Observable<IProcessTransactionMaster[]>;
  roles = PROCESS_FORM_ROLE;


  @ViewChild('editor') editor: ReviewerProcessTransactionsEditorComponent;
  @ViewChild('viewer') viewer: ReviewerProcessTransactionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private router: Router, private store: Store<IAppState>, public service: ReviewerProcessTransactionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingReviewerProcessTransaction());
    this.store.dispatch(new LoadDataReviewerProcessTransaction());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.showEditor$ = this.store.pipe(select(showEditorReviewerProcessTransaction));
    this.showViewer$ = this.store.pipe(select(showViewerReviewerProcessTransaction));
    this.isProcessing$ = this.store.pipe(select(isProcessingReviewerProcessTransaction));
    this.reviewerProcessTransactionData$ = this.store.pipe(select(getReviewerProcessTransactionData));  
  }

  getRowData$(rowId: number): Observable<IProcessTransactionMaster> {
    return this.reviewerProcessTransactionData$.pipe(
      map(d => d.filter(v => v.master_id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorReviewerProcessTransaction());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Reviewer Process information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result: IProcessTransactionMaster) => {
        this.store.dispatch(new LoadMetaDataProcessFormWizardSuccess({roleId: result.role, employeeId: result.employee_id, masterId: result.master_id, flag: PROCESS_FORM_FLAG.isReviewer}));
        this.router.navigate([`${PROCESS_TRANSACTION_REDIRECT_URLs.processFormWizardUrl}`], { skipLocationChange: false });
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerReviewerProcessTransaction());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataReviewerProcessTransaction({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReviewerProcessTransaction());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReviewerProcessTransaction());
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
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


  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
