import { Action } from '@ngrx/store';
import { ISeparationReasons } from '@nutela/models/workforce/employee-profiles';

export enum SeparationReasonSetupActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] LOADING',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Load Data Success',


  ADD = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Save Success',

  UPDATE_DATA = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Update Data',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - SEPARATION_REASON] Delete Data',
}

export class ShowEditorSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.SHOW_EDITOR;
}

export class HideEditorSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.HIDE_EDITOR;
}


export class ShowViewerSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.SHOW_VIEWER;
}

export class HideViewerSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.HIDE_VIEWER;
}


export class ProcessingSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.PROCESSING;
}

export class NotProcessingSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.NOT_PROCESSING;
}

export class LoadingSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.LOADING;
}

export class NotLoadingSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.NOT_LOADING;
}


export class LoadDataSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.LOAD_DATA;
}

export class LoadDataSeparationReasonSetupSuccess implements Action {
  readonly type = SeparationReasonSetupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ISeparationReasons[]) {}
}

export class AddSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.ADD;

  constructor(public payload: {data: ISeparationReasons}) {}
}

export class SaveSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.SAVE;

  constructor(public payload: {data: ISeparationReasons, recordId: number}) {}
}

export class DeleteDataSeparationReasonSetup implements Action {
  readonly type = SeparationReasonSetupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type SeparationReasonSetupActions =
  | ShowEditorSeparationReasonSetup
  | HideEditorSeparationReasonSetup
  | ShowViewerSeparationReasonSetup
  | HideViewerSeparationReasonSetup
  | ProcessingSeparationReasonSetup
  | NotProcessingSeparationReasonSetup
  | LoadingSeparationReasonSetup
  | NotLoadingSeparationReasonSetup
  | LoadDataSeparationReasonSetup
  | LoadDataSeparationReasonSetupSuccess
  | SaveSeparationReasonSetup
  | AddSeparationReasonSetup
  | DeleteDataSeparationReasonSetup;
