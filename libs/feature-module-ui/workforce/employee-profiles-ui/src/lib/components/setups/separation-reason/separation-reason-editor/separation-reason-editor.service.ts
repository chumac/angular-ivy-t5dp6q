import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ISeparationReasons } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class SeparationReasonEditorService {
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
      // status_id:[null],
      status_code: [null],
      reinstate_allow:[false],
      available_in_ess:[false],
      description:['', Validators.required]
      }, {
        validator: []
      }
    );
  }

  init(
    data: ISeparationReasons,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: ISeparationReasons): ISeparationReasons | {} {
    if (data) {
      return {
        // status_id:data.status_id,
        status_code: data.status_code,
        reinstate_allow:data.reinstate_allow,
        available_in_ess:data.available_in_ess,
        description: data.description,
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
