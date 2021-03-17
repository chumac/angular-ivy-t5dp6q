import { IGrade } from "@nutela/models/compensation/payroll";
import { IPosition, IAnalysis, IAnalysisDetail } from "@nutela/models/workforce/personnel";

export interface IPositionSetup{
  //write
  reportTo:string;
  position_code:string;
  description:string;
  org_level_scope:boolean;
  analysis_id:number;
  analysis_det_id:number;
  pos_reports_to:number;
  pos_indirect_reports_to:number;
  from_grade_id:number;
  to_grade_id:number;
  mis_code:string;
  score_knowhow:number;
  score_probsolve:number;
  score_accountability:number;
  score_workconditions:number;
  position_contract:number;
  doc_type:number;
  doc_extension:string;
  doc_size:number;
  designation_id:number;

  //read
  position_id:number;
  analysisInfo:IAnalysis;
  positionReportsToInfo:IPosition;
  doc_binary:number;
  doc_url:string;
  analysisDetailsInfo:IAnalysisDetail;
  from_gradeInfo:IGrade;
  to_gradeInfo:IGrade;
  positionIndirectReportsToInfo:IPosition;
  PositionCategoryInfo:IPositionCategorySetup;

}


export interface IPositionCategorySetup{
     id :number;
     code :string;
     description :string;
     sys_rule :string;
}
