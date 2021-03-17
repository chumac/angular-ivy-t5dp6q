import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ICustomUserGroup } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class CustomUserGroupsEditorService {
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
      custom_group_id: [null, Validators.required],
      employee_id: [null, Validators.required],
      custom_group_value: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ICustomUserGroup
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ICustomUserGroup): ICustomUserGroup | {} {
    if (data) {
      return {
        custom_group_id: data.StaffCustomInfo.id,
        employee_id: data.EmployeeInfo.employee_id,
        custom_group_value: data.custom_group_value,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`,
        // pastDate: `Start date cannot be in the past.`
      },
      custom_group_id: {
        fieldTitle: `Group`,
        required: `This field is required.`,
        // min: `You need to specify a minimum of 1.`,
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

  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
  }

}

