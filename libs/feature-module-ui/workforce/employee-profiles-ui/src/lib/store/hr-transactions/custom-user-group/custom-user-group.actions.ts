import { Action } from '@ngrx/store';
import { ICustomUserGroup, ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';

export enum CustomUserGroupActionTypes {
  LOAD_APPROVED_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Awaiting Approval Data Success',

  LOAD_CUSTOM_GROUPS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Custom Groups',
  LOAD_CUSTOM_GROUPS_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Custom Groups Success',

  LOAD_VALUES = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Values',
  LOAD_VALUES_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Values Success',

  SHOW_EDITOR = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Not Processing',

  LOAD_DOCUMENT = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Load Inline Document',

  ADD = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Add',
  ADD_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Add Success',

  SAVE = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Save Success',

  DELETE_DATA = '[HR_TRANSACTION - CUSTOM_USER_GROUPS] Delete Data',
}

export class LoadApprovedDataCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_APPROVED_DATA;
  
  constructor(public payload: {recordId: number}) {}
}
export class LoadApprovedDataCustomUserGroupSuccess implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ICustomUserGroup[]) {}
}

export class LoadAwaitingApprovalDataCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  
  constructor() {}
}
export class LoadAwaitingApprovalDataCustomUserGroupSuccess implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ICustomUserGroup[]) {}
}

export class LoadCustomGroupsCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_CUSTOM_GROUPS;
  
  constructor() {}
}
export class LoadCustomGroupsCustomUserGroupSuccess implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_CUSTOM_GROUPS_SUCCESS;

  constructor(public payload: ICustomUserGroupSetup[]) {}
}

export class LoadValuesCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_VALUES;
  
  constructor(public payload: {groupId: number}) {}
}
export class LoadValuesCustomUserGroupSuccess implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_VALUES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class ShowEditorCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.SHOW_EDITOR;
}

export class HideEditorCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.HIDE_EDITOR;
}
export class ShowViewerCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.SHOW_VIEWER;
}

export class HideViewerCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.HIDE_VIEWER;
}

export class ProcessingCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.PROCESSING;
}
export class NotProcessingCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.NOT_PROCESSING;
}
export class LoadDocumentCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}
export class LoadDocumentCustomUserGroupSuccess implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}
export class ClearDocumentCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class AddCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.ADD;

  constructor(public payload: {data: ICustomUserGroup}) {}
}

export class SaveCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.SAVE;

  constructor(public payload: {data: ICustomUserGroup, recordId: number, editMode: boolean}) {}
}

export class DeleteDataCustomUserGroup implements Action {
  readonly type = CustomUserGroupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, groupId: number}) {}
}


export type CustomUserGroupActions =
| ShowEditorCustomUserGroup
| HideEditorCustomUserGroup
| ShowViewerCustomUserGroup
| HideViewerCustomUserGroup
| ProcessingCustomUserGroup
| NotProcessingCustomUserGroup
| LoadApprovedDataCustomUserGroup
| LoadApprovedDataCustomUserGroupSuccess
| LoadAwaitingApprovalDataCustomUserGroup
| LoadAwaitingApprovalDataCustomUserGroupSuccess
| LoadCustomGroupsCustomUserGroup
| LoadCustomGroupsCustomUserGroupSuccess
| LoadValuesCustomUserGroup
| LoadValuesCustomUserGroupSuccess
| LoadDocumentCustomUserGroup
| LoadDocumentCustomUserGroupSuccess
| ClearDocumentCustomUserGroup
| LoadInlineDocumentCustomUserGroup
| SaveCustomUserGroup
| AddCustomUserGroup
| DeleteDataCustomUserGroup;

