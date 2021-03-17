import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IValidLocation } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class ValidLocationsEditorService {
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
      location_address_pattern: [null, Validators.required],
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

  fieldData(data: IValidLocation): IValidLocation | {} {
    if (data) {
      return {
        location_address_pattern: data.location_address_pattern,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      location_address_pattern: {
        fieldTitle: `Location Address`,
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

  get locationAddressPattern(): AbstractControl {
    return this.form.get('location_address_pattern');
  }

}
