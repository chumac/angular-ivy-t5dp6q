import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IRoleWeight } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class RoleWeightsEditorService {
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
      tag_to: [null],
      eligibility_rule: [null, Validators.required],
      analysis_id: [null],
      analysis_det_id: [null],
      position_id: [null],
      designation_id: [null],
      grade_id: [null],
      employee_id: [null],
      role_type_weight_peer: [null],
      role_type_weight_sub: [null],
      role_type_weight_ext: [null],
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

  fieldData(data: IRoleWeight): IRoleWeight | {} {
    if (data) {
      return {
        eligibility_rule: data.eligibility_rule,
        analysis_id:  data.AnalysisInfo?data.AnalysisInfo.analysis_id:null,
        analysis_det_id:  data.AnalysisDetailsInfo?data.AnalysisDetailsInfo.analysis_det_id:null,
        position_id:  data.PositionInfo?data.PositionInfo.position_id:null,
        designation_id:  data.DesignationInfo?data.DesignationInfo.title_id:null,
        grade_id:  data.GradeInfo?data.GradeInfo.grade_id:null,
        employee_id:  data.EmployeeInfo?data.EmployeeInfo.id:null,
        tag_to: data.tag_to,
        role_type_weight_peer: data.role_type_weight_peer,
        role_type_weight_sub: data.role_type_weight_sub,
        role_type_weight_ext: data.role_type_weight_ext,
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

  get analysis(): AbstractControl {
    return this.form.get('analysis_id');
  }
  get analysisDetail(): AbstractControl {
    return this.form.get('analysis_det_id');
  }

  get position(): AbstractControl {
    return this.form.get('position_id');
  }

  get designation(): AbstractControl {
    return this.form.get('designation_id');
  }

  get grade(): AbstractControl {
    return this.form.get('grade_id');
  }

  get employee(): AbstractControl {
    return this.form.get('employee_id');
  }

}
