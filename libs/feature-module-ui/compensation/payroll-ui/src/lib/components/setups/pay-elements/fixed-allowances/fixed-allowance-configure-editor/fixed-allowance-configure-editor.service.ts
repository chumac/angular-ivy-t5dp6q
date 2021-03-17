import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { ICriteriaConfig } from '@nutela/models/compensation/payroll';

@Injectable()
export class FixedAllowanceConfigureEditorService {
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
      fixedallow_id: [null, Validators.required],
      based_on_paygroup: [false, Validators.required]
    }, {
        validator: []
      }
    );
  }

  init(
    data: ICriteriaConfig,
    allowance: any
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
    if (allowance) {
      this.form.patchValue(this.patchAllowanceInfo(allowance));
    }
  }

  patchAllowanceInfo(allowance: any): any {
    if (allowance) {
      return {
        criteria_title: allowance.description,
        criteria_sql: null,
        fixedallow_id: allowance.allowance_id,
        based_on_paygroup: false,
      };
    } else {
      return {};
    }
  }

  fieldData(data: ICriteriaConfig): ICriteriaConfig | {} {
    if (data) {
      return {
        criteria_title: data.criteria_title,
        criteria_sql: data.criteria_sql,
        fixedallow_id: data.FixedAllowanceInfo ? data.FixedAllowanceInfo.allowance_id : null || data.fixedallow_id,
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
      fixedallow_id: {
        fieldTitle: `Fixed Allowance`,
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

  rebuildForm(): void {
    this.form = this.buildForm();
  }
}
