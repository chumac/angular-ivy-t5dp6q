import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IPfa } from '@nutela/models/compensation/payroll';

@Injectable()
export class PfaEditorService {
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
      pfa_code: [null],
      description: [null, Validators.required],
      street1: [null],
      street2: [null],
      zip: [null],
      shortname:[null],
      tel1:[null],
      tel2:[null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IPfa
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPfa): IPfa | {} {
    if (data) {

      return {
        pfa_id:data.pfa_id,
        pfa_code:data.pfa_code,
        description: data.description,
        street1: data.street1,
        street2: data.street2,
        shortname: data.shortname,
        tel1:data.tel1,
        tel2:data.tel2
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Description: {
        fieldTitle: `description`,
        required: `This field is required.`
      },
      email: {
        fieldTitle: `Email`,
        email: `Please provide a valid email address.`,
      },
      pfa_schedule_email: {
        fieldTitle: `Schedule Email`,
        email: `Please provide a valid email address.`,
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  rebuildForm() {
    this.form = this.buildForm();
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

  get Code(): AbstractControl {
    return this.form.get('Pfa_code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }
}
