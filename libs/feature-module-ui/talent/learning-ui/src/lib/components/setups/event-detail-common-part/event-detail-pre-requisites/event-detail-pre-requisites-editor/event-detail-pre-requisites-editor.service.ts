import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IEventDetailPreRequisites } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class EventDetailPreRequisitesEditorService {
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
      pre_requisite_type: ['', Validators.required],
      course_id: ['', Validators.required],
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

  fieldData(data: IEventDetailPreRequisites): IEventDetailPreRequisites | {} {
    if (data) {
      return {
        event_id: data.event_id,
        pre_requisite_type: data.pre_requisite_type,
        course_id: data.course_id
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
      pre_requisite_type: {
        fieldTitle: `Pre requisite type`,
        required: `This field is required.`
      },
      course_id: {
        fieldTitle: `Course`,
        required: `This field is required.`
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

}
