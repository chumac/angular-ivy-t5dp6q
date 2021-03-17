import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { IReboardContact } from '@nutela/models/workforce/employee-profiles';
import { UtilService, greaterThanValidator } from '@nutela/core-services';


@Injectable({
  providedIn: 'root'
})
export class ReboardContactEditorService {
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

  init(approvedData: IReboardContact) {
    if (approvedData) {
      this.form.patchValue(this.fieldData(approvedData));
    }
  }

  fieldData(data: IReboardContact): IReboardContact | {} {
    if (data) {
      return {
        street1_r: data.street1_r ? data.street1_r : null,
        street2_r: data.street2_r ? data.street2_r : null,
        country_r: data.country_r ? data.country_r.nationality_id: null,
        state_r: data.state_r ? data.state_r.state_id : null,
        // city_r: data.area_r?data.area_r.city_id:null,
        zip_r: data.zip_r ? data.zip_r : null,
        same_address: data.same_address ? data.same_address : false,
        street1_p: data.street1_p ? data.street1_p : null,
        street2_p: data.street2_p ? data.street2_p : null,
        country_p: data.country_p ? data.country_p.nationality_id : null,
        state_p: data.state_p ? data.state_p.state_id : null,
        // city_p: null,
        zip_p: data.zip_p ? data.zip_p : null,
        email: data.email ? data.email : null,
        email_personal: data.email_personal ? data.email_personal : null,
        phone: data.phone ? data.phone : null,
        mobile_phone: data.mobile_phone ? data.mobile_phone : null,
        office_ext: data.office_ext ? data.office_ext : null,
        pager: data.pager ? data.pager : null,
        fax: data.fax ? data.fax : null,
        kin_title: data.kin_title ? data.kin_title : null,
        kin_relationship: data.kin_relationship ? data.kin_relationship : null,
        kin_Surname: data.kin_Surname ? data.kin_Surname : null,
        kin_firstname: data.kin_firstname ? data.kin_firstname : null,
        kin_otherNames: data.kin_otherNames ? data.kin_otherNames : null,
        kin_gender: data.kin_gender ? data.kin_gender : null,
        email_kin: data.email_kin ? data.email_kin : null,
        tel1_kin: data.tel1_kin ? data.tel1_kin : null,
        tel2_kin: data.tel2_kin ? data.tel2_kin : null,
        street1_kin: data.street1_kin ? data.street1_kin : null,
        street2_kin: data.street2_kin ? data.street2_kin : null,
        country_kin: data.country_kin ? data.country_kin.nationality_id : null,
        state_kin: data.state_kin ? data.state_kin.state_id : null,
        // city_kin: data.area_kin?data.area_kin.city_id:null,
        zip_kin: data.zip_kin ? data.zip_kin : null,
        image_kin: data.image_kin ? data.image_kin : null,
        img_extension_nextofkin: data.img_extension_nextofkin ? data.img_extension_nextofkin : null,
        area_r: data.area_r ? data.area_r.city_id : null,
        area_p: data.area_p ? data.area_p.city_id : null,
        gsm: data.gsm ? data.gsm : null,
        area_kin: data.area_kin ? data.area_kin.city_id : null,
        doc_binary: data.doc_binary ? data.doc_binary : null,
        doc_guid: data.doc_guid ? data.doc_guid : null,
        doc_url: data.doc_url ? data.doc_url : null,
        doc_extension: data.doc_extension ? data.doc_extension : null,
        doc_size: data.doc_size ? data.doc_size : null,
        doc_mimetype: data.doc_mimetype ? data.doc_mimetype : null,
        is_v2_update: data.is_v2_update ? data.is_v2_update : null,
        preferred_email: data.preferred_email ? data.preferred_email : null,
        kin_has_attachment: data.kin_has_attachment ? data.kin_has_attachment : null
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

  togglePermanentAddress(isChecked: boolean, record: IReboardContact) {
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
        country_p: record.country_p ? record.country_p.nationality_id : null,
        state_p: record.state_p ? record.state_p.state_id : null,
        area_p: record.area_p ? record.area_p.city_id : null,
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
