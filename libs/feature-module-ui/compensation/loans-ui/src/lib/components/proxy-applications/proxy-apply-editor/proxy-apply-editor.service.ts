import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService, futureDateValidator, formatDate, pastDateValidator } from '@nutela/core-services';
import { IApprovedLoan } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ProxyApplyEditorService {
  private form: FormGroup = new FormGroup({});

  public tenorTypes: ISelectOption[] = [
    { value: '1', label: 'Years' },
    { value: '2', label: 'Months'  },
    { value: '3', label: 'Days'  },
  ];

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
      employee_id: [null, Validators.required],
      loan_id: [null, Validators.required],
      currency_id: [null, Validators.required],
      loan_amount: [null, Validators.required],
      effective_date: [null, Validators.required],
      monthly_deduction: [null, Validators.required],
      interest_rate: [null, Validators.required],
      tenor_months: [null],
      moratorium: [null, Validators.required],
      narration: [null],
      doc_binary: [null],
      doc_extension: [null],
      doc_size: [0],
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
        loan_id: data.loanDefInfo.loan_id,
        currency_id: data.CurrencyInfo.currency_id,
        effective_date: data.effective_date,
        loan_amount: data.initial_loan_amount,
        monthly_deduction: data.monthly_deduction,
        interest_rate: data.interest_rate,
        tenor_months: data.tenor_months,
        narration: data.narration,
        moratorium: data.moratorium,

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
      loan_id: {
        fieldTitle: `Loan type`,
        required: `This field is required.`
      },
      currency_id: {
        fieldTitle: `Currency`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`,
        pastDate: `Effective date can't be in the past.`
      },
      loan_amount: {
        fieldTitle: `Loan Amount`,
        required: `This field is required.`
      },
      monthly_deduction: {
        fieldTitle: `Monthly Deduction`,
        required: `This field is required.`
      },
      moratorium: {
        fieldTitle: `Moratorium`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get monthlyDeduction(): AbstractControl {
    return this.form.get('monthly_deduction');
  }
  get interestRate(): AbstractControl {
    return this.form.get('interest_rate');
  }
  get moratorium(): AbstractControl {
    return this.form.get('moratorium');
  }
  get tenor(): AbstractControl {
    return this.form.get('tenor_months');
  }
  get loanAmount(): AbstractControl {
    return this.form.get('loan_amount');
  }
  get loanId(): AbstractControl {
    return this.form.get('loan_id');
  }

  transformInputsToNumber() {
    if(this.loanAmount.value !== null) {
      return this.loanAmount.setValue(+ parseFloat(this.loanAmount.value).toFixed(2));
    }
    if(this.monthlyDeduction.value !== null) {
      return this.monthlyDeduction.setValue(+ parseFloat(this.monthlyDeduction.value).toFixed(2));
    }
    if(this.interestRate.value !== null) {
      return this.interestRate.setValue(+ parseFloat(this.interestRate.value).toFixed(1));
    }
    if(this.moratorium.value !== null) {
      return this.moratorium.setValue(+ parseInt(this.moratorium.value));
    }
    if(this.tenor.value !== null) {
      return this.tenor.setValue(+ parseInt(this.tenor.value));
    }
  }

  transformDatesInput() {
    if(this.effectiveDate.value !== null) {
      return this.effectiveDate.setValue(formatDate(this.effectiveDate.value))
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
