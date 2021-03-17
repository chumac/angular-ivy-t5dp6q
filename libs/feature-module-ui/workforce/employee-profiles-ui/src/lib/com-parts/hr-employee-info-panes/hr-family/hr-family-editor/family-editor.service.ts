import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IFamily, IHrFamily
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, greaterThanValidator } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { LoadStatesFamily, LoadCitiesFamily } from '../../../../store/employee-detailed-area';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { IEmployeesProfileState } from '../../../../store/root';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class FamilyEditorService {
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
      gender: [null, Validators.required],
      member_type: [null, Validators.required],
      address_line1: [null],
      address_line2:[null],
      country_id: [null],
      state_id: [null],
      area_id: [null],
      business_type:[null],
      phone_no: [null],
      email: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      comment: [null],
      on_payroll: [false],
      bank_id: [null],
      bank_branch: [null],
      account_no: [null],
      formula_id: [null],
      direct_amount: [null],
      hmo_id: [null],
      hmoplan_id: [null],
      hospital_id: [null],
      additional_document: [null],
      img_extension: [null],
      passport_picture: [null],
      img_extension_passport: [null],
      img_size:[null],
      // img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IHrFamily,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IHrFamily): IHrFamily | {} {
    if (data) {
      return {
        surname: data.surname,
        firstname: data.firstname,
        othernames: data.othernames,
        dobirth: data.dobirth,
        gender: data.gender,
        member_type: data.member_type,
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        country_id: data.nationality_id,
        state_id: data.state_id,
        area_id: data.city_id,
        business_type: data.biztype_id,
        phone_no: data.phone_no,
        email: data.email,
        comment: data.comment? data.comment:null,
        on_payroll: data.on_payroll,
        bank_id: data.bank_id ? data.bank_id:null,
        bank_branch: data.bank_branch? data.bank_branch:null,
        account_no: data.account_no ? data.account_no : null,
        formula_id: data.formula_id? data.formula_id:null,
        direct_amount: data.direct_amount,
        hmo_id: data.hmo_id ? data.hmo_id:null,
        hmoplan_id: data.hmoplan_id ?data.hmoplan_id:null,
        hospital_id: data.hospital_id? data.hospital_id:null,
        additional_document: data.additional_document,
        img_extension: data.img_extension,
        img_size:data.img_size,
        passport_picture: data.passport_picture,
        img_extension_passport: data.img_extension_passport,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      surname: {
        fieldTitle: `surname`,
        required: `This field is required.`
      },
      firstname: {
        fieldTitle: `First Name`,
        required: `This field is required.`
      },
      dobirth: {
        fieldTitle: `Date of birth`,
        required: `This field is required.`,
        futureDate: `Date of birth can't be in the future.`
      },
      member_type: {
        fieldTitle: `Relationship`,
        required: `This field is required.`
      },
      gender: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      email: {
        fieldTitle: `Email`,
        pattern: `Please provide a valid email address.`,
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
