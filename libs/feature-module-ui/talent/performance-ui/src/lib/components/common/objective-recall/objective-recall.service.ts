import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveRecallService {
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
      plan_id: [],	
      recall_type: ['', Validators.required],	
      comment: ['', Validators.required]
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

  fieldData(data: any): any | {} {
    if (data) {
      return {
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      recall_type: {
        fieldTitle: `Recall type`,
        required: `This field is required.`
      },
      comment: {
        fieldTitle: `Comment`,
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

  get planID(): AbstractControl {
    return this.form.get('plan_id');
  }

}
