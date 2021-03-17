import { Action } from '@ngrx/store';

import { INotification } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';


export enum NotificationActionTypes {

  SHOW_EDITOR = '[ NOTIFICATION] Show Editor',
  HIDE_EDITOR = '[NOTIFICATION] Hide Editor',

  PROCESSING = '[ NOTIFICATION] Processing',
  NOT_PROCESSING = '[ NOTIFICATION] Not Processing',

  LOADING = '[ NOTIFICATION] LOADING',
  NOT_LOADING = '[ NOTIFICATION] Not LOADING',

  LOAD_NOTIFICATION_DATA = '[ NOTIFICATION] Load Notification Data',
  LOAD_NOTIFICATION_DATA_SUCCESS = '[ NOTIFICATION] Load Notification Data Success',

  LOAD_POSITION_DATA = '[NOTIFICATION] Load Specific Position  Data',
  LOAD_POSITION_DATA_SUCCESS = '[NOTIFICATION] Load Specific Position Data Success',

  LOAD_NOTIFICATION_TO = '[NOTIFICATION] Load NotificationTo ',
  LOAD_NOTIFICATION_TO_SUCCESS = '[NOTIFICATION] Load NotificationTo Success',

  LOAD_PROCESS = '[NOTIFICATION] Load Process  Data',
  LOAD_PROCESS_SUCCESS = '[NOTIFICATION] Load Process Data Success',

  SAVE = '[NOTIFICATION] Save',
  SAVE_SUCCESS = '[ NOTIFICATION] Save Success',

  DELETE_NOTIFICATION_DATA = '[NOTIFICATION] Delete  Data',

  LOAD_ROLES = '[ NOTIFICATION ] Load  Roles',
  LOAD_ROLES_SUCCESS = '[ NOTIFICATION ] Load Roles Success',
}


export class ShowEditorNotification implements Action {
  readonly type = NotificationActionTypes.SHOW_EDITOR;
}

export class HideEditorNotification implements Action {
  readonly type = NotificationActionTypes.HIDE_EDITOR;
}

export class ProcessingNotification implements Action {
  readonly type = NotificationActionTypes.PROCESSING;
}


export class NotProcessingNotification implements Action {
  readonly type = NotificationActionTypes.NOT_PROCESSING;
}


export class LoadingNotification implements Action {
  readonly type = NotificationActionTypes.LOADING;
}

export class NotLoadingNotification implements Action {
  readonly type = NotificationActionTypes.NOT_LOADING;
}

export class LoadNotificationData implements Action {
  readonly type = NotificationActionTypes.LOAD_NOTIFICATION_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class LoadNotificationDataSuccess implements Action {
  readonly type = NotificationActionTypes.LOAD_NOTIFICATION_DATA_SUCCESS;

  constructor(public payload: INotification[]) {}
}

export class LoadPosition implements Action {
  readonly type =NotificationActionTypes.LOAD_POSITION_DATA;
}

export class LoadPositionSuccess implements Action {
  readonly type =NotificationActionTypes.LOAD_POSITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadRolesNotification implements Action {
  readonly type =NotificationActionTypes.LOAD_ROLES;
}

export class LoadRolesNotificationSuccess implements Action {
  readonly type =NotificationActionTypes.LOAD_ROLES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadNotificationTo implements Action {
  readonly type =NotificationActionTypes.LOAD_NOTIFICATION_TO;
}

export class LoadNotificationToSuccess implements Action {
  readonly type =NotificationActionTypes.LOAD_NOTIFICATION_TO_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadProcess implements Action {
  readonly type =NotificationActionTypes.LOAD_PROCESS;
}

export class LoadProcessSuccess implements Action {
  readonly type =NotificationActionTypes.LOAD_PROCESS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class SaveNotification implements Action {
  readonly type = NotificationActionTypes.SAVE;

  constructor(public payload: {data: INotification}) {}
}

export class DeleteNotificationData implements Action {
  readonly type = NotificationActionTypes.DELETE_NOTIFICATION_DATA
  constructor(public payload: {recordId: number, entityId: number}) {}
}


export type NotificationActions =
  | ShowEditorNotification
  | HideEditorNotification
  | ProcessingNotification
  | NotProcessingNotification
  | LoadingNotification
  | NotLoadingNotification
  | LoadNotificationData
  | LoadNotificationDataSuccess
  | LoadPosition
  | LoadPositionSuccess
  | LoadNotificationTo
  | LoadNotificationToSuccess
  | LoadProcess
  | LoadProcessSuccess
  | LoadRolesNotification
  | LoadRolesNotificationSuccess
  | SaveNotification
  | DeleteNotificationData;
