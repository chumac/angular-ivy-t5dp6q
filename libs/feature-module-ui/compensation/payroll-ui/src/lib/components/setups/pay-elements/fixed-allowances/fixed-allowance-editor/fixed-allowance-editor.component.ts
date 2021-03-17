import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IFixedAllowance } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { FixedAllowanceEditorService } from './fixed-allowance-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingFixedAllowance, ProcessingFixedAllowance, SaveFixedAllowance, UpdateFixedAllowance, NotProcessingFixedAllowance, getCurrenciesFixedAllowance, getPayFormulaeFixedAllowance, getPayrollProfileFixedAllowance, LoadCurrencyListFixedAllowance, LoadPayFormulaListFixedAllowance, LoadPayrollProfileListFixedAllowance, getPaymentItemTypesFixedAllowance, LoadPaymentItemTypesFixedAllowance, LoadPaymentFrequencyListFixedAllowance, getPaymentFrequencyListFixedAllowance, getMonthListFixedAllowance, LoadMonthListFixedAllowance, getEligibilityListFixedAllowance, LoadEligibilityListFixedAllowance, getPayrollTypeListFixedAllowance, LoadPayrollTypeListFixedAllowance, LoadGroupListFixedAllowance, getGroupListFixedAllowance, getAllowanceListFixedAllowance, LoadAllowanceListFixedAllowance, getProrationDateTypeListFixedAllowance, LoadProrationDateTypeListFixedAllowance } from '../../../../../store/pay-elements/fixed-allowance';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-editor',
  templateUrl: './fixed-allowance-editor.component.html',
  styleUrls: ['./fixed-allowance-editor.component.scss'],
  providers: [FixedAllowanceEditorService],
})

export class FixedAllowanceEditorComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFixedAllowance;

  @Output() cancelClick = new EventEmitter<any>();

  public isProcessing$: Observable<boolean>;
  public currencyList$: Observable<ISelectOption[]>;
  public payFormulaList$: Observable<ISelectOption[]>;
  public payrollProfileList$: Observable<ISelectOption[]>;
  public startPeriodList$: Observable<ISelectOption[]>;
  public deductFrequencyList$: Observable<ISelectOption[]>;

  public paymentItemList$: Observable<ISelectOption[]>;
  public paymentFrequencyList$: Observable<ISelectOption[]>;
  public monthList$: Observable<ISelectOption[]>;
  public eligibilityList$: Observable<ISelectOption[]>;
  public payrollTypeList$: Observable<ISelectOption[]>;
  public groupList$: Observable<ISelectOption[]>;
  public allowanceList$: Observable<ISelectOption[]>;
  public prorationDateType$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && this.data) {
      this.fs.showGroupName = this.data.group_item;
      this.fs.showArrears = !!this.data.arrear_id;
      this.fs.showAccumulateAllowance = this.data.cumulate_allowance;
      this.fs.showMonthlyAllowance = this.data.link_to;
      this.fs.showAmotizedProfile = this.data.is_amortized;
      this.fs.init(this.data);
    }
  }

  constructor(
    public fs: FixedAllowanceEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFixedAllowance));
    this.currencyList$ = this.store.pipe(select(getCurrenciesFixedAllowance));
    this.payFormulaList$ = this.store.pipe(select(getPayFormulaeFixedAllowance));
    this.payrollProfileList$ = this.store.pipe(select(getPayrollProfileFixedAllowance));

    this.paymentItemList$ = this.store.pipe(select(getPaymentItemTypesFixedAllowance));
    this.paymentFrequencyList$ = this.store.pipe(select(getPaymentFrequencyListFixedAllowance));
    this.monthList$ = this.store.pipe(select(getMonthListFixedAllowance));
    this.eligibilityList$ = this.store.pipe(select(getEligibilityListFixedAllowance));
    this.payrollTypeList$ = this.store.pipe(select(getPayrollTypeListFixedAllowance));
    this.groupList$ = this.store.pipe(select(getGroupListFixedAllowance));
    this.allowanceList$ = this.store.pipe(select(getAllowanceListFixedAllowance));
    this.prorationDateType$ = this.store.pipe(select(getProrationDateTypeListFixedAllowance));
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrencyListFixedAllowance());
    this.store.dispatch(new LoadPayFormulaListFixedAllowance());
    this.store.dispatch(new LoadPayrollProfileListFixedAllowance());

    this.store.dispatch(new LoadPaymentItemTypesFixedAllowance());
    this.store.dispatch(new LoadPaymentFrequencyListFixedAllowance());
    this.store.dispatch(new LoadMonthListFixedAllowance());
    this.store.dispatch(new LoadEligibilityListFixedAllowance());
    this.store.dispatch(new LoadPayrollTypeListFixedAllowance());
    this.store.dispatch(new LoadGroupListFixedAllowance());
    this.store.dispatch(new LoadAllowanceListFixedAllowance());
    this.store.dispatch(new LoadProrationDateTypeListFixedAllowance());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onFrequencySelected(event: any) {
    const maxPayment = event.itemData.text_value;
    const maxPaymentHasValue = !!maxPayment;
    this.fs.triggerDisable({ maxPaymentHasValue, refresh: false });
    this.fs.maxPayment.setValue(maxPayment);
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingFixedAllowance());
      !this.inEditMode() ?
        this.store.dispatch(new SaveFixedAllowance({ data: this.fs.value })) :
      this.store.dispatch(new UpdateFixedAllowance({ data: this.fs.value, recordId: this.data.allowance_id }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingFixedAllowance());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm()
    this.fs.init(this.data);
    this.fs.triggerDisable({ maxPaymentHasValue: this.data ? this.data.pay_frequency : null, refresh: true });
  }

  initializeDisabledFields() {
    this.fs.triggerDisable({ maxPaymentHasValue: null, refresh: true });
  }
}

