import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IPositionSetup } from '@nutela/models/workforce/employee-profiles';
import { Store } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store/root';
import { LoadSpecificStructurePosition, LoadGetStructurePosition } from '../../../../store/setups/position';

@Injectable()
export class PositionEditorService {
  status=true;
  public form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<IEmployeesProfileState>,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      // position_id:[null],
      position_code: [null],
      description:['', Validators.required],
      org_level_scope:[false],
      analysis_id :[null],
      analysis_details_id: [null],
      analysis_det_id:[null],
      pos_reports_to:[null],
      pos_indirect_reports_to:[null],
      from_grade_id:[null],
      to_grade_id:[null],
      mis_code:[null],
      score_knowhow:[null],
      score_probsolve:[null],
      score_accountability:[null],
      score_workconditions:[null],
      position_contract:[null],
      doc_type:[null],
      doc_extension:[null],
      doc_size:[null],
      position_category_id :[null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IPositionSetup,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
      // this.setStructureLocation(data);

    }
  }

  setStructureLocation(data:IPositionSetup,){
    if (data.analysisInfo) {
      const type= data.analysisInfo.analysis_id;
      if(type){
        this.store.dispatch(new LoadSpecificStructurePosition({Id:type}));
        const details=data.analysisDetailsInfo.analysis_det_id;
        if(details){
          this.store.dispatch(new LoadGetStructurePosition({Id:data.analysisDetailsInfo.analysis_det_id}));
        }
      }
    }
  }



  fieldData(data: IPositionSetup): IPositionSetup | {} {
    if (data) {
      console.log('data edit', data);
      return {
      // position_id:data.position_id,
      position_code: data.position_code,
      description:data.description,
      org_level_scope:data.org_level_scope?data.org_level_scope:false,
      analysis_id:data.analysisInfo?data.analysisInfo.analysis_id:null,
      analysis_det_id:data.analysisDetailsInfo?data.analysisDetailsInfo.analysis_det_id:null,
      pos_reports_to:data.positionReportsToInfo?data.positionReportsToInfo.position_id:null,
      pos_indirect_reports_to:data.positionIndirectReportsToInfo?data.positionIndirectReportsToInfo.position_id:null,
      from_grade_id:data.from_gradeInfo?data.from_gradeInfo.grade_id:null,
      to_grade_id:data.to_gradeInfo?data.to_gradeInfo.grade_id:null,
      mis_code:data.mis_code,
      score_knowhow:data.score_knowhow,
      score_probsolve:data.score_probsolve,
      score_accountability:data.score_accountability,
      score_workconditions:data.score_workconditions,
      position_contract:data.position_contract?data.position_contract:null,
      doc_type:data.doc_type?data.doc_type:null,
      doc_extension:data.doc_extension?data.doc_extension:null,
      doc_size:data.doc_size?data.doc_size:null,
      position_category_id:data.PositionCategoryInfo?data.PositionCategoryInfo.id:null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
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

  get structureType(): AbstractControl {
    return this.form.get('analysis_id');
  }

  get structureDetails(): AbstractControl {
    return this.form.get('analysis_details_id');
  }

  get costCenter(): AbstractControl {
    return this.form.get('analysis_det_id');
  }

  get fromGrade(): AbstractControl {
    return this.form.get('from_grade_id');
  }
}
