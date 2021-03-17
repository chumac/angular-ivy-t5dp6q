import { Action } from '@ngrx/store';
import { ITrainingHistory } from "@nutela/models/workforce/employee-profiles";

export enum TrainingHistoryActionTypes {
  HR_SHOW_EDITOR = '[TRAINING HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[TRAINING HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[TRAINING HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[TRAINING HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[TRAINING HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[TRAINING HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[TRAINING HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[TRAINING HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[TRAINING HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[TRAINING HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[TRAINING HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[TRAINING HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[TRAINING HISTORY (HR)] Reset Data'
}

export class ShowEditorTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataTrainingHistorySuccess implements Action {
  readonly type = TrainingHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ITrainingHistory[]) {}
}

export class LoadAwaitingApprovalDataTrainingHistory implements Action {
  readonly type = TrainingHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataTrainingHistorySuccess implements Action {
  readonly type = TrainingHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ITrainingHistory[]) {}
}

export class ResetTrainingHistoryData implements Action {
  readonly type = TrainingHistoryActionTypes.HR_RESET_DATA;
}

export type TrainingHistoryActions = 
  | ShowEditorTrainingHistory
  | HideEditorTrainingHistory
  | ShowViewerTrainingHistory
  | HideViewerTrainingHistory
  | ProcessingTrainingHistory
  | NotProcessingTrainingHistory
  | LoadApprovedDataTrainingHistory
  | LoadApprovedDataTrainingHistorySuccess
  | LoadAwaitingApprovalDataTrainingHistory
  | LoadAwaitingApprovalDataTrainingHistorySuccess
  | ResetTrainingHistoryData;