import { Action } from '@ngrx/store';

import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export enum ProfessionalQualificationsActionTypes {
  SHOW_EDITOR = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Show Editor',
  HIDE_EDITOR = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Hide Editor',

  SHOW_VIEWER = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Show Viewer',
  HIDE_VIEWER = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Hide Viewer',

  PROCESSING = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Processing',
  NOT_PROCESSING = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Not Processing',

  LOAD_APPROVED_DATA = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Clear Approved Data Map',

  LOAD_AWAITING_APPROVAL_DATA = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Awaiting Approval Data Success',



  LOAD_DOCUMENT = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Document Success',
  CLEAR_DOCUMENT = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Inline Document',


  SAVE = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Save',
  SAVE_SUCCESS = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONSL] Save Success',

  DELETE_APPROVED_DATA = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Delete APPROVED Approval Data',
  DELETE_AWAITING_APPROVAL_DATA = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Delete AWAITING Approval Data',

  REFRESH_DATA = 'HR PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Refresh Data',
}

export class ShowEditorProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.SHOW_EDITOR;
}

export class HideEditorProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.HIDE_EDITOR;
}


export class ShowViewerProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.SHOW_VIEWER;
}

export class HideViewerProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.HIDE_VIEWER;
}


export class ProcessingProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.PROCESSING;
}

export class NotProcessingProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId:number}) { }
}

export class LoadApprovedDataProfessionalQualificationsSuccess implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IProfessionalQualification[]) { }
}

export class LoadApprovedDataItemProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA_ITEM;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedDataItemProfessionalQualificationsSuccess implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS;

  constructor(public payload: IProfessionalQualification) {}
}

export class ClearApprovedDataMapProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.CLEAR_APPROVED_DATA_MAP;
}

export class LoadAwaitingApprovalDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId:number}) { }
}

export class LoadAwaitingApprovalDataProfessionalQualificationsSuccess implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IProfessionalQualification[]) { }
}


export class LoadDocumentProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean, employeeId:number}) {}
}

export class LoadDocumentProfessionalQualificationsSuccess implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class ClearDocumentProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.CLEAR_DOCUMENT;
}





export class LoadInlineDocumentProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean, employeeId:number}) {}
}


export class SaveProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.SAVE;

  constructor(public payload: { data: IProfessionalQualification, recordId: number, editMode: boolean, employeeId:number }) { }
}


export class DeleteApprovedDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: { recordId: number,employeeId:number }) { }
}

export class DeleteAwaitingApprovalDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: { recordId: number, employeeId:number }) { }
}

export class LoadDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.REFRESH_DATA;
}

export type ProfessionalQualificationsActions =
  | ShowEditorProfessionalQualifications
  | HideEditorProfessionalQualifications
  | ShowViewerProfessionalQualifications
  | HideViewerProfessionalQualifications
  | ProcessingProfessionalQualifications
  | NotProcessingProfessionalQualifications
  | LoadApprovedDataProfessionalQualifications
  | LoadApprovedDataProfessionalQualificationsSuccess
  | LoadApprovedDataItemProfessionalQualifications
  | LoadApprovedDataItemProfessionalQualificationsSuccess
  | ClearApprovedDataMapProfessionalQualifications
  | LoadAwaitingApprovalDataProfessionalQualifications
  | LoadAwaitingApprovalDataProfessionalQualificationsSuccess
  | LoadDocumentProfessionalQualifications
  | LoadDocumentProfessionalQualificationsSuccess
  | ClearDocumentProfessionalQualifications
  | LoadInlineDocumentProfessionalQualifications
  | SaveProfessionalQualifications
  | DeleteApprovedDataProfessionalQualifications
  | DeleteAwaitingApprovalDataProfessionalQualifications
  | LoadDataProfessionalQualifications;
