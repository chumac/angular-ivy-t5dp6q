import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class CommendationsEditorService {
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
          issued_by_id: [null, Validators.required],
          issued_by_role: [null, Validators.required],
          commendation_detail: [null],
          event_date: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ICommendationTransaction
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ICommendationTransaction): ICommendationTransaction | {} {
    if (data) {
      return {
        employee_id: data.EmployeeInfo?data.EmployeeInfo.employee_id:null,
        issued_by_id: data.IssuedByInfo?data.IssuedByInfo.employee_id:null,
        issued_by_role: data.IssuedByRole?data.IssuedByRole.id:null,
        commendation_detail: data.commendation_detail,
        event_date: data.event_date
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
      issued_by_id: {
        fieldTitle: `Issued by employee`,
        required: `This field is required.`,
        // min: `You need to specify a minimum of 1.`,
      },
      issued_by_role: {
        fieldTitle: `Who issued this commendation action`,
        required: `This field is required.`,
        // min: `You need to specify a minimum of 1.`,
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

