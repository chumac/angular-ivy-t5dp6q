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
export class LeaveCancelApprovedService {
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
      cancel_note: ['', Validators.required],
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
      cancel_note: {
        fieldTitle: `Cancel Note`,
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

  get returnNote(): AbstractControl {
    return this.form.get('cancel_note');
  }

}
