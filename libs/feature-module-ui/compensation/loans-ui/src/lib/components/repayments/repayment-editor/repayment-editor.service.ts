import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';

import { UtilService, pastDateValidator } from '@nutela/core-services';
import { IApprovedLoan } from '@nutela/models/compensation/loans';

@Injectable({
  providedIn: 'root'
})
export class RepaymentEditorService {
  public form: FormGroup = new FormGroup({});

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
      employee_id: [null],
      loandetail_id: [null],
      repayment_type: [0, Validators.required],
      amount: [null, Validators.required],
      full_amount: [null],
      payment_instrument: [null, Validators.required],
      reference: [null],
      effective_period: [null, Validators.compose([Validators.required, pastDateValidator(this.util.currentDate)])],
      document_image: [null]
    }, {

      }
    );
  }

  init(
    data: IApprovedLoan
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }


  fieldData(data: IApprovedLoan): IApprovedLoan | {} {
    if (data) {
      return {
        employee_id: data.EmployeeInfo.employee_id,
        loandetail_id: data.loandetail_id,
        repayment_type: 0,
        amount: data.loan_balance,
        full_amount: data.loan_balance,
        payment_instrument: null,
        reference: null,
        effective_period: null,
        document_image: null
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      repayment_type: {
        fieldTitle: `Repayment Type`,
        required: `This field is required.`
      },
      amount: {
        fieldTitle: `Amount`,
        required: `This field is required`
      },
      payment_instrument: {
        fieldTitle: `Payment Instrument`,
        required: `This field is required.`
      },
      effective_period: {
        fieldTitle: `Effective Period`,
        required: `This field is required.`,
        pastDate: `Effective period can't be in the past`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get fullAmount(): AbstractControl {
    return this.form.get('full_amount');
  }

  get partialAmount(): AbstractControl {
    return this.form.get('partial_amount');
  }

  transformInputsToNumber() {
    if(this.amount.value !== null) {
      return this.amount.setValue(+ parseFloat(this.amount.value).toFixed(2));
    }
    if(this.fullAmount.value !== null) {
      return this.fullAmount.setValue(+ parseFloat(this.fullAmount.value).toFixed(2));
    }
    if(this.partialAmount.value !== null) {
      return this.partialAmount.setValue(+ parseFloat(this.partialAmount.value).toFixed(2));
    }

    if(this.effectivePeriod.value !== null) {
      return this.effectivePeriod.setValue(+ parseFloat(this.effectivePeriod.value).toFixed(2));
    }
  }

  get effectivePeriod(): AbstractControl {
    return this.form.get('effective_period');
  }

  get loanDetailId(): AbstractControl {
    return this.form.get('loandetail_id');
  }

  get repaymentType(): AbstractControl {
    return this.form.get('repayment_type');
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
