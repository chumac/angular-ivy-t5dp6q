import { ISelectOption } from "@nutela/models/core-data";

export interface IThreeSixtyRatingRowData {
  id: number;
  title: string;
  detail: string;
  info: string;
  weight: number;
  emp_comment: string,
  reviewer_comment: string,
  employeeRatings: ISelectOption[];
  reviewerRatings: ISelectOption[];

  empRatingValue: string;
  empRatingText: string;

  revRatingValue: string;
  revRatingText: string;

  errorText: string;
  hasErrors: boolean;
  show: boolean;
}
