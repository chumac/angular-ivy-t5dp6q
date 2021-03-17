import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';

@Injectable({
  providedIn: 'root'
})
export class CloseEditorService {
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
      loandetail_id: [null],
      reason: [null]
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
        loan_id: data.loandetail_id,
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
