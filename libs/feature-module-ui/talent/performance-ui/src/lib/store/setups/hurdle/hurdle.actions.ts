import { Action } from '@ngrx/store';

import { IHurdle } from '@nutela/models/talent/performance';

export enum HurdleActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS HURDLES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS HURDLES] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS HURDLES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS HURDLES] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS HURDLES] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS HURDLES] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS HURDLES] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS HURDLES] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS HURDLES] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS HURDLES] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS HURDLES] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS HURDLES] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS HURDLES] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS HURDLES] Save Success',

  ADD = '[PERFORMANCE SETUPS HURDLES] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS HURDLES] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS HURDLES] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS HURDLES] Remove Data',

}

export class ShowEditorHurdle implements Action {
  readonly type = HurdleActionTypes.SHOW_EDITOR;
}

export class HideEditorHurdle implements Action {
  readonly type = HurdleActionTypes.HIDE_EDITOR;
}


export class ShowViewerHurdle implements Action {
  readonly type = HurdleActionTypes.SHOW_VIEWER;
}

export class HideViewerHurdle implements Action {
  readonly type = HurdleActionTypes.HIDE_VIEWER;
}


export class ProcessingHurdle implements Action {
  readonly type = HurdleActionTypes.PROCESSING;
}

export class NotProcessingHurdle implements Action {
  readonly type = HurdleActionTypes.NOT_PROCESSING;
}


export class LoadDataHurdle implements Action {
  readonly type = HurdleActionTypes.LOAD_DATA;
}

export class LoadDataHurdleSuccess implements Action {
  readonly type = HurdleActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IHurdle[]) {}
}


export class LoadDocumentHurdle implements Action {
  readonly type = HurdleActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHurdleSuccess implements Action {
  readonly type = HurdleActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHurdle implements Action {
  readonly type = HurdleActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHurdle implements Action {
  readonly type = HurdleActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveHurdle implements Action {
  readonly type = HurdleActionTypes.SAVE;

  constructor(public payload: {data: IHurdle, recordId: number, editMode: boolean}) {}
}

export class AddHurdle implements Action {
  readonly type = HurdleActionTypes.ADD;

  constructor(public payload: {data: IHurdle}) {}
}


export class DeleteDataHurdle implements Action {
  readonly type = HurdleActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataHurdle implements Action {
  readonly type = HurdleActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type HurdleActions =
  | ShowEditorHurdle
  | HideEditorHurdle
  | ShowViewerHurdle
  | HideViewerHurdle
  | ProcessingHurdle
  | NotProcessingHurdle
  | LoadDataHurdle
  | LoadDataHurdleSuccess
  | LoadDocumentHurdle
  | LoadDocumentHurdleSuccess
  | ClearDocumentHurdle
  | LoadInlineDocumentHurdle
  | SaveHurdle
  | AddHurdle
  | DeleteDataHurdle
  | RemoveDataHurdle;
