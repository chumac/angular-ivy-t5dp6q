import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ILeaveDays } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveDaysEditorService {
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
      leave_id: [''],
      annual_leave_days: ['', Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveDays,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveDays): ILeaveDays | {} {
    if (data) {
      return {
        leave_id:data.leave_id,
        annual_leave_days:data.annual_leave_days
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      flx: {
        fieldTitle: `Other Errors`
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
