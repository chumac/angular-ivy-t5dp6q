import { IPlan } from "./plan.interface";
import { IContractPage } from "./contract-page.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface IReviewContractPage {
  id: number;
  PlanningDTOs: IPlan;
  ContractPageDTO: IContractPage;
  employeeInfo: IPersonal;
  has_agreed: boolean;
  status: number;
}
