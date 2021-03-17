import { Action } from '@ngrx/store';
import { IEventDetailPreRequisites, IEventDetailPreRequisitesType } from '@nutela/models/talent/learning';

export enum PreRequisitesActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS PRE REQUISITES] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS PRE REQUISITES] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS PRE REQUISITES] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS PRE REQUISITES] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS PRE REQUISITES] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS PRE REQUISITES] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS PRE REQUISITES] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS PRE REQUISITES] Load Data Success',

  LOAD_DATA_TYPE = '[LEARNING SETUPS PRE REQUISITES] Load Data Type',
  LOAD_DATA_TYPE_SUCCESS = '[LEARNING SETUPS PRE REQUISITES] Load Data Type Success',

  SAVE = '[LEARNING SETUPS PRE REQUISITES] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS PRE REQUISITES] Save Success',

  ADD = '[LEARNING SETUPS PRE REQUISITES] Add',
  ADD_SUCCESS = '[LEARNING SETUPS PRE REQUISITES] Add Success',

  DELETE_DATA = '[LEARNING SETUPS PRE REQUISITES] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS PRE REQUISITES] Remove Data',

}

export class ShowEditorPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.SHOW_EDITOR;
}

export class HideEditorPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.HIDE_EDITOR;
}


export class ShowViewerPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.SHOW_VIEWER;
}

export class HideViewerPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.HIDE_VIEWER;
}


export class ProcessingPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.PROCESSING;
}

export class NotProcessingPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.NOT_PROCESSING;
}


export class LoadDataPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.LOAD_DATA;

  constructor(public payload: {recordId: number}) {}
  
}

export class LoadDataPreRequisitesType implements Action {
  readonly type = PreRequisitesActionTypes.LOAD_DATA_TYPE;
}

export class LoadDataPreRequisitesTypeSuccess implements Action {
  readonly type = PreRequisitesActionTypes.LOAD_DATA_TYPE_SUCCESS;

  constructor(public payload: IEventDetailPreRequisitesType[]) {}
}


export class LoadDataPreRequisitesSuccess implements Action {
  readonly type = PreRequisitesActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEventDetailPreRequisites[]) {}
}


export class SavePreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.SAVE;

  constructor(public payload: {data: IEventDetailPreRequisites, recordId: number, editMode: boolean, eventDetailId: number}) {}
}

export class AddPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.ADD;

  constructor(public payload: {data: IEventDetailPreRequisites, eventDetailId: number}) {}
}


export class DeleteDataPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, eventDetailId: number}) {}
}


export class RemoveDataPreRequisites implements Action {
  readonly type = PreRequisitesActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type PreRequisitesActions =
  | ShowEditorPreRequisites
  | HideEditorPreRequisites
  | ShowViewerPreRequisites
  | HideViewerPreRequisites
  | ProcessingPreRequisites
  | NotProcessingPreRequisites
  | LoadDataPreRequisites
  | LoadDataPreRequisitesSuccess
  | SavePreRequisites
  | AddPreRequisites
  | DeleteDataPreRequisites
  | LoadDataPreRequisitesType
  | LoadDataPreRequisitesTypeSuccess
  | RemoveDataPreRequisites;
