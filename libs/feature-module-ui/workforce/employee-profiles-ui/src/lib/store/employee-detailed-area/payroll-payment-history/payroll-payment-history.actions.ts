import { Action } from '@ngrx/store';
import { IPayrollPaymentHistory } from "@nutela/models/workforce/employee-profiles";

export enum PayrollPaymentHistoryActionTypes {
  HR_SHOW_EDITOR = '[PAYROLL PAYMENT HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[PAYROLL PAYMENT HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[PAYROLL PAYMENT HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[PAYROLL PAYMENT HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[PAYROLL PAYMENT HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[PAYROLL PAYMENT HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[PAYROLL PAYMENT HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[PAYROLL PAYMENT HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[PAYROLL PAYMENT HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[PAYROLL PAYMENT HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[PAYROLL PAYMENT HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[PAYROLL PAYMENT HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[PAYROLL PAYMENT HISTORY (HR)] Reset Data'
}

export class ShowEditorPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataPayrollPaymentHistorySuccess implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPayrollPaymentHistory[]) {}
}

export class LoadAwaitingApprovalDataPayrollPaymentHistory implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataPayrollPaymentHistorySuccess implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPayrollPaymentHistory[]) {}
}

export class ResetPayrollPaymentHistoryData implements Action {
  readonly type = PayrollPaymentHistoryActionTypes.HR_RESET_DATA;
}

export type PayrollPaymentHistoryActions = 
  | ShowEditorPayrollPaymentHistory
  | HideEditorPayrollPaymentHistory
  | ShowViewerPayrollPaymentHistory
  | HideViewerPayrollPaymentHistory
  | ProcessingPayrollPaymentHistory
  | NotProcessingPayrollPaymentHistory
  | LoadApprovedDataPayrollPaymentHistory
  | LoadApprovedDataPayrollPaymentHistorySuccess
  | LoadAwaitingApprovalDataPayrollPaymentHistory
  | LoadAwaitingApprovalDataPayrollPaymentHistorySuccess
  | ResetPayrollPaymentHistoryData;