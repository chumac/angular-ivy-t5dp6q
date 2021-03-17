import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IstaffEmployeeList } from '@nutela/models/compensation/payroll';
// import { INewstaffEmployee } from '@nutela/models/compensation/payroll';

@Injectable({
  providedIn: 'root'
})
export class NewStaffEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id: [null],
      employee_firstname: [null],
      checked:false,
      payroll_profile_ids : [],
      org_id: null
    }, {

      }
    );
  }

  init(
    data: IstaffEmployeeList
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IstaffEmployeeList): IstaffEmployeeList | {} {
    if (data) {
      return {
        employee_id: data.employee_id,
      };
    } else {
      return {};
    }
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
