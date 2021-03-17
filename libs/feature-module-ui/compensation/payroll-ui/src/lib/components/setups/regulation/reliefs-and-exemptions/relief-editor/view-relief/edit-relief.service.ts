import { Injectable } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators,  AbstractControl,} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IReliefsList } from '@nutela/models/compensation/payroll';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class EditReliefService {
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
      st_relief_id: [null, Validators.required],
      code: [null, Validators.required],
      description: [null, Validators.required],
      relief_type: [null, Validators.required],
      relief_currency: [null, Validators.required],
      use_rule:[null],
      payroll_profile_id:[null]
    }, {

      }
    );
  }

  init(
    data: IReliefProfile
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IReliefProfile): IReliefProfile | {} {
    if (data) {
      return {
        st_relief_id: data.st_relief_id,
        code: data.code,
        description: data.description,
        relief_type: data.relief_type,
        relief_currency: data.relief_currency,
        use_rule: data.use_rule,
        payroll_profile_id: data.payroll_profile_id,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      st_relief_id: {
        fieldTitle: `Statutory Relief`,
        required: `This field is required.`
      },
      relief_type: {
        fieldTitle: `Relief Type`,
        required: `This field is required.`
      },
      relief_currency: {
        fieldTitle: `Currency`,
        required: `This field is required.`
      },
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