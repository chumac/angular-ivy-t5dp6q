import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { IgxGridComponent } from 'igniteui-angular';
import { ISelectOption } from '@nutela/models/core-data';
import { Title } from '@angular/platform-browser';
import { PendingService } from './pending.service';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { Router } from '@angular/router';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../../../../store';
import {
  IPromotion,
  IPromotionSubmit
} from '@nutela/models/workforce/employee-profiles';
import {
  showEditorPromotion,
  showViewerPromotion,
  isLoadingPromotion,
  getPendingDataPromotion,
  getPaygradeSelectOptionDataPromotion,
  getPaygroupSelectOptionDataPromotion,
  getArrearsStatusDataPromotion,
  LoadPendingDataPromotion,
  LoadArrearsStatusDataPromotion,
  ShowEditorPromotion,
  HideEditorPromotion,
  showSubmissionProcessEditorPromotion,
  ShowSubmissionProcessEditorPromotion,
  HideSubmissionProcessEditorPromotion,
  getSubmissionProcessSelectOptionDataPromotion,
  LoadSubmissionProcessDataPromotion,
  LoadPaygradeDataPromotion,
  LoadSelectedPromotion,
  getActionDataPromotion,
  SubmitDataPromotion,
  DeleteDataPromotion,
  getCurrentPaygroupSelectOptionDataPromotion,
  LoadActionDataPromotion,
  LoadCurrentPaygroupDataPromotion,
  ShowViewerPromotion,
  NotProcessingPromotion,
  HideViewerPromotion,
  getSelectedPromotion
} from '../../../../../store/hr-transactions/promotion';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take, map } from 'rxjs/operators';
import { PromotionEditorComponent } from '../promotion-editor/promotion-editor.component';
import { PromotionViewerComponent } from '../promotion-viewer';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-promotions-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit, OnDestroy {
  multipleSelected: boolean = false;
  selectedItems: any[];

  showEditor$: Observable<boolean>;
  showSubmissionProcessEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  pendingPromotionsData$: Observable<IPromotion[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  paygradeSelectOption$: Observable<ISelectOption[]>;
  paygroupSelectOption$: Observable<ISelectOption[]>;
  currentPaygroupSelectOption$: Observable<ISelectOption[]>;
  arrearsStatusSelectOption$: Observable<ISelectOption[]>;
  actionSelectOption$: Observable<ISelectOption[]>;
  submissionProcess$: Observable<ISelectOption[]>;

  @ViewChild('pendingPromotionDataGrid', { read: IgxGridComponent })
  pendingPromotionDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('editor') editor: PromotionEditorComponent;
  @ViewChild('viewer') viewer: PromotionViewerComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: PendingService,
    private store: Store<IEmployeesProfileState>,
    public utilService: UtilService,
    public router: Router,
    private dialogBoxService: DialogBoxService
  ) {
    titleService.setTitle(
      `${'Pending Promotions Transaction'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPromotion));
    this.showSubmissionProcessEditor$ = this.store.pipe(
      select(showSubmissionProcessEditorPromotion)
    );
    this.showViewer$ = this.store.pipe(select(showViewerPromotion));
    this.isLoading$ = this.store.pipe(select(isLoadingPromotion));
    this.pendingPromotionsData$ = this.store.pipe(
      select(getPendingDataPromotion)
    );
    this.paygradeSelectOption$ = this.store.pipe(
      select(getPaygradeSelectOptionDataPromotion)
    );
    this.paygroupSelectOption$ = this.store.pipe(
      select(getPaygroupSelectOptionDataPromotion)
    );
    this.currentPaygroupSelectOption$ = this.store.pipe(
      select(getCurrentPaygroupSelectOptionDataPromotion)
    );
    this.arrearsStatusSelectOption$ = this.store.pipe(
      select(getArrearsStatusDataPromotion)
    );
    this.actionSelectOption$ = this.store.pipe(select(getActionDataPromotion));
    this.submissionProcess$ = this.store.pipe(
      select(getSubmissionProcessSelectOptionDataPromotion)
    );

    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
  }

  storeDispatches() {
    this.store.dispatch(new LoadPendingDataPromotion());
    this.store.dispatch(new LoadArrearsStatusDataPromotion());
    this.store.dispatch(new LoadActionDataPromotion());
    this.store.dispatch(new LoadPaygradeDataPromotion());
    this.store.dispatch(new LoadCurrentPaygroupDataPromotion());
    this.store.dispatch(new LoadSubmissionProcessDataPromotion());
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

    if (this.pendingPromotionDataGrid) {
      this.service.search(
        this.pendingPromotionDataGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IPromotion> {
    return this.pendingPromotionsData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift())
    );
  }

  onRefresh() {
    this.store.dispatch(new LoadPendingDataPromotion());
    this.store.dispatch(
      new ShowToast({
        title: null,
        message: `Data is being refreshed.`,
        type: ToastTypes.INFO
      })
    );
  }

  onViewSubmitedClicked() {
    let componentName: string = 'submitted';
    this.router.navigate([`${STANDARD_ROUTES.hrPromotions}/${componentName}`]);
  }

  onAdd() {
    this.store.dispatch(new ShowEditorPromotion());
  }

  onSubmitButtonClicked() {
    this.store.dispatch(new LoadSelectedPromotion(this.pendingPromotionDataGrid.selectedRows()));
    this.store.dispatch(new ShowSubmissionProcessEditorPromotion());
  }

  onSubmitIconClicked(rowId: number) {
    let record: IPromotionSubmit[] = [{ promotion_id: rowId }];
    this.dialogBoxService
      .show(`Are you sure you want to submit this item?`)
      .pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(
            new SubmitDataPromotion({ data: <IPromotionSubmit[]>record })
          );
        }
      });
  }

  onRowClickChange(e) {
    if (e.newSelection.length > 1) {
      this.multipleSelected = true;
    } else {
      this.multipleSelected = false;
    }
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPromotion());
        this.store.dispatch(new NotProcessingPromotion());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService
      .show(`Are you sure you want to delete this item?`)
      .pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPromotion({ promotion_id: rowId }));
        }
      });
  }

  onCancelPromotionEditor() {
    this.store.dispatch(new HideEditorPromotion());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPromotion());
  }

  onFormAction(event) {
    this.pendingPromotionDataGrid.deselectAllRows();
  }
  onCancelSubmissionProcessEditor() {
    this.store.dispatch(new HideSubmissionProcessEditorPromotion());
  }

  ngOnDestroy() {

  }
}
