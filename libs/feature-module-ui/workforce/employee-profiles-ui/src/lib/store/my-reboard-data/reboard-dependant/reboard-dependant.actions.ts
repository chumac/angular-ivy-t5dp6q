import { Action } from '@ngrx/store';

import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { INationalitySelectOption, IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export enum ReboardDependantActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - DEPENDANTS] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - DEPENDANTS] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - DEPENDANTS] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - DEPENDANTS] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - DEPENDANTS] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - DEPENDANTS] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - DEPENDANTS] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - DEPENDANTS] Load Data Success',

  LOAD_PHOTO = '[MY REBOARDING DATA - PERSONAL DEPENDANTS] Load Approved Photo',
  LOAD_PHOTO_SUCCESS = '[MY REBOARDING DATA - PERSONAL DEPENDANTS] Load Approved Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY REBOARDING DATA - PERSONAL DEPENDANTS] Clear Viewer Photo',

  LOAD_STATES = '[MY REBOARDING DATA - DEPENDANTS] Load States',
  LOAD_STATES_READY = '[MY REBOARDING DATA - DEPENDANTS] Load States Ready',

  LOAD_CITIES = '[MY REBOARDING DATA - DEPENDANTS] Load Cities',
  LOAD_CITIES_READY = '[MY REBOARDING DATA - DEPENDANTS] Load Cities Ready',

  SAVE = '[MY REBOARDING DATA - DEPENDANTS] Save',
  UPDATE = '[MY REBOARDING DATA - DEPENDANTS] Save Update',

  DELETE_DATA = '[MY REBOARDING DATA - DEPENDANTS] Delete Dependant Data',
}

export class ShowEditorReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.PROCESSING;
}

export class NotProcessingReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_DATA;
}

export class LoadDataReboardDependantSuccess implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IDependant[]) {}
}

export class SaveReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.SAVE;

  constructor(public payload: {data: IDependant}) {}
}

export class SaveUpdateReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.UPDATE;

  constructor(public payload: {data: IDependant, recordId: number}) {}
}

export class DeleteDataReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadStatesReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesReboardDependantReady implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesReboardDependantReady implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadPhotoReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPhotoReboardDependantSuccess implements Action {
  readonly type = ReboardDependantActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoReboardDependant implements Action {
  readonly type = ReboardDependantActionTypes.CLEAR_VIEWER_PHOTO;
}


export type ReboardDependantsActions =
  | ShowEditorReboardDependant
  | HideEditorReboardDependant
  | ShowViewerReboardDependant
  | HideViewerReboardDependant
  | ProcessingReboardDependant
  | NotProcessingReboardDependant
  | LoadDataReboardDependant
  | LoadDataReboardDependantSuccess
  | LoadStatesReboardDependant
  | LoadStatesReboardDependantReady
  | LoadCitiesReboardDependant
  | LoadCitiesReboardDependantReady
  | SaveReboardDependant
  | SaveUpdateReboardDependant
  | DeleteDataReboardDependant
  | LoadPhotoReboardDependant
  | LoadPhotoReboardDependantSuccess
  | ClearViewerPhotoReboardDependant
