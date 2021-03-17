import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorTeamProcessTransaction, showViewerTeamProcessTransaction, getTeamProcessTransactionData, LoadDataTeamProcessTransaction, ShowEditorTeamProcessTransaction, HideEditorTeamProcessTransaction, DeleteDataTeamProcessTransaction, ShowViewerTeamProcessTransaction, isProcessingTeamProcessTransaction, ProcessingTeamProcessTransaction, HideViewerTeamProcessTransaction, LoadAreaTeamProcessTransaction } from '../../../store/processes/team-process-transaction';
import { TeamProcessTransactionsEditorComponent } from './team-process-transactions-editor/team-process-transactions-editor.component';
import { TeamProcessTransactionsViewerComponent } from './team-process-transactions-viewer/team-process-transactions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { TeamProcessTransactionsService } from './team-process-transactions.service';
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
  selector: 'x365-fm-workforce-team-process-transactions',
  templateUrl: './team-process-transactions.component.html',
  styleUrls: ['./team-process-transactions.component.scss'],
  providers: [TeamProcessTransactionsService],

})
export class TeamProcessTransactionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  teamProcessTransactionData$: Observable<IProcessTransactionMaster[]>;
  approvedData$: Observable<IProcessTransactionMaster[]>;
  awaitingApprovalData$: Observable<IProcessTransactionMaster[]>;
  roles = PROCESS_FORM_ROLE;


  @ViewChild('editor') editor: TeamProcessTransactionsEditorComponent;
  @ViewChild('viewer') viewer: TeamProcessTransactionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private router: Router, private store: Store<IAppState>, public service: TeamProcessTransactionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingTeamProcessTransaction());
    this.store.dispatch(new LoadDataTeamProcessTransaction());
    this.store.dispatch(new LoadAreaTeamProcessTransaction());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.showEditor$ = this.store.pipe(select(showEditorTeamProcessTransaction));
    this.showViewer$ = this.store.pipe(select(showViewerTeamProcessTransaction));
    this.isProcessing$ = this.store.pipe(select(isProcessingTeamProcessTransaction));
    this.teamProcessTransactionData$ = this.store.pipe(select(getTeamProcessTransactionData));  
  }

  getRowData$(rowId: number): Observable<IProcessTransactionMaster> {
    return this.teamProcessTransactionData$.pipe(
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

    this.store.dispatch(new ShowEditorTeamProcessTransaction());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Team Process information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result: IProcessTransactionMaster) => {
        this.store.dispatch(new LoadMetaDataProcessFormWizardSuccess({roleId: PROCESS_FORM_ROLE.lineManager, employeeId: result.employee_id, masterId: result.id}));
        this.router.navigate([`${PROCESS_TRANSACTION_REDIRECT_URLs.processFormWizardUrl}`], { skipLocationChange: false });
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTeamProcessTransaction());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataTeamProcessTransaction({recordId: rowId, roleId: PROCESS_FORM_ROLE.lineManager}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorTeamProcessTransaction());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTeamProcessTransaction());
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
