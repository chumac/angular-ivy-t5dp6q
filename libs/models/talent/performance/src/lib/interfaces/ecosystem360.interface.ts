import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPlan } from "./plan.interface";

export interface IEcosystem360 {
    id: number;
    plan_id: number;
    employee_id: number;
    role: number;
    role_staff_id: number;
    role_email: string;
    EmployeeInfo: IPersonal;
    RoleStaffInfo: IPersonal;
    PlanningInfo: IPlan;
}