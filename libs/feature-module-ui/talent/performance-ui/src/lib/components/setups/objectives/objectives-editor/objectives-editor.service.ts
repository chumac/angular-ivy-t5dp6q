import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IObjectiveDto } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesEditorService {
  private form: FormGroup = new FormGroup({});
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
      is_current: ['', Validators.required],	
      review_start_date: ['', Validators.required],	
      review_end_date: ['', Validators.required],	
      is_active: ['', Validators.required],	
      use_360: ['', Validators.required],	
      objective_start_date: ['', Validators.required],	
      objective_end_date: ['', Validators.required],	
      business_rule: ['', Validators.required],	
      link_to: [null],	
      is_published: ['', Validators.required],	
      req_ratings: ['', Validators.required],	
      req_comments: ['', Validators.required]	
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

  fieldData(data: IObjectiveDto): IObjectiveDto | {} {
    if (data) {
      return {
        // code: data.code,	
        // description: data.description,	
        // period_start_date: data.period_start_date,	
        // period_end_date: data.period_end_date,	
        // is_current: data.is_current,	
        // review_start_date: data.review_start_date,	
        // review_end_date: data.review_end_date,	
        // is_active: data.is_active,	
        // use_360: data.use_360,	
        // objective_start_date: data.objective_start_date,	
        // objective_end_date: data.objective_end_date,	
        // business_rule: data.business_rule,	
        // link_to: data.link_to,	
        // is_published: data.is_published,	
        // req_ratings: data.req_ratings,	
        // req_comments: data.req_comments	

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
      objective_start_date: {
        fieldTitle: `Objective Start date`,
        required: `This field is required.`
      },
      objective_end_date: {
        fieldTitle: `Objective End date`,
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

}
