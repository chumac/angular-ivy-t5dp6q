import { Action } from '@ngrx/store';

import { ICourse } from '@nutela/models/talent/learning';

export enum CourseActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS COURSE] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS COURSE] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS COURSE] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS COURSE] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS COURSE] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS COURSE] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS COURSE] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS COURSE] Load Data Success',

  LOAD_DOCUMENT = '[LEARNING SETUPS COURSE] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[LEARNING SETUPS COURSE] Load Document Success',
  CLEAR_DOCUMENT = '[LEARNING SETUPS COURSE] Clear Document',

  LOAD_INLINE_DOCUMENT = '[LEARNING SETUPS COURSE] Load Inline Document',

  SAVE = '[LEARNING SETUPS COURSE] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS COURSE] Save Success',

  ADD = '[LEARNING SETUPS COURSE] Add',
  ADD_SUCCESS = '[LEARNING SETUPS COURSE] Add Success',

  DELETE_DATA = '[LEARNING SETUPS COURSE] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS COURSE] Remove Data',

}

export class ShowEditorCourse implements Action {
  readonly type = CourseActionTypes.SHOW_EDITOR;
}

export class HideEditorCourse implements Action {
  readonly type = CourseActionTypes.HIDE_EDITOR;
}


export class ShowViewerCourse implements Action {
  readonly type = CourseActionTypes.SHOW_VIEWER;
}

export class HideViewerCourse implements Action {
  readonly type = CourseActionTypes.HIDE_VIEWER;
}


export class ProcessingCourse implements Action {
  readonly type = CourseActionTypes.PROCESSING;
}

export class NotProcessingCourse implements Action {
  readonly type = CourseActionTypes.NOT_PROCESSING;
}


export class LoadDataCourse implements Action {
  readonly type = CourseActionTypes.LOAD_DATA;
}

export class LoadDataCourseSuccess implements Action {
  readonly type = CourseActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ICourse[]) {}
}


export class LoadDocumentCourse implements Action {
  readonly type = CourseActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentCourseSuccess implements Action {
  readonly type = CourseActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentCourse implements Action {
  readonly type = CourseActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentCourse implements Action {
  readonly type = CourseActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveCourse implements Action {
  readonly type = CourseActionTypes.SAVE;

  constructor(public payload: {data: ICourse, recordId: number, editMode: boolean}) {}
}

export class AddCourse implements Action {
  readonly type = CourseActionTypes.ADD;

  constructor(public payload: {data: ICourse}) {}
}


export class DeleteDataCourse implements Action {
  readonly type = CourseActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataCourse implements Action {
  readonly type = CourseActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type CourseActions =
  | ShowEditorCourse
  | HideEditorCourse
  | ShowViewerCourse
  | HideViewerCourse
  | ProcessingCourse
  | NotProcessingCourse
  | LoadDataCourse
  | LoadDataCourseSuccess
  | LoadDocumentCourse
  | LoadDocumentCourseSuccess
  | ClearDocumentCourse
  | LoadInlineDocumentCourse
  | SaveCourse
  | AddCourse
  | DeleteDataCourse
  | RemoveDataCourse;
