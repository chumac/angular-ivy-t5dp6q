import { Action } from '@ngrx/store';
import { IObjectiveMaster, IObjective } from '@nutela/models/talent/performance';

export enum ManageReviewActionTypes {
  SHOW_VIEWER = '[PERFORMANCE - MANAGE REVIEW] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE - MANAGE REVIEW] Hide Viewer',

  PROCESSING = '[PERFORMANCE - MANAGE REVIEW] Processing',
  NOT_PROCESSING = '[PERFORMANCE - MANAGE REVIEW] Not Processing',

  LOAD_OBJECTIVE_MASTER = '[PERFORMANCE - MANAGE REVIEW] Load Objective Master',
  LOAD_OBJECTIVE_MASTER_SUCCESS = '[PERFORMANCE - MANAGE REVIEW] Load Objective Master Success',

  LOADING_OBJECTIVE_MASTER = '[PERFORMANCE - MANAGE REVIEW] Loading Objective Master',
  NOT_LOADING_OBJECTIVE_MASTER = '[PERFORMANCE - MANAGE REVIEW] Not Loading Objective Master',


  LOAD_OBJECTIVES = '[PERFORMANCE - MANAGE REVIEW] Load Objectives',
  LOAD_OBJECTIVES_SUCCESS = '[PERFORMANCE - MANAGE REVIEW] Load Objectives Success',

  LOAD_PRESCORED_OBJECTIVES = '[PERFORMANCE - MANAGE REVIEW] Load Prescored Objectives',
  LOAD_PRESCORED_OBJECTIVES_SUCCESS = '[PERFORMANCE - MANAGE REVIEW] Load Prescored Objectives Success',

  LOADING_OBJECTIVES = '[PERFORMANCE - MANAGE REVIEW] Loading Objectives',
  NOT_LOADING_OBJECTIVES = '[PERFORMANCE - MANAGE REVIEW] Not Loading Objectives',

  INITIATE_REVIEW = '[PERFORMANCE -APPRAISAL FORMS] Initiate Review'
}

export class ShowViewerManageReview implements Action {
  readonly type = ManageReviewActionTypes.SHOW_VIEWER;
}

export class HideViewerManageReview implements Action {
  readonly type = ManageReviewActionTypes.HIDE_VIEWER;
}

export class ProcessingManageReview implements Action {
  readonly type = ManageReviewActionTypes.PROCESSING;
}

export class NotProcessingManageReview implements Action {
  readonly type = ManageReviewActionTypes.NOT_PROCESSING;
}



export class LoadObjectiveMasterManageReview implements Action {
  readonly type = ManageReviewActionTypes.LOAD_OBJECTIVE_MASTER;

  constructor(public payload: { selectedPlan: number}) {}
}

export class LoadObjectiveMasterManageReviewSuccess implements Action {
  readonly type = ManageReviewActionTypes.LOAD_OBJECTIVE_MASTER_SUCCESS;

  constructor(public payload: IObjectiveMaster) {}
}

export class LoadingObjectiveMasterManageReview implements Action {
  readonly type = ManageReviewActionTypes.LOADING_OBJECTIVE_MASTER;
}

export class NotLoadingObjectiveMasterManageReview implements Action {
  readonly type = ManageReviewActionTypes.NOT_LOADING_OBJECTIVE_MASTER;
}


export class LoadObjectivesManageReview implements Action {
  readonly type = ManageReviewActionTypes.LOAD_OBJECTIVES;

  constructor(public payload: { selectedPlan: number}) {}
}

export class LoadObjectivesManageReviewSuccess implements Action {
  readonly type = ManageReviewActionTypes.LOAD_OBJECTIVES_SUCCESS;

  constructor(public payload: IObjective[]) {}
}

export class LoadPreScoredObjectivesManageReview implements Action {
  readonly type = ManageReviewActionTypes.LOAD_PRESCORED_OBJECTIVES;

  constructor(public payload: { selectedPlan: number}) {}
}

export class LoadPreScoredObjectivesManageReviewSuccess implements Action {
  readonly type = ManageReviewActionTypes.LOAD_PRESCORED_OBJECTIVES_SUCCESS;

  constructor(public payload: IObjective[]) {}
}

export class LoadingObjectivesManageReview implements Action {
  readonly type = ManageReviewActionTypes.LOADING_OBJECTIVES;
}

export class NotLoadingObjectivesManageReview implements Action {
  readonly type = ManageReviewActionTypes.NOT_LOADING_OBJECTIVES;
}

export class InitiateReviewManageReview implements Action {
  readonly type = ManageReviewActionTypes.INITIATE_REVIEW;

  constructor(public payload: { selectedPlan: number}) {}
}

export type ManageReviewActions =
  | ShowViewerManageReview
  | HideViewerManageReview
  | ProcessingManageReview
  | NotProcessingManageReview
  | LoadObjectiveMasterManageReview
  | LoadObjectiveMasterManageReviewSuccess
  | LoadingObjectiveMasterManageReview
  | NotLoadingObjectiveMasterManageReview
  | LoadObjectivesManageReview
  | LoadObjectivesManageReviewSuccess
  | LoadingObjectivesManageReview
  | NotLoadingObjectivesManageReview
  | InitiateReviewManageReview
  | LoadPreScoredObjectivesManageReview
  | LoadPreScoredObjectivesManageReviewSuccess;
