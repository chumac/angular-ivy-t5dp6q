import { Component, OnInit, ViewChild, Inject, ElementRef, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { map, take, takeUntil } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { RunService } from './run.service';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IRootState } from '../../../store/root/root.state';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { RunEditorComponent } from './run-editor/run-editor.component';
import { isLoadingPayrollRun, showEditorPayrollRun, getPayrollProfileData, getPayrollRunGroupSelectOption, LoadingPayrollRun, LoadPayrollProfileData, LoadPayrollGroupSelectOptionData, ShowEditorPayrollRun, HideEditorPayrollRun, LoadPaymentGroupSelectOptionData, LoadPayGradeSelectOptionData, getPaymentGroupSelectOption, getPayGradeSelectOption, LoadPossibleReturnsData, ShowRecoverEditorPayrollRun, HideRecoverEditorPayrollRun, showRecoverEditorPayrollRun, getBrResponseBeforeRun, LoadCanRunData } from '../../../store/execution/run';
import { Router } from '@angular/router';
import { ISubscriptions } from '@nutela/models/common';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { formatDate } from '@nutela/core-services';
import { RecoverEditorComponent } from './recover-editor/recover-editor.component';

@Component({
  selector: 'x365-fm-payrl-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  dropDownFilterValue: string;
  employee_id: number;
  subscribe: any;

  showEditor$: Observable<boolean>;
  showViewerRepaymentSchedule$: Observable<boolean>;
  showViewerGenericSchedule$: Observable<boolean>
  isLoading$: Observable<boolean>;
  payrollProfileData$: Observable<IPayrollProfile[]>;
  payrollGroup$: Observable<any[]>;
  paymentGroupData$: Observable<any[]>;
  employeeData$: Observable<any[]>;
  gradeData$: Observable<any[]>;
  showRecoverEditor$: Observable<boolean>;
  getRunStatus$: Observable<any>;

  private subscriptions: ISubscriptions = {};
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild("payrollProfileDataGrid") payrollProfileDataGrid: IgxGridComponent;
  @ViewChild("editor") editor: RunEditorComponent;
  @ViewChild("recoverEditor") recoverEditor: RecoverEditorComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: RunService, private store: Store<IRootState>, private router: Router) {
    titleService.setTitle(
      `${'Payroll Run'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingPayrollRun));
    this.showEditor$ = this.store.pipe(select(showEditorPayrollRun));
    this.showRecoverEditor$ = this.store.pipe(select(showRecoverEditorPayrollRun));
    this.payrollProfileData$ = this.store.pipe(select(getPayrollProfileData));
    this.payrollGroup$ = this.store.pipe(select(getPayrollRunGroupSelectOption));
    this.paymentGroupData$ = this.store.pipe(select(getPaymentGroupSelectOption));
    this.employeeData$ = this.store.pipe(select(getActivePersonnelHR));
    this.gradeData$ = this.store.pipe(select(getPayGradeSelectOption));
    this.getRunStatus$ = this.store.pipe(select(getBrResponseBeforeRun));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingPayrollRun());
    this.store.dispatch(new LoadPayrollProfileData());
    this.store.dispatch(new LoadPayrollGroupSelectOptionData());
    this.store.dispatch(new LoadPaymentGroupSelectOptionData());
    this.store.dispatch(new LoadPayGradeSelectOptionData());
  }


  getRowData$(rowId: number): Observable<IPayrollProfile> {
    return this.payrollProfileData$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {

  }

  onRefresh() {
    this.store.dispatch(new LoadPayrollProfileData());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
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

    if (this.payrollProfileDataGrid) {
      this.service.search(
        this.payrollProfileDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onRunIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(payrollProfile => {
      if (payrollProfile) {
        const payrollDate = formatDate(payrollProfile.current_period);
        this.store.dispatch(new LoadCanRunData({ payrollProfileId: rowId, payrollDate }))
        this.subscribe = this.getRunStatus$.pipe(takeUntil(this.destroy$)).subscribe(val => {
          if (val) {
            console.log({val})
            this.destroy$.next(true)
            this.editor.data = { ...payrollProfile, exchange_rate: payrollProfile.exchange_rate ? payrollProfile.exchange_rate : 1.0};
            payrollProfile.has_last_run ? this.editor.warningMessage = "This action will overwrite an existing payroll run." : this.editor.warningMessage = null;
            this.editor.setDefaultFields(payrollProfile.payroll_profile_id);
            this.store.dispatch(new ShowEditorPayrollRun());
          }
        })
      }
    })
  }

  onReviewIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.lastRuns}/${rowId}`])
  }

  onRecoverIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(rowData => {
      const payrollDate = formatDate(rowData.current_period);
      this.store.dispatch(new LoadPossibleReturnsData({ payrollProfileID: rowId, payrollDate }));
      this.recoverEditor.payrollProfileID = rowId;
      this.store.dispatch(new ShowRecoverEditorPayrollRun());
    })
  }

  onRunIntegration(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.integratePayroll}/${rowId}`])
  }

  hasMulticurrency(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        status = result.use_multi_currency;
      });

    return status;
  }

  onCancelEditor() {
    this.editor.data = null;
    this.store.dispatch(new HideEditorPayrollRun());
    this.store.dispatch(new HideRecoverEditorPayrollRun());
  }

  unsubscribe() {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }

  ngOnDestroy() {
    this.unsubscribe();

  }
}
