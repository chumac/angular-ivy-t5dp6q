import { IPerspective } from "@nutela/models/talent/performance";

export interface ISubscriptionRowData {
  id: number;
  itemId: number;
  planId: number;
  subDefId: number;
  FormBuilderInfo: IPerspective;
  widget_guid: string;
  subscription_type: number;


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
}
