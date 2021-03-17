import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IObjectiveMasterInfo{
    EmployeeInfo: IPersonal;
    PlanInfo: IPlan;
    ReportToInfo: string;
    approval_status: number;
    description: string;
    id: number;
    status: number;
}