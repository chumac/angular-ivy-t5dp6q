import { Action } from '@ngrx/store';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardWorkHistoryActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - WORK HISTORY] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - WORK HISTORY] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - WORK HISTORY] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - WORK HISTORY] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - WORK HISTORY] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - WORK HISTORY] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - WORK HISTORY] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - WORK HISTORY] Load Data Success',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - WORK HISTORY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - WORK HISTORY] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - WORK HISTORY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - WORK HISTORY] Load Inline Document',

  SAVE = '[HR REBOARDING DATA - WORK HISTORY] Save',
  UPDATE = '[HR REBOARDING DATA - WORK HISTORY] Save Update',
  DELETE_DATA = '[HR REBOARDING DATA - WORK HISTORY] Delete Data',
}

export class ShowEditorHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.PROCESSING;
}

export class NotProcessingHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.LOAD_DATA;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadDataHrReboardWorkHistorySuccess implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPreviousEmployer[]) {}
}

export class LoadDocumentHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHrReboardWorkHistorySuccess implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class SaveHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.SAVE;

  constructor(public payload: {data: IPreviousEmployer, employeeId: number }) {}
}

export class SaveUpdateHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.UPDATE;

  constructor(public payload: {data: IPreviousEmployer, recordId: number, employeeId: number }) {}
}

export class DeleteDataHrReboardWorkHistory implements Action {
  readonly type = HrReboardWorkHistoryActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, employeeId: number }) {}
}

export type HrReboardWorkHistoryActions =
  | ShowEditorHrReboardWorkHistory
  | HideEditorHrReboardWorkHistory
  | ShowViewerHrReboardWorkHistory
  | HideViewerHrReboardWorkHistory
  | ProcessingHrReboardWorkHistory
  | NotProcessingHrReboardWorkHistory
  | LoadDataHrReboardWorkHistory
  | LoadDataHrReboardWorkHistorySuccess
  | LoadDocumentHrReboardWorkHistory
  | LoadDocumentHrReboardWorkHistorySuccess
  | ClearDocumentHrReboardWorkHistory
  | LoadInlineDocumentHrReboardWorkHistory
  | DeleteDataHrReboardWorkHistory
  | SaveHrReboardWorkHistory
  | SaveUpdateHrReboardWorkHistory;
