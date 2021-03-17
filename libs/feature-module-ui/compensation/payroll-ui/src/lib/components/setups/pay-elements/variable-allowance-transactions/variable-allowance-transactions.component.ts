import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { IVariableAllowanceTransaction } from '@nutela/models/compensation/payroll';
import { VariableAllowanceTransactionEditorComponent } from './variable-allowance-transaction-editor/variable-allowance-transaction-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadVariableAllowanceTransactionData, LoadingVariableAllowanceTransaction, getVariableAllowanceTransaction, isLoadingVariableAllowanceTransaction, showEditorVariableAllowanceTransaction, ShowEditorVariableAllowanceTransaction, HideEditorVariableAllowanceTransaction, showViewerVariableAllowanceTransaction, ShowViewerVariableAllowanceTransaction, HideViewerVariableAllowanceTransaction, DeleteVariableAllowanceTransaction } from '../../../../store/pay-elements/variable-allowance-transaction';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map } from 'rxjs/internal/operators/map';
import { VariableAllowanceTransactionViewerComponent } from './variable-allowance-transaction-viewer/variable-allowance-transaction-viewer.component';
import { VariableAllowanceTransactionsService } from './variable-allowance-transactions.service';
import { take } from 'rxjs/internal/operators/take';
import { getActivePersonnelHR } from 'libs/store/modules/foundation/src/lib/select-option-data';
import { ISelectOption } from '@nutela/models/core-data';
import { Title } from '@angular/platform-browser';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-transactions',
  templateUrl: './variable-allowance-transactions.component.html',
  styleUrls: ['./variable-allowance-transactions.component.scss'],
  providers: [VariableAllowanceTransactionsService]
})

export class VariableAllowanceTransactionsComponent implements OnInit {
  variableAllowanceTransactionData$: Observable<IVariableAllowanceTransaction[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;

  @ViewChild('editor') editor:  VariableAllowanceTransactionEditorComponent;
  @ViewChild('viewer') viewer:  VariableAllowanceTransactionViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService, public service: VariableAllowanceTransactionsService) {
    titleService.setTitle(
      `${'Variable Allowance Transactions'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadVariableAllowanceTransactionData());
    this.store.dispatch(new LoadingVariableAllowanceTransaction())
   }

  storeSelects() {
    this.variableAllowanceTransactionData$ = this.store.pipe(select(getVariableAllowanceTransaction));
    this.isLoading$ = this.store.pipe(select(isLoadingVariableAllowanceTransaction));
    this.showEditor$ = this.store.pipe(select(showEditorVariableAllowanceTransaction))
    this.showViewer$ = this.store.pipe(select(showViewerVariableAllowanceTransaction))
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
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

    if (this.dataGrid) {
      this.service.search(
        this.dataGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IVariableAllowanceTransaction> {
    return this.variableAllowanceTransactionData$.pipe(
      map(d => d.filter(v => v.vallowtrans_id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.editor.reset();
    this.store.dispatch(new ShowEditorVariableAllowanceTransaction());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerVariableAllowanceTransaction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorVariableAllowanceTransaction());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteVariableAllowanceTransaction({ recordId: rowId }));
      }
    });
  }

onRefresh(){
this.store.dispatch(new LoadVariableAllowanceTransactionData());
this.store.dispatch(new ShowToast({title: null, message: `  Variable Allowance Transaction data is being refreshed.`, type: ToastTypes.INFO}));
}

onCancelEditor(){
 this.store.dispatch(new HideEditorVariableAllowanceTransaction());
}

  onCancelViewer(){
 this.store.dispatch(new HideViewerVariableAllowanceTransaction());
}

}
