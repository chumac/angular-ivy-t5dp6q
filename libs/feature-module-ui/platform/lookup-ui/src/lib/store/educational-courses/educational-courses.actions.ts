import { Action } from '@ngrx/store';

import { IEducationalCourses } from "@nutela/models/platform/lookup";
import { ISelectOption } from '@nutela/models/core-data';


export enum educationalCourseActionTypes {

  SHOW_EDITOR = '[ EDUCATIONAL COURSE] Show Editor',
  HIDE_EDITOR = '[EDUCATIONAL COURSE] Hide Editor',

  PROCESSING = '[ EDUCATIONAL COURSE] Processing',
  NOT_PROCESSING = '[ EDUCATIONAL COURSE] Not Processing',

  LOAD_COURSE_DATA = '[ EDUCATIONAL COURSE] Load EDUCATIONAL COURSE Data',
  LOAD_COURSE_DATA_SUCCESS = '[ EDUCATIONAL COURSE] Load EDUCATIONAL COURSE Data Success',

  LOAD_CATEGORY = '[ EDUCATIONAL COURSE] Load CATEGORY Data',
  LOAD_CATEGORY_SUCCESS = '[ EDUCATIONAL COURSE] Load CATEGORY Data Success',

  SAVE = '[EDUCATIONAL COURSE] Save',
  SAVE_SUCCESS = '[ EDUCATIONAL COURSE] Save Success', 

  UPDATE = '[UPDATE EDUCATIONAL COURSE] UPDATE',
  UPDATE_SUCCESS = '[UPDATE EDUCATIONAL COURSE] UPDATE Success', 

  DELETE = '[EDUCATIONAL COURSE] DELETE',
}


export class ShowEditorEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.SHOW_EDITOR;
}

export class HideEditorEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.HIDE_EDITOR;
}

export class ProcessingEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.PROCESSING;
}

export class NotProcessingEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.NOT_PROCESSING;
}


export class LoadEducationalCoursesData implements Action {
  readonly type = educationalCourseActionTypes.LOAD_COURSE_DATA;
}

export class LoadEducationalCoursesSuccess implements Action {
  readonly type = educationalCourseActionTypes.LOAD_COURSE_DATA_SUCCESS;

  constructor(public payload: IEducationalCourses[]) {}
}

export class LoadEducationalCoursesCategory implements Action {
  readonly type = educationalCourseActionTypes.LOAD_CATEGORY;
}

export class LoadEducationalCoursesCategorySuccess implements Action {
  readonly type = educationalCourseActionTypes.LOAD_CATEGORY_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class SaveEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.SAVE;
  constructor(public payload: {data: IEducationalCourses}) {}
}

export class UpdateEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.UPDATE;
  constructor(public payload: {data: IEducationalCourses, recordId: number}) {}
}

export class DeleteEducationalCourses implements Action {
  readonly type = educationalCourseActionTypes.DELETE;
  constructor(public payload: { recordId: number}) {}
}

export type educationalCourseActions =
  | ShowEditorEducationalCourses
  | HideEditorEducationalCourses 
  | ProcessingEducationalCourses
  | NotProcessingEducationalCourses
  | LoadEducationalCoursesData
  | LoadEducationalCoursesSuccess
  | LoadEducationalCoursesCategory
  | LoadEducationalCoursesCategorySuccess
  | SaveEducationalCourses
  | UpdateEducationalCourses;
