import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { ISalaryReviewGroup } from '@nutela/models/compensation/payroll';

@Injectable()
export class ReviewGroupEditorService {
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
      description: [null, Validators.required],
      effective_date: [null, Validators.required],
    }, {
      validator: []
    }
    );
  }

  init(
    data: ISalaryReviewGroup
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ISalaryReviewGroup): ISalaryReviewGroup | {} {
    if (data) {

      return {
        code: data.code,
        description: data.description,
        effective_date: data.effective_date,
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
      effective_date: {
        fieldTitle: `Effective Date`,
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
