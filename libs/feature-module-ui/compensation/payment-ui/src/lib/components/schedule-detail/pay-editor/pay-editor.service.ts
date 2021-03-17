import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { UtilService, formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class PayEditorService {
  private form: FormGroup = new FormGroup({});

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
      cardNum: [null, Validators.required],
      currentpin: [null, Validators.required],
      cvvNumber: [null, Validators.required],
      expirydate: [null, Validators.required]
    }, {

    }
    );
  }

  getValidationMessages(): any {
    return {
      cardNum: {
        fieldTitle: `Card Number`,
        required: `This field is required.`
      },
      currentpin: {
        fieldTitle: `Ping`,
        required: `This field is required.`
      },
      cvCode: {
        fieldTitle: `CV Code`,
        required: `This field is required.`
      },
      expirydate: {
        fieldTitle: `Expiry Date`,
        required: `This field is required.`,
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
