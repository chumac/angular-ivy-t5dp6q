import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ITimeAttendance } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class TimeAttendancesEditorService {
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
      action_type : [null, Validators.required],
      adjustment_reason: [null, Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ITimeAttendance): ITimeAttendance | {} {
    if (data) {
      return {
        action_type : data.employee_status_text,
        adjustment_reason: data.adjustment_reason,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      action_type: {
        fieldTitle: `Action`,
        required: `This field is required.`
      },
      adjustment_reason: {
        fieldTitle: `Adjustment Reason`,
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

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
