
import { ValidatorFn, AbstractControl } from "@angular/forms";
import { isFutureDate, formatDate } from "@nutela/core-services";

function corporateIdExpirationFutureDateValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlValue = control.value || '';

    const invalidObj = { corporateIdExpirationFutureDate: true };

    if (controlValue !== '' && (!isFutureDate(formatDate(currentDate), formatDate(controlValue)))) {
      return invalidObj;
    } else {
      return null;
    }
  };
}

function nationalIdValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const nIdNumber = control.get('national_id_number').value || '';
    const nIdIssueDate = control.get('national_id_issuedate').value || '';
    const nIdExpiryDate = control.get('national_id_expires').value || '';

    const invalidObjNationalIdNumberRequired = { nationalIdNumberRequired: true };
    const invalidObjNationalIdIssueAndExpiryDateRequired = { nationalIdIssueAndExpiryDateRequired: true };
    const invalidObjNationalIdFutureIssueDate = { nationalIdFutureIssueDate: true };
    const invalidObjNationalIdIssueDateAfterExpiryDate = { nationalIdIssueDateAfterExpiryDate: true };

    if (nIdNumber || nIdIssueDate || nIdExpiryDate) {
      if (!nIdNumber || nIdNumber === '') {
        return invalidObjNationalIdNumberRequired;
      } else if (!(nIdIssueDate && nIdExpiryDate)) {
        return invalidObjNationalIdIssueAndExpiryDateRequired;
      } else if (isFutureDate(formatDate(currentDate), formatDate(nIdIssueDate))) {
        return invalidObjNationalIdFutureIssueDate;
      } else if (isFutureDate(formatDate(nIdExpiryDate), formatDate(nIdIssueDate))) {
        return invalidObjNationalIdIssueDateAfterExpiryDate;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}

function passportValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const passportNumber = control.get('passport_no').value || '';
    const passportAuthority = control.get('passport_authority').value || '';
    const passportIssueDate = control.get('passport_date_issued').value || '';
    const passportExpiryDate = control.get('passport_expires').value || '';

    const invalidObjPassportNumberRequired = { passportNumberRequired: true };
    const invalidObjPassportAuthorityRequired = { passportAuthorityRequired: true };
    const invalidObjPassportIssueAndExpiryDateRequired = { passportIssueAndExpiryDateRequired: true };
    const invalidObjPassportFutureIssueDate = { passportFutureIssueDate: true };
    const invalidObjPassportIssueDateAfterExpiryDate = { passportIssueDateAfterExpiryDate: true };

    if (passportNumber || passportAuthority || passportIssueDate || passportExpiryDate) {
      if (!passportNumber || passportNumber === '') {
        return invalidObjPassportNumberRequired;
      } else if (!passportAuthority || passportAuthority === '') {
        return invalidObjPassportAuthorityRequired;
      } else if (!(passportIssueDate && passportExpiryDate)) {
        return invalidObjPassportIssueAndExpiryDateRequired;
      } else if (isFutureDate(formatDate(currentDate), formatDate(passportIssueDate))) {
        return invalidObjPassportFutureIssueDate;
      } else if (isFutureDate(formatDate(passportExpiryDate), formatDate(passportIssueDate))) {
        return invalidObjPassportIssueDateAfterExpiryDate;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}

function localDriversLicenseValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const ldlNumber = control.get('license_no').value || '';
    const ldlIssueDate = control.get('license_issuedate').value || '';
    const ldlExpiryDate = control.get('license_expires').value || '';

    const invalidObjLDLNumberRequired = { localDriversLicenseNumberRequired: true };
    const invalidObjLDLicenseIssueAndExpiryDateRequired = { localDriversLicenseIssueAndExpiryDateRequired: true };
    const invalidObjLDLicenseFutureIssueDate = { localDriversLicenseFutureIssueDate: true };
    const invalidObjLDLicenseIssueDateAfterExpiryDate = { localDriversLicenseIssueDateAfterExpiryDate: true };

    if (ldlNumber || ldlIssueDate || ldlExpiryDate) {
      if (!ldlNumber || ldlNumber === '') {
        return invalidObjLDLNumberRequired;
      } else if (!(ldlIssueDate && ldlExpiryDate)) {
        return invalidObjLDLicenseIssueAndExpiryDateRequired;
      } else if (isFutureDate(formatDate(currentDate), formatDate(ldlIssueDate))) {
        return invalidObjLDLicenseFutureIssueDate;
      } else if (isFutureDate(formatDate(ldlExpiryDate), formatDate(ldlIssueDate))) {
        return invalidObjLDLicenseIssueDateAfterExpiryDate;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}

function internationalDriversLicenseValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const idlNumber = control.get('intl_license_no').value || '';
    const idlIssueDate = control.get('intl_license_issuedate').value || '';
    const idlExpiryDate = control.get('intl_license_expires').value || '';

    const invalidObjIDLNumberRequired = { internationalDriversLicenseNumberRequired: true };
    const invalidObjIDLicenseIssueAndExpiryDateRequired = { internationalDriversLicenseIssueAndExpiryDateRequired: true };
    const invalidObjIDLicenseFutureIssueDate = { internationalDriversLicenseFutureIssueDate: true };
    const invalidObjIDLicenseIssueDateAfterExpiryDate = { internationalDriversLicenseIssueDateAfterExpiryDate: true };

    if (idlNumber || idlIssueDate || idlExpiryDate) {
      if (!idlNumber || idlNumber === '') {
        return invalidObjIDLNumberRequired;
      } else if (!(idlIssueDate && idlExpiryDate)) {
        return invalidObjIDLicenseIssueAndExpiryDateRequired;
      } else if (isFutureDate(formatDate(currentDate), formatDate(idlIssueDate))) {
        return invalidObjIDLicenseFutureIssueDate;
      } else if (isFutureDate(formatDate(idlExpiryDate), formatDate(idlIssueDate))) {
        return invalidObjIDLicenseIssueDateAfterExpiryDate;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}

export { corporateIdExpirationFutureDateValidator, nationalIdValidator, passportValidator, localDriversLicenseValidator, internationalDriversLicenseValidator };
