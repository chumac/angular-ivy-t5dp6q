import { Action } from '@ngrx/store';

import { IContact } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum ContactActionTypes {
  HR_SHOW_EDITOR = '[CONTACT DATA (HR)] Show Editor',
  HR_HIDE_EDITOR = '[CONTACT DATA (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[CONTACT DATA (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[CONTACT DATA (HR)] Hide Viewer',

  HR_PROCESSING = '[CONTACT DATA (HR)] Processing',
  HR_NOT_PROCESSING = '[CONTACT DATA (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[CONTACT DATA (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[CONTACT DATA (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[CONTACT DATA (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[CONTACT DATA (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[CONTACT DATA (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[CONTACT DATA (HR)] Load Awaiting Approval Data Failure',

  HR_LOAD_APPROVED_NOK_PHOTO = '[CONTACT DATA (HR)] Load Approved Next-Of-Kin Photo',
  HR_LOAD_APPROVED_NOK_PHOTO_SUCCESS = '[CONTACT DATA (HR)] Load Approved Next-Of-Kin Photo Success',

  HR_LOAD_AWAITING_APPROVAL_NOK_PHOTO = '[CONTACT DATA (HR)] Load Awaiting Approval Next-Of-Kin Photo',
  HR_LOAD_AWAITING_APPROVAL_NOK_PHOTO_SUCCESS = '[CONTACT DATA (HR)] Load Awaiting Approval Next-Of-Kin Photo Success',

  HR_LOAD_RESIDENTIAL_STATES = '[CONTACT DATA (HR)] Load Residential States',
  HR_LOAD_RESIDENTIAL_STATES_READY = '[CONTACT DATA (HR)] Load Residential States Ready',

  HR_LOAD_RESIDENTIAL_CITIES = '[CONTACT DATA (HR)] Load Residential Cities',
  HR_LOAD_RESIDENTIAL_CITIES_READY = '[CONTACT DATA (HR)] Load Residential Cities Ready',

  HR_LOAD_PERMANENT_STATES = '[CONTACT DATA (HR)] Load Permanent State',
  HR_LOAD_PERMANENT_STATES_READY = '[CONTACT DATA (HR)] Load Permanent State Ready',

  HR_LOAD_PERMANENT_CITIES = '[CONTACT DATA (HR)] Load  Permanent Cities',
  HR_LOAD_PERMANENT_CITIES_READY = '[CONTACT DATA (HR)] Load Permanent Cities Ready',

  HR_LOAD_NEXT_OF_KIN_STATES = '[CONTACT DATA (HR)] Load Next Of Kin State',
  HR_LOAD_NEXT_OF_KIN_STATES_READY = '[CONTACT DATA (HR)] Load Next Of Kin State Ready',

  HR_LOAD_NEXT_OF_KIN_CITIES = '[CONTACT DATA (HR)] Load Next Of Kin Cities',
  HR_LOAD_NEXT_OF_KIN_CITIES_READY = '[CONTACT DATA (HR)] Load Next Of Kin Cities Ready',

  HR_SAVE = '[CONTACT DATA (HR)] Save',
  HR_SAVE_SUCCESS = '[CONTACT DATA (HR)L] Save Success',
  HR_SAVE_FAILURE = '[CONTACT DATA (HR)] Save Failure',

  HR_DELETE_AWAITING_APPROVAL_DATA = '[CONTACT DATA (HR)] Delete Awaiting Approval Data',

  HR_RESET_DATA = '[CONTACT DATA (HR)] Reset Data'
}

export class ShowEditorContact implements Action {
  readonly type = ContactActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorContact implements Action {
  readonly type = ContactActionTypes.HR_HIDE_EDITOR;
}


export class ShowViewerContact implements Action {
  readonly type = ContactActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerContact implements Action {
  readonly type = ContactActionTypes.HR_HIDE_VIEWER;
}


export class ProcessingContact implements Action {
  readonly type = ContactActionTypes.HR_PROCESSING;
}

export class NotProcessingContact implements Action {
  readonly type = ContactActionTypes.HR_NOT_PROCESSING;
}


export class LoadApprovedDataContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataContactSuccess implements Action {
  readonly type = ContactActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IContact) {}
}

export class LoadApprovedDataContactFailure implements Action {
  readonly type = ContactActionTypes.HR_LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadAwaitingApprovalDataContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataContactSuccess implements Action {
  readonly type = ContactActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IContact) {}
}

export class LoadAwaitingApprovalDataContactFailure implements Action {
  readonly type = ContactActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadResidentialStatesContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_RESIDENTIAL_STATES;

  constructor(
    public payload: { selectedResidentialCountry: INationalitySelectOption }
  ) {}
}

export class LoadResidentialStatesContactReady implements Action {
  readonly type = ContactActionTypes.HR_LOAD_RESIDENTIAL_STATES_READY;

  constructor(public payload: { raStateList: IStateSelectOption[] }) {}
}

export class LoadResidentialCitiesContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_RESIDENTIAL_CITIES;

  constructor(public payload: { selectedResidentialState: IStateSelectOption }) {}
}

export class LoadResidentialCitiesContactReady implements Action {
  readonly type = ContactActionTypes.HR_LOAD_RESIDENTIAL_CITIES_READY;

  constructor(public payload: { raCityList: ISelectOption[] }) {}
}

export class LoadPermanentStatesContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_PERMANENT_STATES;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadPermanentStatesContactReady implements Action {
  readonly type = ContactActionTypes.HR_LOAD_PERMANENT_STATES_READY;

  constructor(public payload: { paStateList: IStateSelectOption[] }) {}
}

export class LoadPermanentCitiesContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_PERMANENT_CITIES;

  constructor(public payload: { selectedPermanentState: IStateSelectOption }) {}
}

export class LoadPermanentCitiesContactReady implements Action {
  readonly type = ContactActionTypes.HR_LOAD_PERMANENT_CITIES_READY;

  constructor(public payload: { paCityList: ISelectOption[] }) {}
}


export class LoadNextOfKinStatesContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_NEXT_OF_KIN_STATES;

  constructor(public payload: { selectedNationality: INationalitySelectOption }) {}
}

export class LoadNextOfKinStatesContactReady implements Action {
  readonly type = ContactActionTypes.HR_LOAD_NEXT_OF_KIN_STATES_READY;

  constructor(public payload: { nokStateList: IStateSelectOption[] }) {}
}

export class LoadNextOfKinCitiesContact implements Action {
  readonly type = ContactActionTypes.HR_LOAD_NEXT_OF_KIN_CITIES;

  constructor(public payload: { selectedNextOfKinState: IStateSelectOption }) {}
}

export class LoadNextOfKinCitiesContactReady implements Action {
  readonly type = ContactActionTypes.HR_LOAD_NEXT_OF_KIN_CITIES_READY;

  constructor(public payload: { nokCityList: ISelectOption[] }) {}
}

export class SaveContact implements Action {
  readonly type = ContactActionTypes.HR_SAVE;

  constructor(public payload: { employeeId: number, employeeContactId: number, data: IContact }) {}
}

export class SaveContactSuccess implements Action {
  readonly type = ContactActionTypes.HR_SAVE_SUCCESS;
}

export class SaveContactFailure implements Action {
  readonly type =ContactActionTypes.HR_SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalDataContact implements Action {
  readonly type = ContactActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: { id: number, employeeId:number }) {}
}

export class ResetContactData implements Action {
  readonly type = ContactActionTypes.HR_RESET_DATA;
}

export type ContactActions =
  | ShowEditorContact
  | HideEditorContact
  | ShowViewerContact
  | HideViewerContact
  | ProcessingContact
  | NotProcessingContact
  | LoadApprovedDataContact
  | LoadApprovedDataContactSuccess
  | LoadApprovedDataContactFailure
  | LoadAwaitingApprovalDataContact
  | LoadAwaitingApprovalDataContactSuccess
  | LoadAwaitingApprovalDataContactFailure
  | LoadResidentialStatesContact
  | LoadResidentialStatesContactReady
  | LoadResidentialCitiesContact
  | LoadResidentialCitiesContactReady
  | LoadPermanentStatesContact
  | LoadPermanentStatesContactReady
  | LoadPermanentCitiesContact
  | LoadPermanentCitiesContactReady
  | LoadNextOfKinStatesContact
  | LoadNextOfKinStatesContactReady
  | LoadNextOfKinCitiesContact
  | LoadNextOfKinCitiesContactReady
  | SaveContact
  | SaveContactSuccess
  | SaveContactFailure
  | DeleteAwaitingApprovalDataContact
  | ResetContactData;
