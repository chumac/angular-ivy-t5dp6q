import { ValidatorFn, AbstractControl, Validators } from "@angular/forms";
import { isFutureDate, formatDate } from "@nutela/core-services";

function expiryFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const valueDate = control.get('value_date').value || '';
    const expiryDate = control.get('emp_duration_to').value || '';

    const invalidObj = { expiryFutureDate: true };

    if (isFutureDate(formatDate(expiryDate), formatDate(valueDate))) {
      return invalidObj;
    } else {
      return null;
    }
  };
}


// function setRequiredPayroll(permStaff): ValidatorFn{
//   return (control: AbstractControl): { [key: string]: boolean } | null => {

//     const controlValue = control.value || '';
//     const invalidObj = { isRequired: true};
//     if(permStaff === false ) {
//       controlValue.setValidators([Validators.required]);
//       return invalidObj
//     } else {
//       return null;
//     }
// }
// }

export {
  expiryFutureDateValidator
}
