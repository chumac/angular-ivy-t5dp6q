import { IEmployeeReviewForm, IReviewWorkflowProcess } from "@nutela/models/talent/performance";

export interface IReviewPageParameter {
  assetId: number,
  pageId: number;
  role: number;
  permission: number;
  reviewerId: number;
  reviewForm: IEmployeeReviewForm;
  reviewForms?: IEmployeeReviewForm[];
  status: number;
  reviewWorkflowProcess: IReviewWorkflowProcess;
  activePersonnelDataSource?: any;
  useDirectObjectiveValueForPerformance: boolean;
  useDirectRatingValueForPerformance: boolean;
}
