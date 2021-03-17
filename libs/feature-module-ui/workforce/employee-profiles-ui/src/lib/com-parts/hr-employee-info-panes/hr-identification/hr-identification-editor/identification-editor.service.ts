import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import {
  IIdentification
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, greaterThanValidator } from '@nutela/core-services';
import { corporateIdExpirationFutureDateValidator, nationalIdValidator, passportValidator, localDriversLicenseValidator, internationalDriversLicenseValidator } from './identification-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class IdentificationEditorService {
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
      corporate_id_expires: [null, Validators.compose([corporateIdExpirationFutureDateValidator(this.util.currentDate)])],
      national_id_number: [null],
      national_id_issuedate: [null],
      national_id_expires: [null],
      passport_no: [null],
      passport_authority: [null],
      passport_date_issued: [null],
      passport_expires: [null],
      license_no: [null],
      license_issuedate: [null,],
      license_expires: [null],
      intl_license_no: [null],
      intl_license_issuedate: [null],
      intl_license_expires: [null],
      image_signature: [null],
      img_extension_signature: [null],
      img_size:[null],
      // img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])],
      employment_date: [null],
      p_confirm_date: [null],
      a_confirm_date: [null],
      grade_id: [null],
      title_id: [null],
      acting_title_id: [null],
      position_id: [null],
      reports_to: [null],
      backup_officer_id: [null],
      paygroup_id: [null],
      on_payroll: [false],
      payment_mode: [null],
      is_permanentstaff: [''],
      emp_duration_from: [null],
      emp_duration_to: [null],
    },
      {
        validator: [nationalIdValidator(this.util.currentDate), passportValidator(this.util.currentDate), localDriversLicenseValidator(this.util.currentDate), internationalDriversLicenseValidator(this.util.currentDate)]
      }
    );
  }

  init(data: IIdentification) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IIdentification): IIdentification | {} {
    if (data) {
      console.log('data', data);
      return {
        corporate_id_expires: data.corporate_id_expires,
        national_id_number: data.national_id_number,
        national_id_issuedate: data.national_id_issuedate,
        national_id_expires: data.national_id_expires,
        passport_no: data.passport_no,
        passport_authority: data.passport_authority,
        passport_date_issued: data.passport_date_issued,
        passport_expires: data.passport_expires,
        license_no: data.license_no,
        license_issuedate: data.license_issuedate,
        license_expires: data.license_expires,
        intl_license_no: data.intl_license_no,
        intl_license_issuedate: data.intl_license_issuedate,
        intl_license_expires: data.intl_license_expires,
        employment_date: data.employment_date,
        a_confirm_date: data.a_confirm_date,
        p_confirm_date: data.p_confirm_date,
        emp_duration_from: data.emp_duration_from?data.emp_duration_from:data.employment_date,
        emp_duration_to: data.emp_duration_to,
        grade_id: data.grade?data.grade.grade_id:null,
        title_id: data.title?data.title.title_id:null,
        acting_title_id: data.acting_title?data.acting_title.title_id:null,
        position_id: data.position?data.position.position_id:null,
        reports_to: data.reports_to?data.reports_to.employee_id:null,
        backup_officer_id: data.backup_officer?data.backup_officer.employee_id:null,
        paygroup_id:data.paygroup?data.paygroup.paygroup_id:null ,
        on_payroll:data.on_payroll?data.on_payroll:null ,
        payment_mode:data.payment_mode?data.payment_mode:null,
        is_permanentstaff: data.is_permanentstaff ,
      img_size: data.img_size? data.img_size: null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      corporate_id_expires: {
        fieldTitle: `Corporate ID Expiry Date`,
        corporateIdExpirationFutureDate: `Corporate Id expiration date must be today or in the future.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        nationalIdNumberRequired: `Please, enter your National Id number.`,
        nationalIdIssueAndExpiryDateRequired: `Please, enter your National Id Issue and Expiry Dates.`,
        nationalIdFutureIssueDate: `National Id Issue Date can't be in the future.`,
        nationalIdIssueDateAfterExpiryDate: `National Id Issue Date must be earlier than the Expiry Date.`,
        passportNumberRequired: `Please, enter your Passport number.`,
        passportAuthorityRequired: `Please, enter the Passport authority.`,
        passportIssueAndExpiryDateRequired: `Please, enter Passport Issue and Expiry Dates.`,
        passportFutureIssueDate: `Passport Issue Date can't be in the future.`,
        passportIssueDateAfterExpiryDate: `Passport Issue Date must be earlier than the Expiry Date.`,
        localDriversLicenseNumberRequired: `Please, enter your Local Driver's License number.`,
        localDriversLicenseIssueAndExpiryDateRequired: `Please, enter your Local Driver's License Issue and Expiry Dates.`,
        localDriversLicenseFutureIssueDate: `Local Driver's License Issue Date can't be in the future.`,
        localDriversLicenseIssueDateAfterExpiryDate: `Local Driver's License Issue Date must be earlier than the Expiry Date.`,
        internationalDriversLicenseNumberRequired: `Please, enter your International Driver's License number.`,
        internationalDriversLicenseIssueAndExpiryDateRequired: `Please, enter your International Driver's License Issue and Expiry Dates.`,
        internationalDriversLicenseFutureIssueDate: `International Driver's License Issue Date can't be in the future.`,
        internationalDriversLicenseIssueDateAfterExpiryDate: `International Driver's License Issue Date must be earlier than the Expiry Date.`,
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



  get corporateIdExpiryDate(): AbstractControl {
    return this.form.get('corporate_id_expires');
  }

  get nationalIdNumber(): AbstractControl {
    return this.form.get('national_id_number');
  }

  get nationalIdIssueDate(): AbstractControl {
    return this.form.get('national_id_issuedate');
  }

  get nationalIdExpiryDate(): AbstractControl {
    return this.form.get('national_id_expires');
  }

  get passportNmber(): AbstractControl {
    return this.form.get('passport_no');
  }

  get passportAuthority(): AbstractControl {
    return this.form.get('passport_authority');
  }

  get passportIssueDate(): AbstractControl {
    return this.form.get('passport_date_issued');
  }

  get passportExpiryDate(): AbstractControl {
    return this.form.get('passport_expires');
  }

  get licenseNumber(): AbstractControl {
    return this.form.get('license_no');
  }

  get licenseIssueDate(): AbstractControl {
    return this.form.get('license_issuedate');
  }

  get licenseExpiryDate(): AbstractControl {
    return this.form.get('license_expires');
  }

  get intlLicenseNumber(): AbstractControl {
    return this.form.get('intl_license_no');
  }

  get intlLicenseIssueDate(): AbstractControl {
    return this.form.get('intl_license_issuedate');
  }

  get intlLicenseExpiryDate(): AbstractControl {
    return this.form.get('intl_license_expires');
  }

  get permanentStaff(): AbstractControl {
    return this.form.get('is_permanentstaff');
  }

  get paygroup(): AbstractControl {
    return this.form.get('paygroup_id');
  }
}
