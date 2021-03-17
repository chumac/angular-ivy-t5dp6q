import { Action } from '@ngrx/store';
import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export enum TeamReviewActionTypes {
  LOADING_TEAM_REVIEW = '[PERFORMANCE - TEAM REVIEW] Loading Team Review',
  NOT_LOADING_TEAM_REVIEW = '[PERFORMANCE - TEAM REVIEW] Not Loading Team Review',

  LOAD_TEAM_REVIEW = '[PERFORMANCE - TEAM REVIEW] Load Team Review',
  LOAD_TEAM_REVIEW_SUCCESS = '[PERFORMANCE - TEAM REVIEW] Load Team Review Success'
}

export class LoadDataTeamReview implements Action {
  readonly type = TeamReviewActionTypes.LOAD_TEAM_REVIEW;

  constructor(public payload: number) {}
}

export class LoadingDataTeamReview implements Action {
  readonly type = TeamReviewActionTypes.LOADING_TEAM_REVIEW;
}

export class NotLoadingDataTeamReview implements Action {
  readonly type = TeamReviewActionTypes.NOT_LOADING_TEAM_REVIEW;
}

export class LoadDataTeamReviewSuccess implements Action {
  readonly type = TeamReviewActionTypes.LOAD_TEAM_REVIEW_SUCCESS;

  constructor(public payload: IReviewWorkflowProcess[]) {}
}

export type TeamReviewActions =
  LoadDataTeamReview
| LoadDataTeamReviewSuccess
| NotLoadingDataTeamReview
| LoadingDataTeamReview
