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
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      bvn: [null],
      savings_bank_id: [null],
      savings_bank_branch: [null],
      savings_account_no: [null],
      current_bank_id: [null],
      current_bank_branch: [null],
      current_account_no: [null],
      pfa_id: [null],
      pension_account: [null],
      nhf_number: [null],
      tax_id_number: [null],

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
        // compute_nhf:  data.compute_nhf,
        // compute_pension:  data.compute_pension,
        // compute_tax: data.compute_tax,
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

  formToolTips = {
    pfa: ''
  }
  setToolTip(fieldName: string, fieldLabel: string) {
    switch (fieldName) {
      case 'pfa':
        this.formToolTips.pfa = fieldLabel;
        break;

      default:
        break;
    }
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

  get corporateIdExpiryDate(): AbstractControl {
    return this.form.get('corporate_id_expires');
  }
}
