import { Action } from '@ngrx/store';
import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export enum SelfProcessTransactionActionTypes {
  SHOW_EDITOR = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Show Editor',
  HIDE_EDITOR = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Hide Editor',

  SHOW_VIEWER = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Show Viewer',
  HIDE_VIEWER = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Hide Viewer',

  PROCESSING = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Processing',
  NOT_PROCESSING = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Not Processing',

  LOAD_DATA = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Load Data Success',

  LOAD_AREA = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Load Area',
  LOAD_AREA_SUCCESS = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Load Area Success',

  SAVE = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Save',
  SAVE_SUCCESS = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Save Success',

  ADD = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Add',
  ADD_SUCCESS = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Add Success',

  DELETE_DATA = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Delete Data',

  REMOVE_DATA = '[SELF SERVICE SELF_PROCESS_TRANSACTIONS] Remove Data',

}

export class ShowEditorSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.PROCESSING;
}

export class NotProcessingSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.NOT_PROCESSING;
}


export class LoadDataSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.LOAD_DATA;
}

export class LoadDataSelfProcessTransactionSuccess implements Action {
  readonly type = SelfProcessTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProcessTransactionMaster[]) {}
}

export class LoadAreaSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.LOAD_AREA;
}

export class LoadAreaSelfProcessTransactionSuccess implements Action {
  readonly type = SelfProcessTransactionActionTypes.LOAD_AREA_SUCCESS;

  constructor(public payload: IProcessFormArea[]) {}
}

export class SaveSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, roleId: number}) {}
}


export class RemoveDataSelfProcessTransaction implements Action {
  readonly type = SelfProcessTransactionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type SelfProcessTransactionActions =
  | ShowEditorSelfProcessTransaction
  | HideEditorSelfProcessTransaction
  | ShowViewerSelfProcessTransaction
  | HideViewerSelfProcessTransaction
  | ProcessingSelfProcessTransaction
  | NotProcessingSelfProcessTransaction
  | LoadDataSelfProcessTransaction
  | LoadDataSelfProcessTransactionSuccess
  | SaveSelfProcessTransaction
  | AddSelfProcessTransaction
  | DeleteDataSelfProcessTransaction
  | RemoveDataSelfProcessTransaction
  | LoadAreaSelfProcessTransaction
  | LoadAreaSelfProcessTransactionSuccess;
