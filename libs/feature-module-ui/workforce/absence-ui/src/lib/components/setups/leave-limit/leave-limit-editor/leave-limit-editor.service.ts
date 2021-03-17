import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ILeaveLimits } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveLimitEditorService {
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
      leave_id: ['',Validators.required],
      grade_id: ['', Validators.required],
      limit: ['', Validators.required],
      per_time_limit: ['', Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveLimits,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveLimits): ILeaveLimits | {} {
    if (data) {
      return {
        leave_id:data.LeaveInfo.leave_id,
        limit:data.limit,
        grade_id:data.GradeInfo.grade_id,
        per_time_limit:data.per_time_limit
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
