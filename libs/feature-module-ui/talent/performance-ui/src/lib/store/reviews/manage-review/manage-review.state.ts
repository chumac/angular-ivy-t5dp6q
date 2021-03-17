import { IObjectiveMaster, IObjective } from "@nutela/models/talent/performance";

export interface IManageReviewState {
  objectiveMaster: IObjectiveMaster;
  loadingObjectiveMaster: boolean;

  objectives: IObjective[];
  loadingObjectives: boolean;

  preScoredObjectives: IObjective[];

  isProcessing: boolean;
  showViewer: boolean;
}

export const initialManageReviewState: IManageReviewState = {
  objectiveMaster: null,
  loadingObjectiveMaster: false,

  objectives: [],
  loadingObjectives: false,

  preScoredObjectives: [],

  isProcessing: false,
  showViewer: false
}

