import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IPayrollIntegration } from '@nutela/models/compensation/payment';

@Injectable()
export class PayrollIntegrationEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      payroll_profile_id: [{value: null, disabled: true}, Validators.required],
      x_months: [null, Validators.required],
      x_year: [null, Validators.required],
      source: [null, Validators.required],
      format: [null, Validators.required],
      custom_rule: [null]
    }, {

      }
    );
  }

  init(
    data: IPayrollIntegration
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPayrollIntegration): IPayrollIntegration | {} {
    console.log(data);
    if (data) {
      return {
        payroll_profile_id: data.payroll_profile_id,
        x_months: data.x_months,
        x_year: data.x_year,
        source: data.source,
        format: data.format,
        custom_rule: data.custom_rule,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      requirement_type: {
        fieldTitle: `Tag`,
        required: `This field is required.`
      },
      employer: {
        fieldTitle: `Employer`,
        required: `This field is required. Enter full employer address.`
      },
      company_address: {
        fieldTitle: `Address`,
        required: `This field is required.`
      },
      employment_date: {
        fieldTitle: `Employment Date`,
        required: `This field is required.`,
        futureDate: `Employment date can't be in the future.`
      },
      exit_date: {
        fieldTitle: `Exit Date`,
        required: `This field is required.`,
        futureDate: `Exit date can't be in the future.`
      },
      postheld_at_employment: {
        fieldTitle: `Post Held`,
        required: `This field is required.`
      },
      reason_4_exit: {
        fieldTitle: `Reason Exit`,
        required: `This field is required.`
      },
      position_before_exit: {
        fieldTitle: `Position`,
        required: `This field is required.`
      },
      department: {
        fieldTitle: `Department`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
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

  rebuildForm() {
    this.form = this.buildForm();
  }

  get payrollProfile(): AbstractControl {
    return this.form.get('payroll_profile_id');
  }
}
