import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { ISalaryReviewPlan } from '@nutela/models/compensation/payroll';

@Injectable()
export class ReviewPlanEditorService {
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
      code: [null, Validators.required],
      description: [null],
      payroll_profile_id: [null, Validators.required],
      allowances_affected: [null],
      g_allow_review_rule: [null, Validators.required],
      rule_value_allowance: [null, Validators.required],
      deduction_affected: [null, Validators.required],
      g_deduct_review_rule: [null, Validators.required],
      rule_value_deduction: [null, Validators.required],
      eligibility_rule: [null],
      auto_execute: [false, Validators.required],
      effective_date: [null, Validators.required],
      salary_review_group_id: [null, Validators.required]
    }, {
      validator: []
    }
    );
  }

  init(
    data: ISalaryReviewPlan
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ISalaryReviewPlan): ISalaryReviewPlan | {} {
    if (data) {

      return {
        code: data.code,
        description: data.description,
        payroll_profile_id: data.payroll_profile_id,
        allowances_affected: data.allowance_affected,
        g_allow_review_rule: data.g_allow_review_rule,
        rule_value_allowance: data.rule_value_allowance,
        deduction_affected: data.deduction_affected,
        g_deduct_review_rule: data.g_deduct_review_rule,
        rule_value_deduction: data.rule_value_deduction,
        eligibility_rule: data.egibility_rule,
        auto_execute: data.auto_execute,
        effective_date: data.effective_date,
        salary_review_group_id: data.salary_review_id
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `PayGroup_code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `description`,
        required: `This field is required.`
      },
      payroll_profile_id: {
        fieldTitle: `Payroll Profile`,
        required: `This field is required.`
      },
      salary_review_group_id: {
        fieldTitle: `Review Group`,
        required: `This field is required.`
      },
      allowances_affected: {
        fieldTitle: `Allowances Affected`,
        required: `This field is required.`
      },
      g_allow_review_rule: {
        fieldTitle: `Allowance Review Rule`,
        required: `This field is required.`
      },
      rule_value_allowance: {
        fieldTitle: `Allowance Rule Value`,
        required: `This field is required.`
      },
      deduction_affected: {
        fieldTitle: `Deduction Affected`,
        required: `This field is required.`
      },
      g_deduct_review_rule: {
        fieldTitle: `Deduction Review Rule`,
        required: `This field is required.`
      },
      rule_value_deduct: {
        fieldTitle: `Deduction Rule Value`,
        required: `This field is required.`
      },
      eligibility_rule: {
        fieldTitle: `Eligibility Rule`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
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

  get group(): AbstractControl {
    return this.form.get('salary_review_group_id');
  }

  get profile(): AbstractControl {
    return this.form.get('payroll_profile_id');
  }
}
