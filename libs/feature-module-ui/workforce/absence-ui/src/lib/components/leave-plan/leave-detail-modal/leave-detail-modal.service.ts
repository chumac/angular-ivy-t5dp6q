import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ILeavePlanDetail } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveDetailService {
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
          leave_plan_id: [null],
          start_date: [null, Validators.required],
          assigned_backup_id: [null, Validators.required],
          no_of_days: [null, Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeavePlanDetail
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeavePlanDetail): ILeavePlanDetail | {} {
    if (data) {
      return {
        leave_plan_id: data.leave_plan_id,
        start_date: data.start_date,
        assigned_backup_id: data.AssignedBackupInfo?data.AssignedBackupInfo.employee_id:null,
        no_of_days: data.no_of_days
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      start_date: {
        fieldTitle: `Start Date`,
        required: `This field is required.`
      },
      assigned_backup_id: {
        fieldTitle: `Backup Officer`,
        required: `This field is required.`
      },
      no_of_days: {
        fieldTitle: `No. of Days`,
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

  get leavePlanId(): AbstractControl {
    return this.form.get('leave_plan_id');
  }

}

