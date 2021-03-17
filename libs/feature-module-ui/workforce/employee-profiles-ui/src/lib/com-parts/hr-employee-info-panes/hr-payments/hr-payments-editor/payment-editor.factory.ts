
import { ValidatorFn, AbstractControl } from "@angular/forms";
import { isFutureDate, isDateValid, formatDate } from "@nutela/core-services";

function corporateIdExpirationFutureDateValidator(currentDate: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlValue = control.value || '';

    const invalidObj = { corporateIdExpirationFutureDate: true };

    if (controlValue !== '' && (!isFutureDate(formatDate(currentDate), formatDate(controlValue)))) {
      return invalidObj;
    } else {
      return null;
    }
  };
}

function savingAcctDetailsValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const bank_id = control.get('savings_bank_id').value;
    const acct_no = control.get('savings_account_no').value;

    if(bank_id && acct_no){
      return null;
    } else if(bank_id || acct_no){
      if(!!bank_id){
        return { savingsBankDetailsVal: true }; 
      }
      if(!!acct_no){
        return { savingsAcctNoDetailsVal: true }; 
      }
    } else {
      return null;
    }
  };
}

function currentAcctDetailsValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const bank_id = control.get('current_bank_id').value;
    const acct_no = control.get('current_account_no').value;

    if(bank_id && acct_no){
      return null;
    } else if(bank_id || acct_no){
      if(!!bank_id){
        return { currentBankDetailsVal: true }; 
      }
      if(!!acct_no){
        return { currentAcctNoDetailsVal: true }; 
      }
    } else {
      return null;
    }
  };
}


export { corporateIdExpirationFutureDateValidator, savingAcctDetailsValidator, currentAcctDetailsValidator };
