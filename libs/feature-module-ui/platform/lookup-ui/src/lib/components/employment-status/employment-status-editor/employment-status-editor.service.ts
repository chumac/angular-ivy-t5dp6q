import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IEmployeeStatus } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class EmploymentStatusEditorService {
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
      status_id:[],
      description: ['', Validators.required],
      status_code: ['',Validators.required],
      reinstate_allow:[true],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IEmployeeStatus,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IEmployeeStatus): IEmployeeStatus | {} {
    if (data) {
      return {
        status_id: data.status_id,
        description: data.description,
        status_code: data.status_code,
        reinstate_allow:data.reinstate_allow,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      status_code: {
        fieldTitle: `Status Code`,
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
