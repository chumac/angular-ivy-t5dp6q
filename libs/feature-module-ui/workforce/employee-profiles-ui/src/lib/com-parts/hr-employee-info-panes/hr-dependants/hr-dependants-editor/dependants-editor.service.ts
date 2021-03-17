import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IDependant, IHrDependant
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, greaterThanValidator } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { LoadStatesDependant, LoadCitiesDependant } from '../../../../store/employee-detailed-area';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { IEmployeesProfileState } from '../../../../store/root';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class DependantsEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private store: Store<IEmployeesProfileState>
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
      phone_no: [null, Validators.compose([])],
      email: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      address_line1: [null],
      address_line2: [null],
      country_id: [null],
      state_id: [null],
      comment:[null],
      hmo_id:[null],
      hmoplan_id:[null],
      hospital_id:[null],
      area_id: [null],
      business_type: [null],
      passport_picture: [null],
      img_extension_passport: [null],
      img_extension:[null],
      img_url:[null],
      img_guid:[null],
      img_size:[null],
      // img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IHrDependant,
    selectOptionData: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IHrDependant): IHrDependant | {} {
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
        country_id: data.nationality_id,
        state_id: data.state_id,
        area_id: data.city_id,
        business_type: data.business_type,
        passport_picture: data.passport_picture,
        img_extension_passport: data.img_extension_passport,
        img_extension: data.img_extension,
        img_url: data.img_url,
        img_guid: data.img_guid,
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
      phone_no: {
        fieldTitle: `Phone Number`,
        pattern: `Provide a valid phone number.`,
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
    const val = this.email.value ? this.email.value.toLowerCase() : null;
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
