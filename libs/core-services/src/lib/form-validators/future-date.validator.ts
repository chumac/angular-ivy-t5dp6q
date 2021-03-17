import { ValidatorFn, AbstractControl } from '@angular/forms';

import { isFutureDate } from '../factories';

function futureDateValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlValue = control.value || '';

    const invalidObjFutureDate = { futureDate: true };

    if (isFutureDate(currentDate, controlValue)) {
      return invalidObjFutureDate;
    } else {
      return null;
    }
  };
}

export { futureDateValidator };
