import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IEcosystem360 } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class Ecosystem360sEditorService { 
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
      plan_id: [null, Validators.required],
      employee_id: [null, Validators.required],
      role: [null, Validators.required],
      role_staff_id: [null, Validators.required],
      role_email: [null],
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

  fieldData(data: IEcosystem360): IEcosystem360 | {} {
    if (data) {
      return {
        plan_id: data.PlanningInfo?data.PlanningInfo.id:null,
        employee_id: data.EmployeeInfo?data.EmployeeInfo.employee_id:null,
        role: data.role,
        role_staff_id: data.RoleStaffInfo?data.RoleStaffInfo.employee_id:null,
        role_email: data.role_email,
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
      role_staff_id: {
        fieldTitle: `Role Staff`,
        required: `This field is required.`
      },
      role: {
        fieldTitle: `Role`,
        required: `This field is required.`
      },
      plan_id: {
        fieldTitle: `Plan`,
        required: `This field is required.`
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
