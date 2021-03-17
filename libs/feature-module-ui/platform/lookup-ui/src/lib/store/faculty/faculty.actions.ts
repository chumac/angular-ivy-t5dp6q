import { Action } from '@ngrx/store';

import { IFaculty } from "@nutela/models/platform/lookup";


export enum FacultyActionTypes {

  SHOW_EDITOR = '[ FACULTY] Show Editor',
  HIDE_EDITOR = '[FACULTY] Hide Editor',

  PROCESSING = '[ FACULTY ] Processing',
  NOT_PROCESSING = '[ FACULTY ] Not Processing',

  LOADING = '[ FACULTY ] LOADING',
  NOT_LOADING = '[ FACULTY ] Not LOADING',

  LOAD_FACULTY_DATA = '[ FACULTY] Load FACULTY Data',
  LOAD_FACULTY_DATA_SUCCESS = '[ FACULTY] Load FACULTY Data Success',

  SAVE = '[FACULTY] Save',
  SAVE_SUCCESS = '[ FACULTY] Save Success',

  UPDATE = '[UPDATE FACULTY] UPDATE',
  UPDATE_SUCCESS = '[UPDATE FACULTY] UPDATE Success',

  DELETE_FACULTY_DATA = '[FACULTY] Delete FACULTY Data',
}


export class ShowEditorFaculty implements Action {
  readonly type = FacultyActionTypes.SHOW_EDITOR;
}

export class HideEditorFaculty implements Action {
  readonly type = FacultyActionTypes.HIDE_EDITOR;
}

export class ProcessingFaculty implements Action {
  readonly type = FacultyActionTypes.PROCESSING;
}

export class NotProcessingFaculty implements Action {
  readonly type = FacultyActionTypes.NOT_PROCESSING;
}

export class LoadingFaculty implements Action {
  readonly type = FacultyActionTypes.LOADING;
}

export class NotLoadingFaculty implements Action {
  readonly type = FacultyActionTypes.NOT_LOADING;
}


export class LoadFacultyData implements Action {
  readonly type = FacultyActionTypes.LOAD_FACULTY_DATA;
}

export class LoadFacultySuccess implements Action {
  readonly type = FacultyActionTypes.LOAD_FACULTY_DATA_SUCCESS;
  constructor(public payload: IFaculty[]) {}
}

export class SaveFaculty implements Action {
  readonly type = FacultyActionTypes.SAVE;
  constructor(public payload: {data: IFaculty}) {}
}

export class UpdateFaculty implements Action {
  readonly type = FacultyActionTypes.UPDATE;
  constructor(public payload: {data: IFaculty, recordId: number}) {}
}

export class DeleteFaculty implements Action{
  readonly type =FacultyActionTypes.DELETE_FACULTY_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type FacultyActions =
  | ShowEditorFaculty
  | HideEditorFaculty
  | ProcessingFaculty
  | NotProcessingFaculty
  | LoadingFaculty
  | NotLoadingFaculty
  | LoadFacultyData
  | LoadFacultySuccess
  | SaveFaculty
  | UpdateFaculty
  | DeleteFaculty;
