import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IWorkflowDefinition {
  id: number;
  code: string;
  description: string;
  sys_rule: string;
  eligibility_rule: number;
  EmployeeInfo: IPersonal;
}


 // AnalysisInfo: AnalysisMapDTO;
// AnalysisDetailsInfo: AnalysisDetailsMapDTO;
// PositionInfo: PositionMapDTO;
// DesignationInfo: DesignationMapDTO;
// GradeInfo: GradeMapDTO;