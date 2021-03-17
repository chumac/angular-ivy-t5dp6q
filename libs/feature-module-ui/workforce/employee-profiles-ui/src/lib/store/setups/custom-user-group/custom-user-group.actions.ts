import { Action } from '@ngrx/store';
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum CustomUserGroupSetupActionTypes {
  LOADING_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Loading Data',
  NOT_LOADING_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Not Load Data',

  LOAD_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Load Data Success',

  SHOW_EDITOR = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Not Processing',

  LOAD_DOCUMENT = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Load Inline Document',

  ADD = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Add',
  ADD_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Add Success',

  SAVE = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Save Success',

  DELETE_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUP_SETUPS] Delete Data',
}

export class LoadingCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.LOADING_DATA;

  constructor() { }
}
export class NotLoadingCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.NOT_LOADING_DATA;
}

export class LoadDataCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.LOAD_DATA;

  constructor() { }
}
export class LoadDataCustomUserGroupSetupSuccess implements Action {
  readonly type = CustomUserGroupSetupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ICustomUserGroupSetup[]) { }
}

export class ShowEditorCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.SHOW_EDITOR;
}

export class HideEditorCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.HIDE_EDITOR;
}
export class ShowViewerCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.SHOW_VIEWER;
}

export class HideViewerCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.HIDE_VIEWER;
}

export class ProcessingCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.PROCESSING;
}
export class NotProcessingCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.NOT_PROCESSING;
}
export class LoadDocumentCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.LOAD_DOCUMENT;

  constructor(public payload: { recordId: number, isApproved: boolean }) { }
}
export class LoadDocumentCustomUserGroupSetupSuccess implements Action {
  readonly type = CustomUserGroupSetupActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}
export class ClearDocumentCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: { recordId: number, isApproved: boolean }) { }
}

export class AddCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.ADD;

  constructor(public payload: { data: ICustomUserGroupSetup }) { }
}

export class SaveCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.SAVE;

  constructor(public payload: { data: ICustomUserGroupSetup, recordId: number, editMode: boolean }) { }
}

export class DeleteDataCustomUserGroupSetup implements Action {
  readonly type = CustomUserGroupSetupActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}


export type CustomUserGroupSetupActions =
  | ShowEditorCustomUserGroupSetup
  | HideEditorCustomUserGroupSetup
  | ShowViewerCustomUserGroupSetup
  | HideViewerCustomUserGroupSetup
  | ProcessingCustomUserGroupSetup
  | NotProcessingCustomUserGroupSetup
  | LoadDataCustomUserGroupSetup
  | LoadDataCustomUserGroupSetupSuccess
  | LoadDocumentCustomUserGroupSetup
  | LoadDocumentCustomUserGroupSetupSuccess
  | ClearDocumentCustomUserGroupSetup
  | LoadInlineDocumentCustomUserGroupSetup
  | SaveCustomUserGroupSetup
  | AddCustomUserGroupSetup
  | DeleteDataCustomUserGroupSetup
  | LoadingCustomUserGroupSetup
  | NotLoadingCustomUserGroupSetup;

