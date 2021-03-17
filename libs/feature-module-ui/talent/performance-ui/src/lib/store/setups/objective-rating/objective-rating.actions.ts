import { Action } from '@ngrx/store';

import { IObjectiveRating } from '@nutela/models/talent/performance';

export enum ObjectiveRatingActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Save Success',

  ADD = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS OBJECTIVE_RATINGS] Remove Data',

}

export class ShowEditorObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.SHOW_EDITOR;
}

export class HideEditorObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.HIDE_EDITOR;
}


export class ShowViewerObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.SHOW_VIEWER;
}

export class HideViewerObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.HIDE_VIEWER;
}


export class ProcessingObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.PROCESSING;
}

export class NotProcessingObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.NOT_PROCESSING;
}


export class LoadDataObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.LOAD_DATA;
}

export class LoadDataObjectiveRatingSuccess implements Action {
  readonly type = ObjectiveRatingActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IObjectiveRating[]) {}
}


export class LoadDocumentObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentObjectiveRatingSuccess implements Action {
  readonly type = ObjectiveRatingActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.SAVE;

  constructor(public payload: {data: IObjectiveRating, recordId: number, editMode: boolean}) {}
}

export class AddObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.ADD;

  constructor(public payload: {data: IObjectiveRating}) {}
}


export class DeleteDataObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataObjectiveRating implements Action {
  readonly type = ObjectiveRatingActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ObjectiveRatingActions =
  | ShowEditorObjectiveRating
  | HideEditorObjectiveRating
  | ShowViewerObjectiveRating
  | HideViewerObjectiveRating
  | ProcessingObjectiveRating
  | NotProcessingObjectiveRating
  | LoadDataObjectiveRating
  | LoadDataObjectiveRatingSuccess
  | LoadDocumentObjectiveRating
  | LoadDocumentObjectiveRatingSuccess
  | ClearDocumentObjectiveRating
  | LoadInlineDocumentObjectiveRating
  | SaveObjectiveRating
  | AddObjectiveRating
  | DeleteDataObjectiveRating
  | RemoveDataObjectiveRating;
