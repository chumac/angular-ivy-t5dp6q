import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';

import { UtilService, formatDate, pastDateValidator } from '@nutela/core-services';
import { ISchedule } from '@nutela/models/compensation/payment';
import { expiryFutureDateValidator } from './pending-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class PendingEditorService {
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
      paydesk: [null, Validators.required],  // Code
      description: [null, Validators.required],
      account_no: [null, Validators.required],
      account_type: [null, Validators.required],
      currency_code: [null, Validators.required],
      is_single_debit: [true, Validators.required],
      value_date: [null, Validators.compose([Validators.required, pastDateValidator(this.util.currentDate)])],
      expiry_date: [null, Validators.compose([Validators.required, pastDateValidator(this.util.currentDate)])],
      source: [null, Validators.required],
      payroll_profile_id: [null],
      payroll_period: [null],
      payroll_source: [null]
    }, {
      Validators: [
        expiryFutureDateValidator()
      ]

    }
    );
  }

  init(
    data: ISchedule
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ISchedule): ISchedule | {} {
    if (data) {
      return {
        paydesk: data.paydesk,
        description: data.description,
        account_no: data.account_no,
        account_type: data.account_type,
        currency_code: data.currency_code,
        is_single_debit: data.is_single_debit,
        value_date: data.value_date,
        expiry_date: data.expiry_date,
        source: data.source,
        payroll_profile_id: data.payroll_profile_id,
        payroll_period: data.payroll_period,
        payroll_source: data.payroll_source
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      paydesk: {
        fieldTitle: `Pay Desk`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      account_no: {
        fieldTitle: `Account Number`,
        required: `This field is required.`
      },
      account_type: {
        fieldTitle: `Account Type`,
        required: `This field is required.`,
      },
      currency_code: {
        fieldTitle: `Currency`,
        required: `This field is required.`
      },
      value_date: {
        fieldTitle: `Value Date`,
        required: `This field is required.`,
        pastDate: `Value date can't be in the past.`,
      },
      expiry_date: {
        fieldTitle: `Expiry Date`,
        required: `This field is required.`,
        pastDate: `Expiry date can't be in the past.`,
      },
      source: {
        fieldTitle: `Payment Source`,
        required: `This field is required.`
      },
      payroll_profile_id: {
        fieldTitle: `Payroll Profile`,
        required: `This field is required.`
      },
      payroll_source: {
        fieldTitle: `Payroll Source`,
        required: `This field is required if Payroll Profile is selected.`
      },
      payroll_period: {
        fieldTitle: `Payroll Period`,
        required: `This field is required if Payroll Profile is selected.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        expiryFutureDate: `Value date cannot be after Expiry date.`
      }
    };
  }

  get valueDate(): AbstractControl {
    return this.form.get('value_date');
  }

  get expiryDate(): AbstractControl {
    return this.form.get('expiry_date');
  }

  get payPeriod(): AbstractControl {
    return this.form.get('payroll_period');
  }

  get payrollSource(): AbstractControl {
    return this.form.get('payroll_source');
  }

  get payrollProfile(): AbstractControl {
    return this.form.get('payroll_profile_id');
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

  transformDatesInput() {
    if (this.valueDate.value !== null) {
      this.valueDate.setValue(formatDate(this.valueDate.value))
    };
    if (this.expiryDate.value !== null) {
      this.expiryDate.setValue(formatDate(this.expiryDate.value))
    };
    if (this.payPeriod.value !== null) {
      this.payPeriod.setValue(formatDate(this.payPeriod.value))
    };
  };

  validatePayroll() {
    if (this.payrollProfile) {
      this.payrollSource.setValidators([Validators.required]);
      this.payPeriod.setValidators([Validators.required]);
    }
  }
}
