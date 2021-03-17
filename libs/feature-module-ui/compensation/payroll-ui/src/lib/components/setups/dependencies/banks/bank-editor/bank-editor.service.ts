import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IBank } from '@nutela/models/compensation/payroll';

@Injectable()
export class BankEditorService {
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
      street1: [null],
      street2: [null],
      zip: [null],
      shortname: [null],
      tel1: [null],
      tel2: [null],
      contact: [null],
      email: [null],
      website: [null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IBank
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IBank): IBank | {} {
    if (data) {

      return {
        bank_code:data.bank_code,
        description: data.description,


        street1: data.street1,
        street2: data.street2,
        zip: data.zip,
        shortname: data.shortname,
        tel1:data.tel1,
        tel2:data.tel2,
        contact: data.contact,
        email: data.email,
        website: data.website,
        // area_id: data.cityInfo?data.cityInfo.city_id:0,
        // state: data.stateInfo?data.stateInfo.state_id:0,
        // country: data.countryInfo?data.countryInfo.nationality_id:0,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Code: {
        fieldTitle: `bank_code`,
        required: `This field is required.`
      },
      Description: {
        fieldTitle: `description`,
        required: `This field is required.`
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
    return this.form.get('bank_code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }
}
