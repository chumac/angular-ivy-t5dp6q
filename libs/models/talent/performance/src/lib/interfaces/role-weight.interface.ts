import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from "@nutela/models/workforce/personnel";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IRoleWeight {
    id: number;
    tag_to: number;
    eligibility_rule: number;
    analysis_id: number;
    analysis_det_id: number;
    position_id: number;
    designation_id: number;
    grade_id: number;
    employee_id: number;
    role_type_weight_peer: number;
    role_type_weight_sub: number;
    role_type_weight_ext: number;
    AnalysisInfo: IAnalysis;
    AnalysisDetailsInfo: IAnalysisDetail;
    PositionInfo: IPosition;
    DesignationInfo: IDesignation;
    GradeInfo: IGrade;
    EmployeeInfo: IPersonal;
}