import { Action } from '@ngrx/store';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum GeneralActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - GENERAL] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - GENERAL] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - GENERAL] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - GENERAL] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - GENERAL] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - GENERAL] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - GENERAL] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - GENERAL] Load Approved Data Success',
  LOAD_APPROVED_DATA_FAILURE = '[MY PERSONAL DATA - GENERAL] Load Approved Data Failure',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - GENERAL] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - GENERAL] Load Awaiting Approval Data Success',
  LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[MY PERSONAL DATA - GENERAL] Load Awaiting Approval Data Failure',

  LOAD_AWAITING_APPROVAL_DOCUMENT = '[MY PERSONAL DATA - GENERAL] Load Awaiting Approval Document',
  LOAD_AWAITING_APPROVAL_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - GENERAL] Load Awaiting Approval Document Success',
  LOAD_AWAITING_APPROVAL_DOCUMENT_FAILURE = '[MY PERSONAL DATA - GENERAL] Load Awaiting Approval Document Failure',

  LOAD_BIRTH_STATES = '[MY PERSONAL DATA - GENERAL] Load Birth States',
  LOAD_BIRTH_STATES_READY = '[MY PERSONAL DATA - GENERAL] Load Birth States Ready',

  LOAD_BIRTH_CITIES = '[MY PERSONAL DATA - GENERAL] Load Birth Cities',
  LOAD_BIRTH_CITIES_READY = '[MY PERSONAL DATA - GENERAL] Load Birth Cities Ready',

  LOAD_STATE_OF_ORIGIN = '[MY PERSONAL DATA - GENERAL] Load State of Origin',
  LOAD_STATE_OF_ORIGIN_READY = '[MY PERSONAL DATA - GENERAL] Load State of Origin Ready',

  LOAD_LGAs = '[MY PERSONAL DATA - GENERAL] Load LGAs',
  LOAD_LGAs_READY = '[MY PERSONAL DATA - GENERAL] Load LGAs Ready',

  SAVE = '[MY PERSONAL DATA - GENERAL] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - GENERAL] Save Success',
  SAVE_FAILURE = '[MY PERSONAL DATA - GENERAL] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - GENERAL] Delete Awaiting Approval Data',

  CLEAR_DATA = '[MY PERSONAL DATA - GENERAL] Clear Data'
}

export class ShowEditorGeneral implements Action {
  readonly type = GeneralActionTypes.SHOW_EDITOR;
}

export class HideEditorGeneral implements Action {
  readonly type = GeneralActionTypes.HIDE_EDITOR;
}


export class ShowViewerGeneral implements Action {
  readonly type = GeneralActionTypes.SHOW_VIEWER;
}

export class HideViewerGeneral implements Action {
  readonly type = GeneralActionTypes.HIDE_VIEWER;
}


export class ProcessingGeneral implements Action {
  readonly type = GeneralActionTypes.PROCESSING;
}

export class NotProcessingGeneral implements Action {
  readonly type = GeneralActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IGeneral) {}
}

export class LoadApprovedDataGeneralFailure implements Action {
  readonly type = GeneralActionTypes.LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadAwaitingApprovalDataGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IGeneral) {}
}

export class LoadAwaitingApprovalDataGeneralFailure implements Action {
  readonly type = GeneralActionTypes.LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}


export class LoadAwaitingApprovalDocumentGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_AWAITING_APPROVAL_DOCUMENT;
}

export class LoadAwaitingApprovalDocumentGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.LOAD_AWAITING_APPROVAL_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAwaitingApprovalDocumentGeneralFailure implements Action {
  readonly type = GeneralActionTypes.LOAD_AWAITING_APPROVAL_DOCUMENT_FAILURE;

  constructor(public error: any) {}
}


export class LoadBirthStatesGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_BIRTH_STATES;

  constructor(
    public payload: { selectedBirthCountry: INationalitySelectOption }
  ) {}
}

export class LoadBirthStatesGeneralReady implements Action {
  readonly type = GeneralActionTypes.LOAD_BIRTH_STATES_READY;

  constructor(public payload: { birthStateList: IStateSelectOption[] }) {}
}

export class LoadBirthCitiesGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_BIRTH_CITIES;

  constructor(public payload: { selectedBirthState: IStateSelectOption }) {}
}

export class LoadBirthCitiesGeneralReady implements Action {
  readonly type = GeneralActionTypes.LOAD_BIRTH_CITIES_READY;

  constructor(public payload: { birthCityList: ISelectOption[] }) {}
}

export class LoadStateOfOriginGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_STATE_OF_ORIGIN;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadStateOfOriginGeneralReady implements Action {
  readonly type = GeneralActionTypes.LOAD_STATE_OF_ORIGIN_READY;

  constructor(public payload: { stateOfOriginList: IStateSelectOption[] }) {}
}

export class LoadLGAsGeneral implements Action {
  readonly type = GeneralActionTypes.LOAD_LGAs;

  constructor(public payload: { selectedStateOfOrigin: IStateSelectOption }) {}
}

export class LoadLGAsGeneralReady implements Action {
  readonly type = GeneralActionTypes.LOAD_LGAs_READY;

  constructor(public payload: { lgaList: ISelectOption[] }) {}
}

export class SaveGeneral implements Action {
  readonly type = GeneralActionTypes.SAVE;

  constructor(public payload: IGeneral) {}
}

export class SaveGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.SAVE_SUCCESS;
}

export class SaveGeneralFailure implements Action {
  readonly type = GeneralActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalDataGeneral implements Action {
  readonly type = GeneralActionTypes.DELETE_AWAITING_APPROVAL_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class ClearDataGeneral implements Action {
  readonly type = GeneralActionTypes.CLEAR_DATA;
}

export type GeneralActions =
  | ShowEditorGeneral
  | HideEditorGeneral
  | ShowViewerGeneral
  | HideViewerGeneral
  | ProcessingGeneral
  | NotProcessingGeneral
  | LoadApprovedDataGeneral
  | LoadApprovedDataGeneralSuccess
  | LoadApprovedDataGeneralFailure
  | LoadAwaitingApprovalDataGeneral
  | LoadAwaitingApprovalDataGeneralSuccess
  | LoadAwaitingApprovalDataGeneralFailure
  | LoadAwaitingApprovalDocumentGeneral
  | LoadAwaitingApprovalDocumentGeneralSuccess
  | LoadAwaitingApprovalDocumentGeneralFailure
  | LoadBirthStatesGeneral
  | LoadBirthStatesGeneralReady
  | LoadBirthCitiesGeneral
  | LoadBirthCitiesGeneralReady
  | LoadStateOfOriginGeneral
  | LoadStateOfOriginGeneralReady
  | LoadLGAsGeneral
  | LoadLGAsGeneralReady
  | SaveGeneral
  | SaveGeneralSuccess
  | SaveGeneralFailure
  | DeleteAwaitingApprovalDataGeneral
  | ClearDataGeneral;
