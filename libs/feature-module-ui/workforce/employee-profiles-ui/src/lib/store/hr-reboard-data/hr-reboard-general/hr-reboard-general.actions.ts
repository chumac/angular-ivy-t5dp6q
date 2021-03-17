import { Action } from '@ngrx/store';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum HrReboardGeneralActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - GENERAL] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - GENERAL] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - GENERAL] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - GENERAL] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - GENERAL] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - GENERAL] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - GENERAL] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - GENERAL] Load Data Success',
  LOAD_DATA_FAILURE = '[HR REBOARDING DATA - GENERAL] Load Data Failure',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - GENERAL] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - GENERAL] Load Document Success',
  LOAD_DOCUMENT_FAILURE = '[HR REBOARDING DATA - GENERAL] Load Document Failure',

  LOAD_BIRTH_STATES = '[HR REBOARDING DATA - GENERAL] Load Birth States',
  LOAD_BIRTH_STATES_READY = '[HR REBOARDING DATA - GENERAL] Load Birth States Ready',

  LOAD_BIRTH_CITIES = '[HR REBOARDING DATA - GENERAL] Load Birth Cities',
  LOAD_BIRTH_CITIES_READY = '[HR REBOARDING DATA - GENERAL] Load Birth Cities Ready',

  LOAD_STATE_OF_ORIGIN = '[HR REBOARDING DATA - GENERAL] Load State of Origin',
  LOAD_STATE_OF_ORIGIN_READY = '[HR REBOARDING DATA - GENERAL] Load State of Origin Ready',

  LOAD_LGAs = '[HR REBOARDING DATA - GENERAL] Load LGAs',
  LOAD_LGAs_READY = '[HR REBOARDING DATA - GENERAL] Load LGAs Ready',

  SAVE = '[HR REBOARDING DATA - GENERAL] Save',
  UPDATE = '[HR REBOARDING DATA - GENERAL] Save Update',
  SAVE_SUCCESS = '[HR REBOARDING DATA - GENERAL] Save Success',
  SAVE_FAILURE = '[HR REBOARDING DATA - GENERAL] Save Failure',

  DELETE_DATA = '[HR REBOARDING DATA - GENERAL] Delete Awaiting Approval Data',

  CLEAR_DATA = '[HR REBOARDING DATA - GENERAL] Clear Data'
}

export class ShowEditorHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.PROCESSING;
}

export class NotProcessingHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_DATA;
  constructor(public payload: { employeeId: number }) { }
}

export class LoadDataHrReboardGeneralSuccess implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IGeneral) {}
}

export class LoadDataHrReboardGeneralFailure implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadDocumentHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_DOCUMENT;
}

export class LoadDocumentHrReboardGeneralSuccess implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDocumentHrReboardGeneralFailure implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_DOCUMENT_FAILURE;

  constructor(public error: any) {}
}


export class LoadBirthStatesHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_BIRTH_STATES;

  constructor(
    public payload: { selectedBirthCountry: INationalitySelectOption }
  ) {}
}

export class LoadBirthStatesHrReboardGeneralReady implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_BIRTH_STATES_READY;

  constructor(public payload: { birthStateList: IStateSelectOption[] }) {}
}

export class LoadBirthCitiesHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_BIRTH_CITIES;

  constructor(public payload: { selectedBirthState: IStateSelectOption }) {}
}

export class LoadBirthCitiesHrReboardGeneralReady implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_BIRTH_CITIES_READY;

  constructor(public payload: { birthCityList: ISelectOption[] }) {}
}

export class LoadStateOfOriginHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadStateOfOriginHrReboardGeneralReady implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN_READY;

  constructor(public payload: { stateOfOriginList: IStateSelectOption[] }) {}
}

export class LoadLGAsHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_LGAs;

  constructor(public payload: { selectedStateOfOrigin: IStateSelectOption }) {}
}

export class LoadLGAsHrReboardGeneralReady implements Action {
  readonly type = HrReboardGeneralActionTypes.LOAD_LGAs_READY;

  constructor(public payload: { lgaList: ISelectOption[] }) {}
}

export class SaveHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.SAVE;

  constructor(public payload: {data: IGeneral, employeeId: number}) {}
}

export class SaveUpdateHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.UPDATE;

  constructor(public payload: {data: IGeneral, recordId: number, employeeId: number}) {}
}

export class SaveHrReboardGeneralSuccess implements Action {
  readonly type = HrReboardGeneralActionTypes.SAVE_SUCCESS;
}

export class SaveHrReboardGeneralFailure implements Action {
  readonly type = HrReboardGeneralActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteDataHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.DELETE_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class ClearDataHrReboardGeneral implements Action {
  readonly type = HrReboardGeneralActionTypes.CLEAR_DATA;
}

export type HrReboardGeneralActions =
  | ShowEditorHrReboardGeneral
  | HideEditorHrReboardGeneral
  | ShowViewerHrReboardGeneral
  | HideViewerHrReboardGeneral
  | ProcessingHrReboardGeneral
  | NotProcessingHrReboardGeneral
  | LoadDataHrReboardGeneral
  | LoadDataHrReboardGeneralSuccess
  | LoadDataHrReboardGeneralFailure
  | LoadDocumentHrReboardGeneral
  | LoadDocumentHrReboardGeneralSuccess
  | LoadDocumentHrReboardGeneralFailure
  | LoadBirthStatesHrReboardGeneral
  | LoadBirthStatesHrReboardGeneralReady
  | LoadBirthCitiesHrReboardGeneral
  | LoadBirthCitiesHrReboardGeneralReady
  | LoadStateOfOriginHrReboardGeneral
  | LoadStateOfOriginHrReboardGeneralReady
  | LoadLGAsHrReboardGeneral
  | LoadLGAsHrReboardGeneralReady
  | SaveHrReboardGeneral
  | SaveUpdateHrReboardGeneral
  | SaveHrReboardGeneralSuccess
  | SaveHrReboardGeneralFailure
  | DeleteDataHrReboardGeneral
  | ClearDataHrReboardGeneral;
