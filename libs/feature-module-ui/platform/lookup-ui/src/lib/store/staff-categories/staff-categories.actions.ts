import { Action } from '@ngrx/store';

import { IStaffCategory } from "@nutela/models/platform/lookup";


export enum StaffCategoryActionTypes {

  SHOW_EDITOR = '[ STAFF CATEGORY] Show Editor',
  HIDE_EDITOR = '[STAFF CATEGORY] Hide Editor',

  PROCESSING = '[ STAFF CATEGORY] Processing',
  NOT_PROCESSING = '[ STAFF CATEGORY] Not Processing',

  LOAD_STAFF_CATEGORY_DATA = '[ STAFF CATEGORY] Load STAFF CATEGORY Data',
  LOAD_STAFF_CATEGORY_DATA_SUCCESS = '[ STAFF CATEGORY] Load STAFF CATEGORY Data Success',

  SAVE = '[STAFF CATEGORY] Save',
  SAVE_SUCCESS = '[ STAFF CATEGORY] Save Success', 

  UPDATE = '[UPDATE STAFF CATEGORY] UPDATE',
  UPDATE_SUCCESS = '[UPDATE STAFF CATEGORY] UPDATE Success', 

  DELETE = '[STAFF CATEGORY] DELETE',
}


export class ShowEditorStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.SHOW_EDITOR;
}

export class HideEditorStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.HIDE_EDITOR;
}

export class ProcessingStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.PROCESSING;
}

export class NotProcessingStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.NOT_PROCESSING;
}


export class LoadStaffCategoryData implements Action {
  readonly type = StaffCategoryActionTypes.LOAD_STAFF_CATEGORY_DATA;
}

export class LoadStaffCategorySuccess implements Action {
  readonly type = StaffCategoryActionTypes.LOAD_STAFF_CATEGORY_DATA_SUCCESS;

  constructor(public payload: IStaffCategory[]) {}
}


export class SaveStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.SAVE;
  constructor(public payload: {data: IStaffCategory}) {}
}

export class UpdateStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.UPDATE;
  constructor(public payload: {data: IStaffCategory, recordId: number}) {}
}

export class DeleteStaffCategory implements Action {
  readonly type = StaffCategoryActionTypes.DELETE;
  constructor(public payload: { recordId: number}) {}
}


export type StaffCategoryActions =
  | ShowEditorStaffCategory
  | HideEditorStaffCategory 
  | ProcessingStaffCategory
  | NotProcessingStaffCategory
  | LoadStaffCategoryData
  | LoadStaffCategorySuccess
  | SaveStaffCategory
  | UpdateStaffCategory
  | DeleteStaffCategory;
