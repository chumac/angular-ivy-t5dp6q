import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import {
  IIdentification,
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, greaterThanValidator } from '@nutela/core-services';
import { nationalIdValidator, passportValidator, localDriversLicenseValidator, internationalDriversLicenseValidator } from './hr-reboard-identification-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class HrReboardIdentificationEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  showInput: boolean;
  showEmailType: boolean = false;
  permanentStaff: boolean;
  userOnPayroll: boolean;
  generatedStaffNum = null;
  isAdmin: boolean;
  isEndDateRequired: boolean;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
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
      corporate_id_expires: [null, Validators.required], //, Validators.compose([corporateIdExpirationFutureDateValidator(this.util.currentDate)])
      national_id_number: [null],
      national_id_issuedate: [null],
      national_id_expires: [null],
      passport_no: [null],
      passport_authority: [null],
      passport_date_issued: [null],
      passport_expires: [null],
      on_payroll: [null],
      payment_mode: [null],
      is_permanentstaff: [false],
      emp_duration_from: [null],
      emp_duration_to: [null],
      license_no: [null],
      license_issuedate: [null,],
      license_expires: [null],
      intl_license_no: [null],
      intl_license_issuedate: [null],
      intl_license_expires: [null],
      image_signature: [null],
      img_extension_signature: [null],
      img_size: [0, Validators.compose([greaterThanValidator(this.util.maximumImageSize)])]
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
      return {
        corporate_id_expires: (data.emp_duration_to)? data.emp_duration_to: data.corporate_id_expires,
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
        intl_license_expires: data.intl_license_expires
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      corporate_id_expires: {
        fieldTitle: `Corporate ID Expiry Date`,
        required: `This field is required.`,
        corporateIdExpirationFutureDate: `Corporate Id expiration date must be today or in the future.`
      },
      img_size: {
        fieldTitle: `Signature Image`,
        required: `This field is required.`,
        greaterThan: `The selected image is too large.`
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


  get permStaff(): AbstractControl {
    return this.form.get('is_permanentstaff');
  }

  get startDate(): AbstractControl {
    return this.form.get('emp_duration_from');
  }
  get endDate(): AbstractControl {
    return this.form.get('emp_duration_to');
  }
  get confirmationDate(): AbstractControl {
    return this.form.get('a_confirm_date');
  }
  get employmentDate(): AbstractControl {
    return this.form.get('employment_date');
  }

  get employeeTitle(): AbstractControl {
    return this.form.get('title');
  }

  get payGroup(): AbstractControl {
    return this.form.get('paygroup_id');
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

  get empDurationTo(): AbstractControl {
    return this.form.get('emp_duration_to');
  }
}
