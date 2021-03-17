import { Action } from '@ngrx/store';

import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { INationality } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';

export enum ReboardEducationActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - EDUCATION] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - EDUCATION] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - EDUCATION] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - EDUCATION] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - EDUCATION] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - EDUCATION] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - EDUCATION] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - EDUCATION] Load Data Success',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - EDUCATION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - EDUCATION] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - EDUCATION] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - EDUCATION] Load Inline Document',

  LOAD_ALL_INSTITUTION_LIST = '[MY REBOARDING DATA - EDUCATION] Load All Institutions List',

  LOAD_INSTITUTION_LIST = '[MY REBOARDING DATA - EDUCATION] Load Institutions List',
  LOAD_INSTITUTION_LIST_SUCCESS = '[MY REBOARDING DATA - EDUCATION] Load Institutions List Success',

  LOAD_COUNTRY_LIST = '[MY REBOARDING DATA - EDUCATION] Load Country List',
  LOAD_COUNTRY_LIST_SUCCESS = '[MY REBOARDING DATA - EDUCATION] Load Country List Success',

  LOAD_DATA_ITEM = '[ MY REBOARDING DATA - EDUCATION ] Load Data Item',
  LOAD_DATA_ITEM_SUCCESS = '[ MY REBOARDING DATA - EDUCATION ] Load Data Item Success',
  CLEAR_DATA_MAP = '[ MY REBOARDING DATA - EDUCATION ] Clear Data Map',

  SAVE = '[MY REBOARDING DATA - EDUCATION] Save',
  UPDATE = '[MY REBOARDING DATA - EDUCATION] Save Update',
  SAVE_SUCCESS = '[MY REBOARDING DATA - EDUCATION] Save Success',
  DELETE_DATA = '[MY REBOARDING DATA - EDUCATION] Delete Data',
}

export class ShowEditorReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.PROCESSING;
}

export class NotProcessingReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_DATA;
}

export class LoadDataReboardEducationSuccess implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEducation[]) {}
}

export class LoadAllInstitutionsReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_ALL_INSTITUTION_LIST;
  // constructor(public payload: {countryCode: string}) {}

}

export class LoadInstitutionsReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_INSTITUTION_LIST;
  constructor(public payload: {countryCode: string}) {}

}

export class LoadInstitutionsReboardEducationSuccess implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_INSTITUTION_LIST_SUCCESS;

  constructor(public payload: INationality[]) {}
}

export class LoadCountryListReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_COUNTRY_LIST;
}

export class LoadCountryListReboardEducationSuccess implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_COUNTRY_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDocumentReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardEducationSuccess implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class SaveReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.SAVE;

  constructor(public payload: {data: IEducation}) {}
}


export class DeleteDataReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class SaveUpdateReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.UPDATE;

  constructor(public payload: {data: IEducation, recordId: number}) {}
}


export class LoadDataItemReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_DATA_ITEM;

  constructor(public payload: { recordId: number }) { }
}

export class LoadDataItemReboardEducationSuccess implements Action {
  readonly type = ReboardEducationActionTypes.LOAD_DATA_ITEM_SUCCESS;

  constructor(public payload: IEducation) { }
}

export class ClearDataMapReboardEducation implements Action {
  readonly type = ReboardEducationActionTypes.CLEAR_DATA_MAP;
}


export type ReboardEducationActions =
  | ShowEditorReboardEducation
  | HideEditorReboardEducation
  | ShowViewerReboardEducation
  | HideViewerReboardEducation
  | ProcessingReboardEducation
  | NotProcessingReboardEducation
  | LoadDataReboardEducation
  | LoadDataReboardEducationSuccess
  | LoadAllInstitutionsReboardEducation
  | LoadInstitutionsReboardEducation
  | LoadInstitutionsReboardEducationSuccess
  | LoadCountryListReboardEducation
  | LoadCountryListReboardEducationSuccess
  | LoadDocumentReboardEducation
  | LoadDocumentReboardEducationSuccess
  | ClearDocumentReboardEducation
  | LoadInlineDocumentReboardEducation
  | SaveReboardEducation
  | SaveUpdateReboardEducation
  | ClearDataMapReboardEducation
  | LoadDataItemReboardEducation
  | LoadDataItemReboardEducationSuccess
  | DeleteDataReboardEducation;
