import { Action } from '@ngrx/store';

import { IObjectiveDto } from '@nutela/models/talent/performance';

export enum ObjectiveActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS OBJECTIVES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS OBJECTIVES] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS OBJECTIVES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS OBJECTIVES] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS OBJECTIVES] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS OBJECTIVES] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVES] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS OBJECTIVES] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVES] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS OBJECTIVES] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS OBJECTIVES] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS OBJECTIVES] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVES] Save Success',

  ADD = '[PERFORMANCE SETUPS OBJECTIVES] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVES] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS OBJECTIVES] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS OBJECTIVES] Remove Data',

}

export class ShowEditorObjective implements Action {
  readonly type = ObjectiveActionTypes.SHOW_EDITOR;
}

export class HideEditorObjective implements Action {
  readonly type = ObjectiveActionTypes.HIDE_EDITOR;
}


export class ShowViewerObjective implements Action {
  readonly type = ObjectiveActionTypes.SHOW_VIEWER;
}

export class HideViewerObjective implements Action {
  readonly type = ObjectiveActionTypes.HIDE_VIEWER;
}


export class ProcessingObjective implements Action {
  readonly type = ObjectiveActionTypes.PROCESSING;
}

export class NotProcessingObjective implements Action {
  readonly type = ObjectiveActionTypes.NOT_PROCESSING;
}


export class LoadDataObjective implements Action {
  readonly type = ObjectiveActionTypes.LOAD_DATA;
}

export class LoadDataObjectiveSuccess implements Action {
  readonly type = ObjectiveActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IObjectiveDto[]) {}
}


export class LoadDocumentObjective implements Action {
  readonly type = ObjectiveActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentObjectiveSuccess implements Action {
  readonly type = ObjectiveActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentObjective implements Action {
  readonly type = ObjectiveActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentObjective implements Action {
  readonly type = ObjectiveActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveObjective implements Action {
  readonly type = ObjectiveActionTypes.SAVE;

  constructor(public payload: {data: IObjectiveDto, recordId: number, editMode: boolean}) {}
}

export class AddObjective implements Action {
  readonly type = ObjectiveActionTypes.ADD;

  constructor(public payload: {data: IObjectiveDto}) {}
}


export class DeleteDataObjective implements Action {
  readonly type = ObjectiveActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataObjective implements Action {
  readonly type = ObjectiveActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ObjectiveActions =
  | ShowEditorObjective
  | HideEditorObjective
  | ShowViewerObjective
  | HideViewerObjective
  | ProcessingObjective
  | NotProcessingObjective
  | LoadDataObjective
  | LoadDataObjectiveSuccess
  | LoadDocumentObjective
  | LoadDocumentObjectiveSuccess
  | ClearDocumentObjective
  | LoadInlineDocumentObjective
  | SaveObjective
  | AddObjective
  | DeleteDataObjective
  | RemoveDataObjective;
