import { ValidatorFn, AbstractControl } from '@angular/forms';

import { isPastDate } from '../factories';

function pastDateValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlValue = control.value || '';

    const invalidObjPastDate = { pastDate: true };

    if (isPastDate(currentDate, controlValue)) {
      return invalidObjPastDate;
    } else {
      return null;
    }
  };
}

export { pastDateValidator };
