import { Action } from '@ngrx/store';
 
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export enum ProfessionalQualificationsActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Clear Approved Data Map',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Awaiting Approval Data Success',



  LOAD_DOCUMENT = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Load Inline Document',


  SAVE = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONSL] Save Success',

  DELETE_APPROVED_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Delete Awaiting Approval Data',

  REMOVE_APPROVED_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Remove Approved Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Remove Awaiting Approval Data',

  REFRESH_DATA = '[MY PERSONAL DATA - PROFESSIONAL QUALIFICATIONS] Refresh Data',
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
}

export class LoadAwaitingApprovalDataProfessionalQualificationsSuccess implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IProfessionalQualification[]) { }
}


export class LoadDocumentProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
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

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.SAVE;

  constructor(public payload: { data: IProfessionalQualification, recordId: number, editMode: boolean }) { }
}


export class DeleteApprovedDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class DeleteAwaitingApprovalDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: { recordId: number }) { }
}


export class RemoveApprovedDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class RemoveAwaitingApprovalDataProfessionalQualifications implements Action {
  readonly type = ProfessionalQualificationsActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: { recordId: number }) {
  }
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
  | RemoveApprovedDataProfessionalQualifications
  | RemoveAwaitingApprovalDataProfessionalQualifications
  | LoadDataProfessionalQualifications;
