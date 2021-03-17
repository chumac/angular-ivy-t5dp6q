import { Action } from '@ngrx/store';

import { IFeedbackQuestion, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum FeedbackQuestionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Plan List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS FEEDBACK_QUESTIONS] Remove Data',

}

export class ShowEditorFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.SHOW_EDITOR;
}

export class HideEditorFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.HIDE_EDITOR;
}


export class ShowViewerFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.SHOW_VIEWER;
}

export class HideViewerFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.HIDE_VIEWER;
}


export class ProcessingFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.PROCESSING;
}

export class NotProcessingFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.NOT_PROCESSING;
}


export class LoadDataFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_DATA;
  constructor(public payload: {roleId: number}) {}
}

export class LoadDataFeedbackQuestionSuccess implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFeedbackQuestion[]) {}
}

export class LoadPlanListFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListFeedbackQuestionSuccess implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadDocumentFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentFeedbackQuestionSuccess implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.SAVE;

  constructor(public payload: {data: IFeedbackQuestion, recordId: number, editMode: boolean}) {}
}

export class AddFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.ADD;

  constructor(public payload: {data: IFeedbackQuestion}) {}
}


export class DeleteDataFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, planId: number}) {}
}


export class RemoveDataFeedbackQuestion implements Action {
  readonly type = FeedbackQuestionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type FeedbackQuestionActions =
  | ShowEditorFeedbackQuestion
  | HideEditorFeedbackQuestion
  | ShowViewerFeedbackQuestion
  | HideViewerFeedbackQuestion
  | ProcessingFeedbackQuestion
  | NotProcessingFeedbackQuestion
  | LoadDataFeedbackQuestion
  | LoadDataFeedbackQuestionSuccess
  | LoadPlanListFeedbackQuestion
  | LoadPlanListFeedbackQuestionSuccess
  | LoadDocumentFeedbackQuestion
  | LoadDocumentFeedbackQuestionSuccess
  | ClearDocumentFeedbackQuestion
  | LoadInlineDocumentFeedbackQuestion
  | SaveFeedbackQuestion
  | AddFeedbackQuestion
  | DeleteDataFeedbackQuestion
  | RemoveDataFeedbackQuestion;
