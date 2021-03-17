import { IAnalysis, IAnalysisDetail, IDesignation, IGrade, IPosition } from "@nutela/models/workforce/personnel";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPlan } from "./plan.interface";

export interface IConfiguration360 {
    id: number;
    plan_id: number;
    eligibility_rule: number;
    designation_id: number;
    position_id: number;
    analysis_id: number;
    analysis_det_id: number;
    grade_id: number;
    employee_id: number;
    use_peer_survey: boolean;
    use_peer_survey_rating: boolean;
    peer_survey_weight: number;
    use_leadership_survey: boolean;
    use_leadership_survey_rating: boolean;
    leadership_survey_weight: number;
    use_external_survey: boolean;
    use_external_survey_rating: boolean; 
    external_survey_weight: number;
    AnalysisDetailsInfo: IAnalysisDetail;
    AnalysisInfo: IAnalysis;
    DesignationInfo: IDesignation;
    EmployeeInfo: IPersonal;
    GradeInfo: IGrade;
    PlanningInfo: IPlan;
    PositionInfo: IPosition;
}