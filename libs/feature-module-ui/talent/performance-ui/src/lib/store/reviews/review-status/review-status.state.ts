import { IObjectiveMaster, IObjective } from "@nutela/models/talent/performance";

export interface IReviewStatusState {
  objectiveMaster: IObjectiveMaster;
  loadingObjectiveMaster: boolean;

  isProcessing: boolean;
  showViewer: boolean;
}

export const initialReviewStatusState: IReviewStatusState = {
  objectiveMaster: null,
  loadingObjectiveMaster: false,

  isProcessing: false,
  showViewer: false
}

