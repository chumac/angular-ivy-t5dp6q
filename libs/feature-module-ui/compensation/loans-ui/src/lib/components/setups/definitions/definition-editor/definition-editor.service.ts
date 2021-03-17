import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { ILoanDefinition } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class DefinitionEditorService {
  public form: FormGroup = new FormGroup({});

  public tenorTypes: ISelectOption[] = [
    { value: '1', label: 'Years' },
    { value: '2', label: 'Months'  },
    { value: '3', label: 'Days'  },
  ];

  validationMessages: any;

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
      ordering_rank: [null],
      calculation_rule: [null, Validators.required],
      tenor_months: [null],
      moratorium: [null, Validators.required],

      payroll_profile_id: [null, Validators.required],
      principal_deduction_period: [null, Validators.required],
      deduct_from_allowance: [false, Validators.required],
      deduct_from_allowance_id: [null],

      charge_interest: [false, Validators.required],
      int_payroll_profile_id: [null],
      interest_deduction_period: [null, Validators.required],
      interest_rate: [null],
      separate_interest: [false, Validators.required],
      interest_code: ['INT'],

      groupitem: [false, Validators.required],
      groupname_id: [null],
      is_active: [true],
      can_exclude: [false, Validators.required],
      allow_rules_variation: [false, Validators.required],
      allow_multiple: [false, Validators.required],
      use_high_priority: [false, Validators.required],
      use_system_deduction: [true, Validators.required],
      sys_rule: [null],


      allow_overdue_mgt: [false, Validators.required],
      overdue_interest_rate: [0.00],
      ledger_account: [null],
      interest_ledger_account: [null],
      loan_policy_url: [null],
      exclusion_criteria: [null],
      exemption_criteria: [null],
      tenor_days: [null],
      tenor_years: [null],
      }, {
        // validator: [employmentExitFutureDateValidator()]
      }
    );
  }

  init(
    data: ILoanDefinition
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILoanDefinition): ILoanDefinition | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        shortname: data.shortname,
        ordering_rank: data.ordering_rank,
        calculation_rule: data.calculation_rule,
        payroll_profile_id: data.PayrollProfileInfo ? data.PayrollProfileInfo.payroll_profile_id : null,
        can_exclude: data.can_exclude,
        allow_rules_variation: data.allow_rules_variation,
        allow_multiple: data.allow_multiple,
        use_high_priority: data.use_high_priority,
        use_system_deduction: data.use_system_deduction,
        principal_deduction_period: data.principal_deduction_period,
        interest_deduction_period: data.interest_deduction_period,
        allow_overdue_mgt: data.allow_overdue_mgt,
        overdue_interest_rate: data.overdue_interest_rate,
        charge_interest: data.charge_interest,
        separate_interest: data.separate_interest,
        interest_code: data.interest_code,
        interest_rate: data.interest_rate,
        tenor_years: data.tenor_years,
        tenor_months: data.tenor_months,
        tenor_days: data.tenor_days,
        groupitem: data.groupitem,
        groupname_id: data.groupname_id,
        exclusion_criteria: data.exclusion_criteria,
        exemption_criteria: data.exemption_criteria,
        deduct_from_allowance: data.deduct_from_allowance,
        deduct_from_allowance_id: data.DeductFromAllowanceInfo && data.DeductFromAllowanceInfo.allowance_id ? data.DeductFromAllowanceInfo.allowance_id : null,
        ledger_account: data.ledger_account,
        interest_ledger_account: data.interest_ledger_account,
        loan_policy_url: data.loan_policy_url,
        is_active: data.is_active,
        sys_rule: data.sys_rule,
        moratorium: data.moratorium,
        int_payroll_profile_id: data.IntPayrollProfileInfo ? data.IntPayrollProfileInfo.payroll_profile_id : null
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
      calculation_rule: {
        fieldTitle: `Calculation Rule`,
        required: `This field is required.`
      },
      payroll_profile_id: {
        fieldTitle: `Payroll Profile`,
        required: `This field is required.`
      },
      principal_deduction_period: {
        fieldTitle: `Principal Deduction Period`,
        required: `This field is required.`
      },
      interest_deduction_period: {
        fieldTitle: `Interest Deduction Period`,
        required: `This field is required.`
      },
      overdue_interest_rate: {
        fieldTitle: `Overdue Interest Rate`,
        required: `This field is required.`
      },
      interest_rate: {
        fieldTitle: `Interest Rate`,
        required: `This field is required.`
      },
      moratorium: {
        fieldTitle: `Moratorium`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }


  get orderingRank(): AbstractControl {
    return this.form.get('ordering_rank');
  }

  get interestPayrollProfile(): AbstractControl {
    return this.form.get('int_payroll_profile_id');
  }

  get payrollProfile(): AbstractControl {
    return this.form.get('payroll_profile_id');
  }

  get amortizationRule(): AbstractControl {
    return this.form.get('calculation_rule');
  }


  get deductionPeriod(): AbstractControl {
    return this.form.get('principal_deduction_period');
  }

  get interestDeductionPeriod(): AbstractControl {
    return this.form.get('interest_deduction_period');
  }

  get chargeInterest(): AbstractControl {
    return this.form.get('charge_interest');
  }

  get interestRate(): AbstractControl {
    return this.form.get('interest_rate');
  }

  get tenor(): AbstractControl {
    return this.form.get('tenor_months');
  }

  get moratorium(): AbstractControl {
    return this.form.get('moratorium');
  }

  get deductFromAllowance(): AbstractControl {
    return this.form.get('deduct_from_allowance_id');
  }


  transformInputsToNumber() {
    if(this.orderingRank.value !== null) {
      return this.orderingRank.setValue(+ parseInt(this.orderingRank.value).toFixed(2));
    }
    if(this.interestRate.value !== null) {
      return this.interestRate.setValue(+ parseFloat(this.interestRate.value).toFixed(1));
    }
    if(this.moratorium.value !== null) {
      return this.moratorium.setValue(+ parseInt(this.moratorium.value));
    }
    if(this.tenor.value !== null) {
      return this.tenor.setValue(+ parseInt(this.tenor.value));
    }
    if(this.deductionPeriod.value !== null) {
      return this.deductionPeriod.setValue(+ parseInt(this.deductionPeriod.value));
    }
    if(this.interestDeductionPeriod.value !== null) {
      return this.interestDeductionPeriod.setValue(+ parseInt(this.interestDeductionPeriod.value));
    }
    if(this.deductFromAllowance.value !== null) {
      return this.deductFromAllowance.setValue(+ parseInt(this.deductFromAllowance.value));
    }
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
