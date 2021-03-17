import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IWorkflowDefinition } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class WorkflowDefinitionsEditorService {
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
      code: ['', Validators.required],
      description: ['', Validators.required],
      sys_rule: [''],
      eligibility_rule: [null, Validators.required],
      analysis_id: [null],
      analysis_det_id: [null],
      position_id: [null],
      designation_id: [null],
      grade_id: [null],
      employee_id: [null],
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

  fieldData(data: IWorkflowDefinition): IWorkflowDefinition | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        sys_rule: data.sys_rule,
        eligibility_rule: data.eligibility_rule,
        analysis_id:  (data.AnalysisInfo && data.AnalysisInfo.analysis_id)?data.AnalysisInfo.analysis_id:null,
        analysis_det_id:  (data.AnalysisDetailsInfo && data.AnalysisInfo.analysis_id)?data.AnalysisDetailsInfo.analysis_det_id:null,
        position_id:  (data.PositionInfo && data.PositionInfo.position_id)?data.PositionInfo.position_id:null,
        designation_id:  (data.DesignationInfo && data.DesignationInfo.title_id)?data.DesignationInfo.title_id:null,
        grade_id:  (data.GradeInfo && data.GradeInfo.grade_id)?data.GradeInfo.grade_id:null,
        employee_id:  (data.EmployeeInfo && data.EmployeeInfo.id)?data.EmployeeInfo.id:null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      sys_rule: {
        fieldTitle: `System Rule`,
        required: `This field is required.`
      },
      eligibility_rule: {
        fieldTitle: `Eligibility Rule`,
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
