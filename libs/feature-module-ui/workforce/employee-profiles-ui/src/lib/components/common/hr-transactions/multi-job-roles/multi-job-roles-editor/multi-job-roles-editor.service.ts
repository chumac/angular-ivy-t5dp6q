import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService, formatDate } from '@nutela/core-services';
import { IMultiRoleJob } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class MultiJobRolesEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  status = false;

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
      position_id: [null, Validators.required],
      effective_from: [null, Validators.required],
      is_temp: [false],
      end_date: [null, Validators.required],
      // approval_status: [null],
      // status: [null],
    }, {
      validator: []
    }
    );
  }

  init(
    data: IMultiRoleJob,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IMultiRoleJob): IMultiRoleJob | {} {
    if (data) {
      // console.log('edit', data);
      return {
        employee_id: data.employee_id,
        position_id: data.position_id,
        is_temp: data.is_temp,
        end_date: data.end_date,
        effective_from: data.effective_from,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      position_id: {
        fieldTitle: `Position`,
        required: `This field is required.`
      },
      effective_from: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`
      },
      end_date: {
        fieldTitle: `End Date`,
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

  get EffectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get isTemporary(): AbstractControl {
    return this.form.get('is_temp');
  }

  get EndDate(): AbstractControl {
    return this.form.get('end_date');
  }
}
