
import { IPlan } from "./plan.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IPerspective } from "./perspective.interface";
import { IFormBuilder } from "./form-builder.interface";

export interface IEmployeeReviewForm {
  id: number,
  EmployeeInfo: IPersonal,
  ReviewerInfo : IPersonal,
  PerspectiveFilterInfo: IPerspective,
  asset_type: number,
  weight: number,
  status: number,
  score: number,
  weighted_score: number,
  AssetInfo: IFormBuilder,
  PlanningInfo: IPlan,
  page_rank: number,
  reviewer_role: number,
  reviewer_id: number,
  perm_role: number,
}
