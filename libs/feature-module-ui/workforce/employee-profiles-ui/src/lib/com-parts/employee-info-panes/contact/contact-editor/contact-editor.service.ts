import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { IContact } from '@nutela/models/workforce/employee-profiles';
import { UtilService, greaterThanValidator } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';


@Injectable({
  providedIn: 'root'
})
export class ContactEditorService {
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
      street1_r: [null],
      street2_r: [null],
      country_r: [null],
      state_r: [null],
      // city_r: [null],
      zip_r: [null],
      same_address: [false],
      street1_p: [null],
      street2_p: [null],
      country_p: [null],
      state_p: [null],
      // city_p: [null],
      zip_p: [null],
      email: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      email_personal: [null, Validators.compose([ Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      phone: [null],
      mobile_phone: [null],
      office_ext: [null],
      pager: [null],
      fax: [null],
      kin_title: [null],
      kin_relationship: [null],
      kin_Surname: [null],
      kin_firstname: [null],
      kin_otherNames: [null],
      kin_gender: [null],
      email_kin: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      tel1_kin: [null],
      tel2_kin: [null],
      street1_kin: [null],
      street2_kin: [null],
      country_kin: [null],
      state_kin: [null],
      // city_kin: [null],
      zip_kin: [null],
      image_kin: [null],
      img_extension_nextofkin: [null],
      img_size: [null, Validators.compose([greaterThanValidator(this.util.maximumImageSize)])],
      area_r: [null],
      area_p: [null],
      gsm: [null],
      area_kin: [null],
      doc_binary: [null],
      doc_guid: [null],
      doc_url: [null],
      doc_extension: [null],
      doc_size: [0],
      doc_mimetype: [null],
      is_v2_update: [false],
      preferred_email: [null, Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      kin_has_attachment: [false]
    });
  }

  init(approvedData: IContact) {
    if (approvedData) {
      this.form.patchValue(this.fieldData(approvedData));
    }
  }

  fieldData(data: IContact): IContact | {} {
    if (data) {
      return {
        street1_r: data.street1_r,
        street2_r: data.street2_r,
        country_r: data.country_r_nationality_id ? data.country_r_nationality_id: null,
        state_r: data.state_r_state_id,
        // city_r: data.area_r?data.area_r.city_id:null,
        zip_r: data.zip_r,
        same_address: data.same_address,
        street1_p: data.street1_p,
        street2_p: data.street2_p,
        country_p: data.country_p_nationality_id,
        state_p: data.state_p_state_id,
        // city_p: null,
        zip_p: data.zip_p,
        email: data.email,
        email_personal: data.email_personal,
        phone: data.phone,
        mobile_phone: data.mobile_phone,
        office_ext: data.office_ext,
        pager: data.pager,
        fax: data.fax,
        kin_title: data.kin_title,
        kin_relationship: data.kin_relationship,
        kin_Surname: data.kin_Surname,
        kin_firstname: data.kin_firstname,
        kin_otherNames: data.kin_otherNames,
        kin_gender: data.kin_gender,
        email_kin: data.email_kin,
        tel1_kin: data.tel1_kin,
        tel2_kin: data.tel2_kin,
        street1_kin: data.street1_kin,
        street2_kin: data.street2_kin,
        country_kin: data.country_kin_nationality_id,
        state_kin: data.state_kin_state_id,
        // city_kin: data.area_kin?data.area_kin.city_id:null,
        zip_kin: data.zip_kin,
        image_kin: data.image_kin,
        img_extension_nextofkin: data.img_extension_nextofkin,
        area_r: data.area_r_city_id,
        area_p: data.area_p_city_id,
        gsm: data.gsm,
        area_kin: data.area_kin_city_id,
        doc_binary: data.doc_binary,
        doc_guid: data.doc_guid,
        doc_url: data.doc_url,
        doc_extension: data.doc_extension,
        doc_size: data.doc_size,
        doc_mimetype: data.doc_mimetype,
        is_v2_update: data.is_v2_update,
        preferred_email: data.preferred_email,
        kin_has_attachment: data.kin_has_attachment
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
      marital_status: {
        fieldTitle: `Marital Status`,
        required: `This field is required.`
      },
      img_size: {
        fieldTitle: `Next-of-Kin Photo`,
        required: `This field is required.`,
        greaterThan: `The selected photo is too large.`
      },
      email: {
        fieldTitle: `Email`,
        pattern: `Please provide a valid email address.`,
      },
      email_personal: {
        fieldTitle: `Personal Email`,
        pattern: `Please provide a valid email address.`,
      },
      email_kin: {
        fieldTitle: `Next of kin Email`,
        pattern: `Please provide a valid email address.`,
      },
      preferred_email: {
        fieldTitle: `Preferred Email`,
        pattern: `Please provide a valid email address.`,
      },

      flx: {
        fieldTitle: `Other Errors`,
        titleCheck: `The title is invalid based on the selected gender.`,
        maidenNameCheck: `Maiden name must be provided if female, married, divorced or separated.`,
        weddingDateNullCheck: `Wedding date must be provided if married.`,
        weddingDateCheck: `Wedding date cannot be in the future.`,
      }
    };
  }


  convertToLowerCase() {
    this.email.setValue(this.email.value? this.email.value.toLowerCase() : null)
    this.personalEmail.setValue(this.personalEmail.value ? this.personalEmail.value.toLowerCase() : null)
    this.nextOfKinEmail.setValue(this.nextOfKinEmail.value ? this.nextOfKinEmail.value.toLowerCase() : null)
    this.preferredEmail.setValue(this.preferredEmail.value ? this.preferredEmail.value.toLowerCase() : null)
  }

  togglePermanentAddress(isChecked: boolean, record: IContact) {
    if (isChecked) {
      this.permanentStreet1.setValue(this.residentialStreet1.value ? this.residentialStreet1.value : '');
      this.permanentStreet2.setValue(this.residentialStreet2.value ? this.residentialStreet2.value : '');
      this.permanentZip.setValue(this.residentialZip.value ? this.residentialZip.value : '');
      this.permanentCountry.setValue(this.residentialCountry.value ? this.residentialCountry.value : '');
      this.permanentState.setValue(this.residentialState.value ? this.residentialState.value : '');
      this.permanentCity.setValue(this.residentialCity.value ? this.residentialCity.value : '');

      this.permanentStreet1.disable();
      this.permanentStreet2.disable();
      this.permanentZip.disable();
      this.permanentCountry.disable();
      this.permanentState.disable();
      this.permanentCity.disable();
    } else {
      this.patch({
        street1_p: record.street1_p ? record.street1_p : '',
        street2_p: record.street2_p ? record.street2_p : '',
        zip_p: record.zip_p ? record.zip_p : '',
        country_p: record.country_p_nationality_id ? record.country_p_nationality_id : null,
        state_p: record.state_p_state_id ? record.state_p_state_id : null,
        area_p: record.area_p_city_id ? record.area_p_city_id : null,
      })
      this.permanentStreet1.enable();
      this.permanentStreet2.enable();
      this.permanentZip.enable();
      this.permanentCountry.enable();
      this.permanentState.enable();
      this.permanentCity.enable();
    }
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

  get KinTitle(): AbstractControl {
    return this.form.get('kin_title');
  }

  get sameAddress(): AbstractControl {
    return this.form.get('same_address');
  }

  get kinGender(): AbstractControl {
    return this.form.get('kin_gender');
  }

  get residentialStreet1(): AbstractControl {
    return this.form.get('street1_r');
  }

  get residentialStreet2(): AbstractControl {
    return this.form.get('street2_r');
  }

  get residentialZip(): AbstractControl {
    return this.form.get('zip_r');
  }

  get residentialCountry(): AbstractControl {
    return this.form.get('country_r');
  }

  get residentialState(): AbstractControl {
    return this.form.get('state_r');
  }

  get residentialCity(): AbstractControl {
    return this.form.get('area_r');
  }

  get permanentStreet1(): AbstractControl {
    return this.form.get('street1_p');
  }

  get permanentStreet2(): AbstractControl {
    return this.form.get('street2_p');
  }

  get permanentZip(): AbstractControl {
    return this.form.get('zip_p');
  }

  get permanentCountry(): AbstractControl {
    return this.form.get('country_p');
  }

  get permanentState(): AbstractControl {
    return this.form.get('state_p');
  }

  get permanentCity(): AbstractControl {
    return this.form.get('area_p');
  }

  get nextofkinState(): AbstractControl {
    return this.form.get('state_kin');
  }

  get nextofkinCity(): AbstractControl {
    return this.form.get('area_kin');
  }

  get nextofkinImage(): AbstractControl {
    return this.form.get('image_kin');
  }

  get nextofkinImageExtension(): AbstractControl {
    return this.form.get('img_extension_nextofkin');
  }

  get nextofkinImageOversized(): AbstractControl {
    return this.form.get('image_oversized');
  }

  get nextOfKinEmail(): AbstractControl {
    return this.form.get('email_kin');
  }

  get personalEmail(): AbstractControl {
    return this.form.get('email_personal');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get preferredEmail(): AbstractControl {
    return this.form.get('preferred_email');
  }
}
