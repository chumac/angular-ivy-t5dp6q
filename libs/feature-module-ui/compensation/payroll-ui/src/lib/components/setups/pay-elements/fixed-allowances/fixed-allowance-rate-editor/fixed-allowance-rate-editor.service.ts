import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IFixedAllowanceRate } from '@nutela/models/compensation/payroll';

@Injectable()
export class FixedAllowanceRateEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showDirectAmount: boolean;
  showEndDate: boolean = false;
  showTaxAmount: boolean;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      eligibility: [null, Validators.required],
      is_global: [false, Validators.required],
      paygroup_id: [null],
      employee_id: [null],
      use_direct_value: [false, Validators.required],
      direct_value: [null],
      formula_id: [null],
      currency_id: [null, Validators.required],
      is_taxable: [false, Validators.required],
      tax_amount: [null],
      tax_percent: [null],
      minimum_nontaxable: [null],
      is_temporary: [false, Validators.required],
      effective_from: [null, Validators.required],
      effective_to: [null],
      item_id: [null, Validators.required]
    }, {
        validator: []
      }
    );
  }

  init(
    data: IFixedAllowanceRate
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {
      return {
        eligibility: data.eligibility,
        paygroup_id: data.paygroup_id,
        employee_id: data.employee_id,
        use_direct_value: data.pay_usedirect_amount,
        direct_value: data.pay_amount,
        formula_id: data.pay_formula_id,
        currency_id: data.pay_currency_id,
        is_taxable: !!data.tax_amount,
        tax_amount: data.tax_amount,
        tax_percent: data.tax_percent,
        minimum_nontaxable: data.min_nontaxable,
        is_temporary: typeof data.is_temporary === 'boolean' ? data.is_temporary : (typeof data.temp_or_perm === 'boolean' ? data.temp_or_perm : null),
        effective_from: data.eff_period_from,
        effective_to: data.eff_period_to,
        item_id: data.fixedallow_id || data.allowance_id
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
      is_taxable: {
        fieldTitle: `Use Tax Amount`,
        required: `This field is required.`
      },
      tax_amoount: {
        fieldTitle: `Tax Amount`,
        required: `This field is required.`
      },
      tax_percent: {
        fieldTitle: `Tax Percent`,
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
      item_id: {
        fieldTitle: `Fixed Allowanc`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  getCorrectField(field1: any, field2): boolean {
    if (typeof field1 === 'boolean') {
      return field1;
    } else {
      return field2;
    }
    return false;
  }

  rebuildForm() {
    this.form = this.buildForm();
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

  onIsTemporaryChecked(event) {
    if (event.target.checked) {
      this.showEndDate = true;
      this.endDate.setValue(null)
    } else {
      this.showEndDate = false;
    }
  }

  onUseTaxAmountChecked(event) {
    if (event.target.checked) {
      this.showTaxAmount = true;
      this.taxPercent.setValue(null)
    } else {
      this.showTaxAmount = false;
      this.taxAmount.setValue(null);
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

  get formula(): AbstractControl {
    return this.form.get('formula_id');
  }

  get isGlobal(): AbstractControl {
    return this.form.get('is_global');
  }

  get directAmount(): AbstractControl {
    return this.form.get('direct_value');
  }

  get taxAmount(): AbstractControl {
    return this.form.get('tax_amount');
  }

  get taxPercent(): AbstractControl {
    return this.form.get('tax_percent');
  }

  get endDate(): AbstractControl {
    return this.form.get('effective_to');
  }
}
