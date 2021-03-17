import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IDependant
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, greaterThanValidator } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class DependantsEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private store: Store<IAppState>
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      surname: [null, Validators.required],
      firstname: [null, Validators.required],
      othernames: [null],
      dobirth: [null, [Validators.required, futureDateValidator(this.util.currentDate)]],
      dependent_type: [null, Validators.required],
      gender: [null, Validators.required],
      phone_no: [null],
      email: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      address_line1: [null],
      address_line2: [null],
      country_id: [null],
      state_id: [null],
      area_id: [null],
      business_type: [null],
      passport_picture: [null],
      img_extension_passport: [null],
      img_size: [0, Validators.compose([greaterThanValidator(this.util.maximumImageSize)])]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IDependant,
    selectOptionData: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IDependant): IDependant | {} {
    if (data) {
      return {
        surname: data.surname,
        firstname: data.firstname,
        othernames: data.othernames,
        dobirth: data.dobirth,
        dependent_type: data.dependent_type,
        gender: data.gender,
        phone_no: data.phone_no,
        email: data.email,
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        country_id: data.countryInfo? data.countryInfo.nationality_id: null,
        state_id: data.stateInfo?data.stateInfo.state_id: null,
        area_id: data.areaInfo? data.areaInfo.city_id: null,
        business_type: data.business_type,
        passport_picture: data.passport_picture,
        img_extension_passport: data.img_extension_passport
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      surname: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      firstname: {
        fieldTitle: `First Name`,
        required: `This field is required.`
      },
      dobirth: {
        fieldTitle: `Date of Birth`,
        required: `This field is required.`,
        futureDate: `Date of birth can't be in the future.`
      },
      gender: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      dependent_type: {
        fieldTitle: `Relationship`,
        required: `This field is required.`
      },
      img_size: {
        fieldTitle: `Photo`,
        required: `This field is required.`,
        greaterThan: `The selected photo is too large.`
      },
      email: {
        fieldTitle: `Email`,
        pattern: `Provide a valid email address.`,
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  convertToLowerCase() {
    const val = this.email.value ? this.email.value.toLowerCase() : null
    this.email.setValue(val)
  }

  // getUpdatedFormValues(formValue = this.value) {
  //   const phone_no = formValue.phone_no ? formValue.phone_no.toString() : null;
  //   const newValue = { ...formValue, phone_no };

  //   return newValue;
  // }

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



  get country(): AbstractControl {
    return this.form.get('country_id');
  }

  get state(): AbstractControl {
    return this.form.get('state_id');
  }

  get city(): AbstractControl {
    return this.form.get('area_id');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
}
