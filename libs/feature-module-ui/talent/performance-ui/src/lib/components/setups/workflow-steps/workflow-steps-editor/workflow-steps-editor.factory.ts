import { AbstractControl, ValidatorFn } from '@angular/forms';


export function nonZero(control:AbstractControl):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonZero: true};
    } else {
      return null;
    }
  }