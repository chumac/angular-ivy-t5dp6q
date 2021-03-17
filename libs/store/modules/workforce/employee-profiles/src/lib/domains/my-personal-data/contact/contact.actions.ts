import { Action } from '@ngrx/store';

import { IContact } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum ContactActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - CONTACT] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - CONTACT] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - CONTACT] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - CONTACT] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - CONTACT] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - CONTACT] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - CONTACT] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - CONTACT] Load Approved Data Success',
  LOAD_APPROVED_DATA_FAILURE = '[MY PERSONAL DATA - CONTACT] Load Approved Data Failure',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - CONTACT] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - CONTACT] Load Awaiting Approval Data Success',
  LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[MY PERSONAL DATA - CONTACT] Load Awaiting Approval Data Failure',



  LOAD_APPROVED_NOK_PHOTO = '[MY PERSONAL DATA - CONTACT] Load Approved Next-Of-Kin Photo',
  LOAD_APPROVED_NOK_PHOTO_SUCCESS = '[MY PERSONAL DATA - CONTACT] Load Approved Next-Of-Kin Photo Success',


  LOAD_AWAITING_APPROVAL_NOK_PHOTO = '[MY PERSONAL DATA - CONTACT] Load Awaiting Approval Next-Of-Kin Photo',
  LOAD_AWAITING_APPROVAL_NOK_PHOTO_SUCCESS = '[MY PERSONAL DATA - CONTACT] Load Awaiting Approval Next-Of-Kin Photo Success',

  LOAD_DOCUMENT = '[MY PERSONAL DATA - CONTACT] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - CONTACT] Load Document Success',
  CLEAR_DOCUMENT = '[MY PERSONAL DATA - CONTACT] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY PERSONAL DATA - CONTACT] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - CONTACT] Load Inline Document Success',


  LOAD_RESIDENTIAL_STATES = '[MY PERSONAL DATA - CONTACT] Load Residential States',
  LOAD_RESIDENTIAL_STATES_READY = '[MY PERSONAL DATA - CONTACT] Load Residential States Ready',

  LOAD_RESIDENTIAL_CITIES = '[MY PERSONAL DATA - CONTACT] Load Residential Cities',
  LOAD_RESIDENTIAL_CITIES_READY = '[MY PERSONAL DATA - CONTACT] Load Residential Cities Ready',

  LOAD_PERMANENT_STATES = '[MY PERSONAL DATA - CONTACT] Load Permanent State',
  LOAD_PERMANENT_STATES_READY = '[MY PERSONAL DATA - CONTACT] Load Permanent State Ready',

  LOAD_PERMANENT_CITIES = '[MY PERSONAL DATA - CONTACT] Load  Permanent Cities',
  LOAD_PERMANENT_CITIES_READY = '[MY PERSONAL DATA - CONTACT] Load Permanent Cities Ready',

  LOAD_NEXT_OF_KIN_STATES = '[MY PERSONAL DATA - CONTACT] Load Next Of Kin State',
  LOAD_NEXT_OF_KIN_STATES_READY = '[MY PERSONAL DATA - CONTACT] Load Next Of Kin State Ready',

  LOAD_NEXT_OF_KIN_CITIES = '[MY PERSONAL DATA - CONTACT] Load Next Of Kin Cities',
  LOAD_NEXT_OF_KIN_CITIES_READY = '[MY PERSONAL DATA - CONTACT] Load Next Of Kin Cities Ready',

  SAVE = '[MY PERSONAL DATA - CONTACT] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - CONTACTL] Save Success',
  SAVE_FAILURE = '[MY PERSONAL DATA - CONTACT] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - CONTACT] Delete Awaiting Approval Data',
}

export class ShowEditorContact implements Action {
  readonly type = ContactActionTypes.SHOW_EDITOR;
}

export class HideEditorContact implements Action {
  readonly type = ContactActionTypes.HIDE_EDITOR;
}


export class ShowViewerContact implements Action {
  readonly type = ContactActionTypes.SHOW_VIEWER;
}

export class HideViewerContact implements Action {
  readonly type = ContactActionTypes.HIDE_VIEWER;
}


export class ProcessingContact implements Action {
  readonly type = ContactActionTypes.PROCESSING;
}

export class NotProcessingContact implements Action {
  readonly type = ContactActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataContact implements Action {
  readonly type = ContactActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataContactSuccess implements Action {
  readonly type = ContactActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IContact) {}
}

export class LoadApprovedDataContactFailure implements Action {
  readonly type = ContactActionTypes.LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadAwaitingApprovalDataContact implements Action {
  readonly type = ContactActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataContactSuccess implements Action {
  readonly type = ContactActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IContact) {}
}

export class LoadAwaitingApprovalDataContactFailure implements Action {
  readonly type = ContactActionTypes.LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadNextOfKinPhoto implements Action {
  readonly type = ContactActionTypes.LOAD_APPROVED_NOK_PHOTO;

  constructor() {}
}

export class LoadNextOfKinPhotoSuccess implements Action {
  readonly type = ContactActionTypes.LOAD_APPROVED_NOK_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalNextOfKinPhoto implements Action {
  readonly type = ContactActionTypes.LOAD_AWAITING_APPROVAL_NOK_PHOTO;

  constructor() {}
}

export class LoadAwaitingApprovalNextOfKinPhotoSuccess implements Action {
  readonly type = ContactActionTypes.LOAD_AWAITING_APPROVAL_NOK_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDocumentContact implements Action {
  readonly type = ContactActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentContactSuccess implements Action {
  readonly type = ContactActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentContact implements Action {
  readonly type = ContactActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentContact implements Action {
  readonly type = ContactActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentContactSuccess implements Action {
  readonly type = ContactActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}






export class LoadResidentialStatesContact implements Action {
  readonly type = ContactActionTypes.LOAD_RESIDENTIAL_STATES;

  constructor(
    public payload: { selectedResidentialCountry: INationalitySelectOption }
  ) {}
}

export class LoadResidentialStatesContactReady implements Action {
  readonly type = ContactActionTypes.LOAD_RESIDENTIAL_STATES_READY;

  constructor(public payload: { raStateList: IStateSelectOption[] }) {}
}

export class LoadResidentialCitiesContact implements Action {
  readonly type = ContactActionTypes.LOAD_RESIDENTIAL_CITIES;

  constructor(public payload: { selectedResidentialState: IStateSelectOption }) {}
}

export class LoadResidentialCitiesContactReady implements Action {
  readonly type = ContactActionTypes.LOAD_RESIDENTIAL_CITIES_READY;

  constructor(public payload: { raCityList: ISelectOption[] }) {}
}

export class LoadPermanentStatesContact implements Action {
  readonly type = ContactActionTypes.LOAD_PERMANENT_STATES;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadPermanentStatesContactReady implements Action {
  readonly type = ContactActionTypes.LOAD_PERMANENT_STATES_READY;

  constructor(public payload: { paStateList: IStateSelectOption[] }) {}
}



export class LoadPermanentCitiesContact implements Action {
  readonly type = ContactActionTypes.LOAD_PERMANENT_CITIES;

  constructor(public payload: { selectedPermanentState: IStateSelectOption }) {}
}

export class LoadPermanentCitiesContactReady implements Action {
  readonly type = ContactActionTypes.LOAD_PERMANENT_CITIES_READY;

  constructor(public payload: { paCityList: ISelectOption[] }) {}
}





export class LoadNextOfKinStatesContact implements Action {
  readonly type = ContactActionTypes.LOAD_NEXT_OF_KIN_STATES;

  constructor(public payload: { selectedNationality: INationalitySelectOption }) {}
}

export class LoadNextOfKinStatesContactReady implements Action {
  readonly type = ContactActionTypes.LOAD_NEXT_OF_KIN_STATES_READY;

  constructor(public payload: { nokStateList: IStateSelectOption[] }) {}
}

export class LoadNextOfKinCitiesContact implements Action {
  readonly type = ContactActionTypes.LOAD_NEXT_OF_KIN_CITIES;

  constructor(public payload: { selectedNextOfKinState: IStateSelectOption }) {}
}

export class LoadNextOfKinCitiesContactReady implements Action {
  readonly type = ContactActionTypes.LOAD_NEXT_OF_KIN_CITIES_READY;

  constructor(public payload: { nokCityList: ISelectOption[] }) {}
}

export class SaveContact implements Action {
  readonly type = ContactActionTypes.SAVE;

  constructor(public payload: IContact) {}
}

export class SaveContactSuccess implements Action {
  readonly type = ContactActionTypes.SAVE_SUCCESS;
}

export class SaveContactFailure implements Action {
  readonly type =ContactActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalDataContact implements Action {
  readonly type = ContactActionTypes.DELETE_AWAITING_APPROVAL_DATA;
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
  | LoadNextOfKinPhoto
  | LoadNextOfKinPhotoSuccess
  | LoadAwaitingApprovalNextOfKinPhoto
  | LoadAwaitingApprovalNextOfKinPhotoSuccess
  | LoadDocumentContact
  | LoadDocumentContactSuccess
  | ClearDocumentContact
  | LoadInlineDocumentContact
  | LoadInlineDocumentContactSuccess
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
  | DeleteAwaitingApprovalDataContact;
