import { Action } from '@ngrx/store';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';

export enum HrReboardBeneficiaryActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - BENEFICIARY] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - BENEFICIARY] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - BENEFICIARY] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - BENEFICIARY] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - BENEFICIARY] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - BENEFICIARY] Not Processing',

  LOADING = '[HR REBOARDING DATA - BENEFICIARY] Loading',
  NOT_LOADING = '[HR REBOARDING DATA - BENEFICIARY] Not Loading',

  LOAD_DATA = '[HR REBOARDING DATA - BENEFICIARY] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - BENEFICIARY] Load Data Success',

  LOAD_PHOTO = '[HR REBOARDING DATA - PERSONAL BENEFICIARY] Load Photo',
  LOAD_PHOTO_SUCCESS = '[HR REBOARDING DATA - PERSONAL BENEFICIARY] Load Photo Success',

  DELETE_DATA = '[HR REBOARDING DATA - PERSONAL BENEFICIARY] Delete Data',

  CLEAR_VIEWER_PHOTO = '[HR REBOARDING DATA - PERSONAL BENEFICIARY] Clear Viewer Photo',

  LOAD_STATES = '[HR REBOARDING DATA - BENEFICIARY] Load States',
  LOAD_STATES_READY = '[HR REBOARDING DATA - BENEFICIARY] Load States Ready',

  LOAD_CITIES = '[HR REBOARDING DATA - BENEFICIARY] Load Cities',
  LOAD_CITIES_READY = '[HR REBOARDING DATA - BENEFICIARY] Load Cities Ready',

  SAVE = '[HR REBOARDING DATA - BENEFICIARY] Save',
  UPDATE = '[HR REBOARDING DATA - BENEFICIARY] Save Update',
  SAVE_SUCCESS = '[HR REBOARDING DATA - BENEFICIARY] Save Success',
}

export class ShowEditorHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.PROCESSING;
}

export class NotProcessingHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.NOT_PROCESSING;
}

export class LoadingHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOADING;
}

export class NotLoadingHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.NOT_LOADING;
}


export class LoadDataHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_DATA;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadDataHrReboardBeneficiarySuccess implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IBeneficiary[]) {}
}


export class LoadStatesHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesHrReboardBeneficiaryReady implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesHrReboardBeneficiaryReady implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadPhotoHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_PHOTO;

  constructor(public payload: { employeeId: number, beneficiaryId: number }) {}
}

export class LoadPhotoHrReboardBeneficiarySuccess implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: { photo: any }) {}
}



export class SaveHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.SAVE;

  constructor(public payload: {employeeId: number, data: IBeneficiary}) {}
}

export class SaveUpdateHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.UPDATE;

  constructor(public payload: { data: IBeneficiary, employeeId: number, beneficiaryId: number }) {}
}

export class DeleteDataHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.DELETE_DATA;

  constructor(public payload: { employeeId: number, beneficiaryId: number }) { }
}


export class ClearViewerPhotoHrReboardBeneficiary implements Action {
  readonly type = HrReboardBeneficiaryActionTypes.CLEAR_VIEWER_PHOTO;
}


export type HrReboardBeneficiaryActions =
  | ShowEditorHrReboardBeneficiary
  | HideEditorHrReboardBeneficiary
  | ShowViewerHrReboardBeneficiary
  | HideViewerHrReboardBeneficiary
  | ProcessingHrReboardBeneficiary
  | NotProcessingHrReboardBeneficiary
  | LoadingHrReboardBeneficiary
  | NotLoadingHrReboardBeneficiary
  | LoadDataHrReboardBeneficiary
  | LoadDataHrReboardBeneficiarySuccess
  | LoadStatesHrReboardBeneficiary
  | LoadStatesHrReboardBeneficiaryReady
  | LoadCitiesHrReboardBeneficiary
  | LoadCitiesHrReboardBeneficiaryReady
  | LoadPhotoHrReboardBeneficiary
  | LoadPhotoHrReboardBeneficiarySuccess
  | SaveHrReboardBeneficiary
  | SaveUpdateHrReboardBeneficiary
  | DeleteDataHrReboardBeneficiary
  | ClearViewerPhotoHrReboardBeneficiary
