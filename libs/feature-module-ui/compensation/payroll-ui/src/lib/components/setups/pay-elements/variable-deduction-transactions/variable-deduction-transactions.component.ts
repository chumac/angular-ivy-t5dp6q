import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IVariableDeductionTransaction } from '@nutela/models/compensation/payroll';
import { VariableDeductionTransactionEditorComponent } from './variable-deduction-transaction-editor/variable-deduction-transaction-editor.component';
import { VariableDeductionTransactionViewerComponent } from './variable-deduction-transaction-viewer/variable-deduction-transaction-viewer.component';
import { VariableDeductionTransactionsService } from './variable-deduction-transactions.service';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadVariableDeductionTransactionData, LoadingVariableDeductionTransaction, getVariableDeductionTransaction, showEditorVariableDeductionTransaction, isLoadingVariableDeductionTransaction, ShowEditorVariableDeductionTransaction, HideEditorVariableDeductionTransaction, ShowViewerVariableDeductionTransaction, showViewerVariableDeductionTransaction, DeleteVariableDeductionTransaction, HideViewerVariableDeductionTransaction } from '../../../../store/pay-elements/variable-deduction-transaction';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { Title } from '@angular/platform-browser';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-transactions',
  templateUrl: './variable-deduction-transactions.component.html',
  styleUrls: ['./variable-deduction-transactions.component.scss'],
  providers: [ VariableDeductionTransactionsService ]
})
export class VariableDeductionTransactionsComponent implements OnInit {

  variableDeductionTransactionData$: Observable<IVariableDeductionTransaction[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('editor') editor:  VariableDeductionTransactionEditorComponent;
  @ViewChild('viewer') viewer:  VariableDeductionTransactionViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService, public service: VariableDeductionTransactionsService) {
    titleService.setTitle(
      `${'Variable Deduction Transactions'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
     this.store.dispatch(new LoadingVariableDeductionTransaction())
     this.store.dispatch(new LoadVariableDeductionTransactionData());
   }

  storeSelects() {
    this.variableDeductionTransactionData$ = this.store.pipe(select(getVariableDeductionTransaction));
    this.isLoading$ = this.store.pipe(select(isLoadingVariableDeductionTransaction));
    this.showEditor$ = this.store.pipe(select(showEditorVariableDeductionTransaction))
    this.showViewer$ = this.store.pipe(select(showViewerVariableDeductionTransaction))
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
  }

  getRowData$(rowId: number): Observable<IVariableDeductionTransaction> {
    return this.variableDeductionTransactionData$.pipe(
      map(d => d.filter(v => v.vdeducttrans_id === rowId)),
      map(e => e.shift()))
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

  onAdd() {
    this.editor.reset();
    this.store.dispatch(new ShowEditorVariableDeductionTransaction());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerVariableDeductionTransaction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorVariableDeductionTransaction());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteVariableDeductionTransaction({ recordId: rowId }));
      }
    });
  }

onRefresh(){
this.store.dispatch(new LoadVariableDeductionTransactionData());
this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
}

onCancelEditor(){
 this.store.dispatch(new HideEditorVariableDeductionTransaction());
}

onCancelViewer(){
 this.store.dispatch(new HideViewerVariableDeductionTransaction());
}

}
