import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IWorkflowStep } from '@nutela/models/talent/performance';
import { nonZero } from './workflow-steps-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStepsEditorService {
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
      workflow_id: [null, Validators.required],
      step: [null, Validators.compose([Validators.required, nonZero])],
      role: ['', Validators.required],
      sys_rule: [null],
      default_route: [null]
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

  fieldData(data: IWorkflowStep): IWorkflowStep | {} {
    if (data) {
      return {
        workflow_id: data.ReviewWorkflowDefInfo?data.ReviewWorkflowDefInfo.id: null,
        step: data.step,
        role: data.role,
        sys_rule: data.sys_rule,
        default_route: null
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      workflow_id: {
        fieldTitle: `Workflow`,
        required: `This field is required.`
      },
      step: {
        fieldTitle: `Step`,
        required: `This field is required.`,
        nonZero: `This field must be a positive number`
      },
      role: {
        fieldTitle: `Role`,
        required: `This field is required.`
      },
      sys_rule: {
        fieldTitle: `System Rule`,
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

  get workflowId(): AbstractControl {
    return this.form.get('workflow_id');
  }

}
