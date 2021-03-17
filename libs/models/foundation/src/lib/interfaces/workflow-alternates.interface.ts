import { IWorkflowMap } from "./workflow-map.interface";

export interface IWorkflowAlternates{
    ruletype: string;
    analysis_id: number;
    analysis_det_id :number;
    grade_id: number;
    employee_id:number;
    for_employee_id:number;
    org_id:number;
    msg_source:string;
    w_flow_id:number;
    WorkflowInfo:IWorkflowMap;
    AnalysisDetailsInfo:IAnalysisDetailsInfo
}

export interface IAnalysisDetailsInfo{
    analysis_id: number;
    analysis_det_id :number;
    description:string;
}
