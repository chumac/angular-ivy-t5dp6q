
import { IObjectiveDto } from "./objective-dto.interface";
import { IPerspective } from "./perspective.interface";

export interface IReviewKPIPage {
  id: number;
  objective_id: number;
  plan_id: number;
  employee_id: number;
  PerspectiveInfo: IPerspective;
  description: string;
  metric: string;
  weight: number;
  target: string;
  target_type: number;
  start_date: Date;
  due_date: Date;
  perc_complete: number;
  lower_is_better: boolean;
  req_rating: boolean;
  req_comments: boolean;
  rating_id: number;
  emp_comments: string;
  emp_rating_value: number;
  emp_rating_text: string;
  emp_transaction_date: Date;
  status: number;
  error_comment: string;
  has_issues: boolean;
  lm_comments: string;
  lm_rating_text: string;
  lm_rating_value: number;
  lm_rating_id: number;
  legend_info: string;
  allow_self_rating?: boolean;
  ObjectiveInfo?:IObjectiveDto;
}
