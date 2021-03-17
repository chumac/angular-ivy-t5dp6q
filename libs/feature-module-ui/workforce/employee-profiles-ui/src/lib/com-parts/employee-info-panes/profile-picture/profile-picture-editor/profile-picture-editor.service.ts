import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  IProfilePicture
} from '@nutela/models/workforce/employee-profiles';
import {UtilService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder, private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();

  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id: [''],
      image: ['', Validators.required],
      image_personal: [''],
      }, {
        validator: []
      }
    );
  }

  // init(
  //   data: IProfilePicture,
  //   employee_id: number
  // ) {
  //   if (data) {
  //     this.form.patchValue(this.fieldData(data, employee_id));
  //   }
  // }

  // fieldData(data: IProfilePicture, employee_id): IProfilePicture | {} {
  //   if (data) {
  //     return {
  //       employee_id: employee_id,
  //     };
  //   } else {
  //     return {};
  //   }
  // }

  getValidationMessages(): any {
    return {
      image: {
        fieldTitle: `Image`,
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
