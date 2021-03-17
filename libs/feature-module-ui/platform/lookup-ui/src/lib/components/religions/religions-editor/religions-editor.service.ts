import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IReligions } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class ReligionsEditorService {
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
      religion_id:[],
      description: ['', Validators.required],
      religion_code: ['',Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IReligions,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IReligions): IReligions | {} {
    if (data) {
      return {
        religion_id: data.religion_id,
        description: data.description,
        religion_code: data.religion_code,
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
