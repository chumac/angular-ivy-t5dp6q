import { Action } from '@ngrx/store';

import { ICity } from "@nutela/models/platform/lookup";
import { ISelectOption } from '@nutela/models/core-data';


export enum CityActionTypes {

  SHOW_EDITOR = '[ CITY] Show Editor',
  HIDE_EDITOR = '[CITY] Hide Editor',

  PROCESSING = '[ CITY] Processing',
  NOT_PROCESSING = '[ CITY] Not Processing',

  LOAD_CITY_DATA = '[ CITY] Load CITY Data',
  LOAD_CITY_DATA_SUCCESS = '[ CITY] Load CITY Data Success',

  LOAD_NATIONALITY_DATA = '[ CITY] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[ CITY] Load NATIONALITY Data Success',

  LOAD_STATE_DATA = '[ CITY] Load STATE Data',
  LOAD_STATE_DATA_SUCCESS = '[ CITY] Load STATE Data Success',

  SAVE = '[CITY] Save',
  SAVE_SUCCESS = '[ CITY] Save Success',

  UPDATE = '[CITY] UPDATE',
  UPDATE_SUCCESS = '[ CITY] UPDATE Success',

  CLEAR_STATE = '[CITY]  CLEAR State',
  CLEAR = '[CITY]  CLEAR',
  DELETE = '[CITY] DELETE',

}


export class ShowEditorCity implements Action {
  readonly type = CityActionTypes.SHOW_EDITOR;
}

export class HideEditorCity implements Action {
  readonly type = CityActionTypes.HIDE_EDITOR;
}

export class ProcessingCity implements Action {
  readonly type = CityActionTypes.PROCESSING;
}

export class NotProcessingCity implements Action {
  readonly type = CityActionTypes.NOT_PROCESSING;
}


export class LoadCityData implements Action {
  readonly type = CityActionTypes.LOAD_CITY_DATA;
  constructor(public payload:{stateId: number}) {}
}

export class LoadCitySuccess implements Action {
  readonly type = CityActionTypes.LOAD_CITY_DATA_SUCCESS;
  constructor(public payload: ICity[]) {}
}

export class LoadNationData implements Action {
  readonly type = CityActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationDataSuccess implements Action {
  readonly type = CityActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadState implements Action {
  readonly type = CityActionTypes.LOAD_STATE_DATA;
  constructor(public payload: {countryId: number}) {}
}

export class LoadStateDataSuccess implements Action {
  readonly type = CityActionTypes.LOAD_STATE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveCity implements Action {
  readonly type = CityActionTypes.SAVE;
  constructor(public payload: {data: ICity, stateId: number}) {}
}

export class UpdateCity implements Action {
  readonly type = CityActionTypes.UPDATE;
  constructor(public payload: {data: ICity, stateId: number, cityId: number}) {}
}

export class DeleteCity implements Action {
  readonly type = CityActionTypes.DELETE;
  constructor(public payload: {stateId: number, cityId: number}) {}
}

export class ClearCity implements Action {
  readonly type = CityActionTypes.CLEAR;
}

export class ClearStateCity implements Action {
  readonly type = CityActionTypes.CLEAR_STATE;
}

export type CityActions =
  | ShowEditorCity
  | HideEditorCity
  | ProcessingCity
  | NotProcessingCity
  | LoadCityData
  | LoadCitySuccess
  | LoadNationData
  | LoadNationDataSuccess
  | LoadState
  | LoadStateDataSuccess
  | UpdateCity
  | SaveCity
  | DeleteCity
  | ClearCity
  | ClearStateCity;
