import { IWorkflowDefinition } from "./workflow-definition.interface";

export interface IWorkflowStep {
    id: number;
    workflow_id: number;
    step: number;
    role: number;
    sys_rule: string;
    default_route: number;
    ReviewWorkflowDefInfo: IWorkflowDefinition;
}