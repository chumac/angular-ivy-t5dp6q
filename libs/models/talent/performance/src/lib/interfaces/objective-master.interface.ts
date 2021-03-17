import { IPlan } from "./plan.interface";
import { ILocation, IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IObjectiveMaster{
    EmployeeInfo: IPersonal;
    employeeInfo: IPersonal;
    PlanInfo: IPlan;
    ReportToInfo: IPersonal;
    approval_status: number;
    description: string;
    id: number;
    status: number;

    AltPlanInfo?: IPlan;
    LocationInfo?: ILocation;
    classification_key?: string;
    session_note?: string;
    session_description?: string;
}