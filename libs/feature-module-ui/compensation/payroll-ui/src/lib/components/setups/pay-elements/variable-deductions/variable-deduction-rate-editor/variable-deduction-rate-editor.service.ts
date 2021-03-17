import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IVariableDeductionRate } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableDeductionRateEditorService {
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
      use_direct_value: [false, Validators.required],
      direct_value: [null],
      formula_id: [null],
      currency_id: [null, Validators.required],
      item_id: [null, Validators.required],
    }, {
        validator: []
      }
    );
  }

  init(
    data: IVariableDeductionRate
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    console.log(data)
    if (data) {
      return {
        paygroup_id: data.paygroup_id ? data.paygroup_id : null,
        use_direct_value: typeof data.usedirect_amount === 'boolean' ? data.usedirect_amount : typeof data.usedirect_amount === 'string' && data.usedirect_amount.toLowerCase() === 'yes' ? true : false,
        direct_value: data.direct_amount,
        formula_id: data.formula_id,
        currency_id: data.currency_id,
        item_id: data.vardeduction_id,
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
      paygroup_id: {
        fieldTitle: `Paygroup`,
        required: `This field is required.`
      },
      use_direct_value: {
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
}
