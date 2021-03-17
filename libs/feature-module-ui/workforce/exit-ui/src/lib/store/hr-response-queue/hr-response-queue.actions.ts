import { Action } from '@ngrx/store';
import { IResponse } from 'libs/models/workforce/exit/src/lib/interfaces';

export enum HrResponseQueueActionTypes {

  LOADING = '[HR EXIT - QUEUE] Loading',
  NOT_LOADING = '[HR EXIT - QUEUE] Not Loading',

  PROCESSING = '[HR EXIT - QUEUE] Processing',
  NOT_PROCESSING = '[HR EXIT - QUEUE] Not Processing',

  LOAD_DATA_HR_RESPONSE_QUEUE = '[HR EXIT - QUEUE] Load Data HR Response Queue',
  LOAD_DATA_HR_RESPONSE_QUEUE_SUCCESS = '[HR EXIT - QUEUE] Load Data HR Response Queue Success',

  LOAD_DATA_INTERVIEW_URL = '[HR EXIT - QUEUE] Load Data Interview Url',
  LOAD_DATA_INTERVIEW_URL_SUCCESS = '[HR EXIT - QUEUE] Load Data Interview Url Success',

  SAVE_MY_RESPONSE = '[HR EXIT - QUEUE] Save My Response',
  SAVE_TEAM_RESPONSE = '[HR EXIT - QUEUE] Save Team Response Success'
}


export class ProcessingQueueData implements Action {
  readonly type = HrResponseQueueActionTypes.PROCESSING;
}

export class NotProcessingQueueData implements Action {
  readonly type = HrResponseQueueActionTypes.NOT_PROCESSING;
}

export class LoadingQueueData implements Action {
  readonly type = HrResponseQueueActionTypes.LOADING;
}

export class NotLoadingQueueData implements Action {
  readonly type = HrResponseQueueActionTypes.NOT_LOADING;
}

export class LoadDataHrResponseQueue implements Action {
  readonly type = HrResponseQueueActionTypes.LOAD_DATA_HR_RESPONSE_QUEUE;
}

export class LoadDataHrResponseQueueSuccess implements Action {
  readonly type = HrResponseQueueActionTypes.LOAD_DATA_HR_RESPONSE_QUEUE_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadDataInterviewUrl implements Action {
  readonly type = HrResponseQueueActionTypes.LOAD_DATA_INTERVIEW_URL;
  constructor(public payload: {resignationId: number}) { }
}

export class LoadDataInterviewUrlSuccess implements Action {
  readonly type = HrResponseQueueActionTypes.LOAD_DATA_INTERVIEW_URL_SUCCESS;

  constructor(public payload: string) { }
}

export class SaveMyResponse implements Action {
  readonly type = HrResponseQueueActionTypes.SAVE_MY_RESPONSE;

  constructor(public payload: { letterId: number }) { }
}

export class SaveTeamResponse implements Action {
  readonly type = HrResponseQueueActionTypes.SAVE_TEAM_RESPONSE;

  constructor(public payload: IResponse[]) { }
}


export type HrResponseQueueActions =

  | ProcessingQueueData
  | NotProcessingQueueData
  | LoadingQueueData
  | NotLoadingQueueData
  | LoadDataHrResponseQueue
  | LoadDataHrResponseQueueSuccess
  | LoadDataInterviewUrl
  | LoadDataInterviewUrlSuccess
  | SaveMyResponse
  | SaveTeamResponse;
