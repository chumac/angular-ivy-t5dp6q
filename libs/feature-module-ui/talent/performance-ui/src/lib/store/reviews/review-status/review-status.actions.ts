import { Action } from '@ngrx/store';
import { IObjectiveMaster } from '@nutela/models/talent/performance';

export enum ReviewStatusActionTypes {
  SHOW_VIEWER = '[PERFORMANCE - REVIEW STATUS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE - REVIEW STATUS] Hide Viewer',

  PROCESSING = '[PERFORMANCE - REVIEW STATUS] Processing',
  NOT_PROCESSING = '[PERFORMANCE - REVIEW STATUS] Not Processing',

  LOAD_OBJECTIVE_MASTER = '[PERFORMANCE - REVIEW STATUS] Load Objective Master',
  LOAD_OBJECTIVE_MASTER_SUCCESS = '[PERFORMANCE - REVIEW STATUS] Load Objective Master Success',

  LOADING_OBJECTIVE_MASTER = '[PERFORMANCE - REVIEW STATUS] Loading Objective Master',
  NOT_LOADING_OBJECTIVE_MASTER = '[PERFORMANCE - REVIEW STATUS] Not Loading Objective Master',
}

export class ShowViewerReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.SHOW_VIEWER;
}

export class HideViewerReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.HIDE_VIEWER;
}

export class ProcessingReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.PROCESSING;
}

export class NotProcessingReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.NOT_PROCESSING;
}

export class LoadObjectiveMasterReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.LOAD_OBJECTIVE_MASTER;

  constructor(public payload: { selectedPlan: number}) {}
}

export class LoadObjectiveMasterReviewStatusSuccess implements Action {
  readonly type = ReviewStatusActionTypes.LOAD_OBJECTIVE_MASTER_SUCCESS;

  constructor(public payload: IObjectiveMaster) {}
}

export class LoadingObjectiveMasterReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.LOADING_OBJECTIVE_MASTER;
}

export class NotLoadingObjectiveMasterReviewStatus implements Action {
  readonly type = ReviewStatusActionTypes.NOT_LOADING_OBJECTIVE_MASTER;
}

export type ReviewStatusActions =
  | ShowViewerReviewStatus
  | HideViewerReviewStatus
  | ProcessingReviewStatus
  | NotProcessingReviewStatus
  | LoadObjectiveMasterReviewStatus
  | LoadObjectiveMasterReviewStatusSuccess
  | LoadingObjectiveMasterReviewStatus
  | NotLoadingObjectiveMasterReviewStatus;
