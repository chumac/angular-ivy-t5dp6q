import { Action } from '@ngrx/store';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export enum WorkHistoryActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - WORK HISTORY] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - WORK HISTORY] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - WORK HISTORY] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - WORK HISTORY] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - WORK HISTORY] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - WORK HISTORY] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - WORK HISTORY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - WORK HISTORY] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - WORK HISTORY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - WORK HISTORY] Load Awaiting Approval Data Success',



  LOAD_DOCUMENT = '[MY PERSONAL DATA - WORK HISTORY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - WORK HISTORY] Load Document Success',
  CLEAR_DOCUMENT = '[MY PERSONAL DATA - WORK HISTORY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY PERSONAL DATA - WORK HISTORY] Load Inline Document',


  SAVE = '[MY PERSONAL DATA - WORK HISTORY] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - WORK HISTORY] Save Success',

  DELETE_APPROVED_DATA = '[MY PERSONAL DATA - WORK HISTORY] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - WORK HISTORY] Delete Awaiting Approval Data',

  REFRESH_DATA = '[MY PERSONAL DATA - WORK HISTORY] Refresh Data',

}

export class ShowEditorWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.HIDE_EDITOR;
}


export class ShowViewerWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.SHOW_VIEWER;
}

export class HideViewerWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.HIDE_VIEWER;
}


export class ProcessingWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.PROCESSING;
}

export class NotProcessingWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataWorkHistorySuccess implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPreviousEmployer[]) {}
}

export class LoadAwaitingApprovalDataWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataWorkHistorySuccess implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPreviousEmployer[]) {}
}


export class LoadDocumentWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentWorkHistorySuccess implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.CLEAR_DOCUMENT;
}





export class LoadInlineDocumentWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.SAVE;

  constructor(public payload: {data: IPreviousEmployer, recordId: number, editMode: boolean}) {}
}


export class DeleteApprovedDataWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class DeleteAwaitingApprovalDataWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadDataWorkHistory implements Action {
  readonly type = WorkHistoryActionTypes.REFRESH_DATA;
}

export type WorkHistoryActions =
  | ShowEditorWorkHistory
  | HideEditorWorkHistory
  | ShowViewerWorkHistory
  | HideViewerWorkHistory
  | ProcessingWorkHistory
  | NotProcessingWorkHistory
  | LoadApprovedDataWorkHistory
  | LoadApprovedDataWorkHistorySuccess
  | LoadAwaitingApprovalDataWorkHistory
  | LoadAwaitingApprovalDataWorkHistorySuccess
  | LoadDocumentWorkHistory
  | LoadDocumentWorkHistorySuccess
  | ClearDocumentWorkHistory
  | LoadInlineDocumentWorkHistory
  | SaveWorkHistory
  | DeleteApprovedDataWorkHistory
  | DeleteAwaitingApprovalDataWorkHistory
  | LoadDataWorkHistory;
