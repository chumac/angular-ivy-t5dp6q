import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IBank } from '@nutela/models/compensation/payroll';
import { BankEditorComponent } from './bank-editor/bank-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadBankData, LoadingBank, getBank, isLoadingBank, showEditorBank, ShowEditorBank, HideEditorBank, DeleteBank } from '../../../../store/dependencies/bank';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IgxGridComponent, } from 'igniteui-angular';
import { map, take } from 'rxjs/operators';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { BankService } from './banks.service';

@Component({
  selector: 'x365-fm-payrl-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
  providers: [BankService]
})
export class BanksComponent implements OnInit {
  bankData$: Observable<IBank[]>;
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('editor') editor: BankEditorComponent;
  @ViewChild('bankGrid') bankGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(private store: Store<IRootState>, private dialogService: DialogService, public service: BankService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadBankData());
    this.store.dispatch(new LoadingBank())
   }

  storeSelects() {
    this.bankData$ = this.store.pipe(select(getBank));
    this.isLoading$ = this.store.pipe(select(isLoadingBank));
    this.showEditor$ = this.store.pipe(select(showEditorBank))
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

    if (this.bankGrid) {
      this.service.search(
        this.bankGrid,
        searchString,
        filterBy
      );
    }
  }

  getBankData$(rowId: number): Observable<IBank>{
  return this.bankData$.pipe(
    map(d => d.filter(v => v.bank_id === rowId)),
    map(e => e.shift()))
}

  onAdd() {
    this.editor.reset();
    this.store.dispatch(new ShowEditorBank());
  }

onEditIconClicked(rowId){
    this.getBankData$(rowId).pipe(take(1))
    .subscribe(result=>{
      this.editor.data=result;
      this.editor.reset();
      this.store.dispatch(new ShowEditorBank());
    })
  }

  onArchiveIconClicked(rowId){
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to archive this item?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingBank());
        this.store.dispatch(new DeleteBank({ recordId: rowId }));
      }
    });
  }



onRefresh(){
this.store.dispatch(new LoadBankData());
this.store.dispatch(new ShowToast({title: null, message: ` Bank data is being refreshed.`, type: ToastTypes.INFO}));
}

onCancelEditor(){
 this.store.dispatch(new HideEditorBank());
}

}
