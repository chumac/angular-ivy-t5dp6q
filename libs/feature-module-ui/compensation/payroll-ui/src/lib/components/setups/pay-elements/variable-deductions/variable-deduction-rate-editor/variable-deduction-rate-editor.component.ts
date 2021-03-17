import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IVariableDeductionRate } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { VariableDeductionRateEditorService } from './variable-deduction-rate-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingVariableDeduction, ProcessingVariableDeduction, NotProcessingVariableDeduction, getCurrencyListVariableDeduction, getFormulaListVariableDeduction, LoadCurrencyListVariableDeduction, LoadFormulaListVariableDeduction, UpdateRateVariableDeduction, SaveRateVariableDeduction } from '../../../../../store/pay-elements/variable-deduction';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-rate-editor',
  templateUrl: './variable-deduction-rate-editor.component.html',
  styleUrls: ['./variable-deduction-rate-editor.component.scss'],
  providers:[VariableDeductionRateEditorService]
})

export class VariableDeductionRateEditorComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() public show: boolean;
  @Input() public paygroupId: number;

  @Input() public employeeId: number;
  @Input() public isGlobal: boolean;
  @Input() public variableDeductionId: number;
  @Input() public eligibility: number;

  @Input() public width: number;
  @Input() public data: any;
  @Input() public titleFor: string;
  @Output() cancelClick = new EventEmitter<any>();

  public isProcessing$: Observable<boolean>;
  public currencyList$: Observable<ISelectOption[]>;
  public formulaList$: Observable<ISelectOption[]>;
  public payrollProfileList$: Observable<ISelectOption[]>;
  public startPeriodList$: Observable<ISelectOption[]>;
  public deductFrequencyList$: Observable<ISelectOption[]>;
  public paymentItemList$: Observable<ISelectOption[]>;
  public eligibilityList$: Observable<ISelectOption[]>;
  public payrollTypeList$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && !this.data) {
      if (this.paygroupId) {
        this.setPaygroupDefaultValue();
      }
    }
    if (this.show && this.data) {
      this.fs.showDirectAmount = typeof this.data.usedirect_amount === 'boolean' ? this.data.usedirect_amount : typeof this.data.usedirect_amount === 'string' && this. data.usedirect_amount.toLowerCase() === 'yes' ? true : false;
      this.fs.init(this.data);
    }
  }

  constructor(
    public fs: VariableDeductionRateEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingVariableDeduction));
      this.currencyList$ = this.store.pipe(select(getCurrencyListVariableDeduction));
      this.formulaList$ = this.store.pipe(select(getFormulaListVariableDeduction));
    }

    storeDispatches() {
      this.store.dispatch(new LoadCurrencyListVariableDeduction());
      this.store.dispatch(new LoadFormulaListVariableDeduction());
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
        this.store.dispatch(new ProcessingVariableDeduction());
        if (this.data.is_global) {
          this.store.dispatch(new SaveRateVariableDeduction({ data: this.fs.value }));
        } else {
          this.inEditMode() ? this.store.dispatch(new UpdateRateVariableDeduction({ data: this.fs.value, recordId: this.data.vdeductgrprate_id, varDeductId: this.data.vardeduction_id })) :
            this.store.dispatch(new SaveRateVariableDeduction({ data: this.fs.value, varDeductId: this.variableDeductionId}));
        }
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingVariableDeduction());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.form = this.fs.buildForm();
    }


  setPaygroupDefaultValue() {
    this.fs.patch({
      eligibility: this.eligibility,
      is_global: false,
      paygroup_id: this.paygroupId,
      item_id: this.variableDeductionId,
    })
  }

  }

