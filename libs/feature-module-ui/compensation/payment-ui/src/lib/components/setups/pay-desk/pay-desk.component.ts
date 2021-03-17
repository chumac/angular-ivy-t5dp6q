import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPayDesk, IPaymentPlatform } from '@nutela/models/compensation/payment';
import { DxLookupComponent } from 'devextreme-angular';
import { IgxGridComponent } from 'igniteui-angular';
import { PayDeskService } from './pay-desk.service';
import { Title } from '@angular/platform-browser';
import { IRootState } from '../../../store/root';
import { Store, select } from '@ngrx/store';
import { getPayDeskData, LoadData, ShowEditor, showEditor, getPaymentPlatformData, LoadPaymentPlatformData, HideEditor } from '../../../store/setup/pay-desk';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-cmp-payment-pay-desk',
  templateUrl: './pay-desk.component.html',
  styleUrls: ['./pay-desk.component.scss']
})
export class PayDeskComponent implements OnInit {

  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  payDeskData$: Observable<IPayDesk[]>;
  paymentPlatformData$: Observable<IPaymentPlatform[]>;

  @ViewChild("payDeskDataGrid") payDeskDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: DxLookupComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: PayDeskService, private store: Store<IRootState>) {
    titleService.setTitle(
      `${'Pay Desk'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.payDeskData$ = this.store.pipe(select(getPayDeskData));
    this.paymentPlatformData$ = this.store.pipe(select(getPaymentPlatformData));
    this.showEditor$ = this.store.pipe(select(showEditor))
  }

  storeDispatches() {
    this.store.dispatch(new LoadData())
    this.store.dispatch(new LoadPaymentPlatformData())
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

    if (this.payDeskDataGrid) {
      this.service.search(
        this.payDeskDataGrid,
        searchString,
        filterBy
      );
    }
  };

  onViewIconClicked(val) {

  }

  onAdd() {
    this.store.dispatch(new ShowEditor());
  }
  onRefresh() {
    this.store.dispatch(new LoadData())
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditor);
  }
}
