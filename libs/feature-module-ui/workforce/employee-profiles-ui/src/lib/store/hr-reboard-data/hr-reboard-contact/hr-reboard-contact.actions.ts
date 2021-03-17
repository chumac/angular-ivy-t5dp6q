import { Action } from '@ngrx/store';

import { IContact } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum HrReboardContactActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - CONTACT] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - CONTACT] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - CONTACT] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - CONTACT] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - CONTACT] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - CONTACT] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - CONTACT] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - CONTACT] Load Data Success',
  LOAD_DATA_FAILURE = '[HR REBOARDING DATA - CONTACT] Load Data Failure',

  LOAD_NOK_PHOTO = '[HR REBOARDING DATA - CONTACT] Load Next-Of-Kin Photo',
  LOAD_NOK_PHOTO_SUCCESS = '[HR REBOARDING DATA - CONTACT] Load Next-Of-Kin Photo Success',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - CONTACT] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - CONTACT] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - CONTACT] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - CONTACT] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - CONTACT] Load Inline Document Success',


  LOAD_RESIDENTIAL_STATES = '[HR REBOARDING DATA - CONTACT] Load Residential States',
  LOAD_RESIDENTIAL_STATES_READY = '[HR REBOARDING DATA - CONTACT] Load Residential States Ready',

  LOAD_RESIDENTIAL_CITIES = '[HR REBOARDING DATA - CONTACT] Load Residential Cities',
  LOAD_RESIDENTIAL_CITIES_READY = '[HR REBOARDING DATA - CONTACT] Load Residential Cities Ready',

  LOAD_PERMANENT_STATES = '[HR REBOARDING DATA - CONTACT] Load Permanent State',
  LOAD_PERMANENT_STATES_READY = '[HR REBOARDING DATA - CONTACT] Load Permanent State Ready',

  LOAD_PERMANENT_CITIES = '[HR REBOARDING DATA - CONTACT] Load  Permanent Cities',
  LOAD_PERMANENT_CITIES_READY = '[HR REBOARDING DATA - CONTACT] Load Permanent Cities Ready',

  LOAD_NEXT_OF_KIN_STATES = '[HR REBOARDING DATA - CONTACT] Load Next Of Kin State',
  LOAD_NEXT_OF_KIN_STATES_READY = '[HR REBOARDING DATA - CONTACT] Load Next Of Kin State Ready',

  LOAD_NEXT_OF_KIN_CITIES = '[HR REBOARDING DATA - CONTACT] Load Next Of Kin Cities',
  LOAD_NEXT_OF_KIN_CITIES_READY = '[HR REBOARDING DATA - CONTACT] Load Next Of Kin Cities Ready',

  SAVE = '[HR REBOARDING DATA - CONTACT] Save',
  UPDATE = '[HR REBOARDING DATA - CONTACT] Save Update',
  DELETE_DATA = '[HR REBOARDING DATA - CONTACT] Delete Data',
}

export class ShowEditorHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.PROCESSING;
}

export class NotProcessingHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_DATA;

  constructor(public payload: { employeeId: number}) { }
}

export class LoadDataHrReboardContactSuccess implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IContact) {}
}

export class LoadDataHrReboardContactFailure implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadNextOfKinPhotoHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_NOK_PHOTO;

  constructor(public payload: {employeeId: number}) {}
}

export class LoadNextOfKinPhotoHrReboardContactSuccess implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_NOK_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDocumentHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHrReboardContactSuccess implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentHrReboardContactSuccess implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadResidentialStatesHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_RESIDENTIAL_STATES;

  constructor(
    public payload: { selectedResidentialCountry: INationalitySelectOption }
  ) {}
}

export class LoadResidentialStatesHrReboardContactReady implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_RESIDENTIAL_STATES_READY;

  constructor(public payload: { raStateList: IStateSelectOption[] }) {}
}

export class LoadResidentialCitiesHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES;

  constructor(public payload: { selectedResidentialState: IStateSelectOption }) {}
}

export class LoadResidentialCitiesHrReboardContactReady implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES_READY;

  constructor(public payload: { raCityList: ISelectOption[] }) {}
}

export class LoadPermanentStatesHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_PERMANENT_STATES;

  constructor(
    public payload: { selectedNationality: INationalitySelectOption }
  ) {}
}

export class LoadPermanentStatesHrReboardContactReady implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_PERMANENT_STATES_READY;

  constructor(public payload: { paStateList: IStateSelectOption[] }) {}
}

export class LoadPermanentCitiesHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_PERMANENT_CITIES;

  constructor(public payload: { selectedPermanentState: IStateSelectOption }) {}
}

export class LoadPermanentCitiesHrReboardContactReady implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_PERMANENT_CITIES_READY;

  constructor(public payload: { paCityList: ISelectOption[] }) {}
}

export class LoadNextOfKinStatesHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES;

  constructor(public payload: { selectedNationality: INationalitySelectOption }) {}
}

export class LoadNextOfKinStatesHrReboardContactReady implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES_READY;

  constructor(public payload: { nokStateList: IStateSelectOption[] }) {}
}

export class LoadNextOfKinCitiesHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES;

  constructor(public payload: { selectedNextOfKinState: IStateSelectOption }) {}
}

export class LoadNextOfKinCitiesHrReboardContactReady implements Action {
  readonly type = HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES_READY;

  constructor(public payload: { nokCityList: ISelectOption[] }) {}
}

export class DeleteDataHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.DELETE_DATA;

  constructor(public payload: { id: number, employeeId: number}) {}
}

export class SaveHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.SAVE;

  constructor(public payload: {employeeId: number, data: IContact}) {}
}

export class SaveUpdateHrReboardContact implements Action {
  readonly type = HrReboardContactActionTypes.UPDATE;

  constructor(public payload: {contactId: number, employeeId: number, data: IContact}) {}
}

export type HrReboardContactActions =
  | ShowEditorHrReboardContact
  | HideEditorHrReboardContact
  | ShowViewerHrReboardContact
  | HideViewerHrReboardContact
  | ProcessingHrReboardContact
  | NotProcessingHrReboardContact
  | LoadDataHrReboardContact
  | LoadDataHrReboardContactSuccess
  | LoadDataHrReboardContactFailure
  | LoadNextOfKinPhotoHrReboardContact
  | LoadNextOfKinPhotoHrReboardContactSuccess
  | LoadDocumentHrReboardContact
  | LoadDocumentHrReboardContactSuccess
  | ClearDocumentHrReboardContact
  | LoadInlineDocumentHrReboardContact
  | LoadInlineDocumentHrReboardContactSuccess
  | LoadResidentialStatesHrReboardContact
  | LoadResidentialStatesHrReboardContactReady
  | LoadResidentialCitiesHrReboardContact
  | LoadResidentialCitiesHrReboardContactReady
  | LoadPermanentStatesHrReboardContact
  | LoadPermanentStatesHrReboardContactReady
  | LoadPermanentCitiesHrReboardContact
  | LoadPermanentCitiesHrReboardContactReady
  | LoadNextOfKinStatesHrReboardContact
  | LoadNextOfKinStatesHrReboardContactReady
  | LoadNextOfKinCitiesHrReboardContact
  | LoadNextOfKinCitiesHrReboardContactReady
  | DeleteDataHrReboardContact
  | SaveHrReboardContact
  | SaveUpdateHrReboardContact;
