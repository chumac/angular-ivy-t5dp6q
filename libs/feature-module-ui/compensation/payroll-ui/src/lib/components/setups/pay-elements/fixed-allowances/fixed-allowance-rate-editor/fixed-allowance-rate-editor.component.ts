import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IFixedAllowanceRate } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { FixedAllowanceRateEditorService } from './fixed-allowance-rate-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingFixedAllowance, ProcessingFixedAllowance, NotProcessingFixedAllowance, getCurrenciesFixedAllowance, getPayFormulaeFixedAllowance, getPayrollProfileFixedAllowance, LoadCurrencyListFixedAllowance, LoadPayFormulaListFixedAllowance, LoadPayrollProfileListFixedAllowance, UpdateRateFixedAllowance, SaveRateFixedAllowance } from '../../../../../store/pay-elements/fixed-allowance';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-rate-editor',
  templateUrl: './fixed-allowance-rate-editor.component.html',
  styleUrls: ['./fixed-allowance-rate-editor.component.scss'],
  providers:[FixedAllowanceRateEditorService]
})

export class FixedAllowanceRateEditorComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() public show: boolean;
  @Input() public paygroupId: number;

  @Input() public employeeId: number;
  @Input() public isGlobal: boolean;
  @Input() public fixedAllowanceId: number;
  @Input() public eligibility: number;

  @Input() public width: number;
  @Input() public data: any;
  @Input() public titleFor: string;
  @Output() cancelClick = new EventEmitter<any>();

  public isProcessing$: Observable<boolean>;
  public currencyList$: Observable<ISelectOption[]>;
  public payFormulaList$: Observable<ISelectOption[]>;
  public payrollProfileList$: Observable<ISelectOption[]>;
  public startPeriodList$: Observable<ISelectOption[]>;
  public deductFrequencyList$: Observable<ISelectOption[]>;
  public paymentItemList$: Observable<ISelectOption[]>;
  public eligibilityList$: Observable<ISelectOption[]>;
  public payrollTypeList$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && !this.data) {
      if (this.employeeId) {
        this.setEmployeeDefaultValue();
      } else if (this.paygroupId) {
        this.setPaygroupDefaultValue();
      } else if(this.isGlobal) {
        this.setGlobalDefaultValue();
      }
    }
    if (this.show && this.data) {
      this.fs.isGlobal.setValue(this.isGlobal);
      this.fs.showDirectAmount = this.data.pay_usedirect_amount;
      this.fs.showTaxAmount = !!this.data.tax_amount;
      this.fs.showEndDate = this.data.is_temporary;
      this.fs.init(this.data);
    }
  }

  constructor(
    public fs: FixedAllowanceRateEditorService,
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
    }

    storeDispatches() {
      this.store.dispatch(new LoadCurrencyListFixedAllowance());
      this.store.dispatch(new LoadPayFormulaListFixedAllowance());
      this.store.dispatch(new LoadPayrollProfileListFixedAllowance());
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
        this.store.dispatch(new ProcessingFixedAllowance());
        this.inEditMode() ? this.store.dispatch(new UpdateRateFixedAllowance({ data: this.fs.value, recordId: this.data.fa_empspec_id || this.data.fa_groupspec_id || this.data.allowance_id})) :
        this.store.dispatch(new SaveRateFixedAllowance({data: this.fs.value}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
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
    this.fs.rebuildForm();
    this.fs.init(this.data);
  }

  setEmployeeDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: false,
      employee_id: this.employeeId,
      item_id: this.fixedAllowanceId,
    })
  }

  setPaygroupDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: false,
      paygroup_id: this.paygroupId,
      item_id: this.fixedAllowanceId,
    })
  }

  setGlobalDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: true,
      item_id: this.fixedAllowanceId,
    })
  }

  }

