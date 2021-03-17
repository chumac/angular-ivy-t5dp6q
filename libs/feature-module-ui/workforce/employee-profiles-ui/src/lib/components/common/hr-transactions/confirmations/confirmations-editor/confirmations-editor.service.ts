import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationsEditorService {
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
          employee_id: [null, Validators.required],
          transaction_type: [null],
          appraisal_score: [null, Validators.min(1)],
          effective_date: [null, Validators.required]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IConfirmationTransaction
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IConfirmationTransaction): IConfirmationTransaction | {} {
    if (data) {
      return {
        employee_id: data.employee_id,
        transaction_type: data.transaction_type,
        appraisal_score: data.appraisal_score,
        effective_date: data.effective_date
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
        employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`,
        // pastDate: `Start date cannot be in the past.`
      },
      transaction_type: {
        fieldTitle: `Type`,
        required: `This field is required.`,
        min: `You need to specify a minimum of 1.`,
      },
      appraisal_score: {
        fieldTitle: `Appraisal Score`,
        required: `This field is required.`,
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`,
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

  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
  }

}

