import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPlan } from "./plan.interface";

export interface ILineManager {
    id: number;
    employee_id: number;
    line_manager: number;
    score_percent: number;
    role: number;
    plan_id: number;
    employeeinfo: IPersonal;
    LineManagerinfo: IPersonal;
    PlanInfo: IPlan;

}