import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService, futureDateValidator, formatDate } from '@nutela/core-services';
import { ILoanRepayment, IDisbursement, IApprovedLoan, IDisbursed } from '@nutela/models/compensation/loans';

@Injectable({
  providedIn: 'root'
})
export class DisbursementEditorService {
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
      loan_id: [null],
      disburse_actual_date: [null],
      first_deduction_date: [null],
      moratorium: [null]
    }, {

      }
    );
  }

  init(
    data: IDisbursed
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IDisbursed): IDisbursed | {} {
    if (data) {
      return {

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
      }
    };
  }

  get f() {
    return this.form;
  }

  get actualDate(): AbstractControl {
    return this.form.get('disburse_actual_date');
  }
  get moratorium(): AbstractControl {
    return this.form.get('moratorium');
  }
  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
  }
  get loanId(): AbstractControl {
    return this.form.get('loandetail_id');
  }

  get firstDeductionDate(): AbstractControl {
    return this.form.get('first_deduction_date');
  }

  returnFormattedDate() {
    if(this.actualDate.value !== null) {
      return this.actualDate.setValue(formatDate(this.actualDate.value));
    }

    if(this.firstDeductionDate.value !== null) {
      return this.firstDeductionDate.setValue(formatDate(this.firstDeductionDate.value));
    }
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
