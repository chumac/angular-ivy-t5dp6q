import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService, formatDate} from '@nutela/core-services';
import { ISeparation } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class SeparationEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  status=false;
  showLumpsum=false;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id:[null, Validators.required],
      reason_4exit_id: [null, Validators.required],
      exit_notes:[null],
      sent_notice:[false, Validators.required],
      effective_date:[null, Validators.required],
      process_payroll:[false],
      pay_lumpsum:[false],
      lumpsum_amount:[null],
      lumpsum_allowance_id:[null],
      currency_id:[null],
      notice_date:[null],
      resignation_id:[null],
      replace_id:[null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: ISeparation,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: ISeparation): ISeparation | {} {
    if (data) {
      console.log('edit', data);
      return {
        employee_id:data.employee_id,
        reason_4exit_id: data.reason_4exit_id,
        exit_notes:data.exit_notes,
        sent_notice:data.sent_notice,
        effective_date:data.effective_date,
        process_payroll:data.process_payroll,
        pay_lumpsum:data.pay_lumpsum,
        lumpsum_amount:data.lumpsum_amount,
        lumpsum_allowance_id:data.lumpsum_allowance_id,
        currency_id:data.currency_id,
        notice_date:data.notice_date,
        resignation_id:data.resignation_id,
        replace_id:data.replace_id
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      reason_4exit_id: {
        fieldTitle: `Exit Reason`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
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

  get EffectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get NoticeDate(): AbstractControl {
    return this.form.get('notice_date');
  }

  get payLumpsum(): AbstractControl {
    return this.form.get('pay_lumpsum');
  }

  get lumpsumAmount(): AbstractControl {
    return this.form.get('lumpsum_amount');
  }

  get lumpsumAllowance(): AbstractControl {
    return this.form.get('lumpsum_allowance_id');
  }

  get currency(): AbstractControl {
    return this.form.get('currency_id');
  }

  // get NoticeDate(): AbstractControl {
  //   return this.form.get('notice_date');
  // }

  formatDate(){
    this.EffectiveDate.setValue(formatDate(this.EffectiveDate.value));
    if(this.NoticeDate.value != null){
      this.NoticeDate.setValue(formatDate(this.NoticeDate.value));
    }
  }
}
