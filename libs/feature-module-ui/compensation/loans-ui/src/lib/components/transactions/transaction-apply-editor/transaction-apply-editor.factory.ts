import { ValidatorFn, AbstractControl } from "@angular/forms";

function amountNumberInputValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const loanAmount = control.get('initial_loan_amount').value || '';

    const invalidObj = { amountNumberInput: true };

    if (isNaN(parseFloat(loanAmount)) && loanAmount !== null) {
      return invalidObj;
    } else {
      return null;
    }
  };
}
// function rateNumberInputValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const interestRate = control.get('interest_rate').value || '';

//     const invalidObj = { rateNumberInput: true };

//     if (isNaN(parseFloat(interestRate)) && interestRate !== null) {
//       return invalidObj;
//     } else {
//       return null;
//     }
//   };
// }
function monthlyDeductionNumberInputValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const monthlyDeduction = control.get('monthly_deduction').value || '';

    const invalidObj = { monthlyDeductionNumberInput: true };

    if (isNaN(parseFloat(monthlyDeduction)) && monthlyDeduction !== null) {
      return invalidObj;
    } else {
      return null;
    }
  };
}

export { amountNumberInputValidator, monthlyDeductionNumberInputValidator };
