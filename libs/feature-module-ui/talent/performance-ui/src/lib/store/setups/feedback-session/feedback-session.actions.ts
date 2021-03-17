import { Action } from '@ngrx/store';

import { IFeedbackSession, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum FeedbackSessionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Plan List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS FEEDBACK_SESSIONS] Remove Data',

}

export class ShowEditorFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.SHOW_EDITOR;
}

export class HideEditorFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.HIDE_EDITOR;
}


export class ShowViewerFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.SHOW_VIEWER;
}

export class HideViewerFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.HIDE_VIEWER;
}


export class ProcessingFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.PROCESSING;
}

export class NotProcessingFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.NOT_PROCESSING;
}


export class LoadDataFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_DATA;
  constructor(public payload: {planId: number}) {}
}

export class LoadDataFeedbackSessionSuccess implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFeedbackSession[]) {}
}

export class LoadPlanListFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListFeedbackSessionSuccess implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadDocumentFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentFeedbackSessionSuccess implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.SAVE;

  constructor(public payload: {data: IFeedbackSession, recordId: number, editMode: boolean}) {}
}

export class AddFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.ADD;

  constructor(public payload: {data: IFeedbackSession}) {}
}


export class DeleteDataFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, planId: number}) {}
}


export class RemoveDataFeedbackSession implements Action {
  readonly type = FeedbackSessionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type FeedbackSessionActions =
  | ShowEditorFeedbackSession
  | HideEditorFeedbackSession
  | ShowViewerFeedbackSession
  | HideViewerFeedbackSession
  | ProcessingFeedbackSession
  | NotProcessingFeedbackSession
  | LoadDataFeedbackSession
  | LoadDataFeedbackSessionSuccess
  | LoadPlanListFeedbackSession
  | LoadPlanListFeedbackSessionSuccess
  | LoadDocumentFeedbackSession
  | LoadDocumentFeedbackSessionSuccess
  | ClearDocumentFeedbackSession
  | LoadInlineDocumentFeedbackSession
  | SaveFeedbackSession
  | AddFeedbackSession
  | DeleteDataFeedbackSession
  | RemoveDataFeedbackSession;
