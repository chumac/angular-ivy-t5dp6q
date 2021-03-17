import { Action } from '@ngrx/store';
import { ISelectOption, INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { ILeaveEntitlement, ILeaveDailyData, ILeavePlanDetail } from '@nutela/models/workforce/leave';

export enum LeavePlanActionTypes {
  SHOW_EDITOR = '[LEAVE PLAN] Show Editor',
  HIDE_EDITOR = '[LEAVE PLAN] Hide Editor',

  SHOW_VIEWER = '[LEAVE PLAN] Show Viewer',
  HIDE_VIEWER = '[LEAVE PLAN] Hide Viewer',

  SHOW_MODAL = '[LEAVE PLAN] Show Modal',
  HIDE_MODAL = '[LEAVE PLAN] Hide Modal',

  SHOW_DETAIL_EDITOR = '[LEAVE PLAN] Show Detail Editor',
  HIDE_DETAIL_EDITOR = '[LEAVE PLAN] Hide Detail Editor',

  PROCESSING = '[LEAVE PLAN] Processing',
  NOT_PROCESSING = '[LEAVE PLAN] Not Processing',

  LOADING_LEAVE = '[LEAVE PLAN] Loading Leave',
  NOT_LOADING_LEAVE = '[LEAVE PLAN] Not Loading Leave',

  LOAD_LEAVE_ENTITLEMENT = '[LEAVE PLAN] Load Leave Entitlement',
  LOAD_LEAVE_ENTITLEMENT_SUCCESS = '[LEAVE PLAN] Load Leave Entitlement Success',

  LOAD_LEAVE_PLAN_IDENTITY = '[LEAVE PLAN] Load Leave Plan Identity',
  LOAD_LEAVE_PLAN_IDENTITY_SUCCESS = '[LEAVE PLAN] Load Leave Plan Identity Success',

  LOAD_LEAVE_PLAN_TYPE = '[LEAVE PLAN] Load Leave Plan Type',
  LOAD_LEAVE_PLAN_TYPE_SUCCESS = '[LEAVE PLAN] Load Leave Plan Type Success',

  LOAD_LEAVE_APPLY_STATES = '[LEAVE PLAN] Load States',
  LOAD_LEAVE_APPLY_STATES_READY = '[LEAVE PLAN] Load States Ready',

  LOAD_LEAVE_APPLY_CITIES = '[LEAVE PLAN] Load Cities',
  LOAD_LEAVE_APPLY_CITIES_READY = '[LEAVE PLAN] Load Cities Ready',

  ADD = '[LEAVE PLAN] Add',
  ADD_SUCCESS = '[LEAVE PLAN] Add Success',
  ADD_FAILURE = '[LEAVE PLAN] Add Failure',

  ADD_DETAIL = '[LEAVE PLAN] Add Detail',
  ADD_DETAIL_SUCCESS = '[LEAVE PLAN] Add Detail Success',
  ADD_DETAIL_FAILURE = '[LEAVE PLAN] Add Detail Failure',

  SAVE_DETAIL = '[LEAVE PLAN] Save Detail',
  SAVE_DETAIL_SUCCESS = '[LEAVE PLAN] Save Detail Success',
  SAVE_DETAIL_FAILURE = '[LEAVE PLAN] Save Detail Failure',

  SAVE = '[LEAVE PLAN] Save',
  SAVE_SUCCESS = '[LEAVE PLAN] Save Success',
  SAVE_FAILURE = '[LEAVE PLAN] Save Failure',

  CANCEL = '[LEAVE PLAN] Cancel',
  CANCEL_SUCCESS = '[LEAVE PLAN] Cancel Success',
  CANCEL_FAILURE = '[LEAVE PLAN] Cancel Failure',

  REVIEW = '[LEAVE PLAN] Review',
  REVIEW_SUCCESS = '[LEAVE PLAN] Review Success',
  REVIEW_FAILURE = '[LEAVE PLAN] Review Failure',

  DELETE_PLAN = '[LEAVE PLAN] Delete Plan',

  DELETE_DETAIL = '[LEAVE PLAN] Delete Detail',

  LOAD_APPROVED_DATA = '[LEAVE PLAN] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE PLAN] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[LEAVE PLAN] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LEAVE PLAN] Load Awaiting Approval Data Success'
}

export class ShowEditorLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.SHOW_EDITOR;
}

export class HideEditorLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.HIDE_EDITOR;
}

export class ShowViewerLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.SHOW_VIEWER;
}

export class HideViewerLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.HIDE_VIEWER;
}

export class ShowModalLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.SHOW_MODAL;
}

export class HideModalLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.HIDE_MODAL;
}

export class ShowDetailEditorLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.SHOW_DETAIL_EDITOR;
}

export class HideDetailEditorLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.HIDE_DETAIL_EDITOR;
}



export class ProcessingLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.PROCESSING;
}

export class NotProcessingLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.NOT_PROCESSING;
}

export class LoadingLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.LOADING_LEAVE;
}

export class NotLoadingLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.NOT_LOADING_LEAVE;
}

export class LoadEntitlementLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_ENTITLEMENT;

  constructor(public payload: { selectedLeaveType: ISelectOption}) {}
}

export class LoadEntitlementLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS;

  constructor(public payload: { leaveEntitlement: ILeaveEntitlement }) {}
}

export class LoadLeavePlanIdentity implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_PLAN_IDENTITY;
}

export class LoadLeavePlanIdentitySuccess implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_PLAN_IDENTITY_SUCCESS;

  constructor(public payload: { leavePlanId: any }) {}
}

export class LoadLeavePlanType implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_PLAN_TYPE;
}

export class LoadLeavePlanTypeSuccess implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_PLAN_TYPE_SUCCESS;

  constructor(public payload: { leavePlanType: ISelectOption[] }) {}
}

export class LoadStatesLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_APPLY_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesLeavePlanReady implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_APPLY_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_APPLY_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesLeavePlanReady implements Action {
  readonly type = LeavePlanActionTypes.LOAD_LEAVE_APPLY_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class AddLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.ADD;

  constructor(public payload: { leaveData: ILeaveDailyData, saveMode: string }) {}
}

export class AddLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.ADD_SUCCESS;
}

export class AddLeavePlanFailure implements Action {
  readonly type = LeavePlanActionTypes.ADD_FAILURE;

  constructor(public error: any) {}
}

export class AddDetailLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.ADD_DETAIL;

  constructor(public payload: { leaveData: ILeavePlanDetail }) {}
}

export class AddDetailLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.ADD_DETAIL_SUCCESS;
}

export class AddDetailLeavePlanFailure implements Action {
  readonly type = LeavePlanActionTypes.ADD_DETAIL_FAILURE;

  constructor(public error: any) {}
}

export class SaveDetailLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.SAVE_DETAIL;

  constructor(public payload: { leaveData: ILeavePlanDetail, recordId: number }) {}
}

export class SaveDetailLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.SAVE_DETAIL_SUCCESS;
}

export class SaveDetailLeavePlanFailure implements Action {
  readonly type = LeavePlanActionTypes.SAVE_DETAIL_FAILURE;

  constructor(public error: any) {}
}
export class SaveLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.SAVE;

  constructor(public payload: { leavePlanId: number }) {}
}

export class SaveLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.SAVE_SUCCESS;
}

export class SaveLeavePlanFailure implements Action {
  readonly type = LeavePlanActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class CancelLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.CANCEL;

  constructor(public payload: { leavePlanId: number }) {}
}

export class CancelLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.CANCEL_SUCCESS;
}

export class CancelLeavePlanFailure implements Action {
  readonly type = LeavePlanActionTypes.CANCEL_FAILURE;

  constructor(public error: any) {}
}

export class ReviewLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.REVIEW;

  constructor(public payload: { leavePlanId: number }) {}
}

export class ReviewLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.REVIEW_SUCCESS;
}

export class ReviewLeavePlanFailure implements Action {
  readonly type = LeavePlanActionTypes.REVIEW_FAILURE;

  constructor(public error: any) {}
}



export class DeleteDetailLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.DELETE_DETAIL;

  constructor(public payload: { recordId: number }) {}
}

export class DeletePlanLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.DELETE_PLAN;

  constructor(public payload: { recordId: number }) {}
}

export class LoadApprovedDataLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadAwaitingApprovalDataLeavePlan implements Action {
  readonly type = LeavePlanActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataLeavePlanSuccess implements Action {
  readonly type = LeavePlanActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export type LeavePlanActions =
  | ShowEditorLeavePlan
  | HideEditorLeavePlan
  | ShowViewerLeavePlan
  | HideViewerLeavePlan
  | ShowModalLeavePlan
  | HideModalLeavePlan
  | ShowDetailEditorLeavePlan
  | HideDetailEditorLeavePlan
  | ProcessingLeavePlan
  | NotProcessingLeavePlan
  | LoadingLeavePlan
  | NotLoadingLeavePlan
  | LoadEntitlementLeavePlan
  | LoadEntitlementLeavePlanSuccess
  | LoadLeavePlanIdentity
  | LoadLeavePlanIdentitySuccess
  | LoadLeavePlanType
  | LoadLeavePlanTypeSuccess
  | LoadStatesLeavePlan
  | LoadStatesLeavePlanReady
  | LoadCitiesLeavePlan
  | LoadCitiesLeavePlanReady
  | AddLeavePlan
  | AddLeavePlanSuccess
  | AddLeavePlanFailure
  | AddDetailLeavePlan
  | AddDetailLeavePlanSuccess
  | AddDetailLeavePlanFailure
  | SaveDetailLeavePlan
  | SaveDetailLeavePlanSuccess
  | SaveDetailLeavePlanFailure
  | SaveLeavePlan
  | SaveLeavePlanSuccess
  | SaveLeavePlanFailure
  | CancelLeavePlan
  | CancelLeavePlanSuccess
  | CancelLeavePlanFailure
  | ReviewLeavePlan
  | ReviewLeavePlanSuccess
  | ReviewLeavePlanFailure
  | DeleteDetailLeavePlan
  | DeletePlanLeavePlan
  | LoadApprovedDataLeavePlan
  | LoadApprovedDataLeavePlanSuccess
  | LoadAwaitingApprovalDataLeavePlan
  | LoadAwaitingApprovalDataLeavePlanSuccess;
