import { Action } from '@ngrx/store';
import { IResponse } from 'libs/models/workforce/exit/src/lib/interfaces';

export enum QueueActionTypes {

  LOADING = '[MY EXIT - QUEUE] Loading',
  NOT_LOADING = '[MY EXIT - QUEUE] Not Loading',

  PROCESSING = '[MY EXIT - QUEUE] Processing',
  NOT_PROCESSING = '[MY EXIT - QUEUE] Not Processing',

  LOAD_DATA_MY_EXIT_RESPONSE_QUEUE = '[MY EXIT - QUEUE] Load Data My Queue',
  LOAD_DATA_MY_EXIT_RESPONSE_QUEUE_SUCCESS = '[MY EXIT - QUEUE] Load Data My Queue Success',

  LOAD_DATA_INTERVIEW_URL = '[MY EXIT - QUEUE] Load Data Interview Url',
  LOAD_DATA_INTERVIEW_URL_SUCCESS = '[MY EXIT - QUEUE] Load Data Interview Url Success',

  SAVE_MY_RESPONSE = '[MY EXIT - QUEUE] Save My Response',
  SAVE_TEAM_RESPONSE = '[MY EXIT - QUEUE] Save Team Response Success'
}


export class ProcessingQueueData implements Action {
  readonly type = QueueActionTypes.PROCESSING;
}

export class NotProcessingQueueData implements Action {
  readonly type = QueueActionTypes.NOT_PROCESSING;
}

export class LoadingQueueData implements Action {
  readonly type = QueueActionTypes.LOADING;
}

export class NotLoadingQueueData implements Action {
  readonly type = QueueActionTypes.NOT_LOADING;
}

export class LoadDataMyExitResponseQueue implements Action {
  readonly type = QueueActionTypes.LOAD_DATA_MY_EXIT_RESPONSE_QUEUE;
}

export class LoadDataMyExitResponseQueueSuccess implements Action {
  readonly type = QueueActionTypes.LOAD_DATA_MY_EXIT_RESPONSE_QUEUE_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadDataInterviewUrl implements Action {
  readonly type = QueueActionTypes.LOAD_DATA_INTERVIEW_URL;
  constructor(public payload: {resignationId: number}) { }
}

export class LoadDataInterviewUrlSuccess implements Action {
  readonly type = QueueActionTypes.LOAD_DATA_INTERVIEW_URL_SUCCESS;

  constructor(public payload: string) { }
}

export class SaveMyResponse implements Action {
  readonly type = QueueActionTypes.SAVE_MY_RESPONSE;

  constructor(public payload: { letterId: number }) { }
}

export class SaveTeamResponse implements Action {
  readonly type = QueueActionTypes.SAVE_TEAM_RESPONSE;

  constructor(public payload: IResponse[]) { }
}


export type QueueActions =

  | ProcessingQueueData
  | NotProcessingQueueData
  | LoadingQueueData
  | NotLoadingQueueData
  | LoadDataMyExitResponseQueue
  | LoadDataMyExitResponseQueueSuccess
  | LoadDataInterviewUrl
  | LoadDataInterviewUrlSuccess
  | SaveMyResponse
  | SaveTeamResponse;
