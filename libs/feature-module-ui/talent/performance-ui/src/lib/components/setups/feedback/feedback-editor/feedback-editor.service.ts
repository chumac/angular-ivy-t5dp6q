import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IFeedbackSession } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class FeedbackSessionEditorService {
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
      plan_id: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      period_start_date: ['', Validators.required],
      period_end_date: ['', Validators.required],
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

  fieldData(data: IFeedbackSession): IFeedbackSession | {} {
    if (data) {
      return {
        plan_id: data.plan_id,
        code: data.code,
        description: data.description,
        period_start_date: data.period_start,
        period_end_date: data.period_end,
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
        fieldTitle: `Start Date`,
        required: `This field is required.`
      },
      period_end_date: {
        fieldTitle: `End Date`,
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

  get planId(): AbstractControl {
    return this.form.get('plan_id');
  }

  get code(): AbstractControl {
    return this.form.get('code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
