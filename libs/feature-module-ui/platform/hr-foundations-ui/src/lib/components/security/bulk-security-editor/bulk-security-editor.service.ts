import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';

import { UtilService} from '@nutela/core-services';



@Injectable()

export class BulkSecurityEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;
  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }


  buildForm(): FormGroup {
    return this.fb.group(
      {
        action_taken:['', Validators.required],
        user_name:[''],
        role_name:[[]],
        comments: [''],
      },
      {
        validator: []
      }
    );
  }


  getValidationMessages(): any {
    return {};
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

  get actionTaken():AbstractControl{
    return this.form.get('action_taken');
  }

  get Comments():AbstractControl{
    return this.form.get('comments');
  }

  get roleNames():AbstractControl{
    return this.form.get('role_name');
  }
}
