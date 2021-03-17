import { Action } from '@ngrx/store';
import { IWorkflowTransaction } from "@nutela/models/workforce/employee-profiles";

export enum WorkflowTransactionActionTypes {
  HR_SHOW_EDITOR = '[WORKFLOW TRANSACTION (HR)] Show Editor',
  HR_HIDE_EDITOR = '[WORKFLOW TRANSACTION (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[WORKFLOW TRANSACTION (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[WORKFLOW TRANSACTION (HR)] Hide Viewer',

  HR_PROCESSING = '[WORKFLOW TRANSACTION (HR)] Processing',
  HR_NOT_PROCESSING = '[WORKFLOW TRANSACTION (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[WORKFLOW TRANSACTION (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[WORKFLOW TRANSACTION (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[WORKFLOW TRANSACTION (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[WORKFLOW TRANSACTION (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[WORKFLOW TRANSACTION (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[WORKFLOW TRANSACTION (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[WORKFLOW TRANSACTION (HR)] Reset Data'
}

export class ShowEditorWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_PROCESSING;
}

export class NotProcessingWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataWorkflowTransactionSuccess implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IWorkflowTransaction[]) {}
}

export class LoadAwaitingApprovalDataWorkflowTransaction implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataWorkflowTransactionSuccess implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IWorkflowTransaction[]) {}
}

export class ResetWorkflowTransactionData implements Action {
  readonly type = WorkflowTransactionActionTypes.HR_RESET_DATA;
}

export type WorkflowTransactionActions = 
  | ShowEditorWorkflowTransaction
  | HideEditorWorkflowTransaction
  | ShowViewerWorkflowTransaction
  | HideViewerWorkflowTransaction
  | ProcessingWorkflowTransaction
  | NotProcessingWorkflowTransaction
  | LoadApprovedDataWorkflowTransaction
  | LoadApprovedDataWorkflowTransactionSuccess
  | LoadAwaitingApprovalDataWorkflowTransaction
  | LoadAwaitingApprovalDataWorkflowTransactionSuccess
  | ResetWorkflowTransactionData;