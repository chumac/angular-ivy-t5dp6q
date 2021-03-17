import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorSelfProcessTransaction, showViewerSelfProcessTransaction, getSelfProcessTransactionData, LoadDataSelfProcessTransaction, ShowEditorSelfProcessTransaction, HideEditorSelfProcessTransaction, DeleteDataSelfProcessTransaction, ShowViewerSelfProcessTransaction, isProcessingSelfProcessTransaction, ProcessingSelfProcessTransaction, HideViewerSelfProcessTransaction, LoadAreaSelfProcessTransaction } from '../../../store/processes/self-process-transaction';
import { SelfProcessTransactionsEditorComponent } from './self-process-transactions-editor/self-process-transactions-editor.component';
import { SelfProcessTransactionsViewerComponent } from './self-process-transactions-viewer/self-process-transactions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { SelfProcessTransactionsService } from './self-process-transactions.service';
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
  selector: 'x365-fm-workforce-self-process-transactions',
  templateUrl: './self-process-transactions.component.html',
  styleUrls: ['./self-process-transactions.component.scss'],
  providers: [SelfProcessTransactionsService],

})
export class SelfProcessTransactionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selfProcessTransactionData$: Observable<IProcessTransactionMaster[]>;
  approvedData$: Observable<IProcessTransactionMaster[]>;
  awaitingApprovalData$: Observable<IProcessTransactionMaster[]>;
  roles = PROCESS_FORM_ROLE;


  @ViewChild('editor') editor: SelfProcessTransactionsEditorComponent;
  @ViewChild('viewer') viewer: SelfProcessTransactionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private router: Router, private store: Store<IAppState>, public service: SelfProcessTransactionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingSelfProcessTransaction());
    this.store.dispatch(new LoadDataSelfProcessTransaction());
    this.store.dispatch(new LoadAreaSelfProcessTransaction());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.showEditor$ = this.store.pipe(select(showEditorSelfProcessTransaction));
    this.showViewer$ = this.store.pipe(select(showViewerSelfProcessTransaction));
    this.isProcessing$ = this.store.pipe(select(isProcessingSelfProcessTransaction));
    this.selfProcessTransactionData$ = this.store.pipe(select(getSelfProcessTransactionData));  
  }

  getRowData$(rowId: number): Observable<IProcessTransactionMaster> {
    return this.selfProcessTransactionData$.pipe(
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

    this.store.dispatch(new ShowEditorSelfProcessTransaction());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `My Process information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result: IProcessTransactionMaster) => {
        this.store.dispatch(new LoadMetaDataProcessFormWizardSuccess({roleId: PROCESS_FORM_ROLE.employee, employeeId: result.employee_id, masterId: result.id}));
        this.router.navigate([`${PROCESS_TRANSACTION_REDIRECT_URLs.processFormWizardUrl}`], { skipLocationChange: false });
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSelfProcessTransaction());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataSelfProcessTransaction({recordId: rowId, roleId: PROCESS_FORM_ROLE.employee}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorSelfProcessTransaction());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerSelfProcessTransaction());
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
