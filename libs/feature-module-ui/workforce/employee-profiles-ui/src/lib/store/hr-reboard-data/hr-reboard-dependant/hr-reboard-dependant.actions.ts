import { Action } from '@ngrx/store';

import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { INationalitySelectOption, IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export enum HrReboardDependantActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - DEPENDANTS] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - DEPENDANTS] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - DEPENDANTS] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - DEPENDANTS] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - DEPENDANTS] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - DEPENDANTS] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - DEPENDANTS] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - DEPENDANTS] Load Data Success',

  LOAD_PHOTO = '[HR REBOARDING DATA - PERSONAL DEPENDANTS] Load Approved Photo',
  LOAD_PHOTO_SUCCESS = '[HR REBOARDING DATA - PERSONAL DEPENDANTS] Load Approved Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR REBOARDING DATA - PERSONAL DEPENDANTS] Clear Viewer Photo',

  LOAD_STATES = '[HR REBOARDING DATA - DEPENDANTS] Load States',
  LOAD_STATES_READY = '[HR REBOARDING DATA - DEPENDANTS] Load States Ready',

  LOAD_CITIES = '[HR REBOARDING DATA - DEPENDANTS] Load Cities',
  LOAD_CITIES_READY = '[HR REBOARDING DATA - DEPENDANTS] Load Cities Ready',

  SAVE = '[HR REBOARDING DATA - DEPENDANTS] Save',
  UPDATE = '[HR REBOARDING DATA - DEPENDANTS] Save Update',

  DELETE_DATA = '[HR REBOARDING DATA - DEPENDANTS] Delete Dependant Data',
}

export class ShowEditorHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.PROCESSING;
}

export class NotProcessingHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_DATA;
  constructor(public payload: { employeeId: number }) { }
}

export class LoadDataHrReboardDependantSuccess implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IDependant[]) {}
}

export class SaveHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.SAVE;

  constructor(public payload: {data: IDependant, employeeId: number}) {}
}

export class SaveUpdateHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.UPDATE;

  constructor(public payload: {data: IDependant, employeeId: number, recordId: number}) {}
}

export class DeleteDataHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadStatesHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesHrReboardDependantReady implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesHrReboardDependantReady implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadPhotoHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_PHOTO;

  constructor(public payload: {employeeId: number, recordId: number}) {}
}

export class LoadPhotoHrReboardDependantSuccess implements Action {
  readonly type = HrReboardDependantActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoHrReboardDependant implements Action {
  readonly type = HrReboardDependantActionTypes.CLEAR_VIEWER_PHOTO;
}


export type HrReboardDependantsActions =
  | ShowEditorHrReboardDependant
  | HideEditorHrReboardDependant
  | ShowViewerHrReboardDependant
  | HideViewerHrReboardDependant
  | ProcessingHrReboardDependant
  | NotProcessingHrReboardDependant
  | LoadDataHrReboardDependant
  | LoadDataHrReboardDependantSuccess
  | LoadStatesHrReboardDependant
  | LoadStatesHrReboardDependantReady
  | LoadCitiesHrReboardDependant
  | LoadCitiesHrReboardDependantReady
  | SaveHrReboardDependant
  | SaveUpdateHrReboardDependant
  | DeleteDataHrReboardDependant
  | LoadPhotoHrReboardDependant
  | LoadPhotoHrReboardDependantSuccess
  | ClearViewerPhotoHrReboardDependant
