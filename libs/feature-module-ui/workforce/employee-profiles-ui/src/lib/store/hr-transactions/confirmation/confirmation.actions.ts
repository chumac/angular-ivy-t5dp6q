import { Action } from '@ngrx/store';
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';

export enum ConfirmationActionTypes {
  LOAD_APPROVED_DATA = '[HR_TRANSACTION - CONFIRMATIONS] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR_TRANSACTION - CONFIRMATIONS] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR_TRANSACTION - CONFIRMATIONS] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR_TRANSACTION - CONFIRMATIONS] Load Awaiting Approval Data Success',

  LOAD_TRANSACTION_TYPES = '[HR_TRANSACTION - CONFIRMATIONS] Load Transaction Types',
  LOAD_TRANSACTION_TYPES_SUCCESS = '[HR_TRANSACTION - CONFIRMATIONS] Load Transaction Types Success',

  SHOW_EDITOR = '[HR_TRANSACTION - CONFIRMATIONS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - CONFIRMATIONS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - CONFIRMATIONS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - CONFIRMATIONS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - CONFIRMATIONS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - CONFIRMATIONS] Not Processing',

  LOAD_DOCUMENT = '[HR_TRANSACTION - CONFIRMATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION - CONFIRMATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION - CONFIRMATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION - CONFIRMATIONS] Load Inline Document',

  ADD = '[HR_TRANSACTION - CONFIRMATIONS] Add',
  ADD_SUCCESS = '[HR_TRANSACTION - CONFIRMATIONS] Add Success',

  SAVE = '[HR_TRANSACTION - CONFIRMATIONS] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - CONFIRMATIONS] Save Success',

  DELETE_DATA = '[HR_TRANSACTION - CONFIRMATIONS] Delete Data',
}

export class LoadApprovedDataConfirmation implements Action {
  readonly type = ConfirmationActionTypes.LOAD_APPROVED_DATA;
  
  constructor() {}
}
export class LoadApprovedDataConfirmationSuccess implements Action {
  readonly type = ConfirmationActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IConfirmationTransaction[]) {}
}

export class LoadAwaitingApprovalDataConfirmation implements Action {
  readonly type = ConfirmationActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  
  constructor() {}
}
export class LoadAwaitingApprovalDataConfirmationSuccess implements Action {
  readonly type = ConfirmationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IConfirmationTransaction[]) {}
}

export class LoadTransactionTypeConfirmation implements Action {
  readonly type = ConfirmationActionTypes.LOAD_TRANSACTION_TYPES;
  
  constructor() {}
}
export class LoadTransactionTypeConfirmationSuccess implements Action {
  readonly type = ConfirmationActionTypes.LOAD_TRANSACTION_TYPES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class ShowEditorConfirmation implements Action {
  readonly type = ConfirmationActionTypes.SHOW_EDITOR;
}

export class HideEditorConfirmation implements Action {
  readonly type = ConfirmationActionTypes.HIDE_EDITOR;
}
export class ShowViewerConfirmation implements Action {
  readonly type = ConfirmationActionTypes.SHOW_VIEWER;
}

export class HideViewerConfirmation implements Action {
  readonly type = ConfirmationActionTypes.HIDE_VIEWER;
}

export class ProcessingConfirmation implements Action {
  readonly type = ConfirmationActionTypes.PROCESSING;
}
export class NotProcessingConfirmation implements Action {
  readonly type = ConfirmationActionTypes.NOT_PROCESSING;
}
export class LoadDocumentConfirmation implements Action {
  readonly type = ConfirmationActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}
export class LoadDocumentConfirmationSuccess implements Action {
  readonly type = ConfirmationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}
export class ClearDocumentConfirmation implements Action {
  readonly type = ConfirmationActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentConfirmation implements Action {
  readonly type = ConfirmationActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class AddConfirmation implements Action {
  readonly type = ConfirmationActionTypes.ADD;

  constructor(public payload: {data: IConfirmationTransaction}) {}
}

export class SaveConfirmation implements Action {
  readonly type = ConfirmationActionTypes.SAVE;

  constructor(public payload: {data: IConfirmationTransaction, recordId: number, editMode: boolean}) {}
}

export class DeleteDataConfirmation implements Action {
  readonly type = ConfirmationActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type ConfirmationActions =
| ShowEditorConfirmation
| HideEditorConfirmation
| ShowViewerConfirmation
| HideViewerConfirmation
| ProcessingConfirmation
| NotProcessingConfirmation
| LoadApprovedDataConfirmation
| LoadApprovedDataConfirmationSuccess
| LoadAwaitingApprovalDataConfirmation
| LoadAwaitingApprovalDataConfirmationSuccess
| LoadTransactionTypeConfirmation
| LoadTransactionTypeConfirmationSuccess
| LoadDocumentConfirmation
| LoadDocumentConfirmationSuccess
| ClearDocumentConfirmation
| LoadInlineDocumentConfirmation
| SaveConfirmation
| AddConfirmation
| DeleteDataConfirmation;

