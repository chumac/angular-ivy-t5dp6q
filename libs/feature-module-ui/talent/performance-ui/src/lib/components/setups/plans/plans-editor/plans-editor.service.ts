import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IPlan } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class PlansEditorService {
  public form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      period_start_date: ['', Validators.required],
      period_end_date: ['', Validators.required],
      is_current: [false],
      review_start_date: ['', Validators.required],
      review_end_date: ['', Validators.required],
      // is_active: [false],
      use_360: [false],
      plan_start_date: ['', Validators.required],
      plan_end_date: ['', Validators.required],
      business_rule: ['', Validators.required],
      link_to: [null],
      is_published: [false],
      req_ratings: [false],
      req_comments: [false],

      prev_plan_id: [null],
      use_prev_obj_status: [0],
      use_prev_obj: false
      }, {
        validator: []
      }
    );
  }

  init(
    data: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPlan): IPlan | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        period_start_date: data.period_start_date,
        period_end_date: data.period_end_date,
        is_current: data.is_current,
        review_start_date: data.review_start_date,
        review_end_date: data.review_end_date,
        is_active: data.is_active,
        use_360: data.use_360,
        plan_start_date: data.plan_start_date,
        plan_end_date: data.plan_end_date,
        business_rule: data.business_rule,
        link_to: data.link_to,
        is_published: data.is_published,
        req_ratings: data.req_ratings,
        req_comments: data.req_comments,
        prev_plan_id: data.prev_plan_id,
        use_prev_obj_status: data.use_prev_obj_status ? data.use_prev_obj_status : 0,
        use_prev_obj: data.use_prev_obj
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
      period_start_date: {
        fieldTitle: `Period Start date`,
        required: `This field is required.`
      },
      period_end_date: {
        fieldTitle: `Period End date`,
        required: `This field is required.`
      },
      review_start_date: {
        fieldTitle: `Review Start date`,
        required: `This field is required.`
      },
      review_end_date: {
        fieldTitle: `Review End date`,
        required: `This field is required.`
      },
      is_active: {
        fieldTitle: `Is Active`,
        required: `This field is required.`
      },
      use_360: {
        fieldTitle: `Use 360`,
        required: `This field is required.`
      },
      plan_start_date: {
        fieldTitle: `Plan Start date`,
        required: `This field is required.`
      },
      plan_end_date: {
        fieldTitle: `Plan End date`,
        required: `This field is required.`
      },
      business_rule: {
        fieldTitle: `Business rule`,
        required: `This field is required.`
      },
      link_to: {
        fieldTitle: `Link to`,
        required: `This field is required.`
      },
      is_published: {
        fieldTitle: `Is Published`,
        required: `This field is required.`
      },
      req_ratings: {
        fieldTitle: `Require Rating`,
        required: `This field is required.`
      },
      req_comments: {
        fieldTitle: `Require Comments`,
        required: `This field is required.`
      },

      flx: {}
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

  get code(): AbstractControl {
    return this.form.get('code');
  }

  get usePrevObj(): AbstractControl {
    return this.form.get('use_prev_obj');
  }

  get prevPlanId(): AbstractControl {
    return this.form.get('prev_plan_id');
  }

}
