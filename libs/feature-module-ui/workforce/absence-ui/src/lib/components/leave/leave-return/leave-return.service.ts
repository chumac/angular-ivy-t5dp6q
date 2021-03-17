import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { ILeaveDailyData } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveReturnService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      actual_return_date: [null, [Validators.required]],
      recall_comments: [''],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveDailyData
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveDailyData): ILeaveDailyData | {} {
    if (data) {
      return {

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      actual_return_date: {
        fieldTitle: `Actual Return Date`,
        required: `This field is required.`
      },
      flx: {

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

  get returnDate(): AbstractControl {
    return this.form.get('actual_return_date');
  }

  get returnComment(): AbstractControl {
    return this.form.get('recall_comments');
  }

}
