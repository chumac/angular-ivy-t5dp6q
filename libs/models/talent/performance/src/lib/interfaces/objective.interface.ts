import { IObjectiveMaster } from "./objective-master.interface";
import { IPerspective } from "./perspective.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IObjective {
  id: number;
  ObjectiveMasterInfo: IObjectiveMaster;
  EmployeeInfo: IPersonal;
  visibility: number;
  PerspectivesInfo: IPerspective;
  description: string;
  metric: string;
  allow_self_rating: boolean;
  weight: number;
  status: number;
  target: string;
  target_type: number;
  target_type_other: string;
  start_date: Date;
  due_date: Date;
  perc_complete: number;
  prob_of_success: number;
  is_strategic: boolean;
  lower_is_better: boolean;
  approval_status: number;
  is_uploaded: boolean;
  source: number;
}