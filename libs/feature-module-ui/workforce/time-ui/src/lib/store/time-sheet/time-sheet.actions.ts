import { Action } from '@ngrx/store';

import { ITimeSheetData, IDayStreamData, IWorkStreamData, ITimeSheetProject } from '@nutela/models/workforce/time-sheet';

export enum TimeSheetActionTypes {
  SHOW_EDITOR = '[TIME SHEET] Show Editor',
  HIDE_EDITOR = '[TIME SHEET] Hide Editor',

  SHOW_VIEWER = '[TIME SHEET] Show Viewer',
  HIDE_VIEWER = '[TIME SHEET] Hide Viewer',

  PROCESSING = '[TIME SHEET] Processing',
  NOT_PROCESSING = '[TIME SHEET] Not Processing',

  LOADING_TIME_SHEET = '[TIME SHEET] Loading',
  NOT_LOADING_TIME_SHEET = '[TIME SHEET] Not Loading',

  LOAD_APPROVED_DATA = '[TIME SHEET] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[TIME SHEET] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[TIME SHEET] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[TIME SHEET] Load Awaiting Approval Data Success',

  SUBMIT_TIME_SHEET = '[TIME SHEET] Submit Time Sheet',
  SUBMIT_RECALL_TIME_SHEET = '[TIME SHEET] Submit Recall Time Sheet',

  CREATE_TIME_SHEET = '[TIME SHEET] Create Time Sheet',

  RESET_TIME_SHEET = '[TIME SHEET] Reset Time Sheet',

  DELETE_TIME_SHEET = '[TIME SHEET] Delete Time Sheet',

  ARCHIVE_TIME_SHEET = '[TIME SHEET] Archive Time Sheet',

  RECALL_TIME_SHEET = '[TIME SHEET] Recall Time Sheet',

  LOAD_DAY_STREAM_DATA = '[TIME SHEET] Load Day Stream Data',
  LOAD_DAY_STREAM_DATA_SUCCESS = '[TIME SHEET] Load  Day Stream Data Success',
  CLEAR_DAY_STREAM_DATA = '[TIME SHEET] Clear Day Stream Data',

  LOADING_DAY_STREAM = '[TIME SHEET] Loading Day Stream',
  NOT_LOADING_DAY_STREAM = '[TIME SHEET] Not Loading Day Stream',

  LOADING_WORK_STREAM = '[TIME SHEET] Loading Work Stream',
  NOT_LOADING_WORK_STREAM = '[TIME SHEET] Not Loading Work Stream',

  LOAD_WORK_STREAM_DATA = '[TIME SHEET] Load Work Stream Data',
  LOAD_WORK_STREAM_DATA_SUCCESS = '[TIME SHEET] Load Work Stream Data Success',

  
  LOAD_PROJECTS_BY_ID = '[TIME SHEET] Loading Projects By Id',
  LOAD_PROJECTS_BY_ID_SUCCESS = '[TIME SHEET] Loading Projects By Id Success',

  SUBMIT_WORK_STREAM = '[TIME SHEET] Submit Work Stream',

  DELETE_WORK_STREAM = '[TIME SHEET] Delete Work Stream',

}

export class ShowEditorTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.SHOW_EDITOR;
}

export class HideEditorTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.HIDE_EDITOR;
}


export class ShowViewerTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.SHOW_VIEWER;
}

export class HideViewerTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.HIDE_VIEWER;
}


export class ProcessingTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.PROCESSING;
}

export class NotProcessingTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.NOT_PROCESSING;
}

export class LoadingTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.LOADING_TIME_SHEET;
}

export class NotLoadingTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.NOT_LOADING_TIME_SHEET;
}

export class LoadApprovedDataTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataTimeSheetSuccess implements Action {
  readonly type = TimeSheetActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ITimeSheetData[]) {}
}

export class LoadAwaitingApprovalDataTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataTimeSheetSuccess implements Action {
  readonly type = TimeSheetActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ITimeSheetData[]) {}
}

export class LoadTimeSheetProjectsById implements Action {
  readonly type = TimeSheetActionTypes.LOAD_PROJECTS_BY_ID;
  constructor(public payload: { recordId: number}) {}
}

export class LoadTimeSheetProjectsByIdSuccess implements Action {
  readonly type = TimeSheetActionTypes.LOAD_PROJECTS_BY_ID_SUCCESS;
  constructor(public payload: ITimeSheetProject[]) {}
}

export class SubmitTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.SUBMIT_TIME_SHEET;

  constructor(public payload: { recordId: number }) {}
}

export class SubmitRecallTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.SUBMIT_RECALL_TIME_SHEET;

  constructor(public payload: { data: any; recordId: number }) {}
}

export class CreateTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.CREATE_TIME_SHEET;

  constructor(public payload: { end_date: Date, description : string }) {}
}

export class ResetTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.RESET_TIME_SHEET;

  constructor(public payload: { recordId: number }) {}
}

export class DeleteTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.DELETE_TIME_SHEET;

  constructor(public payload: { recordId: number }) {}
}

export class ArchiveTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.ARCHIVE_TIME_SHEET;

  constructor(public payload: { recordId: number }) {}
}

export class RecallTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.RECALL_TIME_SHEET;

  constructor(public payload: { recordId: number }) {}
}

export class LoadDayStreamDataTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.LOAD_DAY_STREAM_DATA;

  constructor(public payload: number) {}
}

export class LoadDayStreamDataTimeSheetSuccess implements Action {
  readonly type = TimeSheetActionTypes.LOAD_DAY_STREAM_DATA_SUCCESS;

  constructor(public payload: IDayStreamData[]) {}
}

export class ClearDayStreamDataTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.CLEAR_DAY_STREAM_DATA;

  constructor() {}
}

export class LoadingDayStream implements Action {
  readonly type = TimeSheetActionTypes.LOADING_DAY_STREAM;
}

export class NotLoadingDayStream implements Action {
  readonly type = TimeSheetActionTypes.NOT_LOADING_DAY_STREAM;
}

export class LoadingWorkStream implements Action {
  readonly type = TimeSheetActionTypes.LOADING_WORK_STREAM;

  constructor(public payload: number) {}
}

export class NotLoadingWorkStream implements Action {
  readonly type = TimeSheetActionTypes.NOT_LOADING_WORK_STREAM;

  constructor(public payload: number) {}
}

export class LoadWorkStreamDataTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.LOAD_WORK_STREAM_DATA;

  constructor(public payload: number) {}
}

export class LoadWorkStreamDataTimeSheetSuccess implements Action {
  readonly type = TimeSheetActionTypes.LOAD_WORK_STREAM_DATA_SUCCESS;

  constructor(public payload: {dayId: number, workStreamData: IWorkStreamData[]}) {}
}

export class SubmitWorkStream implements Action {
  readonly type = TimeSheetActionTypes.SUBMIT_WORK_STREAM;

  constructor(public payload: { recordId: number, timeSheetId: number }) {}
}

export class DeleteWorkStreamTimeSheet implements Action {
  readonly type = TimeSheetActionTypes.DELETE_WORK_STREAM;

  constructor(public payload: { recordId: number, dayId: number }) {}
}

export type TimeSheetActions =
  | ShowEditorTimeSheet
  | HideEditorTimeSheet
  | ShowViewerTimeSheet
  | HideViewerTimeSheet
  | ProcessingTimeSheet
  | NotProcessingTimeSheet
  | LoadingTimeSheet
  | NotLoadingTimeSheet
  | LoadApprovedDataTimeSheet
  | LoadApprovedDataTimeSheetSuccess
  | LoadAwaitingApprovalDataTimeSheet
  | LoadAwaitingApprovalDataTimeSheetSuccess
  | LoadTimeSheetProjectsById
  | LoadTimeSheetProjectsByIdSuccess
  | CreateTimeSheet
  | LoadDayStreamDataTimeSheet
  | LoadDayStreamDataTimeSheetSuccess
  | ResetTimeSheet
  | DeleteTimeSheet
  | ArchiveTimeSheet
  | SubmitTimeSheet
  | SubmitRecallTimeSheet
  | RecallTimeSheet
  | LoadingDayStream
  | NotLoadingDayStream
  | LoadingWorkStream
  | NotLoadingWorkStream
  | ClearDayStreamDataTimeSheet
  | LoadWorkStreamDataTimeSheet
  | LoadWorkStreamDataTimeSheetSuccess
  | SubmitWorkStream
  | DeleteWorkStreamTimeSheet;
