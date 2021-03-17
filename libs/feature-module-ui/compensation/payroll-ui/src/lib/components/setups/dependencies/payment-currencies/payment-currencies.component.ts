import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { ICurrency } from '@nutela/models/compensation/payroll';
import { PaymentCurrencyEditorComponent } from './payment-currency-editor/payment-currency-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadCurrencyData, LoadingCurrency, getCurrency, isLoadingCurrency, showEditorCurrency, ShowEditorCurrency, HideEditorCurrency, DeleteCurrency } from '../../../../store/dependencies/payment-currency';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-payrl-payment-currencies',
  templateUrl: './payment-currencies.component.html',
  styleUrls: ['./payment-currencies.component.scss']
})
export class PaymentCurrenciesComponent implements OnInit {

  currencyData$: Observable<ICurrency[]>;
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('editor') editor: PaymentCurrencyEditorComponent;
  @ViewChild('currencyGrid') currencyGrid: IgxGridComponent;

  constructor(private store: Store<IRootState>, private dialogService: DialogService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadCurrencyData());
    this.store.dispatch(new LoadingCurrency())
   }

  storeSelects() {
    this.currencyData$ = this.store.pipe(select(getCurrency));
    this.isLoading$ = this.store.pipe(select(isLoadingCurrency));
    this.showEditor$ = this.store.pipe(select(showEditorCurrency))
  }


  onAdd() {
    this.editor.reset();
this.store.dispatch(new ShowEditorCurrency());
}

getRowCurrencyData$(rowId: number): Observable<ICurrency> {
  console.log('data row', rowId);
  return this.currencyData$.pipe(
    map(d => d.filter(v => v.id === rowId)),
    map(e => e.shift()))
}

onEditIconClicked(row_id:number){
  this.editor.data = null;
    this.getRowCurrencyData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorCurrency());
      }
      );
}

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete this item?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingCurrency());
        this.store.dispatch(new DeleteCurrency({ recordId: rowId }));
      }
    });
}

onRefresh(){
this.store.dispatch(new LoadCurrencyData());
this.store.dispatch(new ShowToast({title: null, message: `Payment Currencies was refreshed successfully.`, type: ToastTypes.INFO}));
}

onCancelEditor(){
 this.store.dispatch(new HideEditorCurrency());
}

}
