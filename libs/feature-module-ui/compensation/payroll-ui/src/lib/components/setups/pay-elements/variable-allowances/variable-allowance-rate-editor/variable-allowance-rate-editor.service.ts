import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IFixedAllowanceRate, IVariableAllowanceRate } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableAllowanceRateEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showDirectAmount: boolean;
  showEndDate: boolean = false;
  showTaxContent: boolean;
  useTaxAmount: boolean;

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
      use_direct_value: [false, Validators.required],
      direct_value: [null],
      formula_id: [null],
      currency_id: [null, Validators.required],
      is_taxable: [false, Validators.required],
      tax_amount: [null],
      tax_percent: [null],
      minimum_nontaxable: [null],
      item_id: [null, Validators.required],
    }, {
        validator: []
      }
    );
  }

  init(
    data: IVariableAllowanceRate
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {
      console.log(data)
      return {
        paygroup_id: data.paygroup_id !== undefined ? data.paygroup_id: null,
        use_direct_value: typeof data.usedirect_amount === 'boolean' ? data.usedirect_amount : typeof data.usedirect_amount === 'string' && data.usedirect_amount.toLowerCase() === 'yes' ? true : false,
        direct_value: data.direct_amount,
        formula_id: data.formula_id,
        currency_id: data.currency_id,
        is_taxable: data.is_taxable !== undefined ? (typeof data.is_taxable === 'boolean' ? data.is_taxable : typeof data.is_taxable === 'string' && data.is_taxable.toLowerCase() === 'yes' ? true : false) : !!data.tax_amount,
        tax_amount: data.tax_amount,
        tax_percent: data.tax_percent,
        minimum_nontaxable: data.min_nontaxable,
        item_id: data.varallowance_id,
        eligibility: data.eligibility,
        is_global: data.is_global
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
      flx: {
        fieldTitle: `Other Errors`
      }
    };
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

  onTaxableChecked(event) {
    if (event.target.checked) {
      this.showTaxContent = true;
      this.taxPercent.setValue(null)
      this.taxAmount.setValue(null)
    } else {
      this.showTaxContent = false;
      this.taxPercent.setValue(null);
      this.taxAmount.setValue(null);
    }
  }

  onUseTaxAmountChecked(event) {
    if (event.target.checked) {
      this.taxPercent.setValue(null)
    } else {
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

  get eligibility(): AbstractControl {
    return this.form.get('eligibility');
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
