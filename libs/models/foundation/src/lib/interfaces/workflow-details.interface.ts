import { IWorkDefinition } from "./work-definition.interface";

export interface IWorkDetails {
    id:number;
    wflow_id?: number;
    wfstep?:number;
    sendto_type?:any;
    sendto_type_id?:number;
    spec_individual:string;
    spec_position?:number;
    send_to_role:string;
    can_escalate:boolean;
    escalate_hour:number;
    use_enterprise_structure:boolean;
    allow_manual_nextStep: boolean;
    spec_position_basedon_sender: boolean;
    w_sys_rule: string;
    sys_rule: string;
    WorkflowInfo:IWorkDefinition;

}
