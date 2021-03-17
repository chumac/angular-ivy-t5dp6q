import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IVariableDeductionTransaction } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableDeductionTransactionEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showValue = false;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id: [null, Validators.required],
      vardeduction_id: [null, Validators.required],
      transaction_date: [null, Validators.required],
      no_of_units: [null, Validators.required],
      recalculate: [false, Validators.required],
      overriden: [false,Validators.required],
      value: [null],
      deduct_in_period: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IVariableDeductionTransaction
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IVariableDeductionTransaction): IVariableDeductionTransaction | {} {
    if (data) {

      return {
        employee_id:data.EmployeeInfo ? data.EmployeeInfo.employee_id : null,
        vardeduction_id: data.VardeductionInfo ? data.VardeductionInfo.vardeduction_id : null,
        transaction_date: data.transaction_date,
        no_of_units: data.no_of_units,
        recalculate: data.recalculate,
        overriden: data.overriden,
        value:data.value,
        deduct_in_period: data.deduct_in_period
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      vardeduction_id: {
        fieldTitle: `Variable Deduction`,
        required: `This field is required.`
      },
      transaction_date: {
        fieldTitle: `Transaction Date`,
        required: `This field is required.`
      },
      no_of_units: {
        fieldTitle: `Number of Units`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  get f() {
    return this.form;
  }

  get value(): any {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }

  patch(value: { [key: string]: any }) {
    this.form.patchValue(value);
  }

  get newValue(): AbstractControl {
    return this.form.get('value');
  }

  rebuildForm() {
    this.form = this.buildForm();
  }
  onOveriddenChecked(event) {
    if (event.target.checked) {
      this.showValue = true;
    } else {
      this.showValue = false;
      this.newValue.setValue(null);
    }
  }
}
