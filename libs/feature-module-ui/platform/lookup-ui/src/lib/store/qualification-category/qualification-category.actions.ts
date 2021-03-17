import { Action } from '@ngrx/store';

import { IQualificationCategory } from "@nutela/models/platform/lookup";


export enum QualificationCategoryActionTypes {

  SHOW_EDITOR = '[ QUALIFICATION CATEGORY] Show Editor',
  HIDE_EDITOR = '[QUALIFICATION] Hide Editor',

  PROCESSING = '[ QUALIFICATION CATEGORY] Processing',
  NOT_PROCESSING = '[ QUALIFICATION CATEGORY] Not Processing',

  LOAD_QUALIFICATION_CATEGORY_DATA = '[ QUALIFICATION CATEGORY] Load QUALIFICATION CATEGORY Data',
  LOAD_QUALIFICATION_CATEGORY_DATA_SUCCESS = '[ QUALIFICATION CATEGORY] Load QUALIFICATION CATEGORY Data Success',

  SAVE = '[QUALIFICATION CATEGORY] Save',
  SAVE_SUCCESS = '[ QUALIFICATION CATEGORY] Save Success',

  UPDATE = '[UPDATE QUALIFICATION CATEGORY] UPDATE',
  UPDATE_SUCCESS = '[UPDATE QUALIFICATION CATEGORY] UPDATE Success',

  DELETE = '[QUALIFICATION CATEGORY] DELETE',
}


export class ShowEditorQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.SHOW_EDITOR;
}

export class HideEditorQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.HIDE_EDITOR;
}

export class ProcessingQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.PROCESSING;
}

export class NotProcessingQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.NOT_PROCESSING;
}


export class LoadQualificationCategoryData implements Action {
  readonly type = QualificationCategoryActionTypes.LOAD_QUALIFICATION_CATEGORY_DATA;
}

export class LoadQualificationCategorySuccess implements Action {
  readonly type = QualificationCategoryActionTypes.LOAD_QUALIFICATION_CATEGORY_DATA_SUCCESS;

  constructor(public payload: IQualificationCategory[]) {}
}

export class SaveQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.SAVE;
  constructor(public payload: {data: IQualificationCategory}) {}
}

export class UpdateQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.UPDATE;
  constructor(public payload: {data: IQualificationCategory, recordId: number}) {}
}

export class DeleteQualificationCategory implements Action {
  readonly type = QualificationCategoryActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}


export type QualificationCategoryActions =
  | ShowEditorQualificationCategory
  | HideEditorQualificationCategory
  | ProcessingQualificationCategory
  | NotProcessingQualificationCategory
  | LoadQualificationCategoryData
  | LoadQualificationCategorySuccess
  | SaveQualificationCategory
  | UpdateQualificationCategory;
