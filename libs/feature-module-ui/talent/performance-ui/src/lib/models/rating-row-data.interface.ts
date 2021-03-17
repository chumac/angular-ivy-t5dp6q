import { ISelectOption } from "@nutela/models/core-data";
import { IObjectiveRating } from "@nutela/models/talent/performance";

export interface IRatingRowData {
  id: number;
  title: string;
  detail: string;
  info: string;
  weight: number;
  emp_comment: string;
  reviewer_comment: string;

  empRating?: IObjectiveRating;
  reviewrRatings?: IObjectiveRating;

  employeeRatings: ISelectOption[];
  reviewerRatings: ISelectOption[];

  empRatingValue: string;
  empRatingText: string;

  revRatingValue: string;
  revRatingText: string;

  errorText: string;
  hasErrors: boolean;
  show: boolean;
  allowSelfRating?: boolean;
}
