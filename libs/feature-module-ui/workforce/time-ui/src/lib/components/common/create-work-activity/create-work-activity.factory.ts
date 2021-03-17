import { AbstractControl, ValidatorFn } from '@angular/forms';

function workHourCheckValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const workHour = control.get('work_hour').value || 0;
    const workMinutes = control.get('work_min').value || 0;

    const invalidObj = { workHourCheck: true };

    // Convert to minutes
    let totalMinutes = workHour * 60;
    totalMinutes = totalMinutes + workMinutes;

    if (totalMinutes === 0) {
      return invalidObj;
    } else {
      return null;
    }
  };
}

export {
  workHourCheckValidator
};
