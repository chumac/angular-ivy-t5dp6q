import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { ILeaveHourlyData } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveHourlyCancelApprovedService {
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
      cancel_comment: ['', Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveHourlyData
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveHourlyData): ILeaveHourlyData | {} {
    if (data) {
      return {
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      cancel_comment: {
        fieldTitle: `Cancel Comment`,
        required: `This field is required.`
      },
      flx: {}
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

  get returnNote(): AbstractControl {
    return this.form.get('cancel_comment');
  }

}
