import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { formatDate } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IExclusionActiveEmployee, IExclusionReason, IExclusionTransaction, IExclusionType } from '@nutela/models/compensation/payroll';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { SwitchComponent } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getConfigureTransactionData, getExclusionActiveEmployeeData, getExclusionData, getExclusionItemTypeData, getExclusionReasonData, getExclusionScopeData, getExclusionTransactionData, HideConfigureTransaction, HideEditorExclusionTransaction, isLoadingExclusion, isProcessingExclusion, ITransactionState, LoadConfigureTransactionData, LoadExclusionActiveEmployeeData, LoadExclusionReasonData, LoadExclusionScopeData, LoadExclusionTransactionData, LoadExclusionTransactionDataSuccess, LoadGetExclusionTransactionData, LoadingExclusionTransaction, NotProcessingConfigureTransaction, ShowCloseEditorExclusion, showCloseEditorPayrollRun, showConfigureTransaction, ShowConfigureTransaction, ShowEditorExclusionTransaction, showEditorExclusionTransaction, showEditorPayrollRun, showRecoverEditorPayrollRun } from '../../../../store/setup/transaction';
import { RecoverEditorComponent } from '../../../execution/payroll-run/recover-editor/recover-editor.component';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'x365-fm-payrl-exclusions-transaction',
  templateUrl: './exclusions-transaction.component.html',
  styleUrls: ['./exclusions-transaction.component.scss']
})
export class ExclusionsTransactionComponent implements OnInit {

  private subscriptions: ISubscriptions = {};

  exclusionTransactionData$: Observable<IExclusionTransaction[]>;
  showRecoverEditor$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  // isProcessing$: Observable<boolean>;
  getRunStatus$: Observable<any>;
  showEditor$: Observable<boolean>;
  showConfigureEditor$: Observable<boolean>;
  // showCreateConfigureEditor$: Observable<boolean>;
  showCloseEditor$: Observable<boolean>;
  recType:number = 0;
  exclusionScopeData$ : Observable<IExclusionType[]>;
  exclusionActiveEmployeeData$ : Observable<IExclusionActiveEmployee[]>;
  exclusionReasonData$ : Observable<IExclusionReason[]>;
  configureTransactionData$ : Observable<IConfigureTransaction[]>;
  exclusionId$ : number;
  getExclusionData$: Observable<IExclusionTransaction>;
  subscribe: any;


  @ViewChild("exclusionTransactionDataGrid") exclusionTransactionDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild("transactioneditor") transactioneditor: TransactionEditorComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: TransactionService, private store: Store<ITransactionState>, private router: Router) {
    titleService.setTitle(
      `${'Payroll Run'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingExclusion));
    //this.isProcessing$ = this.store.pipe(select(isProcessingExclusion));
    this.showEditor$ = this.store.pipe(select(showEditorExclusionTransaction));
    this.showCloseEditor$ = this.store.pipe(select(showCloseEditorPayrollRun));
    this.showConfigureEditor$ = this.store.pipe(select(showConfigureTransaction));
    this.exclusionTransactionData$ = this.store.pipe(select(getExclusionTransactionData));
    this.exclusionScopeData$ = this.store.pipe(select(getExclusionScopeData));
    this.exclusionActiveEmployeeData$ = this.store.pipe(select(getExclusionActiveEmployeeData));
    this.exclusionReasonData$ = this.store.pipe(select(getExclusionReasonData));
    this.configureTransactionData$ = this.store.pipe(select(getConfigureTransactionData));
    this.getExclusionData$ = this.store.pipe(select(getExclusionData));
  }

  storeDispatches() {
    // this.store.dispatch(new HideEditorExclusionTransaction())
     this.store.dispatch(new LoadingExclusionTransaction());
    this.store.dispatch(new LoadExclusionTransactionData(this.recType));
  }

  onAdd() {
    this.store.dispatch(new ShowEditorExclusionTransaction())
    this.store.dispatch(new LoadExclusionScopeData())
    this.store.dispatch(new LoadExclusionActiveEmployeeData())
    this.store.dispatch(new LoadExclusionReasonData())
  }

  onRefresh() {
    this.store.dispatch(new LoadExclusionTransactionData(this.recType));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
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

    if (this.exclusionTransactionDataGrid) {
      this.service.search(
        this.exclusionTransactionDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onRunIconClicked(rowId: number) {
    this.store.dispatch(new ShowEditorExclusionTransaction());
    // this.getRowData$(rowId).pipe(take(1)).subscribe(exclusionTransaction => {
    //   if (exclusionTransaction) {
    //     const payrollDate = formatDate(exclusionTransaction.start_date);
    //     this.store.dispatch(new LoadCanRunData({ payrollProfileId: rowId, payrollDate }))
    //     this.subscribe = this.getRunStatus$.subscribe(val => {
    //       if (val) {
    //         this.editor.data = exclusionTransaction;
    //         exclusionTransaction.has_last_run ? this.editor.warningMessage = "This action will overwrite an existing payroll run." : this.editor.warningMessage = null;
    //         this.editor.setDefaultFields(exclusionTransaction.payroll_profile_id);
    //         this.store.dispatch(new ShowEditorExclusionTransaction());
    //       }
    //     })
    //   }
    // })
  }

  onCloseIconClicked(rowId: number) {
    this.exclusionId$ = rowId;
    this.store.dispatch(new ShowCloseEditorExclusion());
   // this.store.dispatch(new NotProcessingConfigureTransaction());    
  }
  onStatusClicked(){
    console.log(this.switch.value)
    if(this.switch.value){
      this.recType = 0;
    }else{
      this.recType = 1;
    }
    this.store.dispatch(new LoadExclusionTransactionData(this.recType));
  }

  onExclusionIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(payrollProfile => {
      if (payrollProfile) {
        this.store.dispatch(new LoadGetExclusionTransactionData(rowId));
        this.subscribe = this.getExclusionData$.subscribe(val => {
          if (val) {
            this.transactioneditor.data = payrollProfile;
            this.transactioneditor.setDefaultFields(payrollProfile);
            this.store.dispatch(new LoadExclusionScopeData())
            this.store.dispatch(new LoadExclusionActiveEmployeeData())
            this.store.dispatch(new LoadExclusionReasonData())
            this.store.dispatch(new ShowEditorExclusionTransaction());
          }
        })
      }
    })
  }


  // onReviewIconClicked(rowId: number) {
  //   this.router.navigate([`${STANDARD_ROUTES.lastRuns}/${rowId}`])
  // }

  onConfigureIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.exclusionConfigure}/${rowId}`])

   // this.exclusionId$ = rowId;
    // this.store.dispatch(new ShowConfigureTransaction());
    // this.store.dispatch(new LoadConfigureTransactionData(rowId));
  }


  getRowData$(rowId: number): Observable<IExclusionTransaction> {
    return this.exclusionTransactionData$.pipe(
      map(d => d.filter(v => v.exclusion_id === rowId)),
      map(e => e.shift()))
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorExclusionTransaction());
    this.store.dispatch(new HideConfigureTransaction());
  }

}
