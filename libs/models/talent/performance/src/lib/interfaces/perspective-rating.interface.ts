import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from "@nutela/models/workforce/personnel";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPerspective } from "./perspective.interface";

export interface IPerspectiveRating {
    id: number;
    perpesctive_id: number;
    eligibility_rule: number;
    analysis_id: number;
    analysis_det_id: number;
    position_id: number;
    designation_id: number;
    grade_id: number;
    employee_id: number;
    weight: number;
    AnalysisInfo: IAnalysis;
    AnalysisDetailsInfo: IAnalysisDetail;
    PositionInfo: IPosition;
    DesignationInfo: IDesignation;
    GradeInfo: IGrade;
    EmployeeInfo: IPersonal;
    PerspectivesInfo: IPerspective;
  }