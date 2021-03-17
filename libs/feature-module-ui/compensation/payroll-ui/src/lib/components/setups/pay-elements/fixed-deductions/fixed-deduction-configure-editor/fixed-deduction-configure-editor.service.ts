import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IDeductCriteriaConfig } from '@nutela/models/compensation/payroll';

@Injectable()
export class FixedDeductionConfigureEditorService {
  public form: FormGroup = new FormGroup({});

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
      criteria_title: [null, Validators.required],
      criteria_sql: [null, Validators.required],
      fixeddeduct_id: [null, Validators.required],
      based_on_paygroup: [false, Validators.required]
    }, {
        validator: []
      }
    );
  }

  init(
    data: IDeductCriteriaConfig,
    deduction: any
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
    if (deduction) {
      this.form.patchValue(this.patchDeductionInfo(deduction));
    }
  }

  patchDeductionInfo(deduction: any): any {
    if (deduction) {
      return {
        criteria_title: deduction.description,
        criteria_sql: null,
        fixeddeduct_id: deduction.deduction_id,
        based_on_paygroup: false,
      };
    } else {
      return {};
    }
  }

  fieldData(data: IDeductCriteriaConfig): IDeductCriteriaConfig | {} {
    if (data) {
      console.log(data)
      return {
        criteria_title: data.criteria_title,
        criteria_sql: data.criteria_sql,
        fixeddeduct_id: data.FixedDeductionInfo ? data.FixedDeductionInfo.deduction_id : null,
        based_on_paygroup: data.based_on_paygroup,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      criteria_title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      criteria_sql: {
        fieldTitle: `SQL`,
        required: `This field is required.`
      },
      fixeddeduct_id: {
        fieldTitle: `Fixed deduction`,
        required: `This field is required.`
      },
      based_on_paygroup: {
        fieldTitle: `Based On Paygroup`,
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

  get formula(): AbstractControl {
    return this.form.get('formula_id');
  }

  get directAmount(): AbstractControl {
    return this.form.get('direct_value');
  }

  get endDate(): AbstractControl {
    return this.form.get('effective_to');
  }
}
