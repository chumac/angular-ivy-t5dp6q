import { Action } from '@ngrx/store';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum GeneralActionTypes {
  HR_SHOW_EDITOR = '[GENERAL INFORMATION (HR)] Show Editor',
  HR_HIDE_EDITOR = '[GENERAL INFORMATION (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[GENERAL INFORMATION (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[GENERAL INFORMATION (HR)] Hide Viewer',

  HR_PROCESSING = '[GENERAL INFORMATION (HR)] Processing',
  HR_NOT_PROCESSING = '[GENERAL INFORMATION (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[GENERAL INFORMATION (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[GENERAL INFORMATION (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[GENERAL INFORMATION (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[GENERAL INFORMATION (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[GENERAL INFORMATION (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[GENERAL INFORMATION (HR)] Load Awaiting Approval Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DOCUMENT = '[GENERAL INFORMATION (HR)] Load Awaiting Approval Document',
  HR_LOAD_AWAITING_APPROVAL_DOCUMENT_SUCCESS = '[GENERAL INFORMATION (HR)] Load Awaiting Approval Document Success',
  HR_LOAD_AWAITING_APPROVAL_DOCUMENT_FAILURE = '[GENERAL INFORMATION (HR)] Load Awaiting Approval Document Failure',

  HR_LOAD_BIRTH_STATES = '[GENERAL INFORMATION (HR)] Load Birth States',
  HR_LOAD_BIRTH_STATES_READY = '[GENERAL INFORMATION (HR)] Load Birth States Ready',

  HR_LOAD_BIRTH_CITIES = '[GENERAL INFORMATION (HR)] Load Birth Cities',
  HR_LOAD_BIRTH_CITIES_READY = '[GENERAL INFORMATION (HR)] Load Birth Cities Ready',

  HR_LOAD_STATE_OF_ORIGIN = '[GENERAL INFORMATION (HR)] Load State of Origin',
  HR_LOAD_STATE_OF_ORIGIN_READY = '[GENERAL INFORMATION (HR)] Load State of Origin Ready',

  HR_LOAD_LGAs = '[GENERAL INFORMATION (HR)] Load LGAs',
  HR_LOAD_LGAs_READY = '[GENERAL INFORMATION (HR)] Load LGAs Ready',

  HR_SAVE = '[GENERAL INFORMATION (HR)] Save',
  HR_SAVE_SUCCESS = '[GENERAL INFORMATION (HR)] Save Success',
  HR_SAVE_FAILURE = '[GENERAL INFORMATION (HR)] Save Failure',

  HR_DELETE_AWAITING_APPROVAL_DATA = '[GENERAL INFORMATION (HR)] Delete Awaiting Approval Data',

  HR_RESET_DATA = '[GENERAL INFORMATION (HR)] Reset Data'
}




export class ShowEditorGeneral implements Action {
  readonly type = GeneralActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorGeneral implements Action {
  readonly type = GeneralActionTypes.HR_HIDE_EDITOR;
}


export class ShowViewerGeneral implements Action {
  readonly type = GeneralActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerGeneral implements Action {
  readonly type = GeneralActionTypes.HR_HIDE_VIEWER;
}


export class ProcessingGeneral implements Action {
  readonly type = GeneralActionTypes.HR_PROCESSING;
}

export class NotProcessingGeneral implements Action {
  readonly type = GeneralActionTypes.HR_NOT_PROCESSING;
}


export class LoadApprovedDataGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IGeneral) {}
}

export class LoadApprovedDataGeneralFailure implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadAwaitingApprovalDataGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IGeneral) {}
}

export class LoadAwaitingApprovalDataGeneralFailure implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}


export class LoadAwaitingApprovalDocumentGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DOCUMENT;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDocumentGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAwaitingApprovalDocumentGeneralFailure implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DOCUMENT_FAILURE;

  constructor(public error: any) {}
}


export class LoadBirthStatesGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_BIRTH_STATES;

  constructor(
    public payload: { selectedBirthCountry: INationalitySelectOption }
  ) {}
}

export class LoadBirthStatesGeneralReady implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_BIRTH_STATES_READY;

  constructor(public payload: { birthStateList: IStateSelectOption[] }) {}
}

export class LoadBirthCitiesGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_BIRTH_CITIES;

  constructor(public payload: { selectedBirthState: IStateSelectOption }) {}
}

export class LoadBirthCitiesGeneralReady implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_BIRTH_CITIES_READY;

  constructor(public payload: { birthCityList: ISelectOption[] }) {}
}

export class LoadStateOfOriginGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_STATE_OF_ORIGIN;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadStateOfOriginGeneralReady implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_STATE_OF_ORIGIN_READY;

  constructor(public payload: { stateOfOriginList: IStateSelectOption[] }) {}
}

export class LoadLGAsGeneral implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_LGAs;

  constructor(public payload: { selectedStateOfOrigin: IStateSelectOption }) {}
}

export class LoadLGAsGeneralReady implements Action {
  readonly type = GeneralActionTypes.HR_LOAD_LGAs_READY;

  constructor(public payload: { lgaList: ISelectOption[] }) {}
}

export class SaveGeneral implements Action {
  readonly type = GeneralActionTypes.HR_SAVE;

  constructor(public payload: { employeeId: number, data: IGeneral }) {}
}

export class SaveGeneralSuccess implements Action {
  readonly type = GeneralActionTypes.HR_SAVE_SUCCESS;
}

export class SaveGeneralFailure implements Action {
  readonly type = GeneralActionTypes.HR_SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalDataGeneral implements Action {
  readonly type = GeneralActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: { id: number, employeeId:number } ) {}
}

export class ResetGeneralData implements Action {
  readonly type = GeneralActionTypes.HR_RESET_DATA;
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
  | ResetGeneralData;
