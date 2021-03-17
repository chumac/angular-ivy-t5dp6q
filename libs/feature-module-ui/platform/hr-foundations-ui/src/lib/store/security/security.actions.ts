import { Action } from '@ngrx/store';

import { ISecurity } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { IEmployee } from '@nutela/models/compensation/loans';


export enum SecurityActionTypes {
  SHOW_EDITOR = '[SECURITY] Show Editor',
  HIDE_EDITOR = '[SECURITY] Hide Editor',

  SHOW_BULK_EDITOR = '[SECURITY] Show Bulk Editor',
  HIDE_BULK_EDITOR = '[SECURITY] Hide Bulk Editor',

  SHOW_VIEWER = '[SECURITY] Show Viewer',
  HIDE_VIEWER = '[SECURITY] Hide Viewer',

  SHOW_TREE_VIEW = '[SECURITY] Show Tree View',
  HIDE_TREE_VIEW = '[SECURITY] Hide Tree View',

  PROCESSING = '[SECURITY] Processing',
  NOT_PROCESSING = '[SECURITY] Not Processing',

  LOADING = '[SECURITY] Loading',
  NOT_LOADING = '[SECURITY] Not Loading',

  LOADING_DROPDOWN = '[SECURITY] Loading Dropdown',

  LOAD_PROCESSED_DATA = '[SECURITY] Load Processed Data',
  LOAD_PROCESSED_DATA_SUCCESS = '[SECURITY] Load Processed Data Success',

  LOAD_WAITING_DATA = '[SECURITY] Load Waiting Data',
  LOAD_WAITING_DATA_SUCCESS = '[SECURITY] Load Waiting Data Success',

  LOAD_ROLE_DATA = '[SECURITY] Load  Role  Data',
  LOAD_ROLE_DATA_SUCCESS = '[SECURITY] Load Role Data Success',

  CLEAR_ROLE_DATA = '[SECURITY] Load CLEAR Role  Data',

  LOAD_USERS_DATA = '[SECURITY] Load  USERS  Data',
  LOAD_USERS_DATA_SUCCESS = '[SECURITY] Load USERS Data Success',

  LOAD_INDIVIDUAL_DATA = '[SECURITY] Load Specific Individual Data',
  LOAD_INDIVIDUAL_DATA_SUCCESS = '[SECURITY] Load Specific Individual Data Success',

  LOAD_SPECIFIC_TYPE_DATA = '[SECURITY] Load  SPECIFIC TYPE  Data',
  LOAD_SPECIFIC_TYPE_DATA_SUCCESS = '[SECURITY] Load SPECIFIC TYPE Data Success',

  LOAD_SPECIFIC_STRUCTURE_DATA = '[SECURITY] Load  SPECIFIC STRUCTURE Data',
  LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS = '[SECURITY] Load SPECIFIC STRUCTURE Data Success',

  LOAD_SINGLE_ACTION = '[SECURITY] Load  SINGLE ACTION  Data',
  LOAD_SINGLE_ACTION_SUCCESS = '[SECURITY] Load SINGLE ACTION Data Success',

  LOAD_BULK_ACTION = '[SECURITY] Load  BULK_ACTION',
  LOAD_BULK_ACTION_SUCCESS = '[SECURITY] Load USERS  Success',

  SAVE_SECURITY= '[SECURITY ] Save',
  SAVE_SECURITY_SUCCESS = '[SECURITY] Save Success',

  SAVE_MULTIPLE_SECURITY= '[MULTIPLE SECURITY ] Save',
  SAVE_MULTIPLE_SECURITY_SUCCESS = '[MULTIPLE SECURITY] Save Success',

  SAVE_MULTIPLE= '[SECURITY ] MULTIPLE SECURITY Save',
  SAVE_MULTIPLE_SUCCESS = '[ SECURITY] MULTIPLE SECURITY Save Success',

  DELETE_SECURITY_DATA = '[SECURITY] Delete SECURITY Data',
  DELETE_SECURITY_SUCCESS_DATA = '[SECURITY] Delete SECURITY Data',
}

export class ShowEditorSecurity implements Action {
  readonly type = SecurityActionTypes.SHOW_EDITOR;
}

export class HideEditorSecurity implements Action {
  readonly type = SecurityActionTypes.HIDE_EDITOR;
}

export class ShowBulkEditorSecurity implements Action {
  readonly type = SecurityActionTypes.SHOW_BULK_EDITOR;
}

export class HideBulkEditorSecurity implements Action {
  readonly type = SecurityActionTypes.HIDE_BULK_EDITOR;
}

export class ShowViewerSecurity implements Action {
  readonly type = SecurityActionTypes.SHOW_VIEWER;
}

export class HideViewerSecurity implements Action {
  readonly type = SecurityActionTypes.HIDE_VIEWER;
}

export class ShowTreeViewSecurity implements Action {
  readonly type = SecurityActionTypes.SHOW_TREE_VIEW;
}

export class HideTreeViewSecurity implements Action {
  readonly type = SecurityActionTypes.HIDE_TREE_VIEW;
}

export class ProcessingSecurity implements Action {
  readonly type = SecurityActionTypes.PROCESSING;
}

export class NotProcessingSecurity implements Action {
  readonly type = SecurityActionTypes.NOT_PROCESSING;
}

export class LoadingSecurity implements Action {
  readonly type = SecurityActionTypes.LOADING;
}

export class NotLoadingSecurity implements Action {
  readonly type = SecurityActionTypes.NOT_LOADING;
}

export class LoadingDropdownSecurity implements Action {
  readonly type = SecurityActionTypes.LOADING_DROPDOWN;
  constructor(public payload: boolean) { }
}

export class LoadProcessedSecurity implements Action {
  readonly type = SecurityActionTypes.LOAD_PROCESSED_DATA;
}

export class LoadProcessedSecuritySuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_PROCESSED_DATA_SUCCESS;
  constructor(public payload: ISecurity[]) {}
}

export class LoadWaitingSecurity implements Action {
  readonly type = SecurityActionTypes.LOAD_WAITING_DATA;
}

export class LoadWaitingSecuritySuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_WAITING_DATA_SUCCESS;
  constructor(public payload: ISecurity[]) {}
}

export class LoadRole implements Action {
  readonly type = SecurityActionTypes.LOAD_ROLE_DATA;
}

export class ClearRole implements Action {
  readonly type = SecurityActionTypes.CLEAR_ROLE_DATA;
}

export class  LoadRoleSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_ROLE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadUsers implements Action {
  readonly type = SecurityActionTypes.LOAD_USERS_DATA;
  constructor(public payload?: {analysis_det_id : number}) {}
}

export class  LoadUsersSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_USERS_DATA_SUCCESS;
  constructor(public payload: IEmployee[]) {}
}

export class LoadIndividual implements Action {
  readonly type = SecurityActionTypes.LOAD_INDIVIDUAL_DATA;
}

export class  LoadIndividualSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_INDIVIDUAL_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadSpecificType implements Action {
  readonly type = SecurityActionTypes.LOAD_SPECIFIC_TYPE_DATA;
}

export class  LoadSpecificTypeSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_SPECIFIC_TYPE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadSpecificStructure implements Action {
  readonly type = SecurityActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA;
  constructor(public payload: {Id:number}) {}
}

export class  LoadSpecificStructureSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadSingleAction implements Action {
  readonly type = SecurityActionTypes.LOAD_SINGLE_ACTION;
}

export class  LoadSingleActionSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_SINGLE_ACTION_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadBulkAction implements Action {
  readonly type = SecurityActionTypes.LOAD_BULK_ACTION;
}

export class  LoadBulkActionSuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_BULK_ACTION_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}


export class SaveSecurity implements Action {
  readonly type = SecurityActionTypes.SAVE_SECURITY;
  constructor(public payload: {data: ISecurity}) {}
}

export class SaveMultipleSecurity implements Action {
  readonly type = SecurityActionTypes.SAVE_MULTIPLE_SECURITY;
  constructor(public payload: {data: ISecurity[], analysis_det_id?:number}) {}
}

export class SaveMultiple implements Action {
  readonly type = SecurityActionTypes.SAVE_MULTIPLE;
  constructor(public payload: {data: ISecurity[]}) {}
}

export class DeleteSecurity implements Action {
  readonly type = SecurityActionTypes.DELETE_SECURITY_DATA
  constructor(public payload: {SecurityKey: string}) {}
}





export type SecurityActions =
  | ShowEditorSecurity
  | HideEditorSecurity
  | ShowTreeViewSecurity
  | HideTreeViewSecurity
  | ShowBulkEditorSecurity
  | HideBulkEditorSecurity
  | ShowViewerSecurity
  | HideViewerSecurity
  | ProcessingSecurity
  | NotProcessingSecurity
  | LoadingSecurity
  | NotLoadingSecurity
  | LoadingDropdownSecurity
  | LoadProcessedSecurity
  | LoadProcessedSecuritySuccess
  | LoadWaitingSecurity
  | LoadWaitingSecuritySuccess
  | LoadRole
  | LoadRoleSuccess
  | ClearRole
  | LoadUsers
  | LoadUsersSuccess
  | LoadIndividual
  | LoadIndividualSuccess
  | LoadSpecificStructure
  | LoadSpecificStructureSuccess
  | LoadSpecificType
  | LoadSpecificTypeSuccess
  | LoadSingleAction
  | LoadSingleActionSuccess
  | LoadBulkAction
  | LoadBulkActionSuccess
  | SaveSecurity
  | SaveMultiple
  | SaveMultipleSecurity
  | DeleteSecurity;
