import { Action } from '@ngrx/store';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';

export enum ReboardBeneficiaryActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - BENEFICIARY] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - BENEFICIARY] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - BENEFICIARY] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - BENEFICIARY] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - BENEFICIARY] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - BENEFICIARY] Not Processing',

  LOADING = '[MY REBOARDING DATA - BENEFICIARY] Loading',
  NOT_LOADING = '[MY REBOARDING DATA - BENEFICIARY] Not Loading',

  LOAD_DATA = '[MY REBOARDING DATA - BENEFICIARY] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - BENEFICIARY] Load Data Success',

  LOAD_PHOTO = '[MY REBOARDING DATA - PERSONAL BENEFICIARY] Load Photo',
  LOAD_PHOTO_SUCCESS = '[MY REBOARDING DATA - PERSONAL BENEFICIARY] Load Photo Success',

  DELETE_DATA = '[MY REBOARDING DATA - PERSONAL BENEFICIARY] Delete Data',

  CLEAR_VIEWER_PHOTO = '[MY REBOARDING DATA - PERSONAL BENEFICIARY] Clear Viewer Photo',

  LOAD_STATES = '[MY REBOARDING DATA - BENEFICIARY] Load States',
  LOAD_STATES_READY = '[MY REBOARDING DATA - BENEFICIARY] Load States Ready',

  LOAD_CITIES = '[MY REBOARDING DATA - BENEFICIARY] Load Cities',
  LOAD_CITIES_READY = '[MY REBOARDING DATA - BENEFICIARY] Load Cities Ready',

  SAVE = '[MY REBOARDING DATA - BENEFICIARY] Save',
  UPDATE = '[MY REBOARDING DATA - BENEFICIARY] Save Update',
  SAVE_SUCCESS = '[MY REBOARDING DATA - BENEFICIARY] Save Success',
}

export class ShowEditorReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.PROCESSING;
}

export class NotProcessingReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.NOT_PROCESSING;
}

export class LoadingReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOADING;
}

export class NotLoadingReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.NOT_LOADING;
}


export class LoadDataReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_DATA;
}

export class LoadDataReboardBeneficiarySuccess implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IBeneficiary[]) {}
}


export class LoadStatesReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesReboardBeneficiaryReady implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesReboardBeneficiaryReady implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadPhotoReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPhotoReboardBeneficiarySuccess implements Action {
  readonly type = ReboardBeneficiaryActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: { photo: any }) {}
}



export class SaveReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.SAVE;

  constructor(public payload: {data: IBeneficiary}) {}
}

export class SaveUpdateReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.UPDATE;

  constructor(public payload: {data: IBeneficiary, recordId: number}) {}
}

export class DeleteDataReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}


export class ClearViewerPhotoReboardBeneficiary implements Action {
  readonly type = ReboardBeneficiaryActionTypes.CLEAR_VIEWER_PHOTO;
}


export type ReboardBeneficiaryActions =
  | ShowEditorReboardBeneficiary
  | HideEditorReboardBeneficiary
  | ShowViewerReboardBeneficiary
  | HideViewerReboardBeneficiary
  | ProcessingReboardBeneficiary
  | NotProcessingReboardBeneficiary
  | LoadingReboardBeneficiary
  | NotLoadingReboardBeneficiary
  | LoadDataReboardBeneficiary
  | LoadDataReboardBeneficiarySuccess
  | LoadStatesReboardBeneficiary
  | LoadStatesReboardBeneficiaryReady
  | LoadCitiesReboardBeneficiary
  | LoadCitiesReboardBeneficiaryReady
  | LoadPhotoReboardBeneficiary
  | LoadPhotoReboardBeneficiarySuccess
  | SaveReboardBeneficiary
  | SaveUpdateReboardBeneficiary
  | DeleteDataReboardBeneficiary
  | ClearViewerPhotoReboardBeneficiary
