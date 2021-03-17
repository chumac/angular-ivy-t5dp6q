import { Action } from '@ngrx/store';

import { IReferee } from '@nutela/models/workforce/employee-profiles';

export enum RefereeActionTypes {
  SHOW_EDITOR = '[HR PERSONAL DATA - PERSONAL REFEREE] Show Editor',
  HIDE_EDITOR = '[HR PERSONAL DATA - PERSONAL REFEREE] Hide Editor',

  SHOW_VIEWER = '[HR PERSONAL DATA - PERSONAL REFEREE] Show Viewer',
  HIDE_VIEWER = '[HR PERSONAL DATA - PERSONAL REFEREE] Hide Viewer',

  PROCESSING = '[HR PERSONAL DATA - PERSONAL REFEREE] Processing',
  NOT_PROCESSING = '[HR PERSONAL DATA - PERSONAL REFEREE] Not Processing',

  LOAD_APPROVED_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Awaiting Approval Data Success',

  LOAD_APPROVED_PHOTO = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Approved Photo',
  LOAD_APPROVED_PHOTO_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Approved Photo Success',


  LOAD_AWAITING_APPROVAL_PHOTO = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Awaiting Approval Photo',
  LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Awaiting Approval Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR PERSONAL DATA - PERSONAL REFEREE] Clear Viewer Photo',


  LOAD_DOCUMENT = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Document Success',
  CLEAR_DOCUMENT = '[HR PERSONAL DATA - PERSONAL REFEREE] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Inline Document Success',

  LOAD_INLINE_IMAGE = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Inline Document',
  LOAD_INLINE_IMAGE_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREE] Load Inline Document Success',

  SAVE = '[HR PERSONAL DATA - PERSONAL REFEREE] Save',
  SAVE_SUCCESS = '[HR PERSONAL DATA - PERSONAL REFEREEL] Save Success',

  DELETE_APPROVED_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Delete APRROVED Approval Data',
  DELETE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Delete AWAITING Approval Data',

  REMOVE_APPROVED_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Remove Awaiting Approval Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Remove Awaiting Approval Data',

  REFRESH_DATA = '[HR PERSONAL DATA - PERSONAL REFEREE] Refresh Data',
}

export class ShowEditorReferee implements Action {
  readonly type = RefereeActionTypes.SHOW_EDITOR;
}

export class HideEditorReferee implements Action {
  readonly type = RefereeActionTypes.HIDE_EDITOR;
}


export class ShowViewerReferee implements Action {
  readonly type = RefereeActionTypes.SHOW_VIEWER;
}

export class HideViewerReferee implements Action {
  readonly type = RefereeActionTypes.HIDE_VIEWER;
}


export class ProcessingReferee implements Action {
  readonly type = RefereeActionTypes.PROCESSING;
}

export class NotProcessingReferee implements Action {
  readonly type = RefereeActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadApprovedDataRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IReferee[]) {}
}

export class LoadAwaitingApprovalDataReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadAwaitingApprovalDataRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IReferee[]) {}
}


export class LoadDocumentReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean, employeeId:number}) {}
}

export class LoadDocumentRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReferee implements Action {
  readonly type = RefereeActionTypes.CLEAR_DOCUMENT;
}





export class LoadInlineDocumentReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean, employeeId:number}) {}
}

export class LoadInlineDocumentRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadInlineImageReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_INLINE_IMAGE;

  constructor(public payload: {recordId: number, isApproved: boolean, employeeId:number}) {}
}

export class LoadInlineImageRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_INLINE_IMAGE_SUCCESS;

  constructor(public payload: any) {}
}


export class SaveReferee implements Action {
  readonly type = RefereeActionTypes.SAVE;

  constructor(public payload: {data: IReferee, recordId: number, editMode: boolean, employeeId:number}) {}
}


export class DeleteApprovedDataReferee implements Action {
  readonly type = RefereeActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export class DeleteAwaitingApprovalDataReferee implements Action {
  readonly type = RefereeActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}


export class RemoveApprovedDataReferee implements Action {
  readonly type = RefereeActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveAwaitingApprovalDataReferee implements Action {
  readonly type = RefereeActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) { }
}

export class LoadApprovedPhotoReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_APPROVED_PHOTO;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export class LoadApprovedPhotoRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_APPROVED_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalPhotoReferee implements Action {
  readonly type = RefereeActionTypes.LOAD_AWAITING_APPROVAL_PHOTO;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export class LoadAwaitingApprovalPhotoRefereeSuccess implements Action {
  readonly type = RefereeActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoReferee implements Action {
  readonly type = RefereeActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadDataReferee implements Action {
  readonly type = RefereeActionTypes.REFRESH_DATA;
}

export type RefereeActions =
  | ShowEditorReferee
  | HideEditorReferee
  | ShowViewerReferee
  | HideViewerReferee
  | ProcessingReferee
  | NotProcessingReferee
  | LoadApprovedDataReferee
  | LoadApprovedDataRefereeSuccess
  | LoadAwaitingApprovalDataReferee
  | LoadAwaitingApprovalDataRefereeSuccess
  | LoadDocumentReferee
  | LoadDocumentRefereeSuccess
  | ClearDocumentReferee
  | LoadInlineDocumentReferee
  | LoadInlineDocumentRefereeSuccess
  | SaveReferee
  | DeleteApprovedDataReferee
  | DeleteAwaitingApprovalDataReferee
  | RemoveApprovedDataReferee
  | RemoveAwaitingApprovalDataReferee
  | LoadApprovedPhotoReferee
  | LoadApprovedPhotoRefereeSuccess
  | LoadAwaitingApprovalPhotoReferee
  | LoadAwaitingApprovalPhotoRefereeSuccess
  | ClearViewerPhotoReferee
  | LoadDataReferee
  | LoadInlineImageReferee
  | LoadInlineImageRefereeSuccess;
