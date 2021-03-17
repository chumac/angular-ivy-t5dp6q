import { ValidatorFn, AbstractControl, Validators } from "@angular/forms";
import * as contants from '@nutela/shared/app-global';
import { isFutureDate, formatDate, isDateValid, dateDiffD, dateDiffY, dateDiffM } from "@nutela/core-services";

function transferEndDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const startDate = control.get('effective_date').value || '';
    const endDate = control.get('end_date').value || '';

    const invalidObj = { transferEndFutureDate: true };

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


export {
  transferEndDateValidator,
  setRequireEndDate,
  endDateValidator,
 }
