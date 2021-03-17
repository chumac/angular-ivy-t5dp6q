import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { ICalendar, IProfileCalendar } from '@nutela/models/compensation/payroll';

@Injectable()
export class ProfileCalendarEditorService {
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
      total_days: [null],
      total_workdays: [null],
      total_workhours: [null],
      prorate_days: [null],
      prorate_workdays: [null],
      prorate_workhours: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IProfileCalendar
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IProfileCalendar): IProfileCalendar | {} {
    if (data) {

      return {
        total_days: data.total_days,
        total_workdays: data.total_workdays,
        total_workhours: data.total_workhours,
        prorate_days: data.prorate_days,
        prorate_workdays: data.prorate_workdays,
        prorate_workhours: data.prorate_workhours,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Payroll_Profile: {
        fieldTitle: ` payroll_profile_id`,
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
