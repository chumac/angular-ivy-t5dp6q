import { Action } from '@ngrx/store';
import { IEventDetailFeedbackForms, IEventDetailCustomForms, IEventDetailFormAvailability, IEventDetailFeedbackRole } from '@nutela/models/talent/learning';

export enum FeedbackFormsActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS FEEDBACK FORMS] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS FEEDBACK FORMS] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS FEEDBACK FORMS] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS FEEDBACK FORMS] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS FEEDBACK FORMS] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS FEEDBACK FORMS] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS FEEDBACK FORMS] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Load Data Success',

  LOAD_FORM_DATA = '[LEARNING SETUPS FEEDBACK FORMS] Load Form Data',
  LOAD_FORM_DATA_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Load Form Data Success',

  LOAD_FORM_AVAILABILITY_DATA = '[LEARNING SETUPS FEEDBACK FORMS] Load Form Availability Data',
  LOAD_FORM_AVAILABILITY_DATA_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Load Form Availability Data Success',

  LOAD_FORM_ROLE_DATA = '[LEARNING SETUPS FEEDBACK FORMS] Load Form Role Data',
  LOAD_FORM_ROLE_DATA_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Load Form Role Data Success',

  LOAD_DATA_TYPE = '[LEARNING SETUPS FEEDBACK FORMS] Load Data Type',
  LOAD_DATA_TYPE_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Load Data Type Success',

  SAVE = '[LEARNING SETUPS FEEDBACK FORMS] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Save Success',

  ADD = '[LEARNING SETUPS FEEDBACK FORMS] Add',
  ADD_SUCCESS = '[LEARNING SETUPS FEEDBACK FORMS] Add Success',

  DELETE_DATA = '[LEARNING SETUPS FEEDBACK FORMS] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS FEEDBACK FORMS] Remove Data',

}

export class ShowEditorFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.SHOW_EDITOR;
}

export class HideEditorFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.HIDE_EDITOR;
}


export class ShowViewerFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.SHOW_VIEWER;
}

export class HideViewerFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.HIDE_VIEWER;
}


export class ProcessingFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.PROCESSING;
}

export class NotProcessingFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.NOT_PROCESSING;
}


export class LoadDataFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_DATA;

  constructor(public payload: {recordId: number}) {}
  
}

export class LoadDataCustomForms implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_FORM_DATA;
}

export class LoadDataCustomFormsSuccess implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_FORM_DATA_SUCCESS;

  constructor(public payload: IEventDetailCustomForms[]) {}

}

export class LoadDataFormAvailability implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_FORM_AVAILABILITY_DATA;
}

export class LoadDataFormAvailabilitySuccess implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_FORM_AVAILABILITY_DATA_SUCCESS;

  constructor(public payload: IEventDetailFormAvailability[]) {}

}

export class LoadDataFormRole implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_FORM_ROLE_DATA;
}

export class LoadDataFormRoleSuccess implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_FORM_ROLE_DATA_SUCCESS;

  constructor(public payload: IEventDetailFeedbackRole[]) {}

}

export class LoadDataFeedbackFormsType implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_DATA_TYPE;
}

export class LoadDataFeedbackFormsSuccess implements Action {
  readonly type = FeedbackFormsActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEventDetailFeedbackForms[]) {}
}


export class SaveFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.SAVE;

  constructor(public payload: {data: IEventDetailFeedbackForms, recordId: number, editMode: boolean, eventDetailId: number}) {}
}

export class AddFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.ADD;

  constructor(public payload: {data: IEventDetailFeedbackForms, eventDetailId: number}) {}
}


export class DeleteDataFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, eventDetailId: number}) {}
}


export class RemoveDataFeedbackForms implements Action {
  readonly type = FeedbackFormsActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type FeedbackFormsActions =
  | ShowEditorFeedbackForms
  | HideEditorFeedbackForms
  | ShowViewerFeedbackForms
  | HideViewerFeedbackForms
  | ProcessingFeedbackForms
  | NotProcessingFeedbackForms
  | LoadDataFeedbackForms
  | LoadDataFeedbackFormsSuccess
  | SaveFeedbackForms
  | AddFeedbackForms
  | DeleteDataFeedbackForms
  | LoadDataFeedbackFormsType
  | LoadDataCustomForms
  | LoadDataCustomFormsSuccess
  | LoadDataFormRole
  | LoadDataFormRoleSuccess
  | LoadDataFormAvailability
  | LoadDataFormAvailabilitySuccess
  | RemoveDataFeedbackForms;
