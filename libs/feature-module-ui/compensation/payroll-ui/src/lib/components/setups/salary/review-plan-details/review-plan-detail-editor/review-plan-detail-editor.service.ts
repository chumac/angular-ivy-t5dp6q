import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { ISalaryReviewPlanDetail } from '@nutela/models/compensation/payroll';

@Injectable()
export class ReviewPlanDetailEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showPaygroups: boolean = false;
  restrictToRole: boolean = false

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }
// { value: this.confirmationStatus ? this.confirmationStatus : null, disbled: true }
  buildForm(): FormGroup {
    return this.fb.group({
      item_type: [null, Validators.required],
      allowance_id: [null],
      deduction_id: [null, Validators.required],
      review_rule: [null, Validators.required],
      rule_value: [null, Validators.required],
      salary_review_id: [null, Validators.required]
    }, {
      validator: []
    }
    );
  }

  init(
    data: ISalaryReviewPlanDetail
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {

      return {
        item_type: data.item_type,
        allowance_id: data.allowance_id,
        deduction_id: data.deduction_id,
        review_rule: data.review_rule,
        rule_value: data.rule_value,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      item_type: {
        fieldTitle: `Item Type`,
        required: `This field is required.`
      },
      allowance_id: {
        fieldTitle: `Allowance`,
        required: `This field is required.`
      },
      deduction_id: {
        fieldTitle: `Deduction`,
        required: `This field is required.`
      },
      review_rule: {
        fieldTitle: `Review Rule`,
        required: `This field is required.`
      },
      rule_value: {
        fieldTitle: `Rule Value`,
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
    return this.form.get('Paygroup_code');
  }

  get ShortName(): AbstractControl {
    return this.form.get('shortname');
  }

  get Grade(): AbstractControl {
    return this.form.get('grade_id');
  }

  get Rank(): AbstractControl {
    return this.form.get('rank');
  }

  get taxRate(): AbstractControl {
    return this.form.get('estimated_tax_rate');
  }

  get confirmationStatus(): AbstractControl {
    return this.form.get('confirmation_status');
  }
}
