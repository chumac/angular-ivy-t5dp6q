import { Action } from '@ngrx/store';
import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export enum ModerationQueueActionTypes {
  LOAD_MODERATION_QUEUE = '[PERFORMANCE - MODERATION QUEUE] Load Moderation Queue',
  LOAD_MODERATION_QUEUE_SUCCESS = '[PERFORMANCE - MODERATION QUEUE] Load Moderation Queue Success'
}

export class LoadDataModerationQueue implements Action {
  readonly type = ModerationQueueActionTypes.LOAD_MODERATION_QUEUE;

  constructor(public payload: number) {}
}

export class LoadDataModerationQueueSuccess implements Action {
  readonly type = ModerationQueueActionTypes.LOAD_MODERATION_QUEUE_SUCCESS;

  constructor(public payload: IReviewWorkflowProcess[]) {}
}

export type ModerationQueueActions = LoadDataModerationQueue | LoadDataModerationQueueSuccess;
