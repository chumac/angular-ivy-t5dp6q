import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IOrganization
} from '@nutela/models/foundation';
import { UtilService} from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class OrganizationEditorService {
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
      org_id: [null],
      code: [null, Validators.required],
      description: [null, Validators.required],
      user_prefix: [null, Validators.required],
      street1: [null, Validators.required],
      street2: [null, Validators.required],
      zip: [null, Validators.required],
      country: [null, Validators.required],
	    state: [null, Validators.required],
      city: [null, Validators.required],
      short_name:[null],
      tel_1:[null],
      tel_2:[null],
      email: [null, Validators.required],
      website: [null, Validators.required],
      industry: [null, Validators.required],
      business_type:[null, Validators.required],
      org_logo_vtwo: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IOrganization
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IOrganization): IOrganization | {} {
    if (data) {

      return {
        org_id: data.org_id,
        code:data.code,
        description: data.description,
        user_prefix:data.user_prefix,
        street1: data.street1,
        street2: data.street2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        short_name: data.short_name,
        tel_1:data.tel_1,
        tel_2:data.tel_2,
        email: data.email,
        website: data.website,
        business_type: data.business_type,
        industry: data.industry,
        org_logo_vtwo: data.org_logo_vtwo
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
      user_prefix: {
        fieldTitle: `User Prefix`,
        required: `This field is required.`
      },
      street1: {
        fieldTitle: `street1`,
        required: `This field is required.`
      },
      street2: {
        fieldTitle: `street2`,
        required: `This field is required.`
      },
      city: {
        fieldTitle: `city`,
        required: `This field is required.`
      },
      state: {
        fieldTitle: `state`,
        required: `This field is required.`
      },
      country: {
        fieldTitle: `country`,
        required: `This field is required.`
      },
      zip: {
        fieldTitle: `zip`,
        required: `This field is required.`
      },
      website: {
        fieldTitle: `website`,
        required: `This field is required.`
      },
      business_type: {
        fieldTitle: `business type`,
        required: `This field is required.`
      },
      industry: {
        fieldTitle: `industry`,
        required: `This field is required.`
      },

      email: {
        fieldTitle: `Email`,
        required: `This field is required.`,
        email: `Provide a valid email.`
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

  get industry(): AbstractControl {
    return this.form.get('industry');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get street2(): AbstractControl {
    return this.form.get('street2');
  }

  get business_type(): AbstractControl {
    return this.form.get('business_type');
  }

  get website(): AbstractControl {
    return this.form.get('website');
  }

  get street1(): AbstractControl {
    return this.form.get('street1');
  }

  get country(): AbstractControl {
    return this.form.get('country');
  }

  get state(): AbstractControl {
    return this.form.get('state');
  }

  get city(): AbstractControl {
    return this.form.get('city');
  }

  get zip(): AbstractControl {
    return this.form.get('zip');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
}
