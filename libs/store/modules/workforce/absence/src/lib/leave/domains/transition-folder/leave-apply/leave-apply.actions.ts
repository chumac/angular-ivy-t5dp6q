import { Action } from '@ngrx/store';
import { ISelectOption, INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { ILeaveEntitlement, ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveApplyActionTypes {
  SHOW_EDITOR = '[LEAVE APPLY] Show Editor',
  HIDE_EDITOR = '[LEAVE APPLY] Hide Editor',

  SHOW_FULL_FORM = '[LEAVE APPLY] Show Full Form',
  HIDE_FULL_FORM = '[LEAVE APPLY] Hide Full Form',

  PROCESSING = '[LEAVE APPLY] Processing',
  NOT_PROCESSING = '[LEAVE APPLY] Not Processing',

  LOAD_LEAVE_ENTITLEMENT = '[LEAVE APPLY] Load Leave Entitlement',
  LOAD_LEAVE_ENTITLEMENT_SUCCESS = '[LEAVE APPLY] Load Leave Entitlement Success',

  LOAD_LEAVE_APPLY_STATES = '[LEAVE APPLY] Load States',
  LOAD_LEAVE_APPLY_STATES_READY = '[LEAVE APPLY] Load States Ready',

  LOAD_LEAVE_APPLY_CITIES = '[LEAVE APPLY] Load Cities',
  LOAD_LEAVE_APPLY_CITIES_READY = '[LEAVE APPLY] Load Cities Ready',

  SAVE = '[LEAVE APPLY] Save',
  SAVE_SUCCESS = '[LEAVE APPLY] Save Success',
  SAVE_FAILURE = '[LEAVE APPLY] Save Failure',

  LOAD_APPROVED_DATA = '[LEAVE APPLY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE APPLY] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[LEAVE APPLY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LEAVE APPLY] Load Awaiting Approval Data Success',

  LOAD_INLINE_DOCUMENT = '[LEAVE APPLY] Load Inline Document',

}

export class ShowEditorLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.HIDE_EDITOR;
}

export class ShowFullFormLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.SHOW_FULL_FORM;
}

export class HideFullFormLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.HIDE_FULL_FORM;
}

export class ProcessingLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.PROCESSING;
}

export class NotProcessingLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.NOT_PROCESSING;
}

export class LoadEntitlementLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_LEAVE_ENTITLEMENT;

  constructor(public payload: { selectedLeaveType: ISelectOption}) {}
}

export class LoadEntitlementLeaveApplySuccess implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS;

  constructor(public payload: { leaveEntitlement: ILeaveEntitlement }) {}
}

export class LoadInlineDocumentLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadStatesLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_LEAVE_APPLY_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesLeaveApplyReady implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_LEAVE_APPLY_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_LEAVE_APPLY_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesLeaveApplyReady implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_LEAVE_APPLY_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class SaveLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.SAVE; 

  constructor(public payload: { leaveData: ILeaveDailyData, saveMode: string }) {}
}

export class SaveLeaveApplySuccess implements Action {
  readonly type = LeaveApplyActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveApplyFailure implements Action {
  readonly type =LeaveApplyActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class LoadApprovedDataLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataLeaveApplySuccess implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadAwaitingApprovalDataLeaveApply implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataLeaveApplySuccess implements Action {
  readonly type = LeaveApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export type LeaveApplyActions =
  | ShowEditorLeaveApply
  | HideEditorLeaveApply
  | ShowFullFormLeaveApply
  | HideFullFormLeaveApply
  | ProcessingLeaveApply
  | NotProcessingLeaveApply
  | LoadEntitlementLeaveApply
  | LoadEntitlementLeaveApplySuccess
  | LoadStatesLeaveApply
  | LoadStatesLeaveApplyReady
  | LoadCitiesLeaveApply
  | LoadCitiesLeaveApplyReady
  | LoadInlineDocumentLeaveApply
  | SaveLeaveApply
  | SaveLeaveApplySuccess  
  | SaveLeaveApplyFailure
  | LoadApprovedDataLeaveApply
  | LoadApprovedDataLeaveApplySuccess
  | LoadAwaitingApprovalDataLeaveApply
  | LoadAwaitingApprovalDataLeaveApplySuccess;
