import { Action } from '@ngrx/store';
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';

export enum CommendationActionTypes {
  LOAD_APPROVED_DATA = '[HR_TRANSACTION - COMMENDATIONS] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR_TRANSACTION - COMMENDATIONS] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR_TRANSACTION - COMMENDATIONS] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR_TRANSACTION - COMMENDATIONS] Load Awaiting Approval Data Success',

  LOAD_ROLE_TYPES = '[HR_TRANSACTION - COMMENDATIONS] Load Role Types',
  LOAD_ROLE_TYPES_SUCCESS = '[HR_TRANSACTION - COMMENDATIONS] Load Role Types Success',

  SHOW_EDITOR = '[HR_TRANSACTION - COMMENDATIONS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - COMMENDATIONS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - COMMENDATIONS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - COMMENDATIONS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - COMMENDATIONS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - COMMENDATIONS] Not Processing',

  LOAD_DOCUMENT = '[HR_TRANSACTION - COMMENDATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION - COMMENDATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION - COMMENDATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION - COMMENDATIONS] Load Inline Document',

  ADD = '[HR_TRANSACTION - COMMENDATIONS] Add',
  ADD_SUCCESS = '[HR_TRANSACTION - COMMENDATIONS] Add Success',

  SAVE = '[HR_TRANSACTION - COMMENDATIONS] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - COMMENDATIONS] Save Success',

  DELETE_DATA = '[HR_TRANSACTION - COMMENDATIONS] Delete Data',
}

export class LoadApprovedDataCommendation implements Action {
  readonly type = CommendationActionTypes.LOAD_APPROVED_DATA;
  
  constructor() {}
}
export class LoadApprovedDataCommendationSuccess implements Action {
  readonly type = CommendationActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ICommendationTransaction[]) {}
}

export class LoadAwaitingApprovalDataCommendation implements Action {
  readonly type = CommendationActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  
  constructor() {}
}
export class LoadAwaitingApprovalDataCommendationSuccess implements Action {
  readonly type = CommendationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ICommendationTransaction[]) {}
}

export class LoadRoleTypeCommendation implements Action {
  readonly type = CommendationActionTypes.LOAD_ROLE_TYPES;
  
  constructor() {}
}
export class LoadRoleTypeCommendationSuccess implements Action {
  readonly type = CommendationActionTypes.LOAD_ROLE_TYPES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class ShowEditorCommendation implements Action {
  readonly type = CommendationActionTypes.SHOW_EDITOR;
}

export class HideEditorCommendation implements Action {
  readonly type = CommendationActionTypes.HIDE_EDITOR;
}
export class ShowViewerCommendation implements Action {
  readonly type = CommendationActionTypes.SHOW_VIEWER;
}

export class HideViewerCommendation implements Action {
  readonly type = CommendationActionTypes.HIDE_VIEWER;
}

export class ProcessingCommendation implements Action {
  readonly type = CommendationActionTypes.PROCESSING;
}
export class NotProcessingCommendation implements Action {
  readonly type = CommendationActionTypes.NOT_PROCESSING;
}
export class LoadDocumentCommendation implements Action {
  readonly type = CommendationActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}
export class LoadDocumentCommendationSuccess implements Action {
  readonly type = CommendationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}
export class ClearDocumentCommendation implements Action {
  readonly type = CommendationActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentCommendation implements Action {
  readonly type = CommendationActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class AddCommendation implements Action {
  readonly type = CommendationActionTypes.ADD;

  constructor(public payload: {data: ICommendationTransaction}) {}
}

export class SaveCommendation implements Action {
  readonly type = CommendationActionTypes.SAVE;

  constructor(public payload: {data: ICommendationTransaction, recordId: number, editMode: boolean}) {}
}

export class DeleteDataCommendation implements Action {
  readonly type = CommendationActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type CommendationActions =
| ShowEditorCommendation
| HideEditorCommendation
| ShowViewerCommendation
| HideViewerCommendation
| ProcessingCommendation
| NotProcessingCommendation
| LoadApprovedDataCommendation
| LoadApprovedDataCommendationSuccess
| LoadAwaitingApprovalDataCommendation
| LoadAwaitingApprovalDataCommendationSuccess
| LoadRoleTypeCommendation
| LoadRoleTypeCommendationSuccess
| LoadDocumentCommendation
| LoadDocumentCommendationSuccess
| ClearDocumentCommendation
| LoadInlineDocumentCommendation
| SaveCommendation
| AddCommendation
| DeleteDataCommendation;

