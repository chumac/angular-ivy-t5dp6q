import { ValidatorFn, AbstractControl, Validators } from "@angular/forms";
import { isFutureDate, formatDate } from "@nutela/core-services";
import * as contants from '@nutela/shared/app-global';

function employmentExitFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const startDate = control.get('emp_duration_from').value || '';
    const endDate = control.get('emp_duration_to').value || '';

    const invalidObj = { employmentExitFutureDate: true };

    if (isFutureDate(formatDate(endDate), formatDate(startDate))) {
      return invalidObj;
    } else {
      return null;
    }
  };
}

function setRequireEndDate(permStaff): ValidatorFn{
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    const controlValue = control.value || '';
    const invalidObj = { isRequired: true};
    if(permStaff === false ) {
      controlValue.setValidators([Validators.required]);
      return invalidObj
    } else {
      return null;
    }
}
}



function titleCheckValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const title = control.get('title').value || '';
  const gender = control.get('gender').value || '';

  const invalidObj = { titleCheck: true };

  if (title === undefined || gender === undefined) {
    return null;
  } else if (
    gender === contants.GENDER.male &&
    (title === contants.TITLE.mr || title === contants.TITLE.dr)
  ) {
    return null;
  } else if (
    gender === contants.GENDER.female &&
    (title === contants.TITLE.miss ||
      title === contants.TITLE.mrs ||
      title === contants.TITLE.ms ||
      title === contants.TITLE.dr)
  ) {
    return null;
  } else {
    return invalidObj;
  }
}

function syncNameValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
    const isOnActiveDirectory = control.get('user_on_ad').value || '';

    const invalidObj = { requireSyncFirstnameAndSyncSurname: true };

    if(isOnActiveDirectory) {
      return invalidObj;
    } else {
      return null
    };
  };

export {
  employmentExitFutureDateValidator,
  syncNameValidator,
  titleCheckValidator,
  setRequireEndDate
 }
