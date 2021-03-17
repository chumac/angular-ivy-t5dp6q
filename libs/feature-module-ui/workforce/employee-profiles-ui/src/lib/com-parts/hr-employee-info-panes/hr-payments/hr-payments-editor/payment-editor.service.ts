import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { UtilService } from '@nutela/core-services';
import { savingAcctDetailsValidator, currentAcctDetailsValidator } from './payment-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class PaymentEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  disablePfa = true;
  disableTax = true;
  disableNHF = true;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      bvn: ['', Validators.required],
      savings_bank_id: [null],
      savings_bank_branch: [''],
      savings_account_no: [''],
      current_bank_id: [null],
      current_bank_branch: [''],
      current_account_no: [''],
      pfa_id: [{value: null, disabled: true}, Validators.required],
      pension_account: [{ value: '', disabled: true }, Validators.required],
      nhf_number: [{value: null, disabled: true}, Validators.required],
      tax_id_number: [{value: null, disabled: true}, Validators.required],
      compute_nhf: [false, Validators.required],
      compute_pension: [false, Validators.required],
      compute_tax: [false, Validators.required],
    }, {
        validator: [ savingAcctDetailsValidator(), currentAcctDetailsValidator() ]
      }
    );
  }

  init(data: IPayment) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPayment): IPayment | {} {
    if (data) {
      return {
        bvn: data.bvn,
        savings_bank_id: data.savings_bank?data.savings_bank.bank_id:null,
        savings_bank_branch: data.savings_bank_branch,
        savings_account_no: data.savings_account_no,
        current_bank_id: data.current_bank?data.current_bank.bank_id:null,
        current_bank_branch: data.current_bank_branch,
        current_account_no: data.current_account_no,
        pfa_id: data.pfa?data.pfa.pfa_id:null,
        pension_account: data.pension_account,
        nhf_number: data.nhf_number,
        tax_id_number: data.tax_id_number,
        compute_nhf: data.compute_nhf,
        compute_pension: data.compute_pension,
        compute_tax: data.compute_tax,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      bvn: {
        fieldTitle: `BVN`,
        required: `This field is required.`
      },
      pfa_id: {
        fieldTitle: `PFA`,
        required: `This field is required.`
      },
      pension_account: {
        fieldTitle: `Pension Account Number`,
        required: `This field is required.`
      },
      nhf_number: {
        fieldTitle: `NHF Number`,
        required: `This field is required.`
      },
      tax_id_number: {
        fieldTitle: `Tax ID Number`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        savingsAcctNoDetailsVal: `Savings account bank is required`,
        savingsBankDetailsVal: `Savings account number is required`,
        currentBankDetailsVal: `Current account number is required`,
        currentAcctNoDetailsVal: `Current account bank is required`

      }
    };
  }


  // getUpdatedFormValues(formValue = this.value) {
  //   const bvn = formValue.bvn ? formValue.bvn.toString() : null;
  //   const newValue = { ...formValue, bvn };

  //   return newValue;
  // }

  get f() {
    return this.form;
  }

  get value(): any {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }

  patch(value: { [key: string]: any }) {
    this.form.patchValue(value);
  }

  onPaysPfaChecked(event) {
    if (event.target.checked) {
      this.pfa.enable();
      this.pensionAccount.enable();
    } else {
      this.pfa.disable();
      this.pensionAccount.disable();
    }
  }

  onPayNhfChecked(event) {
    if (event.target.checked) {
      this.nhf.enable();
    } else {
      this.nhf.disable();
    };
  }

  onPaysTaxChecked(event) {
    if (event.target.checked) {
      this.tax.enable();
    } else {
      this.tax.disable();
    };
  }



  get corporateIdExpiryDate(): AbstractControl {
    return this.form.get('corporate_id_expires');
  }

  get pfa(): AbstractControl {
    return this.form.get('pfa_id');
  }

  get pensionAccount(): AbstractControl {
    return this.form.get('pension_account');
  }

  get nhf(): AbstractControl {
    return this.form.get('nhf_number');
  }

  get tax(): AbstractControl {
    return this.form.get('tax_id_number');
  }

}
