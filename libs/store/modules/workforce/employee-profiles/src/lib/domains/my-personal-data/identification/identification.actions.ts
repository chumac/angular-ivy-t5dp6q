import { Action } from '@ngrx/store';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';

export enum IdentificationActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - IDENTIFICATION] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - IDENTIFICATION] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - IDENTIFICATION] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - IDENTIFICATION] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - IDENTIFICATION] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA -IDENTIFICATION] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - IDENTIFICATION] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - IDENTIFICATION] Load Approved Data Success',
  LOAD_APPROVED_DATA_FAILURE = '[MY PERSONAL DATA - IDENTIFICATION] Load Approved Data Failure',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - IDENTIFICATION] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - IDENTIFICATION] Load Awaiting Approval Data Success',
  LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[MY PERSONAL DATA - IDENTIFICATION] Load Awaiting Approval Data Failure',

  LOAD_SIGNATURE_IMAGE = '[MY PERSONAL DATA - IDENTIFICATION PHOTO] Load signature Image',
  LOAD_SIGNATURE_IMAGE_SUCCESS = '[MY PERSONAL DATA - IDENTIFICATION PHOTO] Load signature Image Data Success',

  LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE = '[MY PERSONAL DATA - IDENTIFICATION PHOTO] Load Awaiting Approval Signature Image',
  LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE_SUCCESS = '[MY PERSONAL DATA - IDENTIFICATION PHOTO] Load Awaiting Approval Signature Image Success',

  SAVE = '[MY PERSONAL DATA - IDENTIFICATION] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - IDENTIFICATION] Save Success',
  SAVE_FAILURE = '[MY PERSONAL DATA - IDENTIFICATION] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - IDENTIFICATION] Delete Awaiting Approval Data'
}

export class ShowEditorIdentification implements Action {
  readonly type = IdentificationActionTypes.SHOW_EDITOR;
}

export class HideEditorIdentification implements Action {
  readonly type = IdentificationActionTypes.HIDE_EDITOR;
}


export class ShowViewerIdentification implements Action {
  readonly type = IdentificationActionTypes.SHOW_VIEWER;
}

export class HideViewerIdentification implements Action {
  readonly type = IdentificationActionTypes.HIDE_VIEWER;
}


export class ProcessingIdentification implements Action {
  readonly type =IdentificationActionTypes.PROCESSING;
}

export class NotProcessingIdentification implements Action {
  readonly type = IdentificationActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataIdentification implements Action {
  readonly type = IdentificationActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataIdentificationSuccess implements Action {
  readonly type = IdentificationActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IIdentification) {}
}

export class LoadApprovedDataIdentificationFailure implements Action {
  readonly type = IdentificationActionTypes.LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}




export class LoadAwaitingApprovalDataIdentification implements Action {
  readonly type = IdentificationActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataIdentificationSuccess implements Action {
  readonly type = IdentificationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IIdentification) {}
}

export class LoadAwaitingApprovalDataIdentificationFailure implements Action {
  readonly type = IdentificationActionTypes.LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}




export class LoadSignatureImage implements Action {
  readonly type =IdentificationActionTypes.LOAD_SIGNATURE_IMAGE;
}

export class LoadSignatureImageSuccess implements Action {
  readonly type = IdentificationActionTypes.LOAD_SIGNATURE_IMAGE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadAwaitingApprovalSignatureImage implements Action {
  readonly type = IdentificationActionTypes.LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE;

  constructor() {}
}

export class LoadAwaitingApprovalSignatureImageSuccess implements Action {
  readonly type = IdentificationActionTypes.LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE_SUCCESS;

  constructor(public payload: any) {}
}


export class SaveIdentification implements Action {
  readonly type = IdentificationActionTypes.SAVE;

  constructor(public payload: IIdentification) {}
}

export class DeleteAwaitingApprovalDataIdentification implements Action {
  readonly type = IdentificationActionTypes.DELETE_AWAITING_APPROVAL_DATA;
}

export type IdentificationActions =
  | ShowEditorIdentification
  | HideEditorIdentification
  | ShowViewerIdentification
  | HideViewerIdentification
  | ProcessingIdentification
  | NotProcessingIdentification
  | LoadApprovedDataIdentification
  | LoadApprovedDataIdentificationSuccess
  | LoadApprovedDataIdentificationFailure
  | LoadAwaitingApprovalDataIdentification
  | LoadAwaitingApprovalDataIdentificationSuccess
  | LoadAwaitingApprovalDataIdentificationFailure
  | LoadSignatureImage
  | LoadSignatureImageSuccess
  | SaveIdentification
  | DeleteAwaitingApprovalDataIdentification
  | LoadAwaitingApprovalSignatureImage
  | LoadAwaitingApprovalSignatureImageSuccess;
