import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
 ISecurity
} from '@nutela/models/foundation';
import { UtilService, formatDate} from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
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
        action_id:[null],
        action_taken: [null, Validators.required],
        action_taken_by: [null],
        user_name: [null],
        role_name: [null],
        action_logged_date: [null],
        complete_date: [null],
        status: [null],
        comments: [null],
        messages: [null],

      }, {
        validator: []
      }
    );
  }

  init(
    data: ISecurity,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: ISecurity): ISecurity | {} {
    if (data) {
      return {
        action_id: data.action_id,
        action_taken: data.action_taken,
        action_taken_by: data.action_taken_by,
        user_name: data.user_name,
        role_name: data.role_name,
        action_logged_date: data.action_logged_date,
        complete_date: data.complete_date,
        status: data.status,
        comments: data.comments,
        messages: data.messages,

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      action_taken: {
        fieldTitle: `Action Requested`,
        required: `This field is required.`
      },

      action_taken_by: {
        fieldTitle: `Action Requested By`,
        required: `This field is required.`
      },
      user_name: {
        fieldTitle: `UserName`,
        required: `This field is required.`
      },
      role_name: {
        fieldTitle: `Role Name`,
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

  get actionLoggedDate(): AbstractControl {
    return this.form.get('action_logged_date');
  }

  get completedDate(): AbstractControl {
    return this.form.get('complete_date');
  }

  formatDate(){
    if(this.actionLoggedDate.value != null){
    this.actionLoggedDate.setValue(formatDate(this.actionLoggedDate.value));
    }
    if(this.completedDate.value != null){
      this.completedDate.setValue(formatDate(this.completedDate.value));
    }
  }
}
