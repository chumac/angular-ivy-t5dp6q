import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IObjectiveMaster } from "./objective-master.interface";

export interface IFeedbackObjectiveDetail{
    id?: number;
    masterInfo?: IObjectiveMaster;
    comment_title?: string;
    comment_role?: number;
    comment_value?: number;
    lm_comment_value?: string;
    comment_created_by?: Date;
    employeeInfo?: IPersonal;
    comment_date?: Date;

    editMode?: boolean;
    emp_comment_err?: string;
}
