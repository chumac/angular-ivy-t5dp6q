import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IFixedAllowance } from '@nutela/models/compensation/payroll';

@Injectable({
  providedIn: 'root'
})
export class FixedAllowanceEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showGroupName: boolean;
  showAccumulateAllowance: boolean;
  showMonthlyAllowance: boolean;
  showAmotizedProfile: boolean;
  showArrears: boolean;

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
      pay_frequency: [null, Validators.required],
      max_payment: [null, Validators.required],
      start_period: ['January', Validators.required],
      pay_at_startPeriod: [false, Validators.required],
	    shortname: [null],
      prorate_allowance: [false],
      payroll_type:[null, Validators.required],
      is_taxable:[false],
      eligibility: [null, Validators.required],
      cumulate_allowance:[false],
      cumulate_allowance_id: [null],
      group_item: [false],
      group_name_id: [null],
      payitem_type: [null, Validators.required],
      arrear_id: [null],
      seperate_arears_to: [false],
      rank: [null, Validators.required],
      ledger_account: [null],
      can_subscribe:[false],
      non_exclusion:[false],
      payroll_profile: [null, Validators.required],
      link_to: [false],
      link_allowance_id: [null],
      is_amortized: [false],
      use_confirm_or_employ_date: [null, Validators.required],
      amortize_profile_id: [null],
      sys_rule: [null]
      // is_earned_income:[false],
      // pay_usedirect_amount: [false],
      // pay_currency_id: [null],
      // pay_amount: [null],
      // pay_formula_id: [null],
      // tax_amount: [null],
      // tax_percent: [null],
      // min_nontaxable: [null],
      // is_upfront: [false],
      // temp_or_perm: [false],
      // eff_period_from: [null],
      // eff_period_to: [null],
      }, {
        validator: []
      }
    );
  }
  // Btcn4082
  init(
    data: IFixedAllowance
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IFixedAllowance): IFixedAllowance | {} {
    if (data) {
      return {
        code:data.code,
        description: data.description,
        pay_frequency: data.pay_frequency,
        max_payment: data.max_payment,
        start_period: data.start_period,
        pay_at_startPeriod: data.pay_at_startPeriod,
        shortname: data.shortname,
        prorate_allowance: data.prorate_allowance,
        payroll_type:data.payroll_type,
        is_taxable:data.is_taxable,
        eligibility: data.eligibility,
        cumulate_allowance:data.cumulate_allowance,
        cumulate_allowance_id:data.cumulate_allowance_id,
        group_item: data.group_item,
        group_name_id: data.GroupnameInfo?data.GroupnameInfo.id:null,
        payitem_type:data.payitem_type,
        arrear_id:data.arrear_id,
        seperate_arears_to: data.arrear_id ? true : false,
        rank: data.rank,
        is_upfront: data.is_upfront,
        ledger_account: data.ledger_account,
        can_subscribe:data.can_subscribe,
        non_exclusion:data.non_exclusion,
        payroll_profile: data.payroll_profile,
        link_to: data.link_to,
        link_allowance_id: data.link_allowance_id,
        is_amortized:data.is_amortized,
        use_confirm_or_employ_date: data.use_confirm_or_employ_date,
        amortize_profile_id: data.AmortizeInfo?data.AmortizeInfo.payroll_profile_id:null,
        sys_rule: data.sys_rule,
        // is_earned_income:data.is_earned_income,
        // pay_usedirect_amount: data.pay_usedirect_amount,
        // pay_currency_id: data.CurrencyInfo?data.CurrencyInfo.id:null,
        // pay_amount: data.pay_amount,
        // pay_formula_id: data.FormulaInfo?data.FormulaInfo.formula_id:null,
        // tax_amount: data.tax_amount,
        // tax_percent: data.tax_percent,
        // min_nontaxable: data.min_nontaxable,
        // temp_or_perm: data.temp_or_perm,
        // eff_period_from: data.eff_period_from,
        // eff_period_to: data.eff_period_to,
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
      pay_frequency: {
        fieldTitle: `Pay Frequency`,
        required: `This field is required.`
      },
      max_payment: {
        fieldTitle: `Maximum Payment`,
        required: `This field is required.`
      },
      start_period: {
        fieldTitle: `Start Period`,
        required: `This field is required.`
      },
      payroll_type: {
        fieldTitle: `Payroll Type`,
        required: `This field is required.`
      },
      eligibility: {
        fieldTitle: `Eligibility`,
        required: `This field is required.`
      },
      payitem_type: {
        fieldTitle: `Pay Type`,
        required: `This field is required.`
      },
      rank: {
        fieldTitle: `Rank`,
        required: `This field is required.`
      },
      payroll_profile: {
        fieldTitle: `Payroll Profile`,
        required: `This field is required.`
      },
      use_confirm_or_employ_date: {
        fieldTitle: `Prorate Date Type`,
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

  get maxPayment(): AbstractControl {
    return this.form.get('max_payment');
  }

  get startPeriod(): AbstractControl {
    return this.form.get('start_period');
  }

  get payAtStartPeriod(): AbstractControl {
    return this.form.get('pay_at_startPeriod');
  }

  get arrear(): AbstractControl {
    return this.form.get('arrear_id');
  }

  get groupName(): AbstractControl {
    return this.form.get('group_name_id');
  }

  triggerDisable({ maxPaymentHasValue, refresh }) {
    if (!refresh) {
      if (maxPaymentHasValue) {
        this.maxPayment.disable();
        this.startPeriod.enable();
        this.payAtStartPeriod.enable();
      } else if (!maxPaymentHasValue) {
        this.maxPayment.enable();
        this.startPeriod.disable();
        this.startPeriod.setValue('January');
        this.payAtStartPeriod.disable();
      }
    } else {
      if (maxPaymentHasValue === 4) {
        this.maxPayment.enable();
        this.startPeriod.setValue('January');
        this.startPeriod.disable();
        this.payAtStartPeriod.enable();
      } else {
        this.maxPayment.disable();
        this.startPeriod.enable();
        this.showGroupName = false;
        this.showAccumulateAllowance = false;
        this.showMonthlyAllowance = false;
        this.showAmotizedProfile = false;
      }
    }
  }

  onGroupItemChecked(event) {
    if (event.target.checked) {
      this.showGroupName = true;
    } else {
      this.showGroupName = false
      this.groupName.setValue(null);
    }
  }

  onAccumulateAllowanceChecked(event: any) {
    this.showAccumulateAllowance = event.target.checked;
  }

  onMonthlyAllowanceChecked(event: any) {
    this.showMonthlyAllowance = event.target.checked;
  }

  onAmotizeProfileChecked(event: any) {
    this.showAmotizedProfile = event.target.checked;
  }

  onSeparateArrearsChecked(event: any) {
    this.showArrears = event.target.checked;
    if (!event.target.checked) {
      this.arrear.setValue(null);
    }
  }
}
