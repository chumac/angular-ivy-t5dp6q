import { Action } from '@ngrx/store';
import { IPromotionHistory } from "@nutela/models/workforce/employee-profiles";

export enum PromotionHistoryActionTypes {
  HR_SHOW_EDITOR = '[PROMOTION HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[PROMOTION HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[PROMOTION HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[PROMOTION HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[PROMOTION HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[PROMOTION HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[PROMOTION HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[PROMOTION HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[PROMOTION HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[PROMOTION HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[PROMOTION HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[PROMOTION HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[PROMOTION HISTORY (HR)] Reset Data'
}

export class ShowEditorPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataPromotionHistorySuccess implements Action {
  readonly type = PromotionHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPromotionHistory[]) {}
}

export class LoadAwaitingApprovalDataPromotionHistory implements Action {
  readonly type = PromotionHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataPromotionHistorySuccess implements Action {
  readonly type = PromotionHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPromotionHistory[]) {}
}

export class ResetPromotionHistoryData implements Action {
  readonly type = PromotionHistoryActionTypes.HR_RESET_DATA;
}

export type PromotionHistoryActions = 
  | ShowEditorPromotionHistory
  | HideEditorPromotionHistory
  | ShowViewerPromotionHistory
  | HideViewerPromotionHistory
  | ProcessingPromotionHistory
  | NotProcessingPromotionHistory
  | LoadApprovedDataPromotionHistory
  | LoadApprovedDataPromotionHistorySuccess
  | LoadAwaitingApprovalDataPromotionHistory
  | LoadAwaitingApprovalDataPromotionHistorySuccess
  | ResetPromotionHistoryData;