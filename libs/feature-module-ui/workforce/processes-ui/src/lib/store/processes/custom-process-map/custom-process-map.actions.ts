import { Action } from '@ngrx/store';
import { ICustomForm, ICustomProcessMap, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';
import { IBasicData } from '@nutela/models/core-data';

export enum CustomProcessMapActionTypes {
  SHOW_EDITOR = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Show Editor',
  HIDE_EDITOR = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Hide Editor',

  SHOW_VIEWER = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Show Viewer',
  HIDE_VIEWER = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Hide Viewer',

  PROCESSING = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Processing',
  NOT_PROCESSING = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Not Processing',

  LOAD_DATA = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Data',
  LOAD_DATA_SUCCESS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Data Success',

  LOAD_ROLES = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Roles',
  LOAD_ROLES_SUCCESS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Roles Success',

  LOAD_PERMISSIONS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Permissions',
  LOAD_PERMISSIONS_SUCCESS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Permissions Success',

  LOAD_CUSTOM_FORM_LIST = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Custom form list',
  LOAD_CUSTOM_FORM_LIST_SUCCESS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Load Custom form list Success',


  SAVE = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Save',
  SAVE_SUCCESS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Save Success',

  ADD = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Add',
  ADD_SUCCESS = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Add Success',

  DELETE_DATA = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Delete Data',

  REMOVE_DATA = '[HR-TRANSACTIONS CUSTOM_PROCESS_MAPS] Remove Data',

}

export class ShowEditorCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.SHOW_EDITOR;
}

export class HideEditorCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.HIDE_EDITOR;
}


export class ShowViewerCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.SHOW_VIEWER;
}

export class HideViewerCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.HIDE_VIEWER;
}


export class ProcessingCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.PROCESSING;
}

export class NotProcessingCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.NOT_PROCESSING;
}


export class LoadDataCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_DATA;
  constructor(public payload: {processId: number}) {}
}

export class LoadDataCustomProcessMapSuccess implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ICustomProcessMap[]) {}
}

export class LoadRolesCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_ROLES;
}

export class LoadRolesCustomProcessMapSuccess implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_ROLES_SUCCESS;

  constructor(public payload: IBasicData[]) {}
}

export class LoadPermissionsCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_PERMISSIONS;
}

export class LoadPermissionsCustomProcessMapSuccess implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_PERMISSIONS_SUCCESS;

  constructor(public payload: IBasicData[]) {}
}

export class LoadCustomFormListCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_CUSTOM_FORM_LIST;
}

export class LoadCustomFormListCustomProcessMapSuccess implements Action {
  readonly type = CustomProcessMapActionTypes.LOAD_CUSTOM_FORM_LIST_SUCCESS;

  constructor(public payload: ICustomForm[]) {}
}

export class SaveCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, processId: number, editMode: boolean}) {}
}

export class AddCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.ADD;

  constructor(public payload: {data: any, processId: number}) {}
}


export class DeleteDataCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, processId: number}) {}
}


export class RemoveDataCustomProcessMap implements Action {
  readonly type = CustomProcessMapActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type CustomProcessMapActions =
  | ShowEditorCustomProcessMap
  | HideEditorCustomProcessMap
  | ShowViewerCustomProcessMap
  | HideViewerCustomProcessMap
  | ProcessingCustomProcessMap
  | NotProcessingCustomProcessMap
  | LoadDataCustomProcessMap
  | LoadDataCustomProcessMapSuccess
  | SaveCustomProcessMap
  | AddCustomProcessMap
  | DeleteDataCustomProcessMap
  | RemoveDataCustomProcessMap
  | LoadRolesCustomProcessMap
  | LoadRolesCustomProcessMapSuccess
  | LoadPermissionsCustomProcessMapSuccess
  | LoadPermissionsCustomProcessMapSuccess
  | LoadCustomFormListCustomProcessMap
  | LoadCustomFormListCustomProcessMapSuccess;
