import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IFamily, IDisciplinaryActionTransaction, IDisciplinaryActionDefinition
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, greaterThanValidator } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { LoadStatesFamily, LoadCitiesFamily } from '@nutela/store/modules/workforce/employee-profiles';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class DefineActionEditorService {
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
        code: [null],
        description: [null],
        details: [null],
        is_active: [false],
        severity_range_lower: [null],
        severity_range_higher: [null],
        points: [null],
        supervisor_view: [false],
        auto_expires: [false],
        expires_in_x_months: [null]
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

  fieldData(data: IDisciplinaryActionDefinition): IDisciplinaryActionDefinition | {} {
    if (data) {
      console.log(data);
      return {
        code: data.code,
        description: data.description,
        details: data.details,
        is_active: data.is_active,
        severity_range_lower: data.severity_range_lower,
        severity_range_higher: data.severity_range_higher,
        points: data.points,
        supervisor_view: data.supervisor_view,
        auto_expires: data.auto_expires,
        expires_in_x_months: data.expires_in_x_months,
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
        fieldTitle: `Discription`,
        required: `This field is required.`
      },
      details: {
        fieldTitle: `Details`,
        required: `This field is required.`,
        futureDate: `Date of birth can't be in the future.`
      },
      severity_range_lower: {
        fieldTitle: `Lower Severity Range`,
        required: `This field is required.`
      },
      expires_in_x_months: {
        fieldTitle: `Expires in X months`,
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



  get groupId(): AbstractControl {
    return this.form.get('new_paygroup_id');
  }

  get autoExpire(): AbstractControl {
    return this.form.get('auto_expires');
  }

  get expiresInXMonth(): AbstractControl {
    return this.form.get('expires_in_x_months');
  }

  initField() {
    this.showInput = true;
    this.form = this.buildForm();
  }
}
