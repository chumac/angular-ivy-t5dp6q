import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IObjectiveMaster } from "./objective-master.interface";
import { IObjectiveMasterDto } from "./objective-master-dto.interface";

export interface IFeedbackObjectiveMaster{
    description?: string;
    due_date?: Date;
    edit_objective?: boolean;
    emp_comment?: string;
    emp_submit_date?: Date;
    LineManagerInfo?: IPersonal;
    employee_id?: number;
    feedback_period_end?: Date;
    feedback_period_start?: Date;
    id?: number;
    lm_comment?: string;
    lm_feedback?: string;
    lm_submit_date?: Date;
    masterInfo?: IObjectiveMaster;
    metric?: string;
    objectiveInfo?: IObjectiveMasterDto;
    period_update?: string;
    planInfo?: IPlan;
    start_date?: Date;
    status?: number;
    target?: string;
    usr_feedback?: string;
    weight?: string;

    description_backup?: string;
    editMode?:boolean;
    emp_comment_err?: string;
    lm_comment_err?: string;
    lm_feedback_err?: string;
    emp_feedback_err?: string;
      
}
