import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService, futureDateValidator, formatDate, pastDateValidator } from '@nutela/core-services';
import { IProxyApplication, IApprovedLoan } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import {  amountNumberInputValidator, monthlyDeductionNumberInputValidator } from './transaction-apply-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class TransactionApplyEditorService {
  public form: FormGroup = new FormGroup({});

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
      effective_period: [null, Validators.required],
      monthly_deduction: [null, Validators.required],
      interest_rate: [null, Validators.required],
      moratorium: [null, Validators.required],
      initial_loan_amount: [null, Validators.required],
      tenor_months: [null],
      doc_binary: [null],
      doc_extension: [null],
      narration: [null],
      doc_size: [0],
    }, {
        validator: [amountNumberInputValidator(), monthlyDeductionNumberInputValidator()]
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
        effective_period: data.effective_period,
        initial_loan_amount: data.initial_loan_amount,
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
      effective_period: {
        fieldTitle: `Effective Period`,
        required: `This field is required.`,
        pastDate: `Employment date can't be in the past.`
      },
      initial_loan_amount: {
        fieldTitle: `Amount`,
        required: `This field is required.`,
      },
      monthly_deduction: {
        fieldTitle: `Monthly Deduction`,
        required: `This field is required.`
      },
      interest_rate: {
        fieldTitle: `Interest Rate`,
        required: `This field is required.`
      },
      moratorium: {
        fieldTitle: `Moratorium`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        amountNumberInput: `Amount must be a number.`,
        rateNumberInput: `Rate must be a number.`,
        monthlyDeductionNumberInput: `Monthly Deduction must be a number.`
      }
    };
  }

  get effectiveDate(): AbstractControl {
    return this.form.get('effective_period');
  }
  get loanId(): AbstractControl {
    return this.form.get('loan_id');
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
    return this.form.get('initial_loan_amount');
  }

  transformInputsToNumber() {
    if(this.loanAmount.value !== null && !isNaN(parseFloat(this.loanAmount.value))) {
      return this.loanAmount.setValue(+ parseFloat(this.loanAmount.value).toFixed(2));
    }

    if(this.monthlyDeduction.value !== null && !isNaN(parseFloat(this.monthlyDeduction.value))) {
      return this.monthlyDeduction.setValue(+ parseFloat(this.monthlyDeduction.value).toFixed(2));
    }
    if(this.interestRate.value !== null && !isNaN(parseFloat(this.interestRate.value))) {
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
