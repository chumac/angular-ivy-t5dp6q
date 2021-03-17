import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPerspective } from "./perspective.interface";

export interface IObjectiveDto{
    id: number;
    code: number;
    plan_id: number;
	plan_code: string;
    staff_number: string;
    perspective_id: number;
    perspective_code: string;
    description: string; 
    legend_info: string;
    metric: string;
    allow_self_rating: string;
    weight: number;
    target: string;
    target_type: number;
    target_type_other: string;
    start_date: string;
    due_date: string;
    is_strategic: boolean;
    lower_is_better: boolean;
    PlanInfo: IPlan;
    EmployeeInfo: IPersonal;
    PerspectiveInfo: IPerspective;
    perc_complete: Number;
    prob_of_success: Number;
    is_uploaded: boolean;
    source: number;
    file_name: string;


    period_start_date: string;
    period_end_date: string;
    is_current: boolean;
    review_start_date: string;
    review_end_date: string;
    is_active: boolean;
    use_360: boolean;
    objective_start_date: string;
    objective_end_date: string;
    business_rule: string;
    is_published: boolean;
    req_ratings: string;
    req_comments: string;
}
