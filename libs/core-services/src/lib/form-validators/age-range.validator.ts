import { AbstractControl, ValidatorFn } from '@angular/forms';
import { getAge, DEFAULT_NUMBER } from '../factories';

function ageRangeValidator(
  currentDate: Date | string,
  min: number,
  max: number
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    const age = getAge(currentDate, value);

    if (value === null) {
      return { ageRange: true };
    } else if (age === DEFAULT_NUMBER) {
      return { ageRange: true };
    } else if (age < min || age > max) {
      return { ageRange: true };
    }

    return null;
  };
}

export { ageRangeValidator };
