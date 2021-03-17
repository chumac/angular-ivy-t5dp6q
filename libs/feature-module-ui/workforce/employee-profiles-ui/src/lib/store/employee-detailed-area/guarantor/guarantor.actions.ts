import { Action } from '@ngrx/store';

import { IGuarantor } from '@nutela/models/workforce/employee-profiles';

export enum GuarantorActionTypes {
  SHOW_EDITOR = '[HR PERSONAL DATA - GUARANTOR] Show Editor',
  HIDE_EDITOR = '[HR PERSONAL DATA - GUARANTOR] Hide Editor',

  SHOW_VIEWER = '[HR PERSONAL DATA - GUARANTOR] Show Viewer',
  HIDE_VIEWER = '[HR PERSONAL DATA - GUARANTOR] Hide Viewer',

  PROCESSING = '[HR PERSONAL DATA - GUARANTOR] Processing',
  NOT_PROCESSING = '[HR PERSONAL DATA - GUARANTOR] Not Processing',

  LOAD_APPROVED_DATA = '[HR PERSONAL DATA - GUARANTOR] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR PERSONAL DATA - GUARANTOR] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - GUARANTOR] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PERSONAL DATA - GUARANTOR] Load Awaiting Approval Data Success',


  LOAD_APPROVED_PHOTO = '[HR PERSONAL DATA - GUARANTOR] Load Approved Photo',
  LOAD_APPROVED_PHOTO_SUCCESS = '[HR PERSONAL DATA - GUARANTOR] Load Approved Photo Success',


  LOAD_AWAITING_APPROVAL_PHOTO = '[HR PERSONAL DATA - GUARANTOR] Load Awaiting Approval Photo',
  LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS = '[HR PERSONAL DATA - GUARANTOR] Load Awaiting Approval Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR PERSONAL DATA - GUARANTOR] Clear Viewer Photo',


  LOAD_DOCUMENT = '[HR PERSONAL DATA - GUARANTOR] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR PERSONAL DATA - GUARANTOR] Load Document Success',
  CLEAR_DOCUMENT = '[HR PERSONAL DATA - GUARANTOR] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR PERSONAL DATA - GUARANTOR] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[HR PERSONAL DATA - GUARANTOR] Load Inline Document Success',


  SAVE = '[HR PERSONAL DATA - GUARANTOR] Save',
  SAVE_SUCCESS = '[HR PERSONAL DATA - GUARANTORL] Save Success',

  DELETE_APPROVED_DATA = '[HR PERSONAL DATA - GUARANTOR] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - GUARANTOR] Delete Awaiting Approval Data',

  REMOVE_APPROVED_DATA = '[HR PERSONAL DATA - GUARANTOR] Removed Approved Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - GUARANTOR] Remove Awaiting Approval Data',

  REFRESH_DATA = '[HR PERSONAL DATA - GUARANTOR] Refresh Data',
}

export class ShowEditorGuarantor implements Action {
  readonly type = GuarantorActionTypes.SHOW_EDITOR;
}

export class HideEditorGuarantor implements Action {
  readonly type = GuarantorActionTypes.HIDE_EDITOR;
}


export class ShowViewerGuarantor implements Action {
  readonly type = GuarantorActionTypes.SHOW_VIEWER;
}

export class HideViewerGuarantor implements Action {
  readonly type = GuarantorActionTypes.HIDE_VIEWER;
}


export class ProcessingGuarantor implements Action {
  readonly type = GuarantorActionTypes.PROCESSING;
}

export class NotProcessingGuarantor implements Action {
  readonly type = GuarantorActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadApprovedDataGuarantorSuccess implements Action {
  readonly type = GuarantorActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IGuarantor[]) {}
}

export class LoadAwaitingApprovalDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadAwaitingApprovalDataGuarantorSuccess implements Action {
  readonly type = GuarantorActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IGuarantor[]) {}
}


export class LoadDocumentGuarantor implements Action {
  readonly type = GuarantorActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentGuarantorSuccess implements Action {
  readonly type = GuarantorActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentGuarantor implements Action {
  readonly type = GuarantorActionTypes.CLEAR_DOCUMENT;
}





export class LoadInlineDocumentGuarantor implements Action {
  readonly type = GuarantorActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentGuarantorSuccess implements Action {
  readonly type = GuarantorActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}


export class SaveGuarantor implements Action {
  readonly type = GuarantorActionTypes.SAVE;

  constructor(public payload: {data: IGuarantor, recordId: number, editMode: boolean, employeeId: number}) {}
}


export class DeleteApprovedDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class DeleteAwaitingApprovalDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}


export class RemoveApprovedDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class RemoveAwaitingApprovalDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {

  }
}

export class LoadApprovedPhotoGuarantor implements Action {
  readonly type = GuarantorActionTypes.LOAD_APPROVED_PHOTO;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadApprovedPhotoGuarantorSuccess implements Action {
  readonly type = GuarantorActionTypes.LOAD_APPROVED_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalPhotoGuarantor implements Action {
  readonly type = GuarantorActionTypes.LOAD_AWAITING_APPROVAL_PHOTO;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadAwaitingApprovalPhotoGuarantorSuccess implements Action {
  readonly type = GuarantorActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoGuarantor implements Action {
  readonly type = GuarantorActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadDataGuarantor implements Action {
  readonly type = GuarantorActionTypes.REFRESH_DATA;
}

export type GuarantorActions =
  | ShowEditorGuarantor
  | HideEditorGuarantor
  | ShowViewerGuarantor
  | HideViewerGuarantor
  | ProcessingGuarantor
  | NotProcessingGuarantor
  | LoadApprovedDataGuarantor
  | LoadApprovedDataGuarantorSuccess
  | LoadAwaitingApprovalDataGuarantor
  | LoadAwaitingApprovalDataGuarantorSuccess
  | LoadDocumentGuarantor
  | LoadDocumentGuarantorSuccess
  | ClearDocumentGuarantor
  | LoadInlineDocumentGuarantor
  | LoadInlineDocumentGuarantorSuccess
  | SaveGuarantor
  | DeleteApprovedDataGuarantor
  | DeleteAwaitingApprovalDataGuarantor
  | RemoveApprovedDataGuarantor
  | RemoveAwaitingApprovalDataGuarantor
  | LoadApprovedPhotoGuarantor
  | LoadApprovedPhotoGuarantorSuccess
  | LoadAwaitingApprovalPhotoGuarantor
  | LoadAwaitingApprovalPhotoGuarantorSuccess
  | ClearViewerPhotoGuarantor
  | LoadDataGuarantor;
