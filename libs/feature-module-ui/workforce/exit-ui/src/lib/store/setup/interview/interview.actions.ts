import { Action } from '@ngrx/store';
import {
  IReviewChecklist,
  IInterviewQuestion,
  IInterviewForm
} from 'libs/models/workforce/exit/src/lib/interfaces';

export enum InterviewActionTypes {
  SHOW_FORM_EDITOR = '[HR EXIT SETUP - INTERVIEWS] Show Interview Form Editor',
  HIDE_FORM_EDITOR = '[HR EXIT SETUP - INTERVIEWS] Hide Interview Form Editor',

  SHOW_QUESTION_EDITOR = '[HR EXIT SETUP - INTERVIEWS] Show Interview Question Editor',
  HIDE_QUESTION_EDITOR = '[HR EXIT SETUP - INTERVIEWS] Hide Interview Question Editor',

  SHOW_FORM_VIEWER = '[HR EXIT SETUP - INTERVIEWS] Show Interview Form Viewer',
  HIDE_FORM_VIEWER = '[HR EXIT SETUP - INTERVIEWS] Hide Interview Form Viewer',

  SHOW_QUESTION_VIEWER = '[HR EXIT SETUP - INTERVIEWS] Show Interview Question Viewer',
  HIDE_QUESTION_VIEWER = '[HR EXIT SETUP - INTERVIEWS] Hide Interview Question Viewer',

  PROCESSING = '[HR EXIT SETUP - INTERVIEWS] Processing',
  NOT_PROCESSING = '[HR EXIT SETUP - INTERVIEWS] Not Processing',

  LOADING = '[HR EXIT SETUP - INTERVIEWS] Loading',
  NOT_LOADING = '[HR EXIT SETUP - INTERVIEWS] Not Loading',

  LOAD_FORMS_DATA = '[HR EXIT SETUP - INTERVIEWS] Load Interview Form Data',
  LOAD_FORMS_DATA_SUCCESS = '[HR EXIT SETUP - INTERVIEWS] Load Interview Form Data Success',

  LOAD_QUESTIONS_DATA = '[HR EXIT SETUP - INTERVIEWS] Load Interview Questions Data',
  LOAD_QUESTIONS_DATA_SUCCESS = '[HR EXIT SETUP - INTERVIEWS] Load Interview Questions Data Success',

  SAVE_QUESTION = '[HR EXIT SETUP - INTERVIEWS] Save Question',
  SAVE_FORM = '[HR EXIT SETUP - INTERVIEWS] Save Form',
}

export class ShowFormEditorInterview implements Action {
  readonly type = InterviewActionTypes.SHOW_FORM_EDITOR;
}

export class HideFormEditorInterview implements Action {
  readonly type = InterviewActionTypes.HIDE_FORM_EDITOR;
}

export class ShowQuestionEditorInterview implements Action {
  readonly type = InterviewActionTypes.SHOW_QUESTION_EDITOR;
}

export class HideQuestionEditorInterview implements Action {
  readonly type = InterviewActionTypes.HIDE_QUESTION_EDITOR;
}

export class ShowFormViewerInterview implements Action {
  readonly type = InterviewActionTypes.SHOW_FORM_VIEWER;
}

export class HideFormViewerInterview implements Action {
  readonly type = InterviewActionTypes.HIDE_FORM_VIEWER;
}

export class ShowQuestionViewerInterview implements Action {
  readonly type = InterviewActionTypes.SHOW_QUESTION_VIEWER;
}

export class HideQuestionViewerInterview implements Action {
  readonly type = InterviewActionTypes.HIDE_QUESTION_VIEWER;
}

export class ProcessingInterview implements Action {
  readonly type = InterviewActionTypes.PROCESSING;
}

export class NotProcessingInterview implements Action {
  readonly type = InterviewActionTypes.NOT_PROCESSING;
}

export class LoadingInterview implements Action {
  readonly type = InterviewActionTypes.LOADING;
}

export class NotLoadingInterview implements Action {
  readonly type = InterviewActionTypes.NOT_LOADING;
}

export class LoadDataFormInterview implements Action {
  readonly type = InterviewActionTypes.LOAD_FORMS_DATA;
}

export class LoadDataFormInterviewSuccess implements Action {
  readonly type = InterviewActionTypes.LOAD_FORMS_DATA_SUCCESS;

  constructor(public payload: IInterviewForm[]) { }
}

export class LoadDataQuestionInterview implements Action {
  readonly type = InterviewActionTypes.LOAD_QUESTIONS_DATA;

  constructor(public payload: { formId: number }) { }
}

export class LoadDataQuestionInterviewSuccess implements Action {
  readonly type = InterviewActionTypes.LOAD_QUESTIONS_DATA_SUCCESS;

  constructor(public payload: IInterviewQuestion[]) { }
}

export class SubmitFormInterview implements Action {
  readonly type = InterviewActionTypes.SAVE_FORM;

  constructor(public payload: { data: IInterviewForm }) { }
}

export class SubmitQuestionInterview implements Action {
  readonly type = InterviewActionTypes.SAVE_QUESTION;

  constructor(public payload: { data: IInterviewQuestion }) { }
}


export type InterviewActions =
  | ShowFormEditorInterview
  | HideFormEditorInterview
  | ShowQuestionEditorInterview
  | HideQuestionEditorInterview
  | ShowFormViewerInterview
  | HideFormViewerInterview
  | ShowQuestionViewerInterview
  | HideQuestionViewerInterview
  | ProcessingInterview
  | NotProcessingInterview
  | LoadingInterview
  | NotLoadingInterview
  | LoadDataFormInterview
  | LoadDataFormInterviewSuccess
  | LoadDataQuestionInterview
  | LoadDataQuestionInterviewSuccess
  | SubmitFormInterview
  | SubmitQuestionInterview;
