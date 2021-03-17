import { Action } from '@ngrx/store';

import { IFamily } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum HrReboardFamilyActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - FAMILY] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - FAMILY] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - FAMILY] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - FAMILY] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - FAMILY] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - FAMILY] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - FAMILY] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - FAMILY] Load Data Success',

  LOAD_PHOTO = '[HR REBOARDING DATA - PERSONAL FAMILY] Load Photo',
  LOAD_PHOTO_SUCCESS = '[HR REBOARDING DATA - PERSONAL FAMILY] Load Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR REBOARDING DATA - PERSONAL FAMILY] Clear Viewer Photo',

  LOAD_STATES = '[HR REBOARDING DATA - FAMILY] Load States',
  LOAD_STATES_READY = '[HR REBOARDING DATA - FAMILY] Load States Ready',

  LOAD_CITIES = '[HR REBOARDING DATA - FAMILY] Load Cities',
  LOAD_CITIES_READY = '[HR REBOARDING DATA - FAMILY] Load Cities Ready',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - FAMILY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - FAMILY] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - FAMILY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - FAMILY] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - FAMILY] Load Inline Document Success',

  SAVE = '[HR REBOARDING DATA - FAMILY] Save',
  UPDATE = '[HR REBOARDING DATA - FAMILY] Save Update',
  DELETE_DATA = '[HR REBOARDING DATA - FAMILY] Delete Data',
}

export class ShowEditorHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.PROCESSING;
}

export class NotProcessingHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_DATA;
  constructor(public payload: {employeeId: number}) { }
}

export class LoadDataHrReboardFamilySuccess implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFamily[]) {}
}

export class LoadStatesHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_STATES ;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesHrReboardFamilyReady implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesHrReboardFamilyReady implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadDocumentHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadDocumentHrReboardFamilySuccess implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadInlineDocumentHrReboardFamilySuccess implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.SAVE;

  constructor(public payload: {data: IFamily, employeeId: number}) {}
}

export class SaveUpdateHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.UPDATE;

  constructor(public payload: {data: IFamily, recordId: number, employeeId: number}) {}
}

export class LoadPhotoHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class DeleteDataHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.DELETE_DATA;

  constructor(public payload: {employeeId: number, familyId: number}) {}
}

export class LoadPhotoHrReboardFamilySuccess implements Action {
  readonly type = HrReboardFamilyActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoHrReboardFamily implements Action {
  readonly type = HrReboardFamilyActionTypes.CLEAR_VIEWER_PHOTO;
}

export type HrReboardFamilyActions =
  | ShowEditorHrReboardFamily
  | HideEditorHrReboardFamily
  | ShowViewerHrReboardFamily
  | HideViewerHrReboardFamily
  | ProcessingHrReboardFamily
  | NotProcessingHrReboardFamily
  | LoadDataHrReboardFamily
  | LoadDataHrReboardFamilySuccess
  | LoadStatesHrReboardFamily
  | LoadStatesHrReboardFamilyReady
  | LoadCitiesHrReboardFamily
  | LoadCitiesHrReboardFamilyReady
  | LoadDocumentHrReboardFamily
  | LoadDocumentHrReboardFamilySuccess
  | ClearDocumentHrReboardFamily
  | LoadInlineDocumentHrReboardFamily
  | LoadInlineDocumentHrReboardFamilySuccess
  | SaveHrReboardFamily
  | SaveUpdateHrReboardFamily
  | LoadPhotoHrReboardFamily
  | LoadPhotoHrReboardFamilySuccess
  | ClearViewerPhotoHrReboardFamily
  | DeleteDataHrReboardFamily
  | LoadDataHrReboardFamily;
