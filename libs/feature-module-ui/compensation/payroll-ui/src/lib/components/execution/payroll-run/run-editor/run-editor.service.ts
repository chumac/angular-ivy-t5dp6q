import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';
import { IPayrollProfile } from '@nutela/models/compensation/payment';

@Injectable({
  providedIn: 'root'
})
export class RunEditorService {
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
      payroll_profile_id: [null],
      grouprun_id: [null],
      grouprun: [null],
      use_payroll_acceleration: [null],
      exchange_rate: [null]
    }, {

      }
    );
  }

  init(
    data: any
  ) {
    console.log({data})
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {
      console.log({data})
      return {
        payroll_profile_id: data.payroll_profile_id,
        grouprun_id: data.grouprun_id,
        grouprun: data.grouprun,
        use_payroll_acceleration: data.use_payroll_acceleration,
        exchange_rate: data.use_multi_currency ?  1.0 : null
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      payroll_profile_id: {
        fieldTitle: `Payroll Profile`,
        required: `This field is required.`
      },
      grouprun_id: {
        fieldTitle: `Group Run ID`,
        required: `This field is required.`
      },
      grouprun: {
        fieldTitle: `Group Run`,
        required: `This field is required.`
      },
      use_payroll_acceleration: {
        fieldTitle: `Use Payroll Acceleration`,
        required: `This field is required.`,
      },
      exchange_rate: {
        fieldTitle: `Exchange Rate`,
        required: `This field is required.`,
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
}
