import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IEventDetailFeedbackForms } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class EventDetailFeedbackFormsEditorService {
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
      event_id: ['', Validators.required],
      form_id: ['', Validators.required],
      form_availability : ['', Validators.required],
      no_of_months_after : [''],
      feedback_role  :['', Validators.required],
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

  fieldData(data: IEventDetailFeedbackForms): IEventDetailFeedbackForms | {} {
    if (data) {
      return {
        event_id: data.event_id,
        form_id: data.form_id,
        form_availability: data.form_availability,
        no_of_months_after: data.no_of_months_after,
        feedback_role: data.feedback_role,

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      event_id: {
        fieldTitle: `Event`,
        required: `This field is required.`
      },
      form_id: {
        fieldTitle: `Form`,
        required: `This field is required.`
      },
      form_availability: {
        fieldTitle: `Form Availability`,
        required: `This field is required.`
      },
      feedback_role: {
        fieldTitle: `Feedback Role`,
        required: `This field is required.`
      },
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

}
