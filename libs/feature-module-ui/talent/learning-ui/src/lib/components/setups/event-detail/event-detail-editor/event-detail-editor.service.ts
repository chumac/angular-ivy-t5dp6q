import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IEventDetailData } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class EventDetailEditorService {
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
      course_id: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      event_type: [null, Validators.required],
      is_e_learning: [false, Validators.required],
      start_date: [null, Validators.required],
      employees_can_apply: [false, Validators.required],
      has_certification: [false, Validators.required],
      use_kudos: [false, Validators.required],
      event_title: ['',],
      detail: [null],
      is_self_initiated: [false],
      end_date: [null],
      organized_by: [null],
      approval_status: [null],
      is_active: [null],
      application_open_date: [null],
      application_close_date: [null],
      kudos_pay: [null],
      kudos_receipt: [null],
      status: [null],
      status_text: [null],
      in_active_reason: [null]
    }, {
      validator: []
    }
    );
  }

  init(
    data: any,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IEventDetailData): IEventDetailData | {} {
    if (data) {
      return {
        course_id: data.course_id,
        event_title: data.event_title,
        code: data.code,
        description: data.description,
        detail: data.detail,
        event_type: data.event_type,
        is_e_learning: data.is_e_learning,
        is_self_initiated: data.is_self_initiated,
        start_date: data.start_date,
        end_date: data.end_date,
        organized_by: data.organized_by,
        approval_status: data.approval_status,
        is_active: data.is_active,
        employees_can_apply: data.employees_can_apply,
        application_open_date: data.application_open_date,
        application_close_date: data.application_close_date,
        has_certification: data.has_certification,
        use_kudos: data.use_kudos,
        kudos_pay: data.kudos_pay,
        kudos_receipt: data.kudos_receipt,
        status: data.status,
        status_text: data.status_text,
        in_active_reason: data.in_active_reason
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      course: {
        fieldTitle: `Course`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      event_type: {
        fieldTitle: `Event Type`,
        required: `This field is required.`
      },
      is_e_learning: {
        fieldTitle: `Is E-learning`,
        required: `This field is required.`
      },
      start_date: {
        fieldTitle: `Start Date`,
        required: `This field is required.`
      },
      employees_can_apply: {
        fieldTitle: `Employees Can Apply`,
        required: `This field is required.`
      },
      use_kudos: {
        fieldTitle: `Use Kudos`,
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
