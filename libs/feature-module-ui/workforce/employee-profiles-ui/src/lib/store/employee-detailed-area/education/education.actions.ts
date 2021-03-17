import { Action } from '@ngrx/store';
import { INationality } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';
import { IEducation } from '@nutela/models/workforce/employee-profiles';

export enum EducationActionTypes {
  SHOW_EDITOR = '[HR PERSONAL DATA - EDUCATION] Show Editor',
  HIDE_EDITOR = '[HR PERSONAL DATA - EDUCATION] Hide Editor',

  SHOW_VIEWER = '[HR PERSONAL DATA - EDUCATION] Show Viewer',
  HIDE_VIEWER = '[HR PERSONAL DATA - EDUCATION] Hide Viewer',

  PROCESSING = '[HR PERSONAL DATA - EDUCATION] Processing',
  NOT_PROCESSING = '[HR PERSONAL DATA - EDUCATION] Not Processing',

  LOAD_APPROVED_DATA = '[HR PERSONAL DATA - EDUCATION] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = '[HR PERSONAL DATA - EDUCATION] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = '[HR PERSONAL DATA - EDUCATION] Clear Approved Data Map',


  LOAD_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - EDUCATION] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Load Awaiting Approval Data Success',


  LOAD_DOCUMENT = '[HR PERSONAL DATA - EDUCATION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Load Document Success',
  CLEAR_DOCUMENT = '[HR PERSONAL DATA - EDUCATION] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR PERSONAL DATA - EDUCATION] Load Inline Document',

  LOAD_ALL_INSTITUTION_LIST = '[HR PERSONAL DATA - EDUCATION] Load All Institutions List',

  LOAD_INSTITUTION_LIST = '[HR PERSONAL DATA - EDUCATION] Load Institutions List',
  LOAD_INSTITUTION_LIST_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Load Institutions List Success',

  LOAD_COUNTRY_LIST = '[HR PERSONAL DATA - EDUCATION] Load Country List',
  LOAD_COUNTRY_LIST_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Load Country List Success',

  SAVE = '[HR PERSONAL DATA - EDUCATION] Save',
  SAVE_SUCCESS = '[HR PERSONAL DATA - EDUCATION] Save Success',

  DELETE_APPROVED_DATA = '[HR PERSONAL DATA - EDUCATION] Delete APPROVED Approval Data',
  DELETE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - EDUCATION] Delete AWAITING Approval Data',

  REMOVE_APPROVED_DATA = '[HR PERSONAL DATA - EDUCATION] Delete Awaiting Approval Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - EDUCATION] Delete Awaiting Approval Data',

  REFRESH_DATA = '[HR PERSONAL DATA - EDUCATION] Refresh Data',
}

export class ShowEditorEducation implements Action {
  readonly type = EducationActionTypes.SHOW_EDITOR;
}

export class HideEditorEducation implements Action {
  readonly type = EducationActionTypes.HIDE_EDITOR;
}


export class ShowViewerEducation implements Action {
  readonly type = EducationActionTypes.SHOW_VIEWER;
}

export class HideViewerEducation implements Action {
  readonly type = EducationActionTypes.HIDE_VIEWER;
}


export class ProcessingEducation implements Action {
  readonly type = EducationActionTypes.PROCESSING;
}

export class NotProcessingEducation implements Action {
  readonly type = EducationActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataEducation implements Action {
  readonly type = EducationActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadApprovedDataEducationSuccess implements Action {
  readonly type = EducationActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IEducation[]) {}
}

export class LoadApprovedDataItemEducation implements Action {
  readonly type = EducationActionTypes.LOAD_APPROVED_DATA_ITEM;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedDataItemEducationSuccess implements Action {
  readonly type = EducationActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS;

  constructor(public payload: IEducation) {}
}


export class LoadAllInstitutionsEducation implements Action {
  readonly type = EducationActionTypes.LOAD_ALL_INSTITUTION_LIST;
  // constructor(public payload: {countryCode: string}) {}

}
export class LoadInstitutionsEducation implements Action {
  readonly type = EducationActionTypes.LOAD_INSTITUTION_LIST;
  constructor(public payload: {countryCode: string}) {}

}

export class LoadInstitutionsEducationSuccess implements Action {
  readonly type = EducationActionTypes.LOAD_INSTITUTION_LIST_SUCCESS;

  constructor(public payload: INationality[]) {}
}

export class LoadCountryListEducation implements Action {
  readonly type = EducationActionTypes.LOAD_COUNTRY_LIST;
}

export class LoadCountryListEducationSuccess implements Action {
  readonly type = EducationActionTypes.LOAD_COUNTRY_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class ClearApprovedDataMapEducation implements Action {
  readonly type = EducationActionTypes.CLEAR_APPROVED_DATA_MAP;
}

export class LoadAwaitingApprovalDataEducation implements Action {
  readonly type = EducationActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadAwaitingApprovalDataEducationSuccess implements Action {
  readonly type = EducationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IEducation[]) {}
}


export class LoadDocumentEducation implements Action {
  readonly type = EducationActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, employeeId: number, isApproved: boolean}) {}
}

export class LoadDocumentEducationSuccess implements Action {
  readonly type = EducationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentEducation implements Action {
  readonly type = EducationActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentEducation implements Action {
  readonly type = EducationActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, employeeId: number, isApproved: boolean}) {}
}


export class SaveEducation implements Action {
  readonly type = EducationActionTypes.SAVE;

  constructor(public payload: {data: IEducation, recordId: number, editMode: boolean, employeeId:number}) {}
}


export class DeleteApprovedDataEducation implements Action {
  readonly type = EducationActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export class DeleteAwaitingApprovalDataEducation implements Action {
  readonly type = EducationActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export type EducationActions =
  | ShowEditorEducation
  | HideEditorEducation
  | ShowViewerEducation
  | HideViewerEducation
  | ProcessingEducation
  | NotProcessingEducation
  | LoadApprovedDataEducation
  | LoadApprovedDataEducationSuccess
  | LoadApprovedDataItemEducation
  | LoadApprovedDataItemEducationSuccess
  | ClearApprovedDataMapEducation
  | LoadAwaitingApprovalDataEducation
  | LoadAwaitingApprovalDataEducationSuccess
  | LoadDocumentEducation
  | LoadDocumentEducationSuccess
  | ClearDocumentEducation
  | LoadInlineDocumentEducation
  | SaveEducation
  | DeleteApprovedDataEducation
  | DeleteAwaitingApprovalDataEducation
  | LoadAllInstitutionsEducation
  | LoadInstitutionsEducation
  | LoadInstitutionsEducationSuccess
  | LoadCountryListEducation
  | LoadCountryListEducationSuccess;
