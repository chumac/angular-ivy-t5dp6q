import { Action } from '@ngrx/store';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum ReboardGeneralActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - GENERAL] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - GENERAL] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - GENERAL] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - GENERAL] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - GENERAL] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - GENERAL] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - GENERAL] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - GENERAL] Load Data Success',
  LOAD_DATA_FAILURE = '[MY REBOARDING DATA - GENERAL] Load Data Failure',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - GENERAL] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - GENERAL] Load Document Success',
  LOAD_DOCUMENT_FAILURE = '[MY REBOARDING DATA - GENERAL] Load Document Failure',

  LOAD_BIRTH_STATES = '[MY REBOARDING DATA - GENERAL] Load Birth States',
  LOAD_BIRTH_STATES_READY = '[MY REBOARDING DATA - GENERAL] Load Birth States Ready',

  LOAD_BIRTH_CITIES = '[MY REBOARDING DATA - GENERAL] Load Birth Cities',
  LOAD_BIRTH_CITIES_READY = '[MY REBOARDING DATA - GENERAL] Load Birth Cities Ready',

  LOAD_STATE_OF_ORIGIN = '[MY REBOARDING DATA - GENERAL] Load State of Origin',
  LOAD_STATE_OF_ORIGIN_READY = '[MY REBOARDING DATA - GENERAL] Load State of Origin Ready',

  LOAD_LGAs = '[MY REBOARDING DATA - GENERAL] Load LGAs',
  LOAD_LGAs_READY = '[MY REBOARDING DATA - GENERAL] Load LGAs Ready',

  SAVE = '[MY REBOARDING DATA - GENERAL] Save',
  UPDATE = '[MY REBOARDING DATA - GENERAL] Save Update',
  SAVE_SUCCESS = '[MY REBOARDING DATA - GENERAL] Save Success',
  SAVE_FAILURE = '[MY REBOARDING DATA - GENERAL] Save Failure',

  DELETE_DATA = '[MY REBOARDING DATA - GENERAL] Delete Awaiting Approval Data',

  CLEAR_DATA = '[MY REBOARDING DATA - GENERAL] Clear Data'
}

export class ShowEditorReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.PROCESSING;
}

export class NotProcessingReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_DATA;
}

export class LoadDataReboardGeneralSuccess implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IGeneral) {}
}

export class LoadDataReboardGeneralFailure implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadDocumentReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_DOCUMENT;
}

export class LoadDocumentReboardGeneralSuccess implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDocumentReboardGeneralFailure implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_DOCUMENT_FAILURE;

  constructor(public error: any) {}
}


export class LoadBirthStatesReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_BIRTH_STATES;

  constructor(
    public payload: { selectedBirthCountry: INationalitySelectOption }
  ) {}
}

export class LoadBirthStatesReboardGeneralReady implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_BIRTH_STATES_READY;

  constructor(public payload: { birthStateList: IStateSelectOption[] }) {}
}

export class LoadBirthCitiesReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_BIRTH_CITIES;

  constructor(public payload: { selectedBirthState: IStateSelectOption }) {}
}

export class LoadBirthCitiesReboardGeneralReady implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_BIRTH_CITIES_READY;

  constructor(public payload: { birthCityList: ISelectOption[] }) {}
}

export class LoadStateOfOriginReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadStateOfOriginReboardGeneralReady implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN_READY;

  constructor(public payload: { stateOfOriginList: IStateSelectOption[] }) {}
}

export class LoadLGAsReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_LGAs;

  constructor(public payload: { selectedStateOfOrigin: IStateSelectOption }) {}
}

export class LoadLGAsReboardGeneralReady implements Action {
  readonly type = ReboardGeneralActionTypes.LOAD_LGAs_READY;

  constructor(public payload: { lgaList: ISelectOption[] }) {}
}

export class SaveReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.SAVE;

  constructor(public payload: IGeneral) {}
}

export class SaveUpdateReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.UPDATE;

  constructor(public payload: {data: IGeneral}) {}
}

export class SaveReboardGeneralSuccess implements Action {
  readonly type = ReboardGeneralActionTypes.SAVE_SUCCESS;
}

export class SaveReboardGeneralFailure implements Action {
  readonly type = ReboardGeneralActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteDataReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.DELETE_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class ClearDataReboardGeneral implements Action {
  readonly type = ReboardGeneralActionTypes.CLEAR_DATA;
}

export type ReboardGeneralActions =
  | ShowEditorReboardGeneral
  | HideEditorReboardGeneral
  | ShowViewerReboardGeneral
  | HideViewerReboardGeneral
  | ProcessingReboardGeneral
  | NotProcessingReboardGeneral
  | LoadDataReboardGeneral
  | LoadDataReboardGeneralSuccess
  | LoadDataReboardGeneralFailure
  | LoadDocumentReboardGeneral
  | LoadDocumentReboardGeneralSuccess
  | LoadDocumentReboardGeneralFailure
  | LoadBirthStatesReboardGeneral
  | LoadBirthStatesReboardGeneralReady
  | LoadBirthCitiesReboardGeneral
  | LoadBirthCitiesReboardGeneralReady
  | LoadStateOfOriginReboardGeneral
  | LoadStateOfOriginReboardGeneralReady
  | LoadLGAsReboardGeneral
  | LoadLGAsReboardGeneralReady
  | SaveReboardGeneral
  | SaveUpdateReboardGeneral
  | SaveReboardGeneralSuccess
  | SaveReboardGeneralFailure
  | DeleteDataReboardGeneral
  | ClearDataReboardGeneral;
