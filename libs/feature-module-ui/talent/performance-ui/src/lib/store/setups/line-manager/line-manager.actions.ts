import { Action } from '@ngrx/store';

import { ILineManager, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum LineManagerActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS LINE_MANAGERS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS LINE_MANAGERS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS LINE_MANAGERS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS LINE_MANAGERS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS LINE_MANAGERS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS LINE_MANAGERS] Not Processing',

  PROCESSING_GRID = '[PERFORMANCE SETUPS LINE_MANAGERS] Processing Grid',
  NOT_PROCESSING_GRID = '[PERFORMANCE SETUPS LINE_MANAGERS] Not Processing Grid',

  LOAD_DATA = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Plan List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Employee List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS LINE_MANAGERS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS LINE_MANAGERS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS LINE_MANAGERS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS LINE_MANAGERS] Save Success',

  ADD = '[PERFORMANCE SETUPS LINE_MANAGERS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS LINE_MANAGERS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS LINE_MANAGERS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS LINE_MANAGERS] Remove Data',

}

export class ShowEditorLineManager implements Action {
  readonly type = LineManagerActionTypes.SHOW_EDITOR;
}

export class HideEditorLineManager implements Action {
  readonly type = LineManagerActionTypes.HIDE_EDITOR;
}


export class ShowViewerLineManager implements Action {
  readonly type = LineManagerActionTypes.SHOW_VIEWER;
}

export class HideViewerLineManager implements Action {
  readonly type = LineManagerActionTypes.HIDE_VIEWER;
}


export class ProcessingLineManager implements Action {
  readonly type = LineManagerActionTypes.PROCESSING;
}

export class NotProcessingLineManager implements Action {
  readonly type = LineManagerActionTypes.NOT_PROCESSING;
}

export class ProcessingGridLineManager implements Action {
  readonly type = LineManagerActionTypes.PROCESSING_GRID;
}

export class NotProcessingGridLineManager implements Action {
  readonly type = LineManagerActionTypes.NOT_PROCESSING_GRID;
}


export class LoadDataLineManager implements Action {
  readonly type = LineManagerActionTypes.LOAD_DATA;
  constructor(public payload: number) {}
}

export class LoadDataLineManagerSuccess implements Action {
  readonly type = LineManagerActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ILineManager[]) {}
}

export class LoadPlanListLineManager implements Action {
  readonly type = LineManagerActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListLineManagerSuccess implements Action {
  readonly type = LineManagerActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class LoadEmployeeListLineManager implements Action {
  readonly type = LineManagerActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListLineManagerSuccess implements Action {
  readonly type = LineManagerActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}


export class LoadDocumentLineManager implements Action {
  readonly type = LineManagerActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentLineManagerSuccess implements Action {
  readonly type = LineManagerActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentLineManager implements Action {
  readonly type = LineManagerActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentLineManager implements Action {
  readonly type = LineManagerActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveLineManager implements Action {
  readonly type = LineManagerActionTypes.SAVE;

  constructor(public payload: {data: ILineManager, recordId: number, editMode: boolean}) {}
}

export class AddLineManager implements Action {
  readonly type = LineManagerActionTypes.ADD;

  constructor(public payload: {data: ILineManager}) {}
}


export class DeleteDataLineManager implements Action {
  readonly type = LineManagerActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, planId: number}) {}
}


export class RemoveDataLineManager implements Action {
  readonly type = LineManagerActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type LineManagerActions =
  | ShowEditorLineManager
  | HideEditorLineManager
  | ShowViewerLineManager
  | HideViewerLineManager
  | ProcessingLineManager
  | NotProcessingLineManager
  | ProcessingGridLineManager
  | NotProcessingGridLineManager
  | LoadDataLineManager
  | LoadDataLineManagerSuccess
  | LoadPlanListLineManager
  | LoadPlanListLineManagerSuccess
  | LoadEmployeeListLineManager
  | LoadEmployeeListLineManagerSuccess
  | LoadDocumentLineManager
  | LoadDocumentLineManagerSuccess
  | ClearDocumentLineManager
  | LoadInlineDocumentLineManager
  | SaveLineManager
  | AddLineManager
  | DeleteDataLineManager
  | RemoveDataLineManager;
