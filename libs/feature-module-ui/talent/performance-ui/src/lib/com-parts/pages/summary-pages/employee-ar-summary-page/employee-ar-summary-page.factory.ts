import { AbstractControl, ValidatorFn } from '@angular/forms';

function acceptedOrRejectedValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const accepted = control.get('accepted').value || '';
    const rejected = control.get('rejected').value || '';

    const invalidObj = { acceptedOrRejectedCheck: true };

    if (accepted === true || rejected === true) {
      return null;
    } else {
      return invalidObj;
    }
  };
}

export {
  acceptedOrRejectedValidator
};
