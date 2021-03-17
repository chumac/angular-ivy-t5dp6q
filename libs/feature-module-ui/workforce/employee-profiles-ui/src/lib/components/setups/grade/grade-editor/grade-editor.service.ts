import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IFamily, IGradeManagement
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, greaterThanValidator } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { LoadStatesFamily, LoadCitiesFamily } from '@nutela/store/modules/workforce/employee-profiles';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class GradeEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showInput: boolean

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
        grade_code: [null],
        description: [null],
        ranking: [null],
        can_have_direct_reports: [false],
        annual_leave_days: [null],
        kudos_no_member: [null],
        sys_rule: [null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IGradeManagement): IGradeManagement | {} {
    if (data) {
      return {
        grade_code: data.grade_code,
        description: data.description,
        ranking: data.ranking,
        can_have_direct_reports: data.can_have_direct_reports,
        annual_leave_days: data.annual_leave_days,
        kudos_no_member: data.kudos_no_member,
        sys_rule: data.sys_rule
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      grade_code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Discription`,
        required: `This field is required.`
      },
      ranking: {
        fieldTitle: `Ranking`,
        required: `This field is required.`,
        futureDate: `Date of birth can't be in the future.`
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

  initField() {
    this.showInput = true;
    this.form = this.buildForm();
  }
}
