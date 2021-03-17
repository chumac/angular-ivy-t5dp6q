import { Action } from '@ngrx/store';
import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export enum TeamProcessTransactionActionTypes {
  SHOW_EDITOR = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Show Editor',
  HIDE_EDITOR = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Hide Editor',

  SHOW_VIEWER = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Show Viewer',
  HIDE_VIEWER = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Hide Viewer',

  PROCESSING = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Processing',
  NOT_PROCESSING = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Not Processing',

  LOAD_DATA = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Load Data Success',

  LOAD_AREA = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Load Area',
  LOAD_AREA_SUCCESS = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Load Area Success',

  SAVE = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Save',
  SAVE_SUCCESS = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Save Success',

  ADD = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Add',
  ADD_SUCCESS = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Add Success',

  DELETE_DATA = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Delete Data',

  REMOVE_DATA = '[SELF SERVICE TEAM_PROCESS_TRANSACTIONS] Remove Data',

}

export class ShowEditorTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.PROCESSING;
}

export class NotProcessingTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.NOT_PROCESSING;
}


export class LoadDataTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.LOAD_DATA;
}

export class LoadDataTeamProcessTransactionSuccess implements Action {
  readonly type = TeamProcessTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProcessTransactionMaster[]) {}
}

export class LoadAreaTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.LOAD_AREA;
}

export class LoadAreaTeamProcessTransactionSuccess implements Action {
  readonly type = TeamProcessTransactionActionTypes.LOAD_AREA_SUCCESS;

  constructor(public payload: IProcessFormArea[]) {}
}

export class SaveTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, roleId: number}) {}
}


export class RemoveDataTeamProcessTransaction implements Action {
  readonly type = TeamProcessTransactionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type TeamProcessTransactionActions =
  | ShowEditorTeamProcessTransaction
  | HideEditorTeamProcessTransaction
  | ShowViewerTeamProcessTransaction
  | HideViewerTeamProcessTransaction
  | ProcessingTeamProcessTransaction
  | NotProcessingTeamProcessTransaction
  | LoadDataTeamProcessTransaction
  | LoadDataTeamProcessTransactionSuccess
  | SaveTeamProcessTransaction
  | AddTeamProcessTransaction
  | DeleteDataTeamProcessTransaction
  | RemoveDataTeamProcessTransaction
  | LoadAreaTeamProcessTransaction
  | LoadAreaTeamProcessTransactionSuccess;
