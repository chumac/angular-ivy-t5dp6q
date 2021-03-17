import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IVariableAllowanceTransaction } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableAllowanceTransactionEditorService {
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
      varallowance_id: [null, Validators.required],
      transaction_date: [null, Validators.required],
      no_of_units: [null, Validators.required],
      pay_in_period:[null,Validators.required],
      recalculate: [false, Validators.required],
      overriden: [false,Validators.required],
      value: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IVariableAllowanceTransaction
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IVariableAllowanceTransaction): IVariableAllowanceTransaction | {} {
    if (data) {

      return {
      employee_id:data.EmployeeInfo ? data.EmployeeInfo.employee_id : null,
      varallowance_id: data.VarAllowanceInfo ? data.VarAllowanceInfo.varallowance_id : null,
      transaction_date: data.transaction_date,
      no_of_units: data.no_of_units,
      pay_in_period:data.pay_in_period,
      recalculate: data.recalculate,
      overriden: data.overriden,
      value:data.value,
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
      varallowance_id: {
        fieldTitle: `Variable Allowance`,
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

  rebuildForm() {
    this.form = this.buildForm();
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

  onOveriddenChecked(event) {
    if (event.target.checked) {
      this.showValue = true;
    } else {
      this.showValue = false;
      this.newValue.setValue(null);
    }
  }
}
