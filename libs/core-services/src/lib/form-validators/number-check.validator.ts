import { AbstractControl, ValidatorFn } from '@angular/forms';

function isNumberValidator(
  value: any
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (isNaN(value) === false) {
      return { isNumber: true };
    } else {
      return {isNumber: false}
    }
  };
}

function isIntegerValidator(
  value: any
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (Number.isInteger(parseFloat(value))) {
      return { isIntegerValue: true };
    } else {
      return {isIntegerValue: false};
    }
  };
}

export { isNumberValidator, isIntegerValidator };
