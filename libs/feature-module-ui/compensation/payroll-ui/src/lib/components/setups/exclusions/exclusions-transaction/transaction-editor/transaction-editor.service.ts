import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IExclusionTransaction, IExclusionTransactionCreate } from '@nutela/models/compensation/payroll';

@Injectable({
  providedIn: 'root'
})
export class TransactionEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.setExcludePercentValidators();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      exclusion_type: [null, Validators.required],
      exclusion_givento_empid: [null, Validators.required],
      reasonfor_exclusion: [null, Validators.required],
      rec_notes: [null, Validators.required],
      is_temp_exclusion: [false],
      start_date: [null, Validators.required],
      end_date: [null],
      exclude_by_percent: [true],
      percent_value: [null, Validators.required],
      amount_value: [null],
    }, {

    }
    );
  }

  init(
    data: IExclusionTransaction
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IExclusionTransaction): IExclusionTransaction | {} {
    if (data) {
      return {
        exclusion_id: data.exclusion_id,
        exclusion_type: data.exclusion_type,
        exclusion_givento_empid: data.exclusion_givento_empid,
        reasonfor_exclusion: data.reasonfor_exclusion,
        rec_notes: data.rec_notes,
        is_temp_exclusion: data.is_temp_exclusion,
        start_date: data.start_date,
        end_date: data.end_date,
        exclude_by_percent: data.exclude_by_percent,
        percent_value: data.percent_value,
        amount_value: data.amount_value,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      exclusion_type: {
        fieldTitle: `Exclusion Type`,
        required: `This field is required.`
      },
      exclusion_givento_empid: {
        fieldTitle: `Exclusion Given to Empid`,
        required: `This field is required.`
      },
      reasonfor_exclusion: {
        fieldTitle: `Reason for Exclusion`,
        required: `This field is required.`
      },
      rec_notes: {
        fieldTitle: `Rec Notes`,
        required: `This field is required.`,
      },
      // is_temp_exclusion: {
      //   fieldTitle: `Is Temp Exclusion`,
      //   required: `This field is required.`,
      // },
      start_date: {
        fieldTitle: `Start Date`,
        required: `This field is required.`
      },
      // exclude_by_percent: {
      //   fieldTitle: `Exclude By Percent`,
      //   required: `This field is required.`
      // },
      percent_value: {
        fieldTitle: `Percent Value`,
        required: `This field is required.`
      },
      amount_value: {
        fieldTitle: `Amount Value`,
        required: `This field is required.`
      }
    };
  }

  setExcludePercentValidators() {
    const percent_valueControl = this.form.get('percent_value');
    const amount_valueControl = this.form.get('amount_value');    

    this.form.get('exclude_by_percent').valueChanges
      .subscribe(exclude_by_percent => {
        if (exclude_by_percent === true) {
          percent_valueControl.setValidators([Validators.required]);
          amount_valueControl.setValidators(null);
        }

        if (exclude_by_percent === false) {
          percent_valueControl.setValidators(null);
          amount_valueControl.setValidators([Validators.required]);
        }

        percent_valueControl.updateValueAndValidity();
        amount_valueControl.updateValueAndValidity();
      });
  }

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
}
