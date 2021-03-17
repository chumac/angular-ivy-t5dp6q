import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from "@nutela/models/workforce/personnel";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IFormTemplate {
    id: number;
    eligibility_rule: number;
    analysis_id: number;
    analysis_det_id: number;
    position_id: number;
    designation_id: number;
    grade_id: number;
    is_active: boolean;
    description: string;
    employee_id: number;
    AnalysisInfo: IAnalysis;
    AnalysisDetailsInfo: IAnalysisDetail;
    PositionInfo: IPosition;
    DesignationInfo: IDesignation;
    GradeInfo: IGrade;
    EmployeeInfo: IPersonal;
}