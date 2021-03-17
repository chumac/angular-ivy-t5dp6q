import { Action } from '@ngrx/store';

import { IContact, IReboardContact } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum ReboardContactActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - CONTACT] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - CONTACT] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - CONTACT] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - CONTACT] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - CONTACT] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - CONTACT] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - CONTACT] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - CONTACT] Load Data Success',
  LOAD_DATA_FAILURE = '[MY REBOARDING DATA - CONTACT] Load Data Failure',

  LOAD_NOK_PHOTO = '[MY REBOARDING DATA - CONTACT] Load Next-Of-Kin Photo',
  LOAD_NOK_PHOTO_SUCCESS = '[MY REBOARDING DATA - CONTACT] Load Next-Of-Kin Photo Success',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - CONTACT] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - CONTACT] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - CONTACT] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - CONTACT] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - CONTACT] Load Inline Document Success',


  LOAD_RESIDENTIAL_STATES = '[MY REBOARDING DATA - CONTACT] Load Residential States',
  LOAD_RESIDENTIAL_STATES_READY = '[MY REBOARDING DATA - CONTACT] Load Residential States Ready',

  LOAD_RESIDENTIAL_CITIES = '[MY REBOARDING DATA - CONTACT] Load Residential Cities',
  LOAD_RESIDENTIAL_CITIES_READY = '[MY REBOARDING DATA - CONTACT] Load Residential Cities Ready',

  LOAD_PERMANENT_STATES = '[MY REBOARDING DATA - CONTACT] Load Permanent State',
  LOAD_PERMANENT_STATES_READY = '[MY REBOARDING DATA - CONTACT] Load Permanent State Ready',

  LOAD_PERMANENT_CITIES = '[MY REBOARDING DATA - CONTACT] Load  Permanent Cities',
  LOAD_PERMANENT_CITIES_READY = '[MY REBOARDING DATA - CONTACT] Load Permanent Cities Ready',

  LOAD_NEXT_OF_KIN_STATES = '[MY REBOARDING DATA - CONTACT] Load Next Of Kin State',
  LOAD_NEXT_OF_KIN_STATES_READY = '[MY REBOARDING DATA - CONTACT] Load Next Of Kin State Ready',

  LOAD_NEXT_OF_KIN_CITIES = '[MY REBOARDING DATA - CONTACT] Load Next Of Kin Cities',
  LOAD_NEXT_OF_KIN_CITIES_READY = '[MY REBOARDING DATA - CONTACT] Load Next Of Kin Cities Ready',

  SAVE = '[MY REBOARDING DATA - CONTACT] Save',
  UPDATE = '[MY REBOARDING DATA - CONTACT] Save Update',
}

export class ShowEditorReboardContact implements Action {
  readonly type = ReboardContactActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardContact implements Action {
  readonly type = ReboardContactActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardContact implements Action {
  readonly type = ReboardContactActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardContact implements Action {
  readonly type = ReboardContactActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardContact implements Action {
  readonly type = ReboardContactActionTypes.PROCESSING;
}

export class NotProcessingReboardContact implements Action {
  readonly type = ReboardContactActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_DATA;
}

export class LoadDataReboardContactSuccess implements Action {
  readonly type = ReboardContactActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IReboardContact) {}
}

export class LoadDataReboardContactFailure implements Action {
  readonly type = ReboardContactActionTypes.LOAD_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadNextOfKinPhotoReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_NOK_PHOTO;

  constructor() {}
}

export class LoadNextOfKinPhotoReboardContactSuccess implements Action {
  readonly type = ReboardContactActionTypes.LOAD_NOK_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDocumentReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardContactSuccess implements Action {
  readonly type = ReboardContactActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReboardContact implements Action {
  readonly type = ReboardContactActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentReboardContactSuccess implements Action {
  readonly type = ReboardContactActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadResidentialStatesReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_RESIDENTIAL_STATES;

  constructor(
    public payload: { selectedResidentialCountry: INationalitySelectOption }
  ) {}
}

export class LoadResidentialStatesReboardContactReady implements Action {
  readonly type = ReboardContactActionTypes.LOAD_RESIDENTIAL_STATES_READY;

  constructor(public payload: { raStateList: IStateSelectOption[] }) {}
}

export class LoadResidentialCitiesReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES;

  constructor(public payload: { selectedResidentialState: IStateSelectOption }) {}
}

export class LoadResidentialCitiesReboardContactReady implements Action {
  readonly type = ReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES_READY;

  constructor(public payload: { raCityList: ISelectOption[] }) {}
}

export class LoadPermanentStatesReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_PERMANENT_STATES;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadPermanentStatesReboardContactReady implements Action {
  readonly type = ReboardContactActionTypes.LOAD_PERMANENT_STATES_READY;

  constructor(public payload: { paStateList: IStateSelectOption[] }) {}
}

export class LoadPermanentCitiesReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_PERMANENT_CITIES;

  constructor(public payload: { selectedPermanentState: IStateSelectOption }) {}
}

export class LoadPermanentCitiesReboardContactReady implements Action {
  readonly type = ReboardContactActionTypes.LOAD_PERMANENT_CITIES_READY;

  constructor(public payload: { paCityList: ISelectOption[] }) {}
}

export class LoadNextOfKinStatesReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES;

  constructor(public payload: { selectedNationality: INationalitySelectOption }) {}
}

export class LoadNextOfKinStatesReboardContactReady implements Action {
  readonly type = ReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES_READY;

  constructor(public payload: { nokStateList: IStateSelectOption[] }) {}
}

export class LoadNextOfKinCitiesReboardContact implements Action {
  readonly type = ReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES;

  constructor(public payload: { selectedNextOfKinState: IStateSelectOption }) {}
}

export class LoadNextOfKinCitiesReboardContactReady implements Action {
  readonly type = ReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES_READY;

  constructor(public payload: { nokCityList: ISelectOption[] }) {}
}

export class SaveReboardContact implements Action {
  readonly type = ReboardContactActionTypes.SAVE;

  constructor(public payload: IContact) {}
}

export class SaveUpdateReboardContact implements Action {
  readonly type = ReboardContactActionTypes.UPDATE;

  constructor(public payload: {data: IContact}) {}
}

export type ReboardContactActions =
  | ShowEditorReboardContact
  | HideEditorReboardContact
  | ShowViewerReboardContact
  | HideViewerReboardContact
  | ProcessingReboardContact
  | NotProcessingReboardContact
  | LoadDataReboardContact
  | LoadDataReboardContactSuccess
  | LoadDataReboardContactFailure
  | LoadNextOfKinPhotoReboardContact
  | LoadNextOfKinPhotoReboardContactSuccess
  | LoadDocumentReboardContact
  | LoadDocumentReboardContactSuccess
  | ClearDocumentReboardContact
  | LoadInlineDocumentReboardContact
  | LoadInlineDocumentReboardContactSuccess
  | LoadResidentialStatesReboardContact
  | LoadResidentialStatesReboardContactReady
  | LoadResidentialCitiesReboardContact
  | LoadResidentialCitiesReboardContactReady
  | LoadPermanentStatesReboardContact
  | LoadPermanentStatesReboardContactReady
  | LoadPermanentCitiesReboardContact
  | LoadPermanentCitiesReboardContactReady
  | LoadNextOfKinStatesReboardContact
  | LoadNextOfKinStatesReboardContactReady
  | LoadNextOfKinCitiesReboardContact
  | LoadNextOfKinCitiesReboardContactReady
  | SaveReboardContact
  | SaveUpdateReboardContact;
