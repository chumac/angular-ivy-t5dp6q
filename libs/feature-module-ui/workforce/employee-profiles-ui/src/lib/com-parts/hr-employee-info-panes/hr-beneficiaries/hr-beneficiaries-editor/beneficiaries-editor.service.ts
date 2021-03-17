import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IBeneficiary
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { LoadCitiesHRBeneficiary, LoadStatesHRBeneficiary } from '../../../../store/employee-detailed-area';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { IEmployeesProfileState } from '../../../../store/root';
import { titleCheckValidator } from './beneficiaries-editor.factory';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesEditorService {
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
      title: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      firstname: [null, Validators.required],
      othernames: [null],
      relationship_type: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      phone_no: [null],
      email: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      address_line1: [null, [Validators.required]],
      address_line2: [null],
      country_id: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      area_id: [null],
      percentage: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      // passport_picture: [null],
      // img_extension_passport: [null],
      // img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])]
      passport_picture: [null],
      img_extension_passport: [null],
      img_size: [null],
      img_extension: [null],
      img_url: [null],
      img_guid: [null],
    }, {
      validator: [
        titleCheckValidator
      ]
    }
    );
  }

  init(
    data: IBeneficiary,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IBeneficiary): IBeneficiary | {} {
    if (data) {
      return {
        title: data.title ? data.title: null,
        surname: data.surname ? data.surname: null,
        firstname: data.firstname ? data.firstname: null,
        othernames: data.othernames ? data.othernames: null,
        relationship_type: data.relationship_type ? data.relationship_type: null,
        gender: data.gender ? data.gender: null,
        phone_no: data.phone_no ? data.phone_no: null,
        email: data.email ? data.email: null,
        address_line1: data.address_line1 ? data.address_line1: null,
        address_line2: data.address_line2 ? data.address_line2: null,
        country_id: data.nationality_id ? data.nationality_id: null,
        state_id: data.state_id ? data.state_id: null,
        area_id: data.city_id ? data.city_id: null,
        percentage: data.percentage ? data.percentage: null,
        passport_picture: data.passport_picture ? data.passport_picture: null,
        img_extension_passport: data.img_extension_passport ? data.img_extension_passport : null,
        img_extension: data.img_extension ? data.img_extension : null,
        img_url: data.img_url ? data.img_url : null,
        img_guid: data.img_guid ? data.img_guid : null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      surname: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      relationship_type: {
        fieldTitle: `Relationship`,
        required: `This field is required.`
      },
      firstname: {
        fieldTitle: `Firstname`,
        required: `This field is required.`
      },
      gender: {
        fieldTitle: `Gender`,
        required: `This field is required.`,
      },
      phone_no: {
        fieldTitle: `Phone No`,
        validPhoneNumber: `The phone number is invalid.`
      },
      address_line1: {
        fieldTitle: `Street 1`,
        required: `This field is required.`,
      },
      email: {
        fieldTitle: `Email`,
        required: `This field is required.`,
        pattern: `Provide a valid email address.`
      },
      country_id: {
        fieldTitle: `Country`,
        required: `This field is required.`
      },
      state_id: {
        fieldTitle: `State`,
        required: `This field is required.`
      },
      percentage: {
        fieldTitle: `Percentage`,
        required: `This field is required.`,
        min: `Percentage cannot be less than or equal to 0.`,
        max: `Percentage cannot be greater than 100.`
      },
      img_size: {
        fieldTitle: `Photo`,
        required: `This field is required.`,
        greaterThan: `The selected photo is too large.`
      },
      flx: {
        fieldTitle: `Other Errors`,
      }
    };
  }


  convertToLowerCase() {
    this.email.setValue(this.email.value ? this.email.value.toLowerCase() : null)
  }

  // getUpdatedFormValues(formValue = this.value) {
  //   const phone_no = formValue.phone_no ? formValue.phone_no.toString() : null;
  //   const percentage = formValue.percentage ? formValue.percentage.toString() : null;
  //   const newValue = { ...formValue, phone_no, percentage };

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


  get title(): AbstractControl {
    return this.form.get('title');
  }

  get gender(): AbstractControl {
    return this.form.get('gender');
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
