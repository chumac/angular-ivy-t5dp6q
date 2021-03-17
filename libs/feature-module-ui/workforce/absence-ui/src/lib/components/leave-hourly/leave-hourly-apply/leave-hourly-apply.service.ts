import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { UtilService, pastDateValidator } from '@nutela/core-services';
import { ILeaveHourlyData } from '@nutela/models/workforce/leave';
import { IAppState } from '@nutela/store/app-state';

@Injectable({
  providedIn: 'root'
})
export class LeaveHourlyApplyService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private store: Store<IAppState>,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      leave_id: [null, Validators.required],
      entitlementHourly: [{ value: '', disabled: true}, Validators.required],
      request_date: [null, [Validators.required, pastDateValidator(this.util.currentDate)]],
      no_of_hours: [null, [Validators.required, Validators.min(1)]],
      leave_reason: [null],
      backup_officer_id: [null],
      supervisor_id: [null],
      is_paid: [false],
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
      leave_id: {
        fieldTitle: `Type`,
        required: `This field is required.`
      },
      entitlementHourly: {
        fieldTitle: `Avail Hrs for Paid Leave`,
        required: `This field is required.`,
      },
      request_date: {
        fieldTitle: `Request Date`,
        required: `This field is required.`,
        pastDate: `Request date cannot be in the past.`
      },
      no_of_hours: {
        fieldTitle: `Number of Hours`,
        required: `This field is required.`,
        min: `Minimum of 1 day is required`
      },
      flx: {
        fieldTitle: `Other Errors`,
        availableDays: `Number of Days requested is more than your current leave balance.`
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

  get leaveId(): AbstractControl {
    return this.form.get('leave_id');
  }

  get entitlement(): AbstractControl {
    return this.form.get('entitlementHourly');
  }

  get requestDate(): AbstractControl {
    return this.form.get('request_date');
  }

  get numberOfHours(): AbstractControl {
    return this.form.get('no_of_hours');
  }

  get leaveReason(): AbstractControl {
    return this.form.get('leave_reason');
  }

  get assignedBackupId(): AbstractControl {
    return this.form.get('backup_officer_id');
  }

  get supervisorId(): AbstractControl {
    return this.form.get('supervisor_id');
  }

  get isPaid(): AbstractControl {
    return this.form.get('is_paid');
  }

}
