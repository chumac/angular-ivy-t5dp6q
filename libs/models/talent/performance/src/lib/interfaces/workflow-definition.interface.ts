import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from "@nutela/models/workforce/personnel";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IWorkflowDefinition {
    id: number;
    code: string;
    description: string;
    sys_rule: string;
    eligibility_rule: number;
    AnalysisInfo: IAnalysis;
    AnalysisDetailsInfo: IAnalysisDetail;
    PositionInfo: IPosition;
    DesignationInfo: IDesignation;
    GradeInfo: IGrade;
    EmployeeInfo: IPersonal;
}