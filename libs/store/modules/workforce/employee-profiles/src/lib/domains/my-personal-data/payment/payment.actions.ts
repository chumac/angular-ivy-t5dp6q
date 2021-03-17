import { Action } from '@ngrx/store';

import { IPayment } from '@nutela/models/workforce/employee-profiles';

export enum PaymentActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - PAYMENT] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - PAYMENT] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - PAYMENT] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - PAYMENT] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - PAYMENT] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA -PAYMENT] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - PAYMENT] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - PAYMENT] Load Approved Data Success',
  LOAD_APPROVED_DATA_FAILURE = '[MY PERSONAL DATA - PAYMENT] Load Approved Data Failure',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - PAYMENT] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - PAYMENT] Load Awaiting Approval Data Success',
  LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[MY PERSONAL DATA - PAYMENT] Load Awaiting Approval Data Failure',

  SAVE = '[MY PERSONAL DATA - PAYMENT] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - PAYMENT] Save Success',
  SAVE_FAILURE = '[MY PERSONAL DATA - PAYMENT] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - PAYMENT] Delete Awaiting Approval Data'
}

export class ShowEditorPayment implements Action {
  readonly type = PaymentActionTypes.SHOW_EDITOR;
}

export class HideEditorPayment implements Action {
  readonly type = PaymentActionTypes.HIDE_EDITOR;
}


export class ShowViewerPayment implements Action {
  readonly type = PaymentActionTypes.SHOW_VIEWER;
}

export class HideViewerPayment implements Action {
  readonly type = PaymentActionTypes.HIDE_VIEWER;
}


export class ProcessingPayment implements Action {
  readonly type =PaymentActionTypes.PROCESSING;
}

export class NotProcessingPayment implements Action {
  readonly type = PaymentActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataPayment implements Action {
  readonly type = PaymentActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataPaymentSuccess implements Action {
  readonly type = PaymentActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPayment) {}
}

export class LoadApprovedDataPaymentFailure implements Action {
  readonly type = PaymentActionTypes.LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}


export class LoadAwaitingApprovalDataPayment implements Action {
  readonly type = PaymentActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataPaymentSuccess implements Action {
  readonly type = PaymentActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPayment) {}
}

export class LoadAwaitingApprovalDataPaymentFailure implements Action {
  readonly type = PaymentActionTypes.LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}


export class SavePayment implements Action {
  readonly type = PaymentActionTypes.SAVE;

  constructor(public payload: IPayment) {}
}

export class DeleteAwaitingApprovalDataPayment implements Action {
  readonly type = PaymentActionTypes.DELETE_AWAITING_APPROVAL_DATA;
}

export type PaymentActions =
  | ShowEditorPayment
  | HideEditorPayment
  | ShowViewerPayment
  | HideViewerPayment
  | ProcessingPayment
  | NotProcessingPayment
  | LoadApprovedDataPayment
  | LoadApprovedDataPaymentSuccess
  | LoadApprovedDataPaymentFailure
  | LoadAwaitingApprovalDataPayment
  | LoadAwaitingApprovalDataPaymentSuccess
  | LoadAwaitingApprovalDataPaymentFailure
  | SavePayment
  | DeleteAwaitingApprovalDataPayment;
