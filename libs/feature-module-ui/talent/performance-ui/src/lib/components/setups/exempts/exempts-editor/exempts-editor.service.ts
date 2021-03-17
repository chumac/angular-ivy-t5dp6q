import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IExempt } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ExemptsEditorService {
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
      is_specific_plan_exempt: [false],
      eligibility_group_type: [null, Validators.required],
      plan_id: [null, Validators.required],
      eligibility_group_type_detail: [null]
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

  fieldData(data: IExempt): IExempt | {} {
    if (data) {
      return {
        employee_id: data.employee_id,
        is_specific_plan_exempt: data.is_specific_plan_exempt,
        plan_id: data.plan_id,

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      eligibility_group_type: {
        fieldTitle: `Eligibility Rule`,
        required: `This field is required.`
      },
      plan_id: {
        fieldTitle: `Plan`,
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
