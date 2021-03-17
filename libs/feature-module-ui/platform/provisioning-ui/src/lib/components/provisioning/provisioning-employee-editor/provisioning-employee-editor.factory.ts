import { ValidatorFn, AbstractControl, Validators } from "@angular/forms";
import * as contants from '@nutela/shared/app-global';
import { isFutureDate, formatDate, isDateValid, dateDiffD, dateDiffY, dateDiffM } from "@nutela/core-services";

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

// function isIntegerValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const isIntegerControl = control.get('number_test').value || '';

//     const invalidObj = { isNumberInteger: true };

//     if(Number.isInteger(parseFloat(isIntegerControl)) === false) {
//       return invalidObj;
//     } else {
//       return null
//     };
//   };
// }

function employmentConfirmationFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const startDate = control.get('employment_date').value || '';
    const endDate = control.get('a_confirm_date').value || '';

    const invalidObj = { employmentConfirmationFutureDate: true };

    if (isFutureDate(formatDate(endDate), formatDate(startDate))) {
      return invalidObj;
    } else {
      return null;
    }
  };
}


function  isSameDate(
  firstDate: string | Date,
  secondDate: string | Date
): boolean {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    const diffDays = dateDiffD(formatDate(firstDate), formatDate(secondDate));
    const diffYears = dateDiffY(formatDate(firstDate), formatDate(secondDate));
    const diffMonths = dateDiffM(formatDate(firstDate), formatDate(secondDate));
    if (diffDays === 0 && diffMonths === 0 && diffYears === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


function isPastDate(
  firstDate: string | Date,
  secondDate: string | Date
): boolean {
  if (isDateValid(firstDate) && isDateValid(secondDate)) {
    const diffDays = dateDiffD(formatDate(firstDate), formatDate(secondDate));
    if (diffDays < 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


function confirmDateValidator(employmentDate ): ValidatorFn{
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlValue = control.value || '';

    const invalidObj = { employmentConfirmedDate: true };

    if (isSameDate(formatDate(employmentDate), formatDate(controlValue))) {

      return null

    } else {
      return invalidObj;
    }
  }
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

function endDateValidator(status, endDate) {
  status.valueChanges.subscribe(checked => {
    if (!checked) {
      endDate.setValidators([Validators.required]);
    } else {
      endDate.setValidators(null);
    }
    endDate.updateValueAndValidity();
  });
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
  confirmDateValidator,
  syncNameValidator,
  titleCheckValidator,
  setRequireEndDate,
  endDateValidator,
  isPastDate,
  employmentConfirmationFutureDateValidator
 }
