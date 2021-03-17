import { Action } from '@ngrx/store';

import { ICourseCategory } from '@nutela/models/talent/learning';

export enum CourseCategoryActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS COURSE_CATEGORY] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS COURSE_CATEGORY] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS COURSE_CATEGORY] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS COURSE_CATEGORY] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS COURSE_CATEGORY] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS COURSE_CATEGORY] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS COURSE_CATEGORY] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS COURSE_CATEGORY] Load Data Success',

  LOAD_DOCUMENT = '[LEARNING SETUPS COURSE_CATEGORY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[LEARNING SETUPS COURSE_CATEGORY] Load Document Success',
  CLEAR_DOCUMENT = '[LEARNING SETUPS COURSE_CATEGORY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[LEARNING SETUPS COURSE_CATEGORY] Load Inline Document',

  SAVE = '[LEARNING SETUPS COURSE_CATEGORY] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS COURSE_CATEGORY] Save Success',

  ADD = '[LEARNING SETUPS COURSE_CATEGORY] Add',
  ADD_SUCCESS = '[LEARNING SETUPS COURSE_CATEGORY] Add Success',

  DELETE_DATA = '[LEARNING SETUPS COURSE_CATEGORY] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS COURSE_CATEGORY] Remove Data',

}

export class ShowEditorCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.SHOW_EDITOR;
}

export class HideEditorCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.HIDE_EDITOR;
}

export class ShowViewerCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.SHOW_VIEWER;
}

export class HideViewerCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.HIDE_VIEWER;
}

export class ProcessingCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.PROCESSING;
}

export class NotProcessingCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.NOT_PROCESSING;
}


export class LoadDataCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.LOAD_DATA;
}

export class LoadDataCourseCategorySuccess implements Action {
  readonly type = CourseCategoryActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ICourseCategory[]) {}
}


export class LoadDocumentCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentCourseCategorySuccess implements Action {
  readonly type = CourseCategoryActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.SAVE;

  constructor(public payload: {data: ICourseCategory, recordId: number, editMode: boolean}) {}
}

export class AddCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.ADD;

  constructor(public payload: {data: ICourseCategory}) {}
}


export class DeleteDataCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataCourseCategory implements Action {
  readonly type = CourseCategoryActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type CourseCategoryActions =
  | ShowEditorCourseCategory
  | HideEditorCourseCategory
  | ShowViewerCourseCategory
  | HideViewerCourseCategory
  | ProcessingCourseCategory
  | NotProcessingCourseCategory
  | LoadDataCourseCategory
  | LoadDataCourseCategorySuccess
  | LoadDocumentCourseCategory
  | LoadDocumentCourseCategorySuccess
  | ClearDocumentCourseCategory
  | LoadInlineDocumentCourseCategory
  | SaveCourseCategory
  | AddCourseCategory
  | DeleteDataCourseCategory
  | RemoveDataCourseCategory;
