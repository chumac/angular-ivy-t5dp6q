import { ValidatorFn, AbstractControl } from '@angular/forms';

function greaterThanValidator(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlValue = control.value;

    const invalidObjGreaterThan = { greaterThan: true };

    if (controlValue > value) {
      return invalidObjGreaterThan;
    } else {
      return null;
    }
  };
}

export { greaterThanValidator };
