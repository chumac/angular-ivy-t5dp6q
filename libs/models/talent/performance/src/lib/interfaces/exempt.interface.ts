import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IExempt {
    id?: number;
    employee_id?: number;
    is_specific_plan_exempt?: boolean;
    plan_id?: number;
    PlanningInfo?: IPlan;
    EmployeeInfo?: IPersonal;
    emp_fullname?: string;
}