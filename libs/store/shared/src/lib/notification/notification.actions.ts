import { Action } from '@ngrx/store';
import { IApprovalNotification } from '@nutela/models/common';

export enum NotificationActionTypes {
  LOAD_QUEUE = '[APPROVALS - NOTIFICATIONS] Load Queue',
  LOAD_QUEUE_SUCCESS = '[APPROVALS - NOTIFICATIONS] Load Queue Success',

  LOAD_NUMBER_OF_RESPONSES = '[EXIT - INITIAL LOAD] Load Number of Responses',
  LOAD_NUMBER_OF_RESPONSES_SUCCESS = '[EXIT - INITIAL LOAD] Load Number of Responses Success',

  LOAD_HR_NUMBER_OF_RESPONSES = '[EXIT - INITIAL LOAD] Load HR Number of Responses',
  LOAD_HR_NUMBER_OF_RESPONSES_SUCCESS = '[EXIT - INITIAL LOAD] Load HR Number of Responses Success',

  LOAD_INITIATION_STATUS = '[EXIT - INITIAL LOAD] Load Initiation Status',
  LOAD_INITIATION_STATUS_SUCCESS = '[EXIT - INITIAL LOAD] Load Initiation Status Success',
}

export class LoadQueueNotification implements Action {
  readonly type = NotificationActionTypes.LOAD_QUEUE;
}

export class LoadQueueNotificationSuccess implements Action {
  readonly type = NotificationActionTypes.LOAD_QUEUE_SUCCESS;
  constructor(public payload: { approvalQueueData: IApprovalNotification[] }) { }
}

export class LoadExitResponseQueueNotification implements Action {
  readonly type = NotificationActionTypes.LOAD_NUMBER_OF_RESPONSES;
}

export class LoadExitResponseQueueNotificationSuccess implements Action {
  readonly type = NotificationActionTypes.LOAD_NUMBER_OF_RESPONSES_SUCCESS;
  constructor(public payload: number) { }
}

export class LoadHRExitResponseQueueNotification implements Action {
  readonly type = NotificationActionTypes.LOAD_HR_NUMBER_OF_RESPONSES;
}

export class LoadHRExitResponseQueueNotificationSuccess implements Action {
  readonly type = NotificationActionTypes.LOAD_HR_NUMBER_OF_RESPONSES_SUCCESS;
  constructor(public payload: number) { }
}

export class LoadExitInitiationProcessStatus implements Action {
  readonly type = NotificationActionTypes.LOAD_INITIATION_STATUS;
}

export class LoadExitInitiationProcessStatusSuccess implements Action {
  readonly type = NotificationActionTypes.LOAD_INITIATION_STATUS_SUCCESS;
  constructor(public payload: boolean) { }
}
export type NotificationActions =
  LoadQueueNotification
  | LoadQueueNotificationSuccess
  | LoadExitResponseQueueNotification
  | LoadExitResponseQueueNotificationSuccess
  | LoadHRExitResponseQueueNotification
  | LoadHRExitResponseQueueNotificationSuccess
  | LoadExitInitiationProcessStatus
  | LoadExitInitiationProcessStatusSuccess;
