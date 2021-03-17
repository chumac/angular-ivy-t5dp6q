import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorHrProcessTransaction, showViewerHrProcessTransaction, getHrProcessTransactionData, LoadDataHrProcessTransaction, ShowEditorHrProcessTransaction, HideEditorHrProcessTransaction, DeleteDataHrProcessTransaction, ShowViewerHrProcessTransaction, isProcessingHrProcessTransaction, ProcessingHrProcessTransaction, HideViewerHrProcessTransaction } from '../../../store/processes/hr-process-transaction';
import { HrProcessTransactionsEditorComponent } from './hr-process-transactions-editor/hr-process-transactions-editor.component';
import { HrProcessTransactionsViewerComponent } from './hr-process-transactions-viewer/hr-process-transactions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { HrProcessTransactionsService } from './hr-process-transactions.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IProcessTransactionMaster, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { Router } from '@angular/router';
import { PROCESS_TRANSACTION_REDIRECT_URLs, PROCESS_FORM_ROLE } from '../../../constants';
import { LoadMasterDataProcessFormWizardSuccess, LoadDetailDataProcessFormWizardSuccess, LoadMetaDataProcessFormWizardSuccess } from '../../../store/processes/process-form-wizard';
import { LoadMetaDataCustomProcessLookupSuccess } from '../../../store/processes/custom-process-lookup';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-workforce-hr-process-transactions',
  templateUrl: './hr-process-transactions.component.html',
  styleUrls: ['./hr-process-transactions.component.scss'],
  providers: [HrProcessTransactionsService],

})
export class HrProcessTransactionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  hrProcessTransactionData$: Observable<IProcessTransactionMaster[]>;
  approvedData$: Observable<IProcessTransactionMaster[]>;
  awaitingApprovalData$: Observable<IProcessTransactionMaster[]>;
  roles = PROCESS_FORM_ROLE;


  @ViewChild('editor') editor: HrProcessTransactionsEditorComponent;
  @ViewChild('viewer') viewer: HrProcessTransactionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private router: Router, private store: Store<IAppState>, public service: HrProcessTransactionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingHrProcessTransaction());
    this.store.dispatch(new LoadDataHrProcessTransaction());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.showEditor$ = this.store.pipe(select(showEditorHrProcessTransaction));
    this.showViewer$ = this.store.pipe(select(showViewerHrProcessTransaction));
    this.isProcessing$ = this.store.pipe(select(isProcessingHrProcessTransaction));
    this.hrProcessTransactionData$ = this.store.pipe(select(getHrProcessTransactionData));  
  }

  getRowData$(rowId: number): Observable<IProcessTransactionMaster> {
    return this.hrProcessTransactionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onInitiateButtonClicked(roleId, employeeId) {
    this.store.dispatch(new LoadMetaDataCustomProcessLookupSuccess({roleId: roleId, employeeId: employeeId, masterId: null}));
    this.router.navigate([`${PROCESS_TRANSACTION_REDIRECT_URLs.customProcessLookupUrl}`], { skipLocationChange: false });
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorHrProcessTransaction());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `HR Process information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result: IProcessTransactionMaster) => {
        this.store.dispatch(new LoadMetaDataProcessFormWizardSuccess({roleId: PROCESS_FORM_ROLE.HR, employeeId: result.employee_id, masterId: result.id}));
        this.router.navigate([`${PROCESS_TRANSACTION_REDIRECT_URLs.processFormWizardUrl}`], { skipLocationChange: false });
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerHrProcessTransaction());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataHrProcessTransaction({recordId: rowId, roleId: PROCESS_FORM_ROLE.HR }));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrProcessTransaction());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrProcessTransaction());
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
