import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ILeaveProrate } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveProrationEditorService {
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
      leave_entitlement: ['', Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveProrate,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveProrate): ILeaveProrate | {} {
    if (data) {
      return {
        leave_id:data.leave_id,
        leave_entitlement:data.leave_entitlement,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      limit: {
        fieldTitle: `Limit`,
        required: `This field is required.`
      },
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
