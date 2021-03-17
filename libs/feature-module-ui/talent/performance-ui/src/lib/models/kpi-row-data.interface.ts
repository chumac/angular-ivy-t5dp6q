import { IObjectiveDto } from "@nutela/models/talent/performance";

export interface IKPIRowData {
  id: number;
  objectiveId: number;
  objective: string;
  measure: string;
  target: string;
  weight: number;
  dueDate: Date;
  trendRate: number;
  trendLowerIsBetter: boolean;
  ratingIsRequired: boolean;
  commentIsRequired: boolean;
  ratingId: number;
  comment: string;
  ratingValue: number;
  ratingText: string;
  errorText: string;
  hasErrors: boolean;
  perspectiveId: number;
  show: boolean;
  lmComment: string;
  lmRatingText: string;
  lmRatingValue: number;
  lmRatingId: number;
  legend_info: string;
  allowSelfRating?: boolean;
  ObjectiveInfo?:IObjectiveDto;
}
