import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IFixedDeductionRate } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { FixedDeductionRateEditorService } from './fixed-deduction-rate-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingFixedDeduction, ProcessingFixedDeduction, NotProcessingFixedDeduction, getCurrenciesFixedDeduction, getDeductFormulaeFixedDeduction, getPayrollProfileFixedDeduction, LoadCurrencyListFixedDeduction, LoadDeductFormulaListFixedDeduction, LoadPayrollProfileListFixedDeduction, UpdateRateFixedDeduction, SaveRateFixedDeduction } from '../../../../../store/pay-elements/fixed-deduction';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-rate-editor',
  templateUrl: './fixed-deduction-rate-editor.component.html',
  styleUrls: ['./fixed-deduction-rate-editor.component.scss'],
  providers:[FixedDeductionRateEditorService]
})

export class FixedDeductionRateEditorComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() public paygroupId: number;
  @Input() public employeeId: number;
  @Input() public isGlobal: boolean;
  @Input() public fixedDeductionId: number;
  @Input() public eligibility: number;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public titleFor: string;
  @Output() cancelClick = new EventEmitter<any>();

  public isProcessing$: Observable<boolean>;
  public currencyList$: Observable<ISelectOption[]>;
  public deductFormulaList$: Observable<ISelectOption[]>;
  public payrollProfileList$: Observable<ISelectOption[]>;
  public startPeriodList$: Observable<ISelectOption[]>;
  public deductFrequencyList$: Observable<ISelectOption[]>;
  public paymentItemList$: Observable<ISelectOption[]>;
  public eligibilityList$: Observable<ISelectOption[]>;
  public payrollTypeList$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
      console.log('data changed', this.data)
    };
    if (this.show && !this.data) {
      this.fs.form = this.fs.buildForm();
      if (this.employeeId) {
        this.setEmployeeDefaultValue();
      } else if (this.paygroupId) {
        this.setPaygroupDefaultValue();
      } else if (this.isGlobal) {
        this.setGlobalDefaultValue();
      }
    }
    if (this.show && this.data) {
      this.fs.init(this.data);
      console.log(this.data)
      // this.fs.form = this.fs.buildForm();
      this.fs.isGlobal.setValue(this.isGlobal);
      this.fs.showDirectAmount = typeof this.data.usedirect_amount === 'boolean' ? this.data.usedirect_amount : (typeof this.data.deduct_usedirect_amount === 'boolean' ? this.data.deduct_usedirect_amount: false) ;
      this.fs.handleEmployeeContribution = typeof this.data.apply_emp_contribution === 'boolean' ? this.data.apply_emp_contribution : (typeof this.data.has_employer_contribution === 'boolean' ? this.data.has_employer_contribution : false) ;
      this.fs.showContributeDirectAmount = typeof this.data.empcontibute_usedirect_amount === 'boolean' ? this.data.empcontibute_usedirect_amount : false;
      this.fs.showEndDate = this.data.is_temporary;
      console.log(this.fs.showContributeDirectAmount);
    }

    if (!this.show) {
      this.fs.handleEmployeeContribution = false;
      this.fs.showContributeDirectAmount = false;
    }
  }

  constructor(
    public fs: FixedDeductionRateEditorService,
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
    }

    storeDispatches() {
      this.store.dispatch(new LoadCurrencyListFixedDeduction());
      this.store.dispatch(new LoadDeductFormulaListFixedDeduction());
      this.store.dispatch(new LoadPayrollProfileListFixedDeduction());
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        this.store.dispatch(new ProcessingFixedDeduction());
        this.inEditMode() ? this.store.dispatch(new UpdateRateFixedDeduction({data: this.fs.value, recordId: this.data.fd_empspec_id || this.data.fd_groupspec_id || this.data.deduction_id })) :
        this.store.dispatch(new SaveRateFixedDeduction({data: this.fs.value}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingFixedDeduction());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      // this.fs.form = this.fs.buildForm();
      this.fs.f.reset();
      this.fs.rebuildForm()
      this.fs.init(this.data);
    }

  setEmployeeDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: false,
      employee_id: this.employeeId,
      item_id: this.fixedDeductionId,
    })
  }

  setPaygroupDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: false,
      paygroup_id: this.paygroupId,
      item_id: this.fixedDeductionId,
    })
  }

  setGlobalDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: true,
      item_id: this.fixedDeductionId,
    })
  }
  }

