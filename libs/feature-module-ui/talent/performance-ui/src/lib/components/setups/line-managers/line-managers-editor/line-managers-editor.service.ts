import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ILineManager } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class LineManagersEditorService {
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
      employee_id: [null, Validators.required],
      line_manager: [null, Validators.required],
      score_percent: [null, Validators.required],
      role: [null, Validators.required],
      plan_id: [null, Validators.required] 
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

  fieldData(data: ILineManager): ILineManager | {} {
    if (data) {
      return {
        employee_id: data.employeeinfo? data.employeeinfo.employee_id:null,
        line_manager: data.LineManagerinfo? data.LineManagerinfo.employee_id:null,
        score_percent: data.score_percent,
        role: data.role,
        plan_id: data.PlanInfo? data.PlanInfo.id:null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      line_manager: {
        fieldTitle: `Line Manager`,
        required: `This field is required.`
      },
      score_percent: {
        fieldTitle: `Score`,
        required: `This field is required.`
      },
      role: {
        fieldTitle: `Role`,
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
