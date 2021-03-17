import { Action } from '@ngrx/store';
import { IValidLocation } from '@nutela/models/workforce/leave';

export enum ValidLocationActionTypes {
  SHOW_EDITOR = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Show Editor',
  HIDE_EDITOR = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Hide Editor',

  SHOW_VIEWER = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Show Viewer',
  HIDE_VIEWER = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Hide Viewer',

  PROCESSING = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Processing',
  NOT_PROCESSING = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Not Processing',

  LOAD_DATA = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Load Data',
  LOAD_DATA_SUCCESS = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Load Data Success',

  LOAD_AREA = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Load Area',
  LOAD_AREA_SUCCESS = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Load Area Success',

  SAVE = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Save',
  SAVE_SUCCESS = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Save Success',

  ADD = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Add',
  ADD_SUCCESS = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Add Success',

  DELETE_DATA = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Delete Data',

  REMOVE_DATA = '[HR-LEAVE-TRANSACTIONS VALID_LOCATIONS] Remove Data',

}

export class ShowEditorValidLocation implements Action {
  readonly type = ValidLocationActionTypes.SHOW_EDITOR;
}

export class HideEditorValidLocation implements Action {
  readonly type = ValidLocationActionTypes.HIDE_EDITOR;
}


export class ShowViewerValidLocation implements Action {
  readonly type = ValidLocationActionTypes.SHOW_VIEWER;
}

export class HideViewerValidLocation implements Action {
  readonly type = ValidLocationActionTypes.HIDE_VIEWER;
}


export class ProcessingValidLocation implements Action {
  readonly type = ValidLocationActionTypes.PROCESSING;
}

export class NotProcessingValidLocation implements Action {
  readonly type = ValidLocationActionTypes.NOT_PROCESSING;
}


export class LoadDataValidLocation implements Action {
  readonly type = ValidLocationActionTypes.LOAD_DATA;
}

export class LoadDataValidLocationSuccess implements Action {
  readonly type = ValidLocationActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IValidLocation[]) {}
}

export class SaveValidLocation implements Action {
  readonly type = ValidLocationActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddValidLocation implements Action {
  readonly type = ValidLocationActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataValidLocation implements Action {
  readonly type = ValidLocationActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataValidLocation implements Action {
  readonly type = ValidLocationActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ValidLocationActions =
  | ShowEditorValidLocation
  | HideEditorValidLocation
  | ShowViewerValidLocation
  | HideViewerValidLocation
  | ProcessingValidLocation
  | NotProcessingValidLocation
  | LoadDataValidLocation
  | LoadDataValidLocationSuccess
  | SaveValidLocation
  | AddValidLocation
  | DeleteDataValidLocation
  | RemoveDataValidLocation;
