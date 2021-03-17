import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IReviewPeer {
  id: number;
  PlanningInfo: IPlan;
  EmployeeInfo: IPersonal;
  role: number;
  RoleStaffInfo: IPersonal;
  role_email: string;
  is_anonymous: boolean;
}
