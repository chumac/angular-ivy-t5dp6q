import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class HrCustomDataFormsEditorService {
  private form: FormGroup = new FormGroup({});
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

  fieldData(data: IHrCustomDataForm): IHrCustomDataForm | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
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

  get code(): AbstractControl {
    return this.form.get('code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
