import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface ILibraryObjective{
    id: number;
    visibility: number;
    perspective_id: number;
    perspective_code: string;
    description: string;
    legend_info: string;
    metric: string;
    weight: number;
    target_type: number;
    target_type_other: string;
    is_strategic: boolean;
    lower_is_better: boolean;
    eligibility_rule: number;
    eligibility_code: string;
    allow_self_rating: string;
    analysis_id: number;
    analysis_det_id: number;
    position_id: number;
    designation_id: number;
    grade_id: number;
    employee_id: number;
    is_active: boolean;
}