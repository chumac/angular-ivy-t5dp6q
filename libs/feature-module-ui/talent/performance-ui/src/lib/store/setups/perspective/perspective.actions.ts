import { Action } from '@ngrx/store';

import { IPerspective } from '@nutela/models/talent/performance';

export enum PerspectiveActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS PERSPECTIVE] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS PERSPECTIVE] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS PERSPECTIVE] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS PERSPECTIVE] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS PERSPECTIVE] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS PERSPECTIVE] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS PERSPECTIVE] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS PERSPECTIVE] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS PERSPECTIVE] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS PERSPECTIVE] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS PERSPECTIVE] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE] Save Success',

  ADD = '[PERFORMANCE SETUPS PERSPECTIVE] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS PERSPECTIVE] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS PERSPECTIVE] Remove Data',

}

export class ShowEditorPerspective implements Action {
  readonly type = PerspectiveActionTypes.SHOW_EDITOR;
}

export class HideEditorPerspective implements Action {
  readonly type = PerspectiveActionTypes.HIDE_EDITOR;
}


export class ShowViewerPerspective implements Action {
  readonly type = PerspectiveActionTypes.SHOW_VIEWER;
}

export class HideViewerPerspective implements Action {
  readonly type = PerspectiveActionTypes.HIDE_VIEWER;
}


export class ProcessingPerspective implements Action {
  readonly type = PerspectiveActionTypes.PROCESSING;
}

export class NotProcessingPerspective implements Action {
  readonly type = PerspectiveActionTypes.NOT_PROCESSING;
}


export class LoadDataPerspective implements Action {
  readonly type = PerspectiveActionTypes.LOAD_DATA;
}

export class LoadDataPerspectiveSuccess implements Action {
  readonly type = PerspectiveActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPerspective[]) {}
}


export class LoadDocumentPerspective implements Action {
  readonly type = PerspectiveActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPerspectiveSuccess implements Action {
  readonly type = PerspectiveActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPerspective implements Action {
  readonly type = PerspectiveActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPerspective implements Action {
  readonly type = PerspectiveActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SavePerspective implements Action {
  readonly type = PerspectiveActionTypes.SAVE;

  constructor(public payload: {data: IPerspective, recordId: number, editMode: boolean}) {}
}

export class AddPerspective implements Action {
  readonly type = PerspectiveActionTypes.ADD;

  constructor(public payload: {data: IPerspective}) {}
}


export class DeleteDataPerspective implements Action {
  readonly type = PerspectiveActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataPerspective implements Action {
  readonly type = PerspectiveActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type PerspectiveActions =
  | ShowEditorPerspective
  | HideEditorPerspective
  | ShowViewerPerspective
  | HideViewerPerspective
  | ProcessingPerspective
  | NotProcessingPerspective
  | LoadDataPerspective
  | LoadDataPerspectiveSuccess
  | LoadDocumentPerspective
  | LoadDocumentPerspectiveSuccess
  | ClearDocumentPerspective
  | LoadInlineDocumentPerspective
  | SavePerspective
  | AddPerspective
  | DeleteDataPerspective
  | RemoveDataPerspective;
