import { IReviewWorkflowProcess } from "@nutela/models/talent/performance";

export interface IReviewWorkflowProcessState {
  isLoading: boolean;
  data: IReviewWorkflowProcess[];
  resultCommand: number;
}

export const initialReviewWorkflowProcessState: IReviewWorkflowProcessState = {
  isLoading: false,
  data: [],
  resultCommand: 0
}

