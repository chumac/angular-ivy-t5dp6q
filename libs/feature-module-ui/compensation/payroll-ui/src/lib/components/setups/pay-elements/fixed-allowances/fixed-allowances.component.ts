import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { FixedAllowanceEditorComponent } from './fixed-allowance-editor/fixed-allowance-editor.component';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';
import { IFixedAllowance, IFixedAllowanceRate } from '@nutela/models/compensation/payroll';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { IRootState } from '../../../../store/root/root.state';
import { LoadDataFixedAllowance, LoadingFixedAllowance, isLoadingFixedAllowance, showEditorFixedAllowance, ShowEditorFixedAllowance, HideEditorFixedAllowance, ShowViewerFixedAllowance, NotProcessingFixedAllowance, DeleteFixedAllowance, HideViewerFixedAllowance, showViewerFixedAllowance, getDataFixedAllowance, LoadFilteredFixedAllowance, getFilteredFixedAllowance, ShowRateEditorFixedAllowance, HideRateEditorFixedAllowance, showRateEditorFixedAllowance, ShowConfigureEditorFixedAllowance, showConfigureEditorFixedAllowance, HideConfigureEditorFixedAllowance, getCriteriaConfigurationDataFixedAllowance, getCriteriaConfigurationCheckFixedAllowance, LoadCriteriaConfigurationCheckFixedAllowance, LoadDataCriteriaConfigurationFixedAllowance, LoadGlobalRatesFixedAllowance, getGlobalRatesFixedAllowance, DeleteGlobalRateFixedAllowance, LoadCriteriaConfigurationCheckFixedAllowanceSuccess } from '../../../../store/pay-elements/fixed-allowance';
import { LoadPayrollProfileSelectOption, getPayrollProfileSelectOption } from '../../../../store/dependencies/profile';
import { FixedAllowanceService } from './fixed-allowances.service';
import { FixedAllowanceViewerComponent } from './fixed-allowance-viewer';
import { FixedAllowanceRateEditorComponent } from './fixed-allowance-rate-editor/fixed-allowance-rate-editor.component';
import { FixedAllowanceConfigureEditorComponent } from './fixed-allowance-configure-editor/fixed-allowance-configure-editor.component';

@Component({
  selector: 'x365-fm-payrl-fixed-allowances',
  templateUrl: './fixed-allowances.component.html',
  styleUrls: ['./fixed-allowances.component.scss'],
  providers: [FixedAllowanceService]
})

export class FixedAllowancesComponent implements OnInit, OnDestroy {
  private subscriptions: ISubscriptions = {};
  selectedProfile: number = 0;

  filteredFixedAllowanceData$: Observable<IFixedAllowance[]>;
  globalRates$: Observable<any[]>;
  fixedAllowanceData$: Observable<IFixedAllowance[]>;
  awaitingApprovalData$: Observable<IFixedAllowance[]>;
  showEditor$: Observable<boolean>;
  showRateEditor$: Observable<boolean>;
  showConfigureEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  payrollProfileSelectOption$: Observable<ISelectOption[]>;
  criteriaConfiguration$: Observable<any>;
  criteriaCheck$: Observable<any>;

  @ViewChild('editor') editor: FixedAllowanceEditorComponent;
  @ViewChild('rateEditor') rateEditor: FixedAllowanceRateEditorComponent;
  @ViewChild('configureEditor') configureEditor: FixedAllowanceConfigureEditorComponent;
  @ViewChild('viewer') viewer: FixedAllowanceViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('globalRates') globalRates: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  destroyCriteriaCheck$: Subject<boolean> = new Subject<boolean>();
  destroyCriteriaConfigSubscription$: Subject<boolean> = new Subject<boolean>();
  destroyFilterSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService, private router: Router, public service: FixedAllowanceService, private utilService: UtilService) {
    titleService.setTitle(
      `${'Fixed Allowance Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.initialDispatchFilteredAllowances()
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFixedAllowance());
    this.store.dispatch(new LoadDataFixedAllowance());
    this.store.dispatch(new LoadPayrollProfileSelectOption({useNoneOption: true}))
    this.store.dispatch(new LoadGlobalRatesFixedAllowance())

  }

  storeSelects() {
    this.filteredFixedAllowanceData$ = this.store.pipe(select(getFilteredFixedAllowance));
    this.fixedAllowanceData$ = this.store.pipe(select(getDataFixedAllowance));
    this.globalRates$ = this.store.pipe(select(getGlobalRatesFixedAllowance));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedAllowance));
    this.showEditor$ = this.store.pipe(select(showEditorFixedAllowance));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedAllowance));
    this.showConfigureEditor$ = this.store.pipe(select(showConfigureEditorFixedAllowance));
    this.showViewer$ = this.store.pipe(select(showViewerFixedAllowance));
    this.payrollProfileSelectOption$ = this.store.pipe(select(getPayrollProfileSelectOption))
    this.criteriaCheck$ = this.store.pipe(select(getCriteriaConfigurationCheckFixedAllowance))
    this.criteriaConfiguration$ = this.store.pipe(select(getCriteriaConfigurationDataFixedAllowance))
  }

  initialDispatchFilteredAllowances() {
    this.fixedAllowanceData$.pipe(takeUntil(this.destroyFilterSubscription$)).subscribe(val => {
      if (val.length) {
        this.destroyFilterSubscription$.next(true)
        this.store.dispatch(new LoadFilteredFixedAllowance({ payrollProfileId: 0 }));
      }
    })
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
    } else if (this.globalRates) {
      this.service.search(
        this.globalRates,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IFixedAllowance> {
    return this.filteredFixedAllowanceData$.pipe(
      map(d => d.filter(v => v.allowance_id === rowId)),
      map(e => e.shift()))
  }

  getGlobalRateRowData$(rowId: number): Observable<any> {
    return this.globalRates$.pipe(
      map(d => d.filter(v => v.allowance_id === rowId)),
      map(e => e.shift()))
  }

  onProfileSelected(event: any) {
    this.store.dispatch(new LoadFilteredFixedAllowance({ payrollProfileId: event }));
  }


  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerFixedAllowance());
        this.store.dispatch(new NotProcessingFixedAllowance());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorFixedAllowance());
      });
  }

  onEditGlobalIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.getGlobalRateRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.isGlobal = true;
        this.rateEditor.data = result;
        this.rateEditor.reset();
        this.store.dispatch(new ShowRateEditorFixedAllowance());
      });
  }

  onSetRateIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.store.dispatch(new LoadCriteriaConfigurationCheckFixedAllowanceSuccess(null))
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.fixedAllowanceId = rowId;
        if (result.eligibility === 0) {
          this.router.navigate([STANDARD_ROUTES.fixedAllowanceEmployeeRates, result.allowance_id])
        } else if (result.eligibility === 1) {
          this.router.navigate([STANDARD_ROUTES.fixedAllowancePaygroupRates, result.allowance_id])
        } else if (result.eligibility === 2) {
          this.rateEditor.isGlobal = true;
          this.rateEditor.data = result;
          this.rateEditor.fixedAllowanceId = result.allowance_id;
          this.rateEditor.paygroupId = null;
          this.rateEditor.employeeId = null;
          this.store.dispatch(new ShowRateEditorFixedAllowance());
        } else if (result.eligibility === 3) {
          this.store.dispatch(new LoadCriteriaConfigurationCheckFixedAllowance({ recordId: result.allowance_id }))
          this.criteriaCheck$.pipe(takeUntil(this.destroyCriteriaCheck$)).subscribe(val => {
            if (val) {
              this.destroyCriteriaCheck$.next(true);
              if (val.is_configured === 1) {
                this.router.navigate([STANDARD_ROUTES.fixedAllowancePaygroupRates, result.allowance_id])
              } else if (val.is_configured === 2) {
                this.rateEditor.isGlobal = true;
                this.rateEditor.eligibility = result.eligibility;
                this.rateEditor.fixedAllowanceId = result.allowance_id;
                this.rateEditor.paygroupId = null;
                this.rateEditor.employeeId = null;
                this.store.dispatch(new ShowRateEditorFixedAllowance());
              } else if ( val.is_configured === 0) {
                this.store.dispatch(new ShowToast({ title: 'Account Not Configured', message: 'Kindly configure this allowance then proceed', type: ToastTypes.INFO }));
              }
            }
          })
        }
      });
  }

  onViewGlobalClicked() {
    this.router.navigate([STANDARD_ROUTES.fixedAllowanceGlobalRates])
  }
  onConfigureIconClicked(rowId: number) {
    this.configureEditor.reset();
    this.store.dispatch(new LoadDataCriteriaConfigurationFixedAllowance({ recordId: rowId }));
    this.configureEditor.data = null;
    this.configureEditor.allowanceInfo = null;
    this.criteriaConfiguration$.pipe(takeUntil(this.destroyCriteriaConfigSubscription$)).subscribe(val => {
      if (val) {
        this.destroyCriteriaConfigSubscription$.next(true);
        this.configureEditor.data = val[0] ? val[0] : null;
        if (!this.configureEditor.data) {
          this.getRowData$(rowId).pipe(take(1)).subscribe(val => {
            this.configureEditor.allowanceInfo = { allowance_id: val.allowance_id, description: val.description }
          })
        }
        this.store.dispatch(new ShowConfigureEditorFixedAllowance());
      }
    })
  }

  onDeleteIconClicked(rowId: number, isGlobal: boolean) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        if (isGlobal) {
          this.store.dispatch(new DeleteGlobalRateFixedAllowance({ recordId: rowId }));
        } else {
          this.store.dispatch(new DeleteFixedAllowance({ recordId: rowId, payrollProfile: this.selectedProfile }));
        }
      }
    });
  }

  onAddButtonClicked() {
    this.editor.reset();
    this.editor.initializeDisabledFields();
    this.store.dispatch(new ShowEditorFixedAllowance());
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.selectedProfile = null;
    this.store.dispatch(new ShowToast({ title: null, message: ` Fixed Allowance data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.unsubscribe();
    this.store.dispatch(new HideEditorFixedAllowance());
    this.store.dispatch(new HideRateEditorFixedAllowance());
    this.store.dispatch(new HideConfigureEditorFixedAllowance());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFixedAllowance());
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


