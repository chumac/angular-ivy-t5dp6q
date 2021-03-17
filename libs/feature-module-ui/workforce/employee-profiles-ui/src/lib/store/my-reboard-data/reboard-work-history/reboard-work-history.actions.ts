import { Action } from '@ngrx/store';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export enum ReboardWorkHistoryActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - WORK HISTORY] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - WORK HISTORY] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - WORK HISTORY] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - WORK HISTORY] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - WORK HISTORY] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - WORK HISTORY] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - WORK HISTORY] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - WORK HISTORY] Load Data Success',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - WORK HISTORY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - WORK HISTORY] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - WORK HISTORY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - WORK HISTORY] Load Inline Document',

  SAVE = '[MY REBOARDING DATA - WORK HISTORY] Save',
  UPDATE = '[MY REBOARDING DATA - WORK HISTORY] Save Update',
  DELETE_DATA = '[MY REBOARDING DATA - WORK HISTORY] Delete Data',
}

export class ShowEditorReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.PROCESSING;
}

export class NotProcessingReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.LOAD_DATA;
}

export class LoadDataReboardWorkHistorySuccess implements Action {
  readonly type = ReboardWorkHistoryActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPreviousEmployer[]) {}
}

export class LoadDocumentReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardWorkHistorySuccess implements Action {
  readonly type = ReboardWorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class SaveReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.SAVE;

  constructor(public payload: {data: IPreviousEmployer }) {}
}

export class SaveUpdateReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.UPDATE;

  constructor(public payload: {data: IPreviousEmployer, recordId: number }) {}
}

export class DeleteDataReboardWorkHistory implements Action {
  readonly type = ReboardWorkHistoryActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export type ReboardWorkHistoryActions =
  | ShowEditorReboardWorkHistory
  | HideEditorReboardWorkHistory
  | ShowViewerReboardWorkHistory
  | HideViewerReboardWorkHistory
  | ProcessingReboardWorkHistory
  | NotProcessingReboardWorkHistory
  | LoadDataReboardWorkHistory
  | LoadDataReboardWorkHistorySuccess
  | LoadDocumentReboardWorkHistory
  | LoadDocumentReboardWorkHistorySuccess
  | ClearDocumentReboardWorkHistory
  | LoadInlineDocumentReboardWorkHistory
  | SaveReboardWorkHistory
  | SaveUpdateReboardWorkHistory
  | DeleteDataReboardWorkHistory;
