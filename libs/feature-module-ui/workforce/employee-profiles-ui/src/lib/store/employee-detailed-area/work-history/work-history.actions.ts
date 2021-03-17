import { Action } from '@ngrx/store';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export enum HRWorkHistoryActionTypes {
  SHOW_EDITOR = '[HR PERSONAL DATA - WORK HISTORY] Show Editor',
  HIDE_EDITOR = '[HR PERSONAL DATA - WORK HISTORY] Hide Editor',

  SHOW_VIEWER = '[HR PERSONAL DATA - WORK HISTORY] Show Viewer',
  HIDE_VIEWER = '[HR PERSONAL DATA - WORK HISTORY] Hide Viewer',

  PROCESSING = '[HR PERSONAL DATA - WORK HISTORY] Processing',
  NOT_PROCESSING = '[HR PERSONAL DATA - WORK HISTORY] Not Processing',

  LOAD_APPROVED_DATA = '[HR PERSONAL DATA - WORK HISTORY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR PERSONAL DATA - WORK HISTORY] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - WORK HISTORY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PERSONAL DATA - WORK HISTORY] Load Awaiting Approval Data Success',



  LOAD_DOCUMENT = '[HR PERSONAL DATA - WORK HISTORY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR PERSONAL DATA - WORK HISTORY] Load Document Success',
  CLEAR_DOCUMENT = '[HR PERSONAL DATA - WORK HISTORY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR PERSONAL DATA - WORK HISTORY] Load Inline Document',


  SAVE = '[HR PERSONAL DATA - WORK HISTORY] Save',
  SAVE_SUCCESS = '[HR PERSONAL DATA - WORK HISTORY] Save Success',

  DELETE_APPROVED_DATA = '[HR PERSONAL DATA - WORK HISTORY] Delete APPROVED Approval Data',
  DELETE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - WORK HISTORY] Delete AWAITING Approval Data',

  REFRESH_DATA = '[HR PERSONAL DATA - WORK HISTORY] Refresh Data',

}

export class ShowEditorHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.SHOW_EDITOR;
}

export class HideEditorHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.HIDE_EDITOR;
}


export class ShowViewerHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.SHOW_VIEWER;
}

export class HideViewerHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.HIDE_VIEWER;
}


export class ProcessingHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.PROCESSING;
}

export class NotProcessingHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadApprovedDataHRWorkHistorySuccess implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPreviousEmployer[]) {}
}

export class LoadAwaitingApprovalDataHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadAwaitingApprovalDataHRWorkHistorySuccess implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPreviousEmployer[]) {}
}


export class LoadDocumentHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHRWorkHistorySuccess implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.CLEAR_DOCUMENT;
}





export class LoadInlineDocumentHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean, employeeId:number}) {}
}


export class SaveHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.SAVE;

  constructor(public payload: {data: IPreviousEmployer, recordId: number, editMode: boolean,employeeId:number}) {}
}


export class DeleteApprovedDataHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number,employeeId:number}) {}
}

export class DeleteAwaitingApprovalDataHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export class LoadDataHRWorkHistory implements Action {
  readonly type = HRWorkHistoryActionTypes.REFRESH_DATA;
}

export type HRWorkHistoryActions =
  | ShowEditorHRWorkHistory
  | HideEditorHRWorkHistory
  | ShowViewerHRWorkHistory
  | HideViewerHRWorkHistory
  | ProcessingHRWorkHistory
  | NotProcessingHRWorkHistory
  | LoadApprovedDataHRWorkHistory
  | LoadApprovedDataHRWorkHistorySuccess
  | LoadAwaitingApprovalDataHRWorkHistory
  | LoadAwaitingApprovalDataHRWorkHistorySuccess
  | LoadDocumentHRWorkHistory
  | LoadDocumentHRWorkHistorySuccess
  | ClearDocumentHRWorkHistory
  | LoadInlineDocumentHRWorkHistory
  | SaveHRWorkHistory
  | DeleteApprovedDataHRWorkHistory
  | DeleteAwaitingApprovalDataHRWorkHistory
  | LoadDataHRWorkHistory;
