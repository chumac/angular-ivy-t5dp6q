import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Store } from '@ngrx/store';

import {
  IGeneral,
} from '@nutela/models/workforce/employee-profiles';
import { ageRangeValidator, UtilService } from '@nutela/core-services';
import {
  titleCheckValidator,
  maidenNameCheckValidator,
  weddingDateCheckValidator
} from './personal-information-editor.factory';


@Injectable({
  providedIn: 'root'
})
export class PersonalInformationEditorService {
  private form: FormGroup = new FormGroup({});

  minimumAge = 18;
  maximumAge = 65;
  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
        employee_id: [null],
        employee_surname: [null, Validators.required],
        employee_firstname: [null, Validators.required],
        employee_midname: [null],
        title: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        marital_status: [null, Validators.required],
        wedding_date: [null],
        maiden_name: [null],
        homeplace: [null],
        birth_country_id: [null],
        birthstate_id: [null],
        nationality_id: [null],
        state_id: [null],
        lga_id: [null],
        religion_id: [null],
        additional_document: [null],
        img_extension: [null],
        img_size: [null],
        area_id: [null],
        image_personal: [null],
        image_profile: [null],
        img_guid: [null],
        img_url: [null],
        img_personal_extension_passport: [null],
        img_profile_extension_passport: [null],
        sys_surname: [null],
        sys_firstname: [null],
        emp_facebook: [null],
        emp_linkedin: [null],
        emp_twitterhandle: [null],
        date_of_birth: [
          null,
          [
            Validators.required,
            ageRangeValidator(
              this.util.currentDate,
              this.minimumAge,
              this.maximumAge
            )
          ]
        ],
      },
      {
        validator: [
          titleCheckValidator,
          maidenNameCheckValidator,
          weddingDateCheckValidator(this.util.currentDate)
        ]
      }
    );
  }

  init(data: IGeneral) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IGeneral): IGeneral | {} {
    if (data) {
      return {
        employee_id: data.employee_id,
        employee_surname: data.employee_surname,
        employee_firstname: data.employee_firstname,
        employee_midname: data.employee_midname?data.employee_midname:'',
        title: data.title,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
        marital_status: data.marital_status,
        wedding_date: data.wedding_date,
        maiden_name: data.maiden_name,
        homeplace: data.homeplace,
        birth_country_id: data.birth_country?data.birth_country.nationality_id:null,
        birthstate_id: data.birthstate?data.birthstate.state_id:null,
        city_id: data.area?data.area.city_id:null,
        nationality_id: data.nationality?data.nationality.nationality_id:null,
        state_id: data.state?data.state.state_id:null,
        lga_id: data.lga?data.lga.lga_id:null,
        religion_id: data.religion?data.religion.religion_id:null,
        area_id: data.area?data.area.city_id:null,
        image_personal: data.image_personal,
        image_profile: data.image_profile,
        img_guid: data.img_guid,
        img_url: data.img_url,
        img_personal_extension_passport: data.img_personal_extension_passport,
        img_profile_extension_passport: data.img_profile_extension_passport,
        sys_surname: data.sys_surname,
        sys_firstname: data.sys_firstname,
        emp_facebook: data.emp_facebook,
        emp_linkedin: data.emp_linkedin,
        emp_twitterhandle: data.emp_twitterhandle,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_surname: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      employee_firstname: {
        fieldTitle: `First name`,
        required: `This field is required.`
      },
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      gender: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      date_of_birth: {
        fieldTitle: `Date of Birth`,
        required: `This field is required.`,
        ageRange: `Age must fall between ${this.minimumAge} and ${
          this.maximumAge
        } (both inclusive).`
      },
      marital_status: {
        fieldTitle: `Marital Status`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        titleCheck: `The title is invalid based on the selected gender.`,
        maidenNameCheck: `Maiden name must be provided if female, married, divorced or separated.`,
        weddingDateNullCheck: `Wedding date must be provided if married.`,
        weddingFutureDateCheck: `Wedding date cannot be in the future.`
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


  get surname(): AbstractControl {
    return this.form.get('employee_surname');
  }

  get firstname(): AbstractControl {
    return this.form.get('employee_firstname');
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get gender(): AbstractControl {
    return this.form.get('gender');
  }

  get maritalStatus(): AbstractControl {
    return this.form.get('marital_status');
  }

  get dateOfBirth(): AbstractControl {
    return this.form.get('date_of_birth');
  }

  get maidenName(): AbstractControl {
    return this.form.get('maiden_name');
  }

  get weddingAnniversary(): AbstractControl {
    return this.form.get('wedding_date');
  }

  get birthCountry(): AbstractControl {
    return this.form.get('birth_country_id');
  }

  get birthState(): AbstractControl {
    return this.form.get('birthstate_id');
  }

  get birthCity(): AbstractControl {
    return this.form.get('area_id');
  }

  get stateOfOrigin(): AbstractControl {
    return this.form.get('state_id');
  }

  get lga(): AbstractControl {
    return this.form.get('lga_id');
  }
}
