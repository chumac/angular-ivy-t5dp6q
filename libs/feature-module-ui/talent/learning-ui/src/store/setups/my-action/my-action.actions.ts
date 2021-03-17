import { Action } from '@ngrx/store';
import { IFeedBackForm, IManagerOptOutEvent, IMyAction } from '@nutela/models/talent/learning';

export enum MyActionActionTypes {
  PROCESSING = '[LEARNING SETUPS MY ACTION] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS MY ACTION] Not Processing',

  SHOW_ACTION_OPTOUT_EDITOR = '[LEARNING SETUPS MY ACTION] Show Action Optout Editor',
  HIDE_ACTION_OPTOUT_EDITOR = '[LEARNING SETUPS MY ACTION] Hide Action Optout Editor',

  LOAD_DATA = '[LEARNING SETUPS MY ACTION] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS MY ACTION] Load Data Success',

  LOAD_FORM_DATA = '[LEARNING SETUPS MY ACTION] Load Form Data',
  LOAD_FORM_DATA_SUCCESS = '[LEARNING SETUPS MY ACTION] Load Form Data Success',

  SHOW_FACULTY_NOMINATION_EDITOR = '[LEARNING SETUPS MY ACTION] Show Faculty Nomination Editor',
  HIDE_FACULTY_NOMINATION_EDITOR = '[LEARNING SETUPS MY ACTION] Hide Faculty Nomination Editor',

  SHOW_FEEDBACK_FORM_EDITOR = '[LEARNING SETUPS MY ACTION] Show Feedback Form Editor',
  HIDE_FEEDBACK_FORM_EDITOR = '[LEARNING SETUPS MY ACTION] Hide Feedback Form Editor',

  MANAGER_OPTOUT_DATA = '[LEARNING SETUPS MY ACTION] Manager optout data',
  MANAGER_OPTOUT_DATA_SUCCESS = '[LEARNING SETUPS MY ACTION] Manager optout data success',

  FEEDBACK_FORM_DATA = '[LEARNING SETUPS MY ACTION] Feedback Form data',
  FEEDBACK_FORM_DATA_SUCCESS = '[LEARNING SETUPS MY ACTION] Feedback Form data success',

  ACTION_NOMINATION_EVENT = '[LEARNING SETUPS MY ACTION] Nomination Event',
  ACTION_NOMINATION_EVENT_SUCCESS = '[LEARNING SETUPS MY ACTION] Nomination Event Success',
}

export class ShowOptOutEditorMyAction implements Action {
  readonly type = MyActionActionTypes.SHOW_ACTION_OPTOUT_EDITOR;
}

export class HideOptOutEditorMyAction implements Action {
  readonly type = MyActionActionTypes.HIDE_ACTION_OPTOUT_EDITOR;
}

export class ProcessingMyAction implements Action {
  readonly type = MyActionActionTypes.PROCESSING;
}

export class NotProcessingMyAction implements Action {
  readonly type = MyActionActionTypes.NOT_PROCESSING;
}

export class LoadDataMyAction implements Action {
  readonly type = MyActionActionTypes.LOAD_DATA;

  constructor(public payload: { recordId: number }) { }

}

export class LoadDataMyActionSuccess implements Action {
  readonly type = MyActionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IMyAction[]) { }
}

export class LoadFormDataMyActionSuccess implements Action {
  readonly type = MyActionActionTypes.LOAD_FORM_DATA_SUCCESS;

  constructor(public payload: IFeedBackForm[]) { }
}

export class LoadFormDataMyAction implements Action {
  readonly type = MyActionActionTypes.LOAD_FORM_DATA;

  constructor(public payload: { recordId: number }) { }

}

export class ActionNominationLearningEvent implements Action {
  readonly type = MyActionActionTypes.ACTION_NOMINATION_EVENT;
  constructor(public payload: { data: any , event_id: number}) { }
}

export class ShowActionNominationEditorEvent implements Action {
  readonly type = MyActionActionTypes.SHOW_FACULTY_NOMINATION_EDITOR;
}

export class HideActionNominationEditorEvent implements Action {
  readonly type = MyActionActionTypes.HIDE_FACULTY_NOMINATION_EDITOR;
}

export class ShowActionFeedbackFormEditorEvent implements Action {
  readonly type = MyActionActionTypes.SHOW_FEEDBACK_FORM_EDITOR;
}

export class HideActionFeedbackFormEditorEvent implements Action {
  readonly type = MyActionActionTypes.HIDE_FEEDBACK_FORM_EDITOR;
}

export class ManagerOptOutEvent implements Action {
  readonly type = MyActionActionTypes.MANAGER_OPTOUT_DATA;

  constructor(public payload: {data: IManagerOptOutEvent, recordId: number}) {}
}

export class ManagerOptOutEventSuccess implements Action {
  readonly type = MyActionActionTypes.MANAGER_OPTOUT_DATA_SUCCESS;

  constructor(public payload: IManagerOptOutEvent[]) {}
}

export class FeedbackFormEvent implements Action {
  readonly type = MyActionActionTypes.FEEDBACK_FORM_DATA;

  constructor(public payload: {data: IFeedBackForm, recordId: number}) {}
}

export class FeedbackFormEventSuccess implements Action {
  readonly type = MyActionActionTypes.FEEDBACK_FORM_DATA_SUCCESS;

  constructor(public payload: IFeedBackForm[]) {}
}



export type MyActionActions =
  | ProcessingMyAction
  | NotProcessingMyAction
  | LoadDataMyAction
  | ActionNominationLearningEvent
  | ShowActionNominationEditorEvent
  | HideActionNominationEditorEvent
  | ShowOptOutEditorMyAction
  | HideOptOutEditorMyAction
  | ManagerOptOutEvent
  | ManagerOptOutEventSuccess
  | ShowActionFeedbackFormEditorEvent
  | HideActionFeedbackFormEditorEvent
  | LoadFormDataMyAction
  | LoadFormDataMyActionSuccess
  | FeedbackFormEvent
  | FeedbackFormEventSuccess
  | LoadDataMyActionSuccess;
