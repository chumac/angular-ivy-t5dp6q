import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IFixedDeduction } from '@nutela/models/compensation/payroll';

@Injectable()
export class FixedDeductionEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showGroupName: boolean;
  showAccumulateDeduction: boolean;
  showMonthlyDeduction: boolean;
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
	    shortname: [null],
      deductitem_type: [null, Validators.required],
      deduct_frequency: [null, Validators.required],
      max_deduct: [null, Validators.required],
      start_period: [null, Validators.required],
      deduct_at_startPeriod: [false, Validators.required],
      prorate_deduction: [false, Validators.required],
      is_statutory: [false, Validators.required],
      eligibility: [null, Validators.required],
      payroll_type:[null, Validators.required],
      payroll_profile: [null, Validators.required],
      rank: [null, Validators.required],
      ledger_account: [null],
      group_item: [false, Validators.required],
      groupname_id: [null],
      cumulate_deduction:[false, Validators.required],
      cumulate_deduction_id: [null],
      link_to: [false, Validators.required],
      link_deduction_id: [null],
      non_exclusion:[false, Validators.required],
      can_subscribe:[false, Validators.required],
      has_employer_contribution: [false, Validators.required],
      sys_rule: [null],

      // is_permanent: [false],
      // eff_period_from: [null],
      // eff_period_to: [null],
      // deduct_usedirect_amount: [false, Validators.required],
      // empcontibute_usedirect_amount: [false, Validators.required],
      // deduct_currency_id: [null],
      // deduct_amount: [null],
      // deduct_formula_id: [null],
      // empcontribute_formula_id: [null],
      // empcontribute_amount: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IFixedDeduction
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IFixedDeduction): IFixedDeduction | {} {
    if (data) {

      return {
        code: data.code,
        description: data.description,
        shortname: data.shortname,
        deductitem_type:data.deductitem_type,
        deduct_frequency: data.deduct_frequency,
        max_deduct: data.max_deduct,
        start_period: data.start_period,
        deduct_at_startPeriod: data.deduct_at_startPeriod,
        is_statutory:data.is_statutory,
        eligibility: data.eligibility,
        prorate_deduction: data.prorate_deduction,
        payroll_type:data.payroll_type,
        payroll_profile: data.payroll_profile,
        rank: data.rank,
        ledger_account: data.ledger_account,
        group_item: data.group_item,
        groupname_id: data.groupname_id,
        cumulate_deduction:data.cumulate_deduction,
        cumulate_deduction_id:data.cumulate_deduction_id,
        link_to: data.link_to,
        link_deduction_id: data.link_deduction_id,
        non_exclusion:data.non_exclusion,
        can_subscribe:data.can_subscribe,
        has_employer_contribution: data.has_employer_contribution,
        sys_rule: data.sys_rule,

      // deduct_usedirect_amount: data.deduct_usedirect_amount,
      // deduct_currency_id: data.CurrencyInfo.currency_id,
      // deduct_amount: data.deduct_amount,
      // deduct_formula_id: data.FormulaInfo.formula_id,
      // empcontibute_usedirect_amount: data.empcontibute_usedirect_amount,
      // empcontribute_amount: data.empcontribute_amount,
      // empcontribute_formula_id: data.EmpFormulaInfo.formula_id,
      // is_permanent: data.is_permanent,
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
      deduct_frequency: {
        fieldTitle: `Frequency`,
        required: `This field is required.`
      },
      max_deduct: {
        fieldTitle: `Maximum Deduction`,
        required: `This field is required.`
      },
      start_period: {
        fieldTitle: `Start Date`,
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
      deductitem_type: {
        fieldTitle: `Item Type`,
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
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  get f() {
    return this.form;
  }

  rebuildForm() {
    this.form = this.buildForm();
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

  get maxDeduct(): AbstractControl {
    return this.form.get('max_deduct');
  }

  get startPeriod(): AbstractControl {
    return this.form.get('start_period');
  }

  get deductAtStartPeriod(): AbstractControl {
    return this.form.get('deduct_at_startPeriod');
  }

  get arrear(): AbstractControl {
    return this.form.get('arrear_id');
  }

  get groupName(): AbstractControl {
    return this.form.get('groupname_id');
  }

  triggerDisable({ maxDeductHasValue, refresh }) {
    console.log('maximum payment value', maxDeductHasValue);
    if (!refresh) {
      if (maxDeductHasValue) {
        this.maxDeduct.disable();
        this.startPeriod.enable();
        this.deductAtStartPeriod.enable();
      } else if (!maxDeductHasValue) {
        this.maxDeduct.enable();
        this.startPeriod.disable();
        this.startPeriod.setValue('January');
        this.deductAtStartPeriod.disable();
      }
    } else {
      if (maxDeductHasValue === 4) {
        this.maxDeduct.enable();
        this.startPeriod.setValue('January');
        this.startPeriod.disable();
        this.deductAtStartPeriod.enable();
      } else {
        this.maxDeduct.disable();
        this.startPeriod.enable();
        this.showGroupName = false;
        this.showAccumulateDeduction = false;
        this.showMonthlyDeduction = false;
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
  onAccumulateDeductionChecked(event: any) {
    this.showAccumulateDeduction = event.target.checked;
  }

  onMonthlyDeductionChecked(event: any) {
    this.showMonthlyDeduction = event.target.checked;
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
