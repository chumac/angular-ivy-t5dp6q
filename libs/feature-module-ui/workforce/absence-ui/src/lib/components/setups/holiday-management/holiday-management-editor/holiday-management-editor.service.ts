import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService, formatDate} from '@nutela/core-services';
import { IPublicHoliday } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class HolidayEditorService {
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
      code: ['', Validators.required],
      description: ['', Validators.required],
      holiday_startdate: ['', Validators.required],
      holiday_enddate:[null],
      reuse_yearly:[false],
      is_daterange:[false],

      }, {
        validator: []
      }
    );
  }

  init(
    data: IPublicHoliday,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPublicHoliday): IPublicHoliday | {} {
    if (data) {
      return {
        leave_id:data.leave_id,
        code:data.code,
        description:data.description,
        holiday_startdate:data.holiday_startdate,
        holiday_enddate:data.holiday_enddate,
        is_daterange:data.is_daterange,
        reuse_yearly:data.reuse_yearly,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      holiday_startdate: {
        fieldTitle: `Holiday Start Date`,
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

  get startDate(): AbstractControl {
    return this.form.get('holiday_startdate');
  }

  get endDate(): AbstractControl {
    return this.form.get('holiday_enddate');
  }

  formatDate(){
    this.startDate.setValue(formatDate(this.startDate.value));
    if(this.endDate.value != null){
      this.endDate.setValue(formatDate(this.endDate.value));
    }
  }
}
