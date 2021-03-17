import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPerspective } from "./perspective.interface";
import { IObjectiveMasterInfo } from "./objective-master-info.interface";

export interface IObjectiveMasterDto{
    EmployeeInfo: IPersonal;
    ObjectiveMasterInfo: IObjectiveMasterInfo;
    PlanInfo: IPlan;
    PerspectivesInfo: IPerspective;
    allow_self_rating: boolean;
    approval_status: number;
    description: string;
    legend_info: string;
    due_date: Date;
    id: number;
    is_strategic: boolean;
    is_uploaded: boolean;
    lower_is_better: boolean;
    metric: string;
    perc_complete: number;
    prob_of_success: number;
    source: number;
    start_date: Date;
    status: number;
    target: string;
    target_type: number;
    target_type_other: string;
    visibility: number;
    weight: number;
    classification_key?: string;
    session_note?:string;
    session_description?: string;
}