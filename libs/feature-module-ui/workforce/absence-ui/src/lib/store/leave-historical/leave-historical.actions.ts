import { Action } from '@ngrx/store';
import { ILeaveEntitlement, ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveHistoricalActionTypes {
  SHOW_EDITOR = '[LEAVE HISTORICAL] Show Editor',
  HIDE_EDITOR = '[LEAVE HISTORICAL] Hide Editor',

  PROCESSING = '[LEAVE HISTORICAL] Processing',
  NOT_PROCESSING = '[LEAVE HISTORICAL] Not Processing',

  SAVE = '[LEAVE HISTORICAL] Save',
  SAVE_SUCCESS = '[LEAVE HISTORICAL] Save Success',
  SAVE_FAILURE = '[LEAVE HISTORICAL] Save Failure',
}

export class ShowEditorLeaveHistorical implements Action {
  readonly type = LeaveHistoricalActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveHistorical implements Action {
  readonly type = LeaveHistoricalActionTypes.HIDE_EDITOR;
}

export class ProcessingLeaveHistorical implements Action {
  readonly type = LeaveHistoricalActionTypes.PROCESSING;
}

export class NotProcessingLeaveHistorical implements Action {
  readonly type = LeaveHistoricalActionTypes.NOT_PROCESSING;
}


export class SaveLeaveHistorical implements Action {
  readonly type = LeaveHistoricalActionTypes.SAVE; 

  constructor(public payload: { leaveData: ILeaveDailyData }) {}
}

export class SaveLeaveHistoricalSuccess implements Action {
  readonly type = LeaveHistoricalActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveHistoricalFailure implements Action {
  readonly type =LeaveHistoricalActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export type LeaveHistoricalActions =
  | ShowEditorLeaveHistorical
  | HideEditorLeaveHistorical
  | ProcessingLeaveHistorical
  | NotProcessingLeaveHistorical
  | SaveLeaveHistoricalSuccess  
  | SaveLeaveHistoricalFailure;
