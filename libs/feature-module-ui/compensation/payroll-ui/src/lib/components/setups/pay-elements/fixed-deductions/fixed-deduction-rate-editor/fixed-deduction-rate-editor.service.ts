import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IFixedDeductionRate } from '@nutela/models/compensation/payroll';

@Injectable()
export class FixedDeductionRateEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showDirectAmount: boolean;
  showContributeDirectAmount: boolean;
  showEndDate: boolean = false;
  handleEmployeeContribution = false;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      eligibility: [null],
      empcontribute_usedirect_amount: [false],
      is_global: [false],
      paygroup_id: [null],
      employee_id: [null],
      use_direct_value: [false],
      direct_value: [null],
      formula_id: [null],
      currency_id: [null],
      is_temporary: [false],
      effective_from: [null],
      effective_to: [null],
      item_id: [null],
      apply_emp_contribution: [false],
      emp_contribute_amount: [null],
      emp_contribute_formula_id: [null]
    }, {
        validator: []
      }
    );
  }

  init(
    data: IFixedDeductionRate
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {
      return {
        eligibility: data.eligibility,
        empcontribute_usedirect_amount: !!data.empcontribute_usedirect_amount,
        use_direct_value: typeof data.usedirect_amount === 'boolean' ? data.usedirect_amount : (typeof data.deduct_usedirect_amount === 'boolean' ? data.deduct_usedirect_amount : false),
        direct_value: typeof data.direct_amount === 'number' ? data.direct_amount : (typeof data.deduct_amount === 'number' ? data.deduct_amount : null),
        formula_id: data.formula_id === 'number' ? data.formula_id : (typeof data.deduct_formula_id === 'number' ? data.deduct_formula_id : null),
        currency_id: data.currency_id === 'number' ? data.currency_id : (typeof data.deduct_currency_id === 'number' ? data.deduct_currency_id : null),
        is_temporary: typeof data.is_temporary === 'boolean' ? data.is_temporary : (typeof data.temp_or_perm === 'boolean' ? data.temp_or_perm : false),
        effective_from: data.eff_period_from,
        effective_to: data.eff_period_to,
        item_id: typeof data.fixeddeduct_id === 'number' ? data.fixeddeduct_id : (typeof data.deduction_id === 'number' ? data.deduction_id : null),
        apply_emp_contribution: typeof data.apply_emp_contribution === 'boolean' ? data.apply_emp_contribution : (typeof data.has_employer_contribution === 'boolean' ? data.has_employer_contribution : false),
        emp_contribute_amount: data.empcontribute_amount,
        emp_contribute_formula_id: data.empcontribute_formula_id,

        approval_status: 1,
        paygroup_id: data.paygroup_id ? data.paygroup_id :  null,
        employee_id: data.employee_id ? data.employee_id : null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
        eligibility: {
          fieldTitle: `Eligibility`,
          required: `This field is required.`
        },
        is_global: {
          fieldTitle: `Is Global`,
          required: `This field is required.`
        },
        paygroup_id: {
          fieldTitle: `Paygroup`,
          required: `This field is required.`
        },
        employee_id: {
          fieldTitle: `Employee`,
          required: `This field is required.`
        },
        us_direct_value: {
          fieldTitle: `Use Direct Amount`,
          required: `This field is required.`
        },
        direct_value: {
          fieldTitle: `Amount`,
          required: `This field is required.`
        },
        formula_id: {
          fieldTitle: `Formula`,
          required: `This field is required.`
        },
        currency_id: {
          fieldTitle: `Currency`,
          required: `This field is required.`
        },
        effective_from: {
          fieldTitle: `Start Date`,
          required: `This field is required.`
        },
        effective_to: {
          fieldTitle: `End Date`,
          required: `This field is required.`
        },
        flx: {
          fieldTitle: `Other Errors`
        }
    };
  }

  onApplyEmpContribution(event: any) {
    if (event.target.checked) {
      this.handleEmployeeContribution = true;
    } else {
      this.handleEmployeeContribution = false;
      this.contributeFormula.setValue(null);
      this.contributeDirectAmount.setValue(null);
    }
  }
  onUseDirectAmountChecked(event) {
    if(event.target.checked) {
      this.showDirectAmount = true;
      this.formula.setValue(null);
    } else {
      this.showDirectAmount = false;
      this.directAmount.setValue(null);
    }
  }

  onUseContributeDirectAmountChecked(event) {
    if(event.target.checked) {
      this.showContributeDirectAmount = true;
      this.contributeFormula.setValue(null);
    } else {
      this.showContributeDirectAmount = false;
      this.contributeDirectAmount.setValue(null);
    }
  }

  onIsTemporaryChecked(event) {
    if (event.target.checked) {
      this.showEndDate = true;
      this.endDate.setValue(null)
    } else {
      this.showEndDate = false;
    }
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

  get formula(): AbstractControl {
    return this.form.get('formula_id');
  }

  get contributeFormula(): AbstractControl {
    return this.form.get('emp_contribute_formula_id');
  }

  get isGlobal(): AbstractControl {
    return this.form.get('is_global');
  }

  get directAmount(): AbstractControl {
    return this.form.get('direct_value');
  }

  get contributeDirectAmount(): AbstractControl {
    return this.form.get('emp_contribute_amount');
  }

  get useDirectAmount(): AbstractControl {
    return this.form.get('emp_contribute_amount');
  }

  get endDate(): AbstractControl {
    return this.form.get('effective_to');
  }
}
