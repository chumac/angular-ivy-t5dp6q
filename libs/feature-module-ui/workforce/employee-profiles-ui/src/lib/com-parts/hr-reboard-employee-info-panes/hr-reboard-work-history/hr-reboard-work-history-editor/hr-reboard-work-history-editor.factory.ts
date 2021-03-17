import { ValidatorFn, AbstractControl } from "@angular/forms";
import { isFutureDate, formatDate } from "@nutela/core-services";

function employmentExitFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const employmentDate = control.get('employment_date').value || '';
    const exitDate = control.get('exit_date').value || '';

    const invalidObj = { employmentExitFutureDate: true };

    if (isFutureDate(formatDate(exitDate), formatDate(employmentDate))) {
      return invalidObj;
    } else {
      return null;
    }
  };
}

export { employmentExitFutureDateValidator };
