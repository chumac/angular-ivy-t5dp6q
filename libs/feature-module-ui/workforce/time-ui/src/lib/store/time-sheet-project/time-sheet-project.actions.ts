import { Action } from '@ngrx/store';

import { ITimeSheetProject } from '@nutela/models/workforce/time-sheet';
import { ISelectOption } from '@nutela/models/core-data';

export enum TimeSheetProjectActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Plan List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Save Success',

  ADD = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS TIME_SHEET_PROJECTS] Remove Data',

}

export class ShowEditorTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.SHOW_EDITOR;
}

export class HideEditorTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.HIDE_EDITOR;
}


export class ShowViewerTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.SHOW_VIEWER;
}

export class HideViewerTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.HIDE_VIEWER;
}


export class ProcessingTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.PROCESSING;
}

export class NotProcessingTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.NOT_PROCESSING;
}

export class LoadDataTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_DATA;
}

export class LoadDataTimeSheetProjectSuccess implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ITimeSheetProject[]) {}
}

export class LoadPlanListTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListTimeSheetProjectSuccess implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadDocumentTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentTimeSheetProjectSuccess implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.SAVE;

  constructor(public payload: {data: ITimeSheetProject, recordId: number, editMode: boolean}) {}
}

export class AddTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.ADD;

  constructor(public payload: {data: ITimeSheetProject}) {}
}


export class DeleteDataTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataTimeSheetProject implements Action {
  readonly type = TimeSheetProjectActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type TimeSheetProjectActions =
  | ShowEditorTimeSheetProject
  | HideEditorTimeSheetProject
  | ShowViewerTimeSheetProject
  | HideViewerTimeSheetProject
  | ProcessingTimeSheetProject
  | NotProcessingTimeSheetProject
  | LoadDataTimeSheetProject
  | LoadDataTimeSheetProjectSuccess
  | LoadPlanListTimeSheetProject
  | LoadPlanListTimeSheetProjectSuccess
  | LoadDocumentTimeSheetProject
  | LoadDocumentTimeSheetProjectSuccess
  | ClearDocumentTimeSheetProject
  | LoadInlineDocumentTimeSheetProject
  | SaveTimeSheetProject
  | AddTimeSheetProject
  | DeleteDataTimeSheetProject
  | RemoveDataTimeSheetProject;
