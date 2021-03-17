
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { HideEditorSubscription, ShowEditorSubscription, ShowViewerSubscription, HideViewerSubscription, showEditorSubscription, showViewerSubscription, getSubscriptionApprovedData, getSubscriptionAwaitingApprovalData, LoadApprovedDataSubscription, LoadAwaitingApprovalDataSubscription, getSubscriptionTypeSubscription, LoadSubscriptionTypeSubscription, getSubscriptionCurrencyList, LoadCurrencyListSubscription, LoadDataSubscription, isProcessingSubscription, ProcessingSubscription } from '../../store/subscription';
import { Observable } from 'rxjs/internal/Observable';
import { ISubscription, ISubscriptionType } from '@nutela/models/workforce/subscription';
import { map, take } from 'rxjs/operators';
import { SubscriptionsEditorComponent } from './subscriptions-editor/subscriptions-editor.component';
import { SubscriptionsViewerComponent } from './subscriptions-viewer/subscriptions-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { GRID_HEADERS } from '../../constants';
import { SwitchComponent } from '@nutela/shared/ui';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import { ToastTypes } from '@nutela/shared/app-global';
import { APPROVAL_STATUS } from '../../constants'

@Component({
  selector: 'x365-fm-workforce-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;


  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  subscriptionData$: Observable<ISubscription[]>;
  approvedData$: Observable<ISubscription[]>;
  awaitingApprovalData$: Observable<ISubscription[]>;
  subscriptionType$: Observable<ISubscriptionType[]>;
  currencyList$: Observable<any[]>;
  dropDownFilterValue: string;
  approvedDataGridHeader = GRID_HEADERS;
  approvalStatus = APPROVAL_STATUS;

  @ViewChild('editor') editor: SubscriptionsEditorComponent;
  @ViewChild('viewer') viewer: SubscriptionsViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;

  constructor(private store: Store<IAppState>, private dialogBoxService: DialogBoxService, public utilService: UtilService,) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorSubscription));
    this.showViewer$ = this.store.pipe(select(showViewerSubscription));
    this.isProcessing$ = this.store.pipe(select(isProcessingSubscription));


    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getSubscriptionApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getSubscriptionAwaitingApprovalData));
    this.subscriptionType$ = this.store.pipe(select(getSubscriptionTypeSubscription));
    this.currencyList$ = this.store.pipe(select(getSubscriptionCurrencyList));

  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataSubscription());
    this.store.dispatch(new LoadAwaitingApprovalDataSubscription());
    this.store.dispatch(new LoadSubscriptionTypeSubscription());
    this.store.dispatch(new LoadCurrencyListSubscription());
  }

  getRowApprovedData$(rowId: number): Observable<ISubscription> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<ISubscription> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onApplyBtnClicked() {
    this.store.dispatch(new ShowEditorSubscription());
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new LoadApprovedDataSubscription());
    this.store.dispatch(new LoadAwaitingApprovalDataSubscription());
    this.store.dispatch(new ShowToast({title: null, message: `Subscription Information is being refreshed.`, type: ToastTypes.INFO}));

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new ShowViewerSubscription());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSubscription());
        }
      );
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.doc_url === null || result.doc_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.utilService.openBase64URL(this.utilService.getSafeBase64URL(result.doc_binary, this.utilService.getMimeType(result.doc_extension)));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.doc_url === null || result.doc_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.utilService.openBase64URL(this.utilService.getSafeBase64URL(result.doc_binary, this.utilService.getMimeType(result.doc_extension)));
          }
        }
      );
  }

  filter(term: string, filterValue: string) {
    if(!this.switch.value) {
      if (this.approvedDataGrid) {
        if (filterValue) {
          this.approvedDataGrid.clearFilter();
          this.approvedDataGrid.filteringLogic = FilteringLogic.Or;
          this.approvedDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.approvedDataGrid.clearFilter();
          this.approvedDataGrid.filteringLogic = FilteringLogic.Or;
          this.approvedDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }

    if(this.switch.value) {
      if (this.awaitingApprovalDataGrid) {
        if (filterValue) {
          this.awaitingApprovalDataGrid.clearFilter();
          this.awaitingApprovalDataGrid.filteringLogic = FilteringLogic.Or;
          this.awaitingApprovalDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.awaitingApprovalDataGrid.clearFilter();
          this.awaitingApprovalDataGrid.filteringLogic = FilteringLogic.Or;
          this.awaitingApprovalDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorSubscription());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerSubscription());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
