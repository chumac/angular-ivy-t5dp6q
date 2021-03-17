import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IPerspectiveRating } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class PerspectiveRatingsEditorService {
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
      perpesctive_id: [null, Validators.required],
      eligibility_rule: [null, Validators.required],
      analysis_id: [null],
      analysis_det_id: [null],
      position_id: [null],
      designation_id: [null],
      grade_id: [null],
      employee_id: [null],
      weight: [null, Validators.required]
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

  fieldData(data: IPerspectiveRating): IPerspectiveRating | {} {
    if (data) {
      return {
        perpesctive_id: data.PerspectivesInfo?data.PerspectivesInfo.id:null,
        eligibility_rule: data.eligibility_rule,
        analysis_id: (data.AnalysisInfo && data.AnalysisInfo.analysis_id)?data.AnalysisInfo.analysis_id:null,
        analysis_det_id: (data.AnalysisDetailsInfo && data.AnalysisDetailsInfo.analysis_det_id)?data.AnalysisDetailsInfo.analysis_det_id:null,
        position_id: (data.PositionInfo && data.PositionInfo.position_id)?data.PositionInfo.position_id:null,
        designation_id: (data.DesignationInfo && data.DesignationInfo.title_id)?data.DesignationInfo.title_id:null,
        grade_id: (data.GradeInfo && data.GradeInfo.grade_id)?data.GradeInfo.grade_id:null,
        employee_id: data.EmployeeInfo?data.EmployeeInfo.employee_id:null,
        weight: data.weight
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      perpesctive_id: {
        fieldTitle: `Perspective`,
        required: `This field is required.`
      },
      eligibility_rule: {
        fieldTitle: `Eligibility`,
        required: `This field is required.` 
      },
      analysis_id: {
        fieldTitle: `Analysis`,
        required: `This field is required.`
      },
      analysis_det_id: {
        fieldTitle: `Analysis Detail`,
        required: `This field is required.`
      },
      position_id: {
        fieldTitle: `Position`,
        required: `This field is required.`
      },
      designation_id: {
        fieldTitle: `Designation`,
        required: `This field is required.`
      },
      grade_id: {
        fieldTitle: `Grade`,
        required: `This field is required.`
      },
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      weight: {
        fieldTitle: `Weight`,
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

  get perpesctiveId(): AbstractControl {
    return this.form.get('perpesctive_id');
  }

}
