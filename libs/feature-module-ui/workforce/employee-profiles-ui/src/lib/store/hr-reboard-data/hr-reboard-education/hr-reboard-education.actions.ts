import { Action } from '@ngrx/store';

import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { INationality } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';

export enum HrReboardEducationActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - EDUCATION] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - EDUCATION] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - EDUCATION] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - EDUCATION] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - EDUCATION] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - EDUCATION] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - EDUCATION] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - EDUCATION] Load Data Success',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - EDUCATION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - EDUCATION] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - EDUCATION] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - EDUCATION] Load Inline Document',

  LOAD_ALL_INSTITUTION_LIST = '[HR REBOARDING DATA - EDUCATION] Load All Institutions List',

  LOAD_INSTITUTION_LIST = '[HR REBOARDING DATA - EDUCATION] Load Institutions List',
  LOAD_INSTITUTION_LIST_SUCCESS = '[HR REBOARDING DATA - EDUCATION] Load Institutions List Success',

  LOAD_COUNTRY_LIST = '[HR REBOARDING DATA - EDUCATION] Load Country List',
  LOAD_COUNTRY_LIST_SUCCESS = '[HR REBOARDING DATA - EDUCATION] Load Country List Success',

  SAVE = '[HR REBOARDING DATA - EDUCATION] Save',
  UPDATE = '[HR REBOARDING DATA - EDUCATION] Save Update',
  SAVE_SUCCESS = '[HR REBOARDING DATA - EDUCATION] Save Success',
  DELETE_DATA = '[HR REBOARDING DATA - EDUCATION] Delete Data',
}

export class ShowEditorHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.PROCESSING;
}

export class NotProcessingHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_DATA;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadDataHrReboardEducationSuccess implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEducation[]) {}
}

export class LoadAllInstitutionsHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_ALL_INSTITUTION_LIST;
  // constructor(public payload: {countryCode: string}) {}

}

export class LoadInstitutionsHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_INSTITUTION_LIST;
  constructor(public payload: {countryCode: string}) {}

}

export class LoadInstitutionsHrReboardEducationSuccess implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_INSTITUTION_LIST_SUCCESS;

  constructor(public payload: INationality[]) {}
}

export class LoadCountryListHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_COUNTRY_LIST;
}

export class LoadCountryListHrReboardEducationSuccess implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_COUNTRY_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDocumentHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHrReboardEducationSuccess implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.CLEAR_DOCUMENT;
}

export class DeleteDataHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.DELETE_DATA;

  constructor(public payload: {employeeId: number, educationId: number }) {}
}

export class LoadInlineDocumentHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class SaveHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.SAVE;

  constructor(public payload: {data: IEducation, employeeId: number}) {}
}

export class SaveUpdateHrReboardEducation implements Action {
  readonly type = HrReboardEducationActionTypes.UPDATE;

  constructor(public payload: {data: IEducation, recordId: number, employeeId: number}) {}
}

export type HrReboardEducationActions =
  | ShowEditorHrReboardEducation
  | HideEditorHrReboardEducation
  | ShowViewerHrReboardEducation
  | HideViewerHrReboardEducation
  | ProcessingHrReboardEducation
  | NotProcessingHrReboardEducation
  | LoadDataHrReboardEducation
  | LoadDataHrReboardEducationSuccess
  | LoadAllInstitutionsHrReboardEducation
  | LoadInstitutionsHrReboardEducation
  | LoadInstitutionsHrReboardEducationSuccess
  | LoadCountryListHrReboardEducation
  | LoadCountryListHrReboardEducationSuccess
  | LoadDocumentHrReboardEducation
  | LoadDocumentHrReboardEducationSuccess
  | ClearDocumentHrReboardEducation
  | LoadInlineDocumentHrReboardEducation
  | DeleteDataHrReboardEducation
  | SaveHrReboardEducation
  | SaveUpdateHrReboardEducation;
