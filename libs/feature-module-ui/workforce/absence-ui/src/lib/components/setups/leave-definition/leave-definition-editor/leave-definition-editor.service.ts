import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ILeaveDefinition } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class DefinitionEditorService {
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
      is_annual: [false],
      take_from_annual:[false],
      has_per_time_limit:[false],
      cancels_annual:[false],
      can_break: [false],
      max_break_slice: [null],
      only_avail_ifno_annual:[false],
      can_carryover:[false],
      calender_to_use:['', Validators.required],
      choose_frombacklog:[false],
      must_exhaust_backlog:[false],
      prorate_leave: [false],
      only_confirmed_staff: [false],
      makes_staff_inactive:[false],
      not_in_selfservice:[false],
      use_days:['', Validators.required],
      show_in_promotion:[false],
      use_public_holidays:[false],
      supports_allowance_payment: [false],
      view_in_summary: [false],
      sys_rule:['']

      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveDefinition,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveDefinition): ILeaveDefinition | {} {
    if (data) {
      return {
      leave_id:data.leave_id,
      code:data.code,
      description:data.description,
      is_annual:data.is_annual,
      take_from_annual:data.take_from_annual,
      has_per_time_limit:data.has_per_time_limit,
      cancels_annual:data.cancels_annual,
      can_break: data.can_break,
      max_break_slice:data.max_break_slice,
      only_avail_ifno_annual:data.only_avail_ifno_annual,
      can_carryover:data.can_carryover,
      calender_to_use:data.calender_to_use,
      choose_frombacklog:data.choose_frombacklog,
      must_exhaust_backlog:data.must_exhaust_backlog,
      prorate_leave: data.prorate_leave,
      only_confirmed_staff:data.only_confirmed_staff,
      makes_staff_inactive:data.makes_staff_inactive,
      not_in_selfservice:data.not_in_selfservice,
      use_days:data.use_days,
      show_in_promotion:data.show_in_promotion,
      use_public_holidays:data.use_public_holidays,
      supports_allowance_payment: data.supports_allowance_payment,
      view_in_summary:data.view_in_summary,
      sys_rule:data.sys_rule,
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
      is_daterange: {
        fieldTitle: `Date Range`,
        required: `This field is required.`
      },
      reuse_yearly: {
        fieldTitle: `Reuse Yearly`,
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
