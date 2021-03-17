import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IConfiguration360 } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class Configuration360sEditorService {
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
      eligibility_rule: [null, Validators.required],
      analysis_id: [null],
      analysis_det_id: [null],
      position_id: [null],
      designation_id: [null],
      grade_id: [null],
      employee_id: [null],
      plan_id: [null, Validators.required],
      use_peer_survey: [false],
      use_peer_survey_rating: [false],
      peer_survey_weight: [0],
      use_leadership_survey: [false],
      use_leadership_survey_rating: [false],
      leadership_survey_weight: [0],
      use_external_survey: [false],
      use_external_survey_rating: [false],
      external_survey_weight: [0],
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

  fieldData(data: IConfiguration360): IConfiguration360 | {} {
    if (data) {
      return {
        eligibility_rule: data.eligibility_rule, 
        analysis_id:  (data.AnalysisInfo && data.AnalysisInfo.analysis_id)?data.AnalysisInfo.analysis_id:null,
        analysis_det_id:  (data.AnalysisDetailsInfo && data.AnalysisInfo.analysis_id)?data.AnalysisDetailsInfo.analysis_det_id:null,
        position_id:  (data.PositionInfo && data.PositionInfo.position_id)?data.PositionInfo.position_id:null,
        designation_id:  (data.DesignationInfo && data.DesignationInfo.title_id)?data.DesignationInfo.title_id:null,
        grade_id:  (data.GradeInfo && data.GradeInfo.grade_id)?data.GradeInfo.grade_id:null,
        employee_id:  (data.EmployeeInfo && data.EmployeeInfo.id)?data.EmployeeInfo.id:null,
        plan_id: data.PlanningInfo?data.PlanningInfo.id:null,
        use_peer_survey: data.use_peer_survey,
        use_peer_survey_rating: data.use_peer_survey_rating,
        peer_survey_weight: data.peer_survey_weight,
        use_leadership_survey: data.use_leadership_survey,
        use_leadership_survey_rating: data.use_leadership_survey_rating,
        leadership_survey_weight: data.leadership_survey_weight,
        use_external_survey: data.use_external_survey,
        use_external_survey_rating: data.use_external_survey_rating,
        external_survey_weight: data.external_survey_weight,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      eligibility_rule: {
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

  get peerSurvey(): AbstractControl {
    return this.form.get('use_peer_survey');
  }

  get leadershipSurvey(): AbstractControl {
    return this.form.get('use_leadership_survey');
  }

  get externalSurvey(): AbstractControl {
    return this.form.get('use_external_survey');
  }

  get externalWeight(): AbstractControl {
    return this.form.get('external_survey_weight');
  }
  
  get leadershipWeight(): AbstractControl {
    return this.form.get('leadership_survey_weight');
  }

  get peerWeight(): AbstractControl {
    return this.form.get('peer_survey_weight');
  }

}
