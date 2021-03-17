import { Action } from '@ngrx/store';
import { ISelectOption, INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { ILeaveEntitlement, ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveProxyApplyActionTypes {
  SHOW_EDITOR = '[LEAVE PROXY APPLY] Show Editor',
  HIDE_EDITOR = '[LEAVE PROXY APPLY] Hide Editor',

  SHOW_VIEWER = '[LEAVE PROXY APPLY] Show Viewer',
  HIDE_VIEWER = '[LEAVE PROXY APPLY] Hide Viewer',

  SHOW_FULL_FORM = '[LEAVE PROXY APPLY] Show Full Form',
  HIDE_FULL_FORM = '[LEAVE PROXY APPLY] Hide Full Form',

  PROCESSING = '[LEAVE PROXY APPLY] Processing',
  NOT_PROCESSING = '[LEAVE PROXY APPLY] Not Processing',

  LOADING = '[LEAVE PROXY APPLY] Loading',
  NOT_LOADING = '[LEAVE PROXY APPLY] Not Loading',

  PROCESSING_FORM = '[LEAVE PROXY APPLY] Processing Form',
  NOT_PROCESSING_FORM = '[LEAVE PROXY APPLY] Not Processing Form',

  LOAD_LEAVE_ENTITLEMENT = '[LEAVE PROXY APPLY] Load Leave Entitlement',
  LOAD_LEAVE_ENTITLEMENT_SUCCESS = '[LEAVE PROXY APPLY] Load Leave Entitlement Success',

  LOAD_LEAVE_SUBDETAIL = '[LEAVE PROXY APPLY] Load Leave Subdetail',
  LOAD_LEAVE_SUBDETAIL_SUCCESS = '[LEAVE PROXY APPLY] Load Leave Subdetail Success',

  LOAD_LEAVE_APPLY_STATES = '[LEAVE PROXY APPLY] Load States',
  LOAD_LEAVE_APPLY_STATES_READY = '[LEAVE PROXY APPLY] Load States Ready',

  LOAD_LEAVE_APPLY_CITIES = '[LEAVE PROXY APPLY] Load Cities',
  LOAD_LEAVE_APPLY_CITIES_READY = '[LEAVE PROXY APPLY] Load Cities Ready',

  SAVE = '[LEAVE PROXY APPLY] Save',
  SAVE_SUCCESS = '[LEAVE PROXY APPLY] Save Success',
  SAVE_FAILURE = '[LEAVE PROXY APPLY] Save Failure',


  SHOW_EDITOR_RESET = '[LEAVE PROXY APPLY] Show Editor Reset',
  HIDE_EDITOR_RESET = '[LEAVE PROXY APPLY] Hide Editor Reset',
  SAVE_RESET = '[LEAVE PROXY APPLY] Save Reset',
  DELETE_LEAVE = '[LEAVE PROXY APPLY] Delete Leave',

  LOAD_APPROVED_DATA = '[LEAVE PROXY APPLY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE PROXY APPLY] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[LEAVE PROXY APPLY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LEAVE PROXY APPLY] Load Awaiting Approval Data Success',

  LOAD_INLINE_DOCUMENT = '[LEAVE PROXY APPLY] Load Inline Document',

  INVALIDATE = '[LEAVE PROXY APPLY] Invalidate',
  INVALIDATE_SUCCESS = '[LEAVE PROXY APPLY] Invalidate Success'

}

export class ShowEditorLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.HIDE_EDITOR;
}
export class ShowViewerLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.SHOW_VIEWER;
}

export class HideViewerLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.HIDE_VIEWER;
}


export class ShowFullFormLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.SHOW_FULL_FORM;
}

export class HideFullFormLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.HIDE_FULL_FORM;
}

export class LoadingLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOADING;
}

export class NotLoadingLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.NOT_LOADING;
}

export class ProcessingLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.PROCESSING;
}

export class NotProcessingLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.NOT_PROCESSING;
}

export class ProcessingFormLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.PROCESSING_FORM;
}

export class NotProcessingFormLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.NOT_PROCESSING_FORM;
}

export class LoadEntitlementLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_ENTITLEMENT;

  constructor(public payload: { selectedLeaveType: ISelectOption, employeeId: number }) {}
}

export class LoadEntitlementLeaveProxyApplySuccess implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS;

  constructor(public payload: { leaveEntitlement: ILeaveEntitlement}) {}
}

export class LoadInlineDocumentLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class LoadSubDetailLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_SUBDETAIL;

  constructor(public payload: { selectedLeaveType: ISelectOption, formData: ILeaveDailyData }) {}
}

export class LoadSubDetailLeaveProxyApplySuccess implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_SUBDETAIL_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadStatesLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesLeaveProxyApplyReady implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesLeaveProxyApplyReady implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class SaveLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.SAVE;

  constructor(public payload: { leaveData: ILeaveDailyData, saveMode: string }) {}
}

export class SaveLeaveProxyApplySuccess implements Action {
  readonly type = LeaveProxyApplyActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveProxyApplyFailure implements Action {
  readonly type =LeaveProxyApplyActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class LoadApprovedDataLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId: number}) {}

}

export class LoadApprovedDataLeaveProxyApplySuccess implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadAwaitingApprovalDataLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId: number}) {}

}

export class LoadAwaitingApprovalDataLeaveProxyApplySuccess implements Action {
  readonly type = LeaveProxyApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class InvalidateLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.INVALIDATE;
  constructor(public payload: {recordId: number, employeeId: number}) {}

}

export class InvalidateLeaveProxyApplySuccess implements Action {
  readonly type =LeaveProxyApplyActionTypes.INVALIDATE_SUCCESS;

  constructor(public payload: any) {}
}


export class ShowEditorLeaveProxyReset implements Action {
  readonly type = LeaveProxyApplyActionTypes.SHOW_EDITOR_RESET;
}

export class HideEditorLeaveProxyReset implements Action {
  readonly type = LeaveProxyApplyActionTypes.HIDE_EDITOR_RESET;
}

export class SaveLeaveProxyReset implements Action {
  readonly type = LeaveProxyApplyActionTypes.SAVE_RESET;

  constructor(public payload: { data: any }) { }
}

export class DeleteLeaveProxyApply implements Action {
  readonly type = LeaveProxyApplyActionTypes.DELETE_LEAVE;

  constructor(public payload: { leaveTransId: number, employeeId: number }) { }
}
export type LeaveProxyApplyActions =
  | ShowEditorLeaveProxyApply
  | HideEditorLeaveProxyApply
  | ShowViewerLeaveProxyApply
  | HideViewerLeaveProxyApply
  | ShowFullFormLeaveProxyApply
  | HideFullFormLeaveProxyApply
  | ProcessingLeaveProxyApply
  | NotProcessingLeaveProxyApply
  | ProcessingFormLeaveProxyApply
  | NotProcessingFormLeaveProxyApply
  | LoadEntitlementLeaveProxyApply
  | LoadEntitlementLeaveProxyApplySuccess
  | LoadStatesLeaveProxyApply
  | LoadStatesLeaveProxyApplyReady
  | LoadCitiesLeaveProxyApply
  | LoadCitiesLeaveProxyApplyReady
  | SaveLeaveProxyApply
  | SaveLeaveProxyApplySuccess
  | SaveLeaveProxyApplyFailure
  | LoadApprovedDataLeaveProxyApply
  | LoadApprovedDataLeaveProxyApplySuccess
  | LoadAwaitingApprovalDataLeaveProxyApply
  | LoadAwaitingApprovalDataLeaveProxyApplySuccess
  | LoadSubDetailLeaveProxyApply
  | LoadSubDetailLeaveProxyApplySuccess
  | LoadInlineDocumentLeaveProxyApply
  | InvalidateLeaveProxyApply
  | InvalidateLeaveProxyApplySuccess
  | ShowEditorLeaveProxyReset
  | HideEditorLeaveProxyReset
  | SaveLeaveProxyReset
  | DeleteLeaveProxyApply
  | NotLoadingLeaveProxyApply
  | LoadingLeaveProxyApply
