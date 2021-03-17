import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService, formatDate, futureDateValidator, pastDateValidator } from '@nutela/core-services';
import { ISelectOption } from '@nutela/models/core-data';
import { IApplicationCreate } from '@nutela/models/compensation/loans';

@Injectable({
  providedIn: 'root'
})
export class ApplyEditorService {
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
    // this.watchChanges()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      loan_id: [null, Validators.required],
      currency_id: [null, Validators.required],
      loan_amount: [null, Validators.required],
      effective_date: [null, Validators.compose([Validators.required, pastDateValidator(this.util.currentDate)])],
      monthly_deduction: [null, Validators.required],
      interest_rate: [null, Validators.required],
      tenor_months: [null],
      narration: [null],
      moratorium: [null],
      doc_binary: [null],
      doc_extension: [null],
      doc_size: [0],
    }, {

      }
    )
  }

  // get watchChanges() {
  //   this.form.get('loan_amount').valueChanges.subscribe(val => {
  //     console.log(val)
  //   });
  // }

  init(
    data: IApplicationCreate
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IApplicationCreate): IApplicationCreate | {} {
    if (data) {
      return {

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      loan_id: {
        fieldTitle: `Loan Type`,
        required: `This field is required.`
      },
      currency_id: {
        fieldTitle: `Currency`,
        required: `This field is required.`
      },
      loan_amount: {
        fieldTitle: `Amount`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`,
        pastDate: `Effective date can't be in the past.`
      },
      monthly_deduction: {
        fieldTitle: `Monthly Deduction`,
        required: `This field is required.`
      },
      interest_rate: {
        fieldTitle: `Interest rate`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
      }
    };
  }


  get tenor(): AbstractControl {
    return this.form.get('tenor_months');
  }


  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get loanId(): AbstractControl {
    return this.form.get('loan_id');
  }

  get loanAmount(): AbstractControl {
    return this.form.get('loan_amount');
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
