import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IFixedDeduction } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { FixedDeductionEditorService } from './fixed-deduction-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingFixedDeduction, ProcessingFixedDeduction, SaveFixedDeduction, UpdateFixedDeduction, NotProcessingFixedDeduction, getCurrenciesFixedDeduction, getDeductFormulaeFixedDeduction, getPayrollProfileFixedDeduction, LoadCurrencyListFixedDeduction, LoadDeductFormulaListFixedDeduction, LoadPayrollProfileListFixedDeduction, getPaymentItemTypesFixedDeduction, LoadPaymentItemTypesFixedDeduction, LoadPaymentFrequencyListFixedDeduction, getPaymentFrequencyListFixedDeduction, getMonthListFixedDeduction, LoadMonthListFixedDeduction, getEligibilityListFixedDeduction, LoadEligibilityListFixedDeduction, getPayrollTypeListFixedDeduction, LoadPayrollTypeListFixedDeduction, LoadGroupListFixedDeduction, getGroupListFixedDeduction, getDeductionListFixedDeduction, LoadDeductionListFixedDeduction, getProrationDateTypeListFixedDeduction, LoadProrationDateTypeListFixedDeduction } from '../../../../../store/pay-elements/fixed-deduction';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-editor',
  templateUrl: './fixed-deduction-editor.component.html',
  styleUrls: ['./fixed-deduction-editor.component.scss'],
  providers:[FixedDeductionEditorService]
})

export class FixedDeductionEditorComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFixedDeduction;

  @Output() cancelClick = new EventEmitter<any>();

  public isProcessing$: Observable<boolean>;
  public currencyList$: Observable<ISelectOption[]>;
  public deductFormulaList$: Observable<ISelectOption[]>;
  public payrollProfileList$: Observable<ISelectOption[]>;
  public startPeriodList$: Observable<ISelectOption[]>;
  public deductFrequencyList$: Observable<ISelectOption[]>;

  public paymentItemList$: Observable<ISelectOption[]>;
  public paymentFrequencyList$: Observable<ISelectOption[]>;
  public monthList$: Observable<ISelectOption[]>;
  public eligibilityList$: Observable<ISelectOption[]>;
  public payrollTypeList$: Observable<ISelectOption[]>;
  public groupList$: Observable<ISelectOption[]>;
  public deductionList$: Observable<ISelectOption[]>;
  public prorationDateType$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && this.data) {
      this.fs.showGroupName = this.data.group_item;
      this.fs.showAccumulateDeduction = this.data.cumulate_deduction;
      this.fs.showMonthlyDeduction = this.data.link_to;
      this.fs.init(this.data);
    }

    if (!this.show) {
      this.reset()
      this.fs.rebuildForm();
    }
  }

  constructor(
    public fs: FixedDeductionEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFixedDeduction));
    this.currencyList$ = this.store.pipe(select(getCurrenciesFixedDeduction));
    this.deductFormulaList$ = this.store.pipe(select(getDeductFormulaeFixedDeduction));
    this.payrollProfileList$ = this.store.pipe(select(getPayrollProfileFixedDeduction));

    this.paymentItemList$ = this.store.pipe(select(getPaymentItemTypesFixedDeduction));
    this.paymentFrequencyList$ = this.store.pipe(select(getPaymentFrequencyListFixedDeduction));
    this.monthList$ = this.store.pipe(select(getMonthListFixedDeduction));
    this.eligibilityList$ = this.store.pipe(select(getEligibilityListFixedDeduction));
    this.payrollTypeList$ = this.store.pipe(select(getPayrollTypeListFixedDeduction));
    this.groupList$ = this.store.pipe(select(getGroupListFixedDeduction));
    this.deductionList$ = this.store.pipe(select(getDeductionListFixedDeduction));
    this.prorationDateType$ = this.store.pipe(select(getProrationDateTypeListFixedDeduction));
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrencyListFixedDeduction());
    this.store.dispatch(new LoadDeductFormulaListFixedDeduction());
    this.store.dispatch(new LoadPayrollProfileListFixedDeduction());

    this.store.dispatch(new LoadPaymentItemTypesFixedDeduction());
    this.store.dispatch(new LoadPaymentFrequencyListFixedDeduction());
    this.store.dispatch(new LoadMonthListFixedDeduction());
    this.store.dispatch(new LoadEligibilityListFixedDeduction());
    this.store.dispatch(new LoadPayrollTypeListFixedDeduction());
    this.store.dispatch(new LoadGroupListFixedDeduction());
    this.store.dispatch(new LoadDeductionListFixedDeduction());
    this.store.dispatch(new LoadProrationDateTypeListFixedDeduction());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onFrequencySelected(event: any) {
    console.log('selected frequency', event.itemData.text_value);
    const maxDeduct = event.itemData.text_value;
    const maxDeductHasValue = !!maxDeduct;
    this.fs.triggerDisable({ maxDeductHasValue, refresh: false });
    this.fs.maxDeduct.setValue(maxDeduct);
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingFixedDeduction());
      !this.inEditMode() ?
        this.store.dispatch(new SaveFixedDeduction({ data: this.fs.value })) :
      this.store.dispatch(new UpdateFixedDeduction({ data: this.fs.value, recordId: this.data.deduction_id }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingFixedDeduction());
    this.reset();
    this.data = null;
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm()
    this.fs.init(this.data);
    this.fs.triggerDisable({ maxDeductHasValue: this.data ? this.data.deduct_frequency : null, refresh: true });
  }

  initializeDisabledFields() {
    this.fs.triggerDisable({ maxDeductHasValue: null, refresh: true });
  }
  }


