import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDefaultCurrency } from '@nutela/models/compensation/payroll';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { LoadDefaultCurrencyData, getDefaultCurrency, isLoadingDefaultCurrency, showEditorDefaultCurrency, ShowEditorDefaultCurrency, HideEditorDefaultCurrency, LoadingDefaultCurrency } from '../../../../store/dependencies/default-currency';
import { DefaultCurrencyEditorComponent } from './default-currency-editor/default-currency-editor.component';
import {
  IgxGridComponent,
} from 'igniteui-angular';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { map, take } from 'rxjs/operators';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { DefaultCurrenciesService } from './default-currencies.service';

@Component({
  selector: 'x365-fm-payrl-default-currencies',
  templateUrl: './default-currencies.component.html',
  styleUrls: ['./default-currencies.component.scss'],
  providers: [DefaultCurrenciesService]
})
export class DefaultCurrenciesComponent implements OnInit {
  defaultCurrencyData$: Observable<IDefaultCurrency[]>;
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  @ViewChild('editor') editor: DefaultCurrencyEditorComponent;
  @ViewChild('defaultCurrencyGrid') defaultCurrencyGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: DefaultCurrenciesService, private store: Store<IRootState>,
    public utilService: UtilService) {
    titleService.setTitle(
      `${'Default Currency Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadDefaultCurrencyData());
    this.store.dispatch(new LoadingDefaultCurrency())
  }

  storeSelects() {
    this.defaultCurrencyData$ = this.store.pipe(select(getDefaultCurrency));
    this.isLoading$ = this.store.pipe(select(isLoadingDefaultCurrency));
    this.showEditor$ = this.store.pipe(select(showEditorDefaultCurrency))
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

    if (this.defaultCurrencyGrid) {
      this.service.search(
        this.defaultCurrencyGrid,
        searchString,
        filterBy
      );
    }
  }


  getRowData$(rowId: number): Observable<IDefaultCurrency> {
    return this.defaultCurrencyData$.pipe(
      map(d => d.filter(v => v.currency_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowData$(row_id).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorDefaultCurrency());
      }
      );
  }


  onRefresh() {
    this.store.dispatch(new LoadDefaultCurrencyData());
    this.store.dispatch(new ShowToast({ title: null, message: ` DefaultCurrency data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorDefaultCurrency());
  }
}
