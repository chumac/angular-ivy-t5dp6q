import { Action } from '@ngrx/store';

import { IFeedbackRating, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum FeedbackRatingActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Load Data Success',

  SAVE = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Save Success',

  ADD = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS FEEDBACK_RATINGS] Remove Data',

}

export class ShowEditorFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.SHOW_EDITOR;
}

export class HideEditorFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.HIDE_EDITOR;
}


export class ShowViewerFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.SHOW_VIEWER;
}

export class HideViewerFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.HIDE_VIEWER;
}


export class ProcessingFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.PROCESSING;
}

export class NotProcessingFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.NOT_PROCESSING;
}


export class LoadDataFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.LOAD_DATA;
}

export class LoadDataFeedbackRatingSuccess implements Action {
  readonly type = FeedbackRatingActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFeedbackRating[]) {}
}

export class SaveFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.SAVE;

  constructor(public payload: {data: IFeedbackRating, recordId: number, editMode: boolean}) {}
}

export class AddFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.ADD;

  constructor(public payload: {data: IFeedbackRating}) {}
}


export class DeleteDataFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataFeedbackRating implements Action {
  readonly type = FeedbackRatingActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type FeedbackRatingActions =
  | ShowEditorFeedbackRating
  | HideEditorFeedbackRating
  | ShowViewerFeedbackRating
  | HideViewerFeedbackRating
  | ProcessingFeedbackRating
  | NotProcessingFeedbackRating
  | LoadDataFeedbackRating
  | LoadDataFeedbackRatingSuccess
  | SaveFeedbackRating
  | AddFeedbackRating
  | DeleteDataFeedbackRating
  | RemoveDataFeedbackRating;
