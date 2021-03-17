import { Injectable } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators,  AbstractControl,} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IFixedDeductionReliefUpdate } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction-update.interface';

@Injectable({
  providedIn: 'root'
})
export class FixedDeductionService {
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
      relief_currency: [null,Validators.required],
      fixeddeduction_id: [null,Validators.required],
      relief_id: [null],
    }, {

      }
    );
  }

  init(
    data: IFixedDeductionReliefUpdate
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }
  
  fieldData(data: IFixedDeductionReliefUpdate): IFixedDeductionReliefUpdate | {} {
    if (data) {
      return {
        fixeddeduction_id: data.fixeddeduction_id,
        relief_currency: data.relief_currency,
        relief_id: data.relief_id,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      use_rule: {
        fieldTitle: `Fixed Deduction`,
        required: `This field is required.`
      },
      relief_currency: {
        fieldTitle: `Currency`,
        required: `This field is required.`
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
