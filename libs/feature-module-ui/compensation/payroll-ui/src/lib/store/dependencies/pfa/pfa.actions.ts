import { Action } from '@ngrx/store';
import { IPfa } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum PfaActionTypes {

  SHOW_EDITOR = '[ PFA] Show Editor',
  HIDE_EDITOR = '[PFA] Hide Editor',

  PROCESSING = '[ PFA ] Processing',
  NOT_PROCESSING = '[ PFA ] Not Processing',

  LOADING = '[ PFA ] LOADING',
  NOT_LOADING = '[ PFA ] Not LOADING',

  LOAD_PFA_DATA = '[ PFA] Load PFA Data',
  LOAD_PFA_DATA_SUCCESS = '[ PFA] Load PFA Data Success',

  LOAD_NATIONALITY_DATA = '[PFA] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[PFA] Load NATIONALITY Data Success',

  LOAD_STATE_DATA = '[PFA ] Load STATE Data',
  LOAD_STATE_DATA_SUCCESS = '[PFA ] Load STATE Data Success',

  LOAD_CITY_DATA = '[PFA ] Load CITY Data',
  LOAD_CITY_DATA_SUCCESS = '[PFA ] Load STATE Data Success',

  SAVE = '[PFA] Save',
  SAVE_SUCCESS = '[ PFA] Save Success',

  UPDATE = '[UPDATE PFA] UPDATE',
  UPDATE_SUCCESS = '[UPDATE PFA] UPDATE Success',

  DELETE_PFA_DATA = '[PFA] Delete PFA Data',
}


export class ShowEditorPfa implements Action {
  readonly type = PfaActionTypes.SHOW_EDITOR;
}

export class HideEditorPfa implements Action {
  readonly type = PfaActionTypes.HIDE_EDITOR;
}

export class ProcessingPfa implements Action {
  readonly type = PfaActionTypes.PROCESSING;
}

export class NotProcessingPfa implements Action {
  readonly type = PfaActionTypes.NOT_PROCESSING;
}

export class LoadingPfa implements Action {
  readonly type = PfaActionTypes.LOADING;
}

export class NotLoadingPfa implements Action {
  readonly type = PfaActionTypes.NOT_LOADING;
}


export class LoadPfaData implements Action {
  readonly type = PfaActionTypes.LOAD_PFA_DATA;
}

export class LoadPfaSuccess implements Action {
  readonly type = PfaActionTypes.LOAD_PFA_DATA_SUCCESS;
  constructor(public payload: IPfa[]) {}
}

export class LoadNationPfa implements Action {
  readonly type = PfaActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationPfaSuccess implements Action {
  readonly type = PfaActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadStatePfa implements Action {
  readonly type = PfaActionTypes.LOAD_STATE_DATA;
  constructor(public payload: {countryId: number}) {}
}

export class LoadStatePfaSuccess implements Action {
  readonly type = PfaActionTypes.LOAD_STATE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadCityPfa implements Action {
  readonly type = PfaActionTypes.LOAD_CITY_DATA;
  constructor(public payload: {stateId: number}) {}
}

export class LoadCityPfaSuccess implements Action {
  readonly type = PfaActionTypes.LOAD_CITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SavePfa implements Action {
  readonly type = PfaActionTypes.SAVE;
  constructor(public payload: {data: IPfa}) {}
}

export class UpdatePfa implements Action {
  readonly type = PfaActionTypes.UPDATE;
  constructor(public payload: {data: IPfa, recordId: number}) {}
}

export class DeletePfa implements Action{
  readonly type =PfaActionTypes.DELETE_PFA_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type PfaActions =
  | ShowEditorPfa
  | HideEditorPfa
  | ProcessingPfa
  | NotProcessingPfa
  | LoadingPfa
  | NotLoadingPfa
  | LoadPfaData
  | LoadPfaSuccess
  | LoadNationPfa
  | LoadNationPfaSuccess
  | LoadStatePfa
  | LoadStatePfaSuccess
  | LoadCityPfa
  | LoadCityPfaSuccess
  | SavePfa
  | UpdatePfa
  | DeletePfa;
