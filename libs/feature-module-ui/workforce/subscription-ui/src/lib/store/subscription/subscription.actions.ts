import { Action } from '@ngrx/store';

import { ISubscription, ISubscriptionType, IMembershipInfo } from '@nutela/models/workforce/subscription';
import { ISelectOption } from '@nutela/models/core-data';

export enum SubscriptionActionTypes {
  SHOW_EDITOR = '[MY SUBSCRIPTION - SUBSCRIPTION] Show Editor',
  HIDE_EDITOR = '[MY SUBSCRIPTION - SUBSCRIPTION] Hide Editor',

  SHOW_VIEWER = '[MY SUBSCRIPTION - SUBSCRIPTION] Show Viewer',
  HIDE_VIEWER = '[MY SUBSCRIPTION - SUBSCRIPTION] Hide Viewer',

  PROCESSING = '[MY SUBSCRIPTION - SUBSCRIPTION] Processing',
  NOT_PROCESSING = '[MY SUBSCRIPTION - SUBSCRIPTION] Not Processing',

  LOAD_APPROVED_DATA = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Awaiting Approval Data Success',

  LOAD_PROCESSED_DATA = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Processed Data',
  LOAD_PROCESSED_DATA_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Processed Data Success',

  LOAD_SUBSCRIPTION_TYPE = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Subscription Type',
  LOAD_SUBSCRIPTION_TYPE_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Subscription Type Success',

  LOAD_MEMBERSHIP_LIST = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Membership List',
  LOAD_MEMBERSHIP_LIST_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Membership List Success',

  LOAD_CURRENCY_LIST = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Currency List',
  LOAD_CURRENCY_LIST_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTION] Load Currency List Success',

  SAVE = '[MY SUBSCRIPTION - SUBSCRIPTION] Save',
  SAVE_SUCCESS = '[MY SUBSCRIPTION - SUBSCRIPTIONL] Save Success',

  REFRESH_DATA = '[MY SUBSCRIPTION - SUBSCRIPTION] Refresh Data'
}

export class ShowEditorSubscription implements Action {
  readonly type = SubscriptionActionTypes.SHOW_EDITOR;
}

export class HideEditorSubscription implements Action {
  readonly type = SubscriptionActionTypes.HIDE_EDITOR;
}

export class ShowViewerSubscription implements Action {
  readonly type = SubscriptionActionTypes.SHOW_VIEWER;
}

export class HideViewerSubscription implements Action {
  readonly type = SubscriptionActionTypes.HIDE_VIEWER;
}

export class ProcessingSubscription implements Action {
  readonly type = SubscriptionActionTypes.PROCESSING;
}

export class NotProcessingSubscription implements Action {
  readonly type = SubscriptionActionTypes.NOT_PROCESSING;
}

export class LoadApprovedDataSubscription implements Action {
  readonly type = SubscriptionActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataSubscriptionSuccess implements Action {
  readonly type = SubscriptionActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ISubscription[]) {}
}

export class LoadAwaitingApprovalDataSubscription implements Action {
  readonly type = SubscriptionActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataSubscriptionSuccess implements Action {
  readonly type = SubscriptionActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ISubscription[]) {}
}

export class LoadProcessedDataSubscription implements Action {
  readonly type = SubscriptionActionTypes.LOAD_PROCESSED_DATA;
}

export class LoadProcessedDataSubscriptionSuccess implements Action {
  readonly type = SubscriptionActionTypes.LOAD_PROCESSED_DATA_SUCCESS;

  constructor(public payload: ISubscription[]) {}
}

export class LoadSubscriptionTypeSubscription implements Action {
  readonly type = SubscriptionActionTypes.LOAD_SUBSCRIPTION_TYPE;
}

export class LoadSubscriptionTypeSubscriptionSuccess implements Action {
  readonly type = SubscriptionActionTypes.LOAD_SUBSCRIPTION_TYPE_SUCCESS;

  constructor(public payload: ISubscriptionType[]) {}
}

export class LoadMembershipListSubscription implements Action {
  readonly type = SubscriptionActionTypes.LOAD_MEMBERSHIP_LIST;
  constructor(public payload: number) {}
}

export class LoadMembershipListSubscriptionSuccess implements Action {
  readonly type = SubscriptionActionTypes.LOAD_MEMBERSHIP_LIST_SUCCESS;

  constructor(public payload: IMembershipInfo[]) {}
}

export class LoadCurrencyListSubscription implements Action {
  readonly type = SubscriptionActionTypes.LOAD_CURRENCY_LIST;
}

export class LoadCurrencyListSubscriptionSuccess implements Action {
  readonly type = SubscriptionActionTypes.LOAD_CURRENCY_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class SaveSubscription implements Action {
  readonly type = SubscriptionActionTypes.SAVE;

  constructor(
    public payload: { data: ISubscription; recordId: number; editMode: boolean }
  ) {}
}

export class LoadDataSubscription implements Action {
  readonly type = SubscriptionActionTypes.REFRESH_DATA;
}

export type SubscriptionActions =
  | ShowEditorSubscription
  | HideEditorSubscription
  | ShowViewerSubscription
  | HideViewerSubscription
  | ProcessingSubscription
  | NotProcessingSubscription
  | LoadApprovedDataSubscription
  | LoadApprovedDataSubscriptionSuccess
  | LoadAwaitingApprovalDataSubscription
  | LoadAwaitingApprovalDataSubscriptionSuccess
  | LoadProcessedDataSubscription
  | LoadProcessedDataSubscriptionSuccess
  | LoadSubscriptionTypeSubscription
  | LoadSubscriptionTypeSubscriptionSuccess
  | LoadMembershipListSubscription
  | LoadMembershipListSubscriptionSuccess
  | LoadCurrencyListSubscription
  | LoadCurrencyListSubscriptionSuccess
  | SaveSubscription
  | LoadDataSubscription;
