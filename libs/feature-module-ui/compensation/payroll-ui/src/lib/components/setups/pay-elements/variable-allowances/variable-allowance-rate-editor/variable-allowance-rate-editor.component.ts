import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IVariableAllowanceRate } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { VariableAllowanceRateEditorService } from './variable-allowance-rate-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingVariableAllowance, ProcessingVariableAllowance, NotProcessingVariableAllowance, getCurrencyListVariableAllowance, getPayFormulaListVariableAllowance, LoadCurrencyListVariableAllowance, LoadPayFormulaListVariableAllowance, UpdateRateVariableAllowance, SaveRateVariableAllowance } from '../../../../../store/pay-elements/variable-allowance';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-rate-editor',
  templateUrl: './variable-allowance-rate-editor.component.html',
  styleUrls: ['./variable-allowance-rate-editor.component.scss'],
  providers:[VariableAllowanceRateEditorService]
})

export class VariableAllowanceRateEditorComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() public show: boolean;
  @Input() public paygroupId: number;

  @Input() public employeeId: number;
  @Input() public isGlobal: boolean;
  @Input() public variableAllowanceId: number;
  @Input() public eligibility: number;

  @Input() public width: number;
  @Input() public data: any;
  @Input() public varAllowance: string;
  @Input() public paygroup: string;
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
    if (this.show && this.data) {
      this.fs.showDirectAmount = typeof this.data.usedirect_amount === 'boolean' ? this.data.usedirect_amount: typeof this.data.usedirect_amount === 'string' && this.data.usedirect_amount.toLowerCase() === 'yes' ? true : false;
      this.fs.showTaxContent = this.data.is_taxable !== undefined ? (typeof this.data.is_taxable === 'boolean' ? this.data.is_taxable : typeof this.data.is_taxable === 'string' &&this. data.is_taxable.toLowerCase() === 'yes' ? true : false) : !!this.data.tax_amount
      this.fs.init(this.data);
    }
  }

  constructor(
    public fs: VariableAllowanceRateEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingVariableAllowance));
      this.currencyList$ = this.store.pipe(select(getCurrencyListVariableAllowance));
      this.payFormulaList$ = this.store.pipe(select(getPayFormulaListVariableAllowance));
    }

    storeDispatches() {
      this.store.dispatch(new LoadCurrencyListVariableAllowance());
      this.store.dispatch(new LoadPayFormulaListVariableAllowance());
    }

    inEditMode(): boolean {
      if (this.data && this.data.is_edit) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        this.store.dispatch(new ProcessingVariableAllowance());
        if (this.data.is_global) {
          this.store.dispatch(new SaveRateVariableAllowance({ data: this.fs.value }));
        }
        this.inEditMode() ? this.store.dispatch(new UpdateRateVariableAllowance({ data: this.fs.value, recordId: this.data.vallowgrprate_id, varAllowId: this.data.varallowance_id})) :
          this.store.dispatch(new SaveRateVariableAllowance({ data: this.fs.value, varAllowId: this.variableAllowanceId}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

  onCancel() {
    this.store.dispatch(new NotProcessingVariableAllowance());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }
  }

