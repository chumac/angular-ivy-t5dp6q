import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { ISchedule, IScheduleDetail } from '@nutela/models/compensation/payment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailEditorService {
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
      surname: [null, Validators.required],
      othername: [null, Validators.required],
      mobile_number: [null, Validators.required],
      email: [null, Validators.email],
      account_no: [null, Validators.required],
      narration: [null, Validators.required],
      account_type: [null, Validators.required],
      is_prepaidload: [false],
      confidential: [false],
      currency_code: [null, Validators.required],
      actual_amount: [null, Validators.required],
      payable_amount: [null]
    }, {

    }
    );
  }

  init(
    data: IScheduleDetail
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IScheduleDetail): IScheduleDetail | {} {
    if (data) {
      return {
        surname: data.surname,
        othername: data.othername,
        mobile_number: data.mobile_number,
        email: data.email,
        account_no: data.account_no,
        narration: data.narration,
        account_type: data.account_type,
        is_prepaidload: data.is_prepaidload,
        confidential: data.confidential,
        currency_code: data.currency_code,
        actual_amount: data.actual_amount,
        payable_amount: data.payable_amount
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      surname: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      othername: {
        fieldTitle: `Other Names`,
        required: `This field is required.`
      },
      mobile_number: {
        fieldTitle: `Mobile Number`,
        required: `This field is required.`
      },
      account_no: {
        fieldTitle: `Account Number`,
        required: `This field is required.`
      },
      account_type: {
        fieldTitle: `Account Type`,
        required: `This field is required.`
      },
      currency_code: {
        fieldTitle: `Payment Curency`,
        required: `This field is required.`
      },
      actual_amount: {
        fieldTitle: `Amount`,
        required: `This field is required.`
      },
      narration: {
        fieldTitle: `Narration`,
        required: `This field is required.`
      },
      email: {
        fieldTitle: `Email`,
        email: `Please provide a valid email address.`,
      },
      flx: {
      }
    };
  }

  get loanDetailId(): AbstractControl {
    return this.form.get('loandetail_id');
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
