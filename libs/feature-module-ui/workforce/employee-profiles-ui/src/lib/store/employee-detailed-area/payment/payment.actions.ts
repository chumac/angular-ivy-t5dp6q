import { Action } from '@ngrx/store';

import { IPayment } from '@nutela/models/workforce/employee-profiles';

export enum PaymentActionTypes {
  HR_SHOW_EDITOR = '[PAYMENT (HR)] Show Editor',
  HR_HIDE_EDITOR = '[PAYMENT (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[PAYMENT (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[PAYMENT (HR)] Hide Viewer',

  HR_PROCESSING = '[PAYMENT (HR)] Processing',
  HR_NOT_PROCESSING = '[AYMENT] (HR) Not Processing',

  HR_LOAD_APPROVED_DATA = '[PAYMENT (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[PAYMENT (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[PAYMENT (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[PAYMENT (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[PAYMENT (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[PAYMENT (HR)] Load Awaiting Approval Data Failure',

  HR_SAVE = '[PAYMENT (HR)] Save',
  HR_SAVE_SUCCESS = '[PAYMENT (HR)] Save Success',
  HR_SAVE_FAILURE = '[PAYMENT (HR)] Save Failure',

  HR_DELETE_AWAITING_APPROVAL_DATA = '[PAYMENT (HR)] Delete Awaiting Approval Data',

  HR_RESET_DATA = '[PAYMENT (HR)] Reset Data'
}

export class ShowEditorPayment implements Action {
  readonly type = PaymentActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorPayment implements Action {
  readonly type = PaymentActionTypes.HR_HIDE_EDITOR;
}


export class ShowViewerPayment implements Action {
  readonly type = PaymentActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerPayment implements Action {
  readonly type = PaymentActionTypes.HR_HIDE_VIEWER;
}


export class ProcessingPayment implements Action {
  readonly type =PaymentActionTypes.HR_PROCESSING;
}

export class NotProcessingPayment implements Action {
  readonly type = PaymentActionTypes.HR_NOT_PROCESSING;
}


export class LoadApprovedDataPayment implements Action {
  readonly type = PaymentActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataPaymentSuccess implements Action {
  readonly type = PaymentActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPayment) {}
}

export class LoadApprovedDataPaymentFailure implements Action {
  readonly type = PaymentActionTypes.HR_LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}


export class LoadAwaitingApprovalDataPayment implements Action {
  readonly type = PaymentActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataPaymentSuccess implements Action {
  readonly type = PaymentActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPayment) {}
}

export class LoadAwaitingApprovalDataPaymentFailure implements Action {
  readonly type = PaymentActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}


export class SavePayment implements Action {
  readonly type = PaymentActionTypes.HR_SAVE;

  constructor(public payload: { employeeId: number, employeeDetailId: number, data: IPayment }) {}
}

export class DeleteAwaitingApprovalDataPayment implements Action {
  readonly type = PaymentActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA;
  
  constructor(public payload: { employeeId: number, id: number }) {}
}

export class ResetPaymentData implements Action {
  readonly type = PaymentActionTypes.HR_RESET_DATA;
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
  | DeleteAwaitingApprovalDataPayment
  | ResetPaymentData;
