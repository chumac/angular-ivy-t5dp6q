import { Action } from '@ngrx/store';

import { IQualifications } from "@nutela/models/platform/lookup";
import { ISelectOption } from '@nutela/models/core-data';


export enum QualificationActionTypes {

  SHOW_EDITOR = '[ QUALIFICATION] Show Editor',
  HIDE_EDITOR = '[QUALIFICATION] Hide Editor',

  PROCESSING = '[ QUALIFICATION] Processing',
  NOT_PROCESSING = '[ QUALIFICATION] Not Processing',

  LOAD_QUALIFICATION_DATA = '[ QUALIFICATION] Load QUALIFICATION Data',
  LOAD_QUALIFICATION_DATA_SUCCESS = '[ QUALIFICATION] Load QUALIFICATION Data Success',

  LOAD_CATEGORY_DATA = '[QUALIFICATION CATEGORY] Load QUALIFICATION CATEGORY Data',
  LOAD_CATEGORY_DATA_SUCCESS = '[QUALIFICATION CATEGORY] Load QUALIFICATION CATEGORY Data Success',


  SAVE = '[QUALIFICATION] Save',
  SAVE_SUCCESS = '[ QUALIFICATION] Save Success',

  UPDATE = '[UPDATE QUALIFICATION] UPDATE',
  UPDATE_SUCCESS = '[UPDATE QUALIFICATION] UPDATE Success',

  DELETE = '[QUALIFICATION] DELETE',
}


export class ShowEditorQualification implements Action {
  readonly type = QualificationActionTypes.SHOW_EDITOR;
}

export class HideEditorQualification implements Action {
  readonly type = QualificationActionTypes.HIDE_EDITOR;
}

export class ProcessingQualification implements Action {
  readonly type = QualificationActionTypes.PROCESSING;
}

export class NotProcessingQualification implements Action {
  readonly type = QualificationActionTypes.NOT_PROCESSING;
}


export class LoadQualificationData implements Action {
  readonly type = QualificationActionTypes.LOAD_QUALIFICATION_DATA;
}

export class LoadQualificationSuccess implements Action {
  readonly type = QualificationActionTypes.LOAD_QUALIFICATION_DATA_SUCCESS;

  constructor(public payload: IQualifications[]) {}
}

export class LoadCategory implements Action {
  readonly type = QualificationActionTypes.LOAD_CATEGORY_DATA;
}

export class LoadCategorySuccess implements Action {
  readonly type = QualificationActionTypes.LOAD_CATEGORY_DATA_SUCCESS
  constructor(public payload: ISelectOption[]) {}
}


export class SaveQualification implements Action {
  readonly type = QualificationActionTypes.SAVE;
  constructor(public payload: {data: IQualifications}) {}
}

export class UpdateQualification implements Action {
  readonly type = QualificationActionTypes.UPDATE;
  constructor(public payload: {data: IQualifications, recordId: number}) {}
}

export class DeleteQualification implements Action {
  readonly type = QualificationActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}


export type QualificationActions =
  | ShowEditorQualification
  | HideEditorQualification
  | ProcessingQualification
  | NotProcessingQualification
  | LoadQualificationData
  | LoadQualificationSuccess
  | LoadCategory
  | LoadCategorySuccess
  | SaveQualification
  | UpdateQualification;
