import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as contants from '@nutela/shared/app-global';
import { isFutureDate } from '@nutela/core-services';

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

function maidenNameCheckValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const gender = control.get('gender').value || '';
  const maritalStatus = control.get('marital_status').value || '';
  const maidenName = control.get('maiden_name').value || '';

  const invalidObj = { maidenNameCheck: true };

  if (gender === undefined || maritalStatus === undefined) {
    return invalidObj;
  } else if (
    gender === contants.GENDER.female &&
    (maritalStatus === contants.MARITAL_STATUS.married ||
      maritalStatus === contants.MARITAL_STATUS.divorced ||
      maritalStatus === contants.MARITAL_STATUS.separated)
  ) {
    if (maidenName === undefined || maidenName === '') {
      return invalidObj;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function weddingDateCheckValidator(currentDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const maritalStatus = control.get('marital_status').value || '';
    const weddingDate = control.get('wedding_date').value || '';

    const invalidObjNull = { weddingDateNullCheck: true };
    const invalidObj = { weddingDateCheck: true };

    if (maritalStatus === contants.MARITAL_STATUS.married) {
      if (weddingDate === undefined || weddingDate === '') {
        return invalidObjNull;
      } else {
        if (isFutureDate(currentDate, weddingDate)) {
          return invalidObj;
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  };
}

export {
  titleCheckValidator,
  maidenNameCheckValidator,
  weddingDateCheckValidator
};
