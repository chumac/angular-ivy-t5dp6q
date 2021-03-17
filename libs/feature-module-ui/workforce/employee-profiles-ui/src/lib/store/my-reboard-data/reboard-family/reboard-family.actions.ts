import { Action } from '@ngrx/store';

import { IFamily } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum ReboardFamilyActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - FAMILY] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - FAMILY] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - FAMILY] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - FAMILY] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - FAMILY] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - FAMILY] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - FAMILY] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - FAMILY] Load Data Success',

  LOAD_PHOTO = '[MY REBOARDING DATA - PERSONAL FAMILY] Load Photo',
  LOAD_PHOTO_SUCCESS = '[MY REBOARDING DATA - PERSONAL FAMILY] Load Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY REBOARDING DATA - PERSONAL FAMILY] Clear Viewer Photo',

  LOAD_STATES = '[MY REBOARDING DATA - FAMILY] Load States',
  LOAD_STATES_READY = '[MY REBOARDING DATA - FAMILY] Load States Ready',

  LOAD_CITIES = '[MY REBOARDING DATA - FAMILY] Load Cities',
  LOAD_CITIES_READY = '[MY REBOARDING DATA - FAMILY] Load Cities Ready',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - FAMILY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - FAMILY] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - FAMILY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - FAMILY] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - FAMILY] Load Inline Document Success',

  SAVE = '[MY REBOARDING DATA - FAMILY] Save',
  UPDATE = '[MY REBOARDING DATA - FAMILY] Save Update',
  DELETE_DATA = '[MY REBOARDING DATA - FAMILY] Delete Data',
}

export class ShowEditorReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.PROCESSING;
}

export class NotProcessingReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_DATA;

}

export class LoadDataReboardFamilySuccess implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFamily[]) {}
}

export class LoadStatesReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_STATES ;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesReboardFamilyReady implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesReboardFamilyReady implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadDocumentReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardFamilySuccess implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentReboardFamilySuccess implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.SAVE;

  constructor(public payload: {data: IFamily}) {}
}

export class SaveUpdateReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.UPDATE;

  constructor(public payload: {data: IFamily, recordId: number}) {}
}

export class DeleteDataReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class LoadPhotoReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPhotoReboardFamilySuccess implements Action {
  readonly type = ReboardFamilyActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoReboardFamily implements Action {
  readonly type = ReboardFamilyActionTypes.CLEAR_VIEWER_PHOTO;
}

export type ReboardFamilyActions =
  | ShowEditorReboardFamily
  | HideEditorReboardFamily
  | ShowViewerReboardFamily
  | HideViewerReboardFamily
  | ProcessingReboardFamily
  | NotProcessingReboardFamily
  | LoadDataReboardFamily
  | LoadDataReboardFamilySuccess
  | LoadStatesReboardFamily
  | LoadStatesReboardFamilyReady
  | LoadCitiesReboardFamily
  | LoadCitiesReboardFamilyReady
  | LoadDocumentReboardFamily
  | LoadDocumentReboardFamilySuccess
  | ClearDocumentReboardFamily
  | LoadInlineDocumentReboardFamily
  | LoadInlineDocumentReboardFamilySuccess
  | SaveReboardFamily
  | SaveUpdateReboardFamily
  | DeleteDataReboardFamily
  | LoadPhotoReboardFamily
  | LoadPhotoReboardFamilySuccess
  | ClearViewerPhotoReboardFamily
  | LoadDataReboardFamily;
