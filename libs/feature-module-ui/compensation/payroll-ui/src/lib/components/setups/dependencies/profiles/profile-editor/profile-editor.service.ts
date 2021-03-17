import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IProfile } from '@nutela/models/compensation/payroll';

@Injectable()
export class ProfileEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showFixedDeduction: boolean = false;
  hasProfileAdminRole: boolean = true;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      code: [null, Validators.required],
      description: [null, Validators.required],
      current_period: [null, Validators.required],
      coinage_rounding: [null, Validators.required],
      allow_neg_pay: [null, Validators.required],
      prorate_quarterly: [{ value: 4, disabled: true }],
      prorate_halfyear: [{ value: 2, disabled: true }],
      prorate_yearly: [{ value: 1, disabled: true }],
      prorate_weekly: [{ value: 52, disabled: true }],
      tax_mode: [0, Validators.required],
      cut_off_day: [null, Validators.required],
      payment_runday: [null, Validators.required],
      finyear_start: [null, Validators.required],
      finyear_end: [null, Validators.required],
      upfront_treatment: [null, Validators.required],
      tax_option: [null, Validators.required],
      tax_rule: [null, Validators.required],
      deduction_id: [null],
      use_multi_currency: [false],
      periodic_proration: [null],
      use_security_group: [{ value: false, disabled: !this.hasProfileAdminRole }],
      security_group: [{ value: null, disabled: !this.hasProfileAdminRole}],
      is_runnable: [false, Validators.required],
      run_cycle: [null],
      payment_period_covered: [null],
      include_current_period: [false],
      location_type_id: [{value: '', disabled: true}],
      location_detail_id: [{value: '', disabled: true}],
      pay_currency_id: [null],
      sys_rule: [null],

      use_periodic_tax_for_adjusted_pay: [false],
      pay_exchange_rate: [null],
    }, {
      validator: []
    }
    );
  }

  init(
    data: IProfile
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IProfile): IProfile | {} {
    if (data) {

      return {
        code: data.code,
        description: data.description,
        current_period: data.current_period,
        coinage_rounding: data.coinage_rounding,
        allow_neg_pay: data.allow_neg_pay,
        prorate_quarterly: data.prorate_quarterly,
        prorate_halfyear: data.prorate_halfyear,
        prorate_yearly: data.prorate_yearly,
        prorate_weekly: data.prorate_weekly,
        tax_mode: data.tax_mode,
        cut_off_day: data.cut_off_day,
        payment_runday: data.payment_runday,
        finyear_start: data.finyear_start,
        finyear_end: data.finyear_end,
        upfront_treatment: data.upfront_treatment,
        tax_option: data.tax_option,
        tax_rule: data.tax_rule,
        deduction_id: data.deduction_id,
        use_multi_currency: data.use_multi_currency,
        periodic_proration: data.periodic_proration,
        use_security_group: data.use_security_group,
        security_group: data.security_group,
        is_runnable: data.is_runnable,
        run_cycle: data.run_cycle,
        use_periodic_tax_for_adjusted_pay: data.use_periodic_tax_for_adjusted_pay,
        payment_period_covered: data.payment_period_covered,
        include_current_period: data.include_current_period,
        location_type_id: data.location_type_id,
        location_detail_id: data.location_detail_id,
        pay_currency_id: data.pay_currency_id,
        pay_exchange_rate: data.pay_exchange_rate,
        sys_rule: data.sys_rule,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      current_period: {
        fieldTitle: `Current Period`,
        required: `This field is required.`
      },
      coinage_rounding: {
        fieldTitle: `Coinage Rounding`,
        required: `This field is required.`
      },
      allow_neg_pay: {
        fieldTitle: `Allow Negative Pay`,
        required: `This field is required.`
      },
      tax_mode: {
        fieldTitle: `Tax Mode`,
        required: `This field is required.`
      },
      cut_off_day: {
        fieldTitle: `Cut-off Day`,
        required: `This field is required.`
      },
      payment_runday: {
        fieldTitle: `Payment Runday`,
        required: `This field is required.`
      },
      finyear_start: {
        fieldTitle: `Financial Year Start`,
        required: `This field is required.`
      },
      finyear_end: {
        fieldTitle: `Financial Year End`,
        required: `This field is required.`
      },
      upfront_treatment: {
        fieldTitle: `Upfront Treatment`,
        required: `This field is required.`
      },
      tax_option: {
        fieldTitle: `Tax Option`,
        required: `This field is required.`
      },
      tax_rule: {
        fieldTitle: `Tax Rule`,
        required: `This field is required.`
      },
      security_group: {
        fieldTitle: `Security Group`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  rebuildForm() {
    this.form = this.buildForm();
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

  get Code(): AbstractControl {
    return this.form.get('code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get structureDetail(): AbstractControl {
    return this.form.get('structure_detail');
  }

  get locationType(): AbstractControl {
    return this.form.get('location_type_id');
  }

  get locationDetail(): AbstractControl {
    return this.form.get('location_detail_id');
  }

  get securityGroup(): AbstractControl {
    return this.form.get('security_group');
  }

  get runCycle(): AbstractControl {
    return this.form.get('run_cycle');
  }

  get currentPeriod(): AbstractControl {
    return this.form.get('current_period');
  }

  get currency(): AbstractControl {
    return this.form.get('pay_currency_id');
  }

}
