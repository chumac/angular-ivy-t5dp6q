import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ILeaveStaggeredDetail } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveStaggeredDetailEditorService {
  public form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder 
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
          mleave_trans_id: [null],
          start_date: [null,  Validators.required],
          assigned_backup_id: [null,  Validators.required],
          no_of_days: [null,   [Validators.required, Validators.min(1)]],
          pay_allowance: [false],
          currency_id: [null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveStaggeredDetail
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveStaggeredDetail): ILeaveStaggeredDetail | {} {
    if (data) {
      return {
        mleave_trans_id: data.mleave_trans_id,
        start_date: data.start_date,
        assigned_backup_id: data.AssignedBackupInfo?data.AssignedBackupInfo.employee_id:null,
        no_of_days: data.no_of_days,
        pay_allowance: data.pay_allowance,
        currency_id: data.CurrencyInfo?data.CurrencyInfo.currency_id:null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      start_date: {
        fieldTitle: `Start Date`,
        required: `This field is required.`,
        pastDate: `Start date cannot be in the past.`
      },
      no_of_days: {
        fieldTitle: `Number of Days`,
        required: `This field is required.`,
        min: `You need to specify a minimum of 1 day.`,
      },
      currency_id: {
        fieldTitle: `Currency`,
        required: `This field is required.`,
      },
      assigned_backup_id: {
        fieldTitle: `Backup Officer`,
        required: `This field is required.`,
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

  get leaveStaggeredId(): AbstractControl {
    return this.form.get('mleave_trans_id');
  }

}

