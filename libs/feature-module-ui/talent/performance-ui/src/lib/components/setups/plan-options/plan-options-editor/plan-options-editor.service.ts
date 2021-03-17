import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IPlanOption } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class PlanOptionsEditorService {
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
      option_key: ['', Validators.required],
      plan_id: ['', Validators.required],
      option_value: ['', Validators.required],
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

  fieldData(data: IPlanOption): IPlanOption | {} {
    if (data) {
      return {
        option_key: data.option_key,
        plan_id: data.plan_id,
        option_value: data.option_value,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      option_key: {
        fieldTitle: `Option Key`,
        required: `This field is required.`
      },
      plan_id: {
        fieldTitle: `Plan`,
        required: `This field is required.`
      },
      option_value: {
        fieldTitle: `Option Value`,
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
