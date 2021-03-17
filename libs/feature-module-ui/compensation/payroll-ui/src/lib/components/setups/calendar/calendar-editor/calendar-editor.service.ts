import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { ICalendar } from '@nutela/models/compensation/payroll';

@Injectable()
export class CalendarEditorService {
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
      employee_id: [null, Validators.required],
      paygroup_id: [null, Validators.required],
      payroll_profile_id: [null, Validators.required],
      weekend_work_start: [null, Validators.required],
      weekend_work_end: [null, Validators.required],
      weekday_work_start: [null, Validators.required],
      weekday_work_end: [null, Validators.required],
      public_holiday_work_start: [null, Validators.required],
      public_holiday_work_end: [null, Validators.required],
      pub_holiday_allowance_id: [null, Validators.required],
      pub_holiday_deduction_id: [null, Validators.required],
      weekday_allowance_id: [null, Validators.required],
      weekday_deduction_id: [null, Validators.required],
      weekend_allowance_id: [null, Validators.required],
      weekend_deduction_id: [null, Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ICalendar
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ICalendar): ICalendar | {} {
    if (data) {

      return {
        payroll_profile_id: data.payroll_profile_id
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      payroll_profile_id: {
        fieldTitle: `Payroll Profile`,
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

  get Profile(): AbstractControl {
    return this.form.get('payroll_profile_id');
  }

}
