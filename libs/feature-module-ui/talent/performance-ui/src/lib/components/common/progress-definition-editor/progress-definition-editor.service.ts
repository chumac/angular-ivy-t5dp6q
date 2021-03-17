import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProgressDefinitionEditorService {
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
      description: [null, Validators.maxLength(100)],
      objective_id: [null],
      progress_type: [null, Validators.required],
      perc_complete: [0],
      target_date: [null], 
      importance: [0]
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

  fieldData(data: any): any | {} {
    if (data) {
      return {
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`,
        maxLength: `Should not exceed 100 characters.`
      },
      progress_type: {
        fieldTitle: `Progress Type`,
        required: `This field is required.`
      },

      flx: {}
    };
  }

  get f() {
    return this.form;
  }

  set f(data) {
    this.form = data;
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

  get objectiveId(): AbstractControl {
    return this.form.get('objective_id');
  }

}
