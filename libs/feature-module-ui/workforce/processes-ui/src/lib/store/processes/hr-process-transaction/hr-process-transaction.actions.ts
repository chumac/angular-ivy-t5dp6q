import { Action } from '@ngrx/store';
import { IProcessTransactionMaster } from '@nutela/models/workforce/employee-profiles';

export enum HrProcessTransactionActionTypes {
  SHOW_EDITOR = '[HR_PROCESS_TRANSACTIONS] Show Editor',
  HIDE_EDITOR = '[HR_PROCESS_TRANSACTIONS] Hide Editor',

  SHOW_VIEWER = '[HR_PROCESS_TRANSACTIONS] Show Viewer',
  HIDE_VIEWER = '[HR_PROCESS_TRANSACTIONS] Hide Viewer',

  PROCESSING = '[HR_PROCESS_TRANSACTIONS] Processing',
  NOT_PROCESSING = '[HR_PROCESS_TRANSACTIONS] Not Processing',

  LOAD_DATA = '[HR_PROCESS_TRANSACTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[HR_PROCESS_TRANSACTIONS] Load Data Success',

  SAVE = '[HR_PROCESS_TRANSACTIONS] Save',
  SAVE_SUCCESS = '[HR_PROCESS_TRANSACTIONS] Save Success',

  ADD = '[HR_PROCESS_TRANSACTIONS] Add',
  ADD_SUCCESS = '[HR_PROCESS_TRANSACTIONS] Add Success',

  DELETE_DATA = '[HR_PROCESS_TRANSACTIONS] Delete Data',

  REMOVE_DATA = '[HR_PROCESS_TRANSACTIONS] Remove Data',

}

export class ShowEditorHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.PROCESSING;
}

export class NotProcessingHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.NOT_PROCESSING;
}


export class LoadDataHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.LOAD_DATA;
}

export class LoadDataHrProcessTransactionSuccess implements Action {
  readonly type = HrProcessTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProcessTransactionMaster[]) {}
}

export class SaveHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, roleId: number}) {}
}


export class RemoveDataHrProcessTransaction implements Action {
  readonly type = HrProcessTransactionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type HrProcessTransactionActions =
  | ShowEditorHrProcessTransaction
  | HideEditorHrProcessTransaction
  | ShowViewerHrProcessTransaction
  | HideViewerHrProcessTransaction
  | ProcessingHrProcessTransaction
  | NotProcessingHrProcessTransaction
  | LoadDataHrProcessTransaction
  | LoadDataHrProcessTransactionSuccess
  | SaveHrProcessTransaction
  | AddHrProcessTransaction
  | DeleteDataHrProcessTransaction
  | RemoveDataHrProcessTransaction;
