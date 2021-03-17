import { AbstractControl, ValidatorFn } from '@angular/forms';

function numberNotInRangeValidator(
  value: number,
  min: number,
  max: number
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (value < min || value > max) {
      return { numberRange: true };
    }
    return null;
  };
}

export { numberNotInRangeValidator };
