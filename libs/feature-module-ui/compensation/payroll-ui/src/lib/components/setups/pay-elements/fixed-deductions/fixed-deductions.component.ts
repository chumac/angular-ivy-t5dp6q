import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IFixedDeduction, IFixedDeductionRate } from '@nutela/models/compensation/payroll';
import { ShowToast } from '@nutela/store/shared';
import { ISubscriptions } from '@nutela/models/common';
import { DialogService } from '@nutela/shared/ui';
import { UtilService } from '@nutela/core-services';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';

import { FixedDeductionEditorComponent } from './fixed-deduction-editor/fixed-deduction-editor.component';
import { IRootState } from '../../../../store/root/root.state';
import { LoadDataFixedDeduction, LoadingFixedDeduction, isLoadingFixedDeduction, showEditorFixedDeduction, ShowEditorFixedDeduction, HideEditorFixedDeduction, ShowViewerFixedDeduction, NotProcessingFixedDeduction, DeleteFixedDeduction, HideViewerFixedDeduction, showViewerFixedDeduction, getDataFixedDeduction, ShowRateEditorFixedDeduction, HideRateEditorFixedDeduction, showRateEditorFixedDeduction, ShowConfigureEditorFixedDeduction, showConfigureEditorFixedDeduction, HideConfigureEditorFixedDeduction, getCriteriaConfigurationDataFixedDeduction, getCriteriaConfigurationCheckFixedDeduction, LoadCriteriaConfigurationCheckFixedDeduction, LoadDataCriteriaConfigurationFixedDeduction, LoadGlobalRatesFixedDeduction, getGlobalRatesFixedDeduction, DeleteGlobalRateFixedDeduction, LoadCriteriaConfigurationCheckFixedDeductionSuccess } from '../../../../store/pay-elements/fixed-deduction';
import { FixedDeductionsService } from './fixed-deductions.service';
import { FixedDeductionViewerComponent } from './fixed-deduction-viewer';
import { FixedDeductionRateEditorComponent } from './fixed-deduction-rate-editor/fixed-deduction-rate-editor.component';
import { FixedDeductionConfigureEditorComponent } from './fixed-deduction-configure-editor/fixed-deduction-configure-editor.component';

@Component({
  selector: 'x365-fm-payrl-fixed-deductions',
  templateUrl: './fixed-deductions.component.html',
  styleUrls: ['./fixed-deductions.component.scss'],
  providers: [FixedDeductionsService]
})

export class FixedDeductionsComponent implements OnInit, OnDestroy {

  private subscriptions: ISubscriptions = {};

  fixedDeductionData$: Observable<IFixedDeduction[]>;
  globalRates$: Observable<IFixedDeductionRate[]>;
  showEditor$: Observable<boolean>;
  showRateEditor$: Observable<boolean>;
  showConfigureEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  criteriaConfiguration$: Observable<any>;
  criteriaCheck$: Observable<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  destroyConf$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('editor') editor: FixedDeductionEditorComponent;
  @ViewChild('rateEditor') rateEditor: FixedDeductionRateEditorComponent;
  @ViewChild('configureEditor') configureEditor: FixedDeductionConfigureEditorComponent;
  @ViewChild('viewer') viewer: FixedDeductionViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('globalRatesGrid') globalRatesGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService, private router: Router, public service: FixedDeductionsService, private utilService: UtilService) {
    titleService.setTitle(
      `${'Fixed Deductions Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFixedDeduction());
    this.store.dispatch(new LoadDataFixedDeduction());
    this.store.dispatch(new LoadGlobalRatesFixedDeduction());
  }

  storeSelects() {
    this.fixedDeductionData$ = this.store.pipe(select(getDataFixedDeduction));
    this.globalRates$ = this.store.pipe(select(getGlobalRatesFixedDeduction));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedDeduction));
    this.showEditor$ = this.store.pipe(select(showEditorFixedDeduction));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedDeduction));
    this.showConfigureEditor$ = this.store.pipe(select(showConfigureEditorFixedDeduction));
    this.showViewer$ = this.store.pipe(select(showViewerFixedDeduction));
    this.criteriaCheck$ = this.store.pipe(select(getCriteriaConfigurationCheckFixedDeduction))
    this.criteriaConfiguration$ = this.store.pipe(select(getCriteriaConfigurationDataFixedDeduction))
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
    } else if (this.dataGrid) {
      this.service.search(
        this.globalRatesGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IFixedDeduction> {
    return this.fixedDeductionData$.pipe(
      map(d => d.filter(v => v.deduction_id === rowId)),
      map(e => e.shift()))
  }

  getGlobalRatesRowData$(rowId: number): Observable<IFixedDeductionRate> {
    return this.globalRates$.pipe(
      map(d => d.filter(v => v.fixeddeduct_id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerFixedDeduction());
        this.store.dispatch(new NotProcessingFixedDeduction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorFixedDeduction());
      });
  }

  onEditGlobalIconClicked(rowId: number) {
    this.editor.data = null;
    this.getGlobalRatesRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.data = result;
        this.rateEditor.reset();
        this.rateEditor.isGlobal = true;
        this.store.dispatch(new ShowRateEditorFixedDeduction());
      });
  }

  onSetRateIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.store.dispatch(new LoadCriteriaConfigurationCheckFixedDeductionSuccess(null))
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.fixedDeductionId = rowId;
        if (result.eligibility === 0) {
          this.router.navigate([STANDARD_ROUTES.fixedDeductionEmployeeRates, result.deduction_id])
        } else if (result.eligibility === 1) {
          this.router.navigate([STANDARD_ROUTES.fixedDeductionPaygroupRates, result.deduction_id])
        } else if (result.eligibility === 2) {
          this.rateEditor.isGlobal = true;
          this.rateEditor.data = result;
          this.store.dispatch(new ShowRateEditorFixedDeduction());
        } else if (result.eligibility === 3) {
          this.store.dispatch(new LoadCriteriaConfigurationCheckFixedDeduction({ recordId: result.deduction_id }))
          this.criteriaCheck$.pipe(takeUntil(this.destroy$)).subscribe(val => {
            if (val) {
              this.destroy$.next(true)
              if (val.is_configured === 1) {
                this.router.navigate([STANDARD_ROUTES.fixedDeductionPaygroupRates, result.deduction_id])
              } else if (val.is_configured === 2) {
                this.rateEditor.isGlobal = true;
                this.rateEditor.eligibility = result.eligibility;
                this.store.dispatch(new ShowRateEditorFixedDeduction());
              } else if (val.is_configured === 0) {
                this.store.dispatch(new ShowToast({ title: 'Account Not Configured', message: 'Kindly configure this deduction then proceed', type: ToastTypes.INFO }));
              }
            }
          })
        }
      });
  }

  onConfigureIconClicked(rowId: number) {
    this.configureEditor.reset();
    this.store.dispatch(new LoadDataCriteriaConfigurationFixedDeduction({ recordId: rowId }));
    this.configureEditor.data = null;
    this.configureEditor.deductionInfo = null;
    this.criteriaConfiguration$.pipe(takeUntil(this.destroyConf$)).subscribe(val => {
      if (val) {
        this.destroyConf$.next(true)
        this.configureEditor.data = val[0] ? val[0] : null;
        if (!this.configureEditor.data) {
          this.getRowData$(rowId).pipe(take(1)).subscribe(val => {
            this.configureEditor.deductionInfo = { deduction_id: val.deduction_id, description: val.description }
          })
        }
        this.store.dispatch(new ShowConfigureEditorFixedDeduction());
      }
    })
  }

  onDeleteIconClicked(rowId: number, isGlobal: boolean) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        if (isGlobal) {
          this.store.dispatch(new DeleteGlobalRateFixedDeduction({ recordId: rowId }));
        } else {
          this.store.dispatch(new DeleteFixedDeduction({ recordId: rowId }));
        }
      }
    });
  }

  onAddButtonClicked() {
    this.editor.reset();
    this.editor.initializeDisabledFields();
    this.store.dispatch(new ShowEditorFixedDeduction());
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.unsubscribe();
    this.store.dispatch(new HideEditorFixedDeduction());
    this.store.dispatch(new HideRateEditorFixedDeduction());
    this.store.dispatch(new HideConfigureEditorFixedDeduction());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFixedDeduction());
  }

  stopScubscription() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}


