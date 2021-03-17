import { Action } from '@ngrx/store';
import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export enum HRQueueActionTypes {
  LOAD_HR_QUEUE = '[PERFORMANCE - HR QUEUE] Load HR Queue',
  LOAD_HR_QUEUE_SUCCESS = '[PERFORMANCE - HR QUEUE] Load HR Queue Success'
}

export class LoadDataHRQueue implements Action {
  readonly type = HRQueueActionTypes.LOAD_HR_QUEUE;

  constructor(public payload: number) {}
}

export class LoadDataHRQueueSuccess implements Action {
  readonly type = HRQueueActionTypes.LOAD_HR_QUEUE_SUCCESS;

  constructor(public payload: IReviewWorkflowProcess[]) {}
}

export type HRQueueActions = LoadDataHRQueue | LoadDataHRQueueSuccess;
