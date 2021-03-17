import { Action } from '@ngrx/store';
import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export enum ReviewerProcessTransactionActionTypes {
  SHOW_EDITOR = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Show Editor',
  HIDE_EDITOR = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Hide Editor',

  SHOW_VIEWER = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Show Viewer',
  HIDE_VIEWER = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Hide Viewer',

  PROCESSING = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Processing',
  NOT_PROCESSING = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Not Processing',

  LOAD_DATA = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Load Data Success',

  SAVE = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Save',
  SAVE_SUCCESS = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Save Success',

  ADD = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Add',
  ADD_SUCCESS = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Add Success',

  DELETE_DATA = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Delete Data',

  REMOVE_DATA = '[SELF SERVICE REVIEWER_PROCESS_TRANSACTIONS] Remove Data',

}

export class ShowEditorReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.PROCESSING;
}

export class NotProcessingReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.NOT_PROCESSING;
}


export class LoadDataReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.LOAD_DATA;
}

export class LoadDataReviewerProcessTransactionSuccess implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProcessTransactionMaster[]) {}
}

export class SaveReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataReviewerProcessTransaction implements Action {
  readonly type = ReviewerProcessTransactionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ReviewerProcessTransactionActions =
  | ShowEditorReviewerProcessTransaction
  | HideEditorReviewerProcessTransaction
  | ShowViewerReviewerProcessTransaction
  | HideViewerReviewerProcessTransaction
  | ProcessingReviewerProcessTransaction
  | NotProcessingReviewerProcessTransaction
  | LoadDataReviewerProcessTransaction
  | LoadDataReviewerProcessTransactionSuccess
  | SaveReviewerProcessTransaction
  | AddReviewerProcessTransaction
  | DeleteDataReviewerProcessTransaction
  | RemoveDataReviewerProcessTransaction;
