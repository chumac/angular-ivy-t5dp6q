import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class CustomUserGroupSetupsEditorService {
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
      code: [null, Validators.required],
      description: [null, Validators.required],
      details: [null],
      has_values: [false],
      restricted_values: [null],
      sys_rule: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ICustomUserGroupSetup
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ICustomUserGroupSetup): ICustomUserGroupSetup | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        details: data.details,
        has_values: data.has_values,
        restricted_values: data.restricted_values,
        sys_rule: data.sys_rule
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`,
        // pastDate: `Start date cannot be in the past.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`,
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

  get hasValue(): AbstractControl {
    return this.form.get('has_values');
  }

  get rValue(): AbstractControl {
    return this.form.get('restricted_values');
  }

}

