import { Action } from '@ngrx/store';
import { ISelectOption, INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { ILeaveEntitlement, ILeaveDailyData, ILeaveStaggeredDetail } from '@nutela/models/workforce/leave';

export enum LeaveStaggeredActionTypes {
  SHOW_EDITOR = '[LEAVE STAGGERED] Show Editor',
  HIDE_EDITOR = '[LEAVE STAGGERED] Hide Editor',

  SHOW_VIEWER = '[LEAVE STAGGERED] Show Viewer',
  HIDE_VIEWER = '[LEAVE STAGGERED] Hide Viewer',

  SHOW_MODAL = '[LEAVE STAGGERED] Show Modal',
  HIDE_MODAL = '[LEAVE STAGGERED] Hide Modal',

  SHOW_DETAIL_EDITOR = '[LEAVE STAGGERED] Show Detail Editor',
  HIDE_DETAIL_EDITOR = '[LEAVE STAGGERED] Hide Detail Editor',

  PROCESSING = '[LEAVE STAGGERED] Processing',
  NOT_PROCESSING = '[LEAVE STAGGERED] Not Processing',

  LOADING_LEAVE = '[LEAVE STAGGERED] Loading Leave',
  NOT_LOADING_LEAVE = '[LEAVE STAGGERED] Not Loading Leave',

  LOAD_LEAVE_ENTITLEMENT = '[LEAVE STAGGERED] Load Leave Entitlement',
  LOAD_LEAVE_ENTITLEMENT_SUCCESS = '[LEAVE STAGGERED] Load Leave Entitlement Success',

  LOAD_LEAVE_STAGGERED_TYPE = '[LEAVE STAGGERED] Load Leave Type',
  LOAD_LEAVE_STAGGERED_TYPE_SUCCESS = '[LEAVE STAGGERED] Load Leave Type Success',

  LOAD_LEAVE_IDENTITY = '[LEAVE STAGGERED] Load Leave STAGGERED Identity',
  LOAD_LEAVE_IDENTITY_SUCCESS = '[LEAVE STAGGERED] Load Leave STAGGERED Identity Success',

  LOAD_CURRENCY_LIST = '[LEAVE STAGGERED] Load Currency List',
  LOAD_CURRENCY_LIST_SUCCESS = '[LEAVE STAGGERED] Load Currency List Success',

  LOAD_LEAVE_APPLY_STATES = '[LEAVE STAGGERED] Load States',
  LOAD_LEAVE_APPLY_STATES_READY = '[LEAVE STAGGERED] Load States Ready',

  LOAD_LEAVE_APPLY_CITIES = '[LEAVE STAGGERED] Load Cities',
  LOAD_LEAVE_APPLY_CITIES_READY = '[LEAVE STAGGERED] Load Cities Ready',

  ADD = '[LEAVE STAGGERED] Add',
  ADD_SUCCESS = '[LEAVE STAGGERED] Add Success',
  ADD_FAILURE = '[LEAVE STAGGERED] Add Failure',

  ADD_DETAIL = '[LEAVE STAGGERED] Add Detail',
  ADD_DETAIL_SUCCESS = '[LEAVE STAGGERED] Add Detail Success',
  ADD_DETAIL_FAILURE = '[LEAVE STAGGERED] Add Detail Failure',

  SAVE_DETAIL = '[LEAVE STAGGERED] Save Detail',
  SAVE_DETAIL_SUCCESS = '[LEAVE STAGGERED] Save Detail Success',
  SAVE_DETAIL_FAILURE = '[LEAVE STAGGERED] Save Detail Failure',

  SAVE = '[LEAVE STAGGERED] Save',
  SAVE_SUCCESS = '[LEAVE STAGGERED] Save Success',
  SAVE_FAILURE = '[LEAVE STAGGERED] Save Failure',

  CANCEL = '[LEAVE STAGGERED] Cancel',
  CANCEL_SUCCESS = '[LEAVE STAGGERED] Cancel Success',
  CANCEL_FAILURE = '[LEAVE STAGGERED] Cancel Failure',

  REVIEW = '[LEAVE STAGGERED] Review',
  REVIEW_SUCCESS = '[LEAVE STAGGERED] Review Success',
  REVIEW_FAILURE = '[LEAVE STAGGERED] Review Failure',

  DELETE_MASTER = '[LEAVE STAGGERED] Delete Staggered',

  DELETE_DETAIL = '[LEAVE STAGGERED] Delete Detail',

  LOAD_APPROVED_DATA = '[LEAVE STAGGERED] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE STAGGERED] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[LEAVE STAGGERED] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LEAVE STAGGERED] Load Awaiting Approval Data Success'
}

export class ShowEditorLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.HIDE_EDITOR;
}

export class ShowViewerLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.SHOW_VIEWER;
}

export class HideViewerLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.HIDE_VIEWER;
}

export class ShowModalLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.SHOW_MODAL;
}

export class HideModalLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.HIDE_MODAL;
}

export class ShowDetailEditorLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.SHOW_DETAIL_EDITOR;
}

export class HideDetailEditorLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.HIDE_DETAIL_EDITOR;
}



export class ProcessingLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.PROCESSING;
}

export class NotProcessingLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.NOT_PROCESSING;
}

export class LoadingLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.LOADING_LEAVE;
}

export class NotLoadingLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.NOT_LOADING_LEAVE;
}

export class LoadEntitlementLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_ENTITLEMENT;

  constructor(public payload: { selectedLeaveType: ISelectOption}) {}
}

export class LoadEntitlementLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS;

  constructor(public payload: { leaveEntitlement: ILeaveEntitlement }) {}
}

export class LoadLeaveStaggeredIdentity implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_IDENTITY;
}

export class LoadLeaveStaggeredIdentitySuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_IDENTITY_SUCCESS;

  constructor(public payload: { leaveStaggeredId: any }) {}
}

export class LoadLeaveStaggeredCurrencyList implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_CURRENCY_LIST;
}

export class LoadLeaveStaggeredCurrencyListSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_CURRENCY_LIST_SUCCESS;

  constructor(public payload: { currencyList: ISelectOption[] }) {}
}

export class LoadStatesLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesLeaveStaggeredReady implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesLeaveStaggeredReady implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class AddLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.ADD;

  constructor(public payload: { leaveData: ILeaveDailyData, saveMode: string }) {}
}

export class AddLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.ADD_SUCCESS;
}

export class AddLeaveStaggeredFailure implements Action {
  readonly type = LeaveStaggeredActionTypes.ADD_FAILURE;

  constructor(public error: any) {}
}

export class AddDetailLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.ADD_DETAIL;

  constructor(public payload: { leaveData: ILeaveStaggeredDetail }) {}
}

export class AddDetailLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.ADD_DETAIL_SUCCESS;
}

export class AddDetailLeaveStaggeredFailure implements Action {
  readonly type = LeaveStaggeredActionTypes.ADD_DETAIL_FAILURE;

  constructor(public error: any) {}
}

export class SaveDetailLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.SAVE_DETAIL;

  constructor(public payload: { leaveData: ILeaveStaggeredDetail, recordId: number }) {}
}

export class SaveDetailLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.SAVE_DETAIL_SUCCESS;
}

export class SaveDetailLeaveStaggeredFailure implements Action {
  readonly type = LeaveStaggeredActionTypes.SAVE_DETAIL_FAILURE;

  constructor(public error: any) {}
}
export class SaveLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.SAVE;

  constructor(public payload: { staggeredLeaveId: number}) {}
}

export class SaveLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveStaggeredFailure implements Action {
  readonly type = LeaveStaggeredActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class CancelLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.CANCEL;

  constructor(public payload: { leaveStaggeredId: number }) {}
}

export class CancelLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.CANCEL_SUCCESS;
}

export class CancelLeaveStaggeredFailure implements Action {
  readonly type = LeaveStaggeredActionTypes.CANCEL_FAILURE;

  constructor(public error: any) {}
}

export class ReviewLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.REVIEW;

  constructor(public payload: { leaveStaggeredId: number }) {}
}

export class ReviewLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.REVIEW_SUCCESS;
}

export class ReviewLeaveStaggeredFailure implements Action {
  readonly type = LeaveStaggeredActionTypes.REVIEW_FAILURE;

  constructor(public error: any) {}
}
export class DeleteDetailLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.DELETE_DETAIL;

  constructor(public payload: { recordId: number }) {}
}

export class DeleteMasterLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.DELETE_MASTER;

  constructor(public payload: { recordId: number }) {}
}

export class LoadApprovedDataLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadAwaitingApprovalDataLeaveStaggered implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataLeaveStaggeredSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadLeaveStaggeredType implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_STAGGERED_TYPE;
}

export class LoadLeaveStaggeredTypeSuccess implements Action {
  readonly type = LeaveStaggeredActionTypes.LOAD_LEAVE_STAGGERED_TYPE_SUCCESS;

  constructor(public payload: { leaveType: ISelectOption[] }) {}
}

export type LeaveStaggeredActions =
  | ShowEditorLeaveStaggered
  | HideEditorLeaveStaggered
  | ShowViewerLeaveStaggered
  | HideViewerLeaveStaggered
  | ShowModalLeaveStaggered
  | HideModalLeaveStaggered
  | ShowDetailEditorLeaveStaggered
  | HideDetailEditorLeaveStaggered
  | ProcessingLeaveStaggered
  | NotProcessingLeaveStaggered
  | LoadingLeaveStaggered
  | NotLoadingLeaveStaggered
  | LoadEntitlementLeaveStaggered
  | LoadEntitlementLeaveStaggeredSuccess
  | LoadLeaveStaggeredIdentity
  | LoadLeaveStaggeredIdentitySuccess
  | LoadLeaveStaggeredCurrencyList
  | LoadLeaveStaggeredCurrencyListSuccess
  | LoadStatesLeaveStaggered
  | LoadStatesLeaveStaggeredReady
  | LoadCitiesLeaveStaggered
  | LoadCitiesLeaveStaggeredReady
  | AddLeaveStaggered
  | AddLeaveStaggeredSuccess
  | AddLeaveStaggeredFailure
  | AddDetailLeaveStaggered
  | AddDetailLeaveStaggeredSuccess
  | AddDetailLeaveStaggeredFailure
  | SaveDetailLeaveStaggered
  | SaveDetailLeaveStaggeredSuccess
  | SaveDetailLeaveStaggeredFailure
  | SaveLeaveStaggered
  | SaveLeaveStaggeredSuccess
  | SaveLeaveStaggeredFailure
  | CancelLeaveStaggered
  | CancelLeaveStaggeredSuccess
  | CancelLeaveStaggeredFailure
  | ReviewLeaveStaggered
  | ReviewLeaveStaggeredSuccess
  | ReviewLeaveStaggeredFailure
  | DeleteDetailLeaveStaggered
  | DeleteMasterLeaveStaggered
  | LoadApprovedDataLeaveStaggered
  | LoadApprovedDataLeaveStaggeredSuccess
  | LoadAwaitingApprovalDataLeaveStaggered
  | LoadAwaitingApprovalDataLeaveStaggeredSuccess
  | LoadLeaveStaggeredType
  | LoadLeaveStaggeredTypeSuccess;
