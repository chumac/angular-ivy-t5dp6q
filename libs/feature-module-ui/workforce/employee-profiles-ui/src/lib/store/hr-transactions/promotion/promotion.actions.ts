import { Action } from '@ngrx/store';
import { IPromotion, IPromotionSubmit, ICurrentGradePaygroup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum PromotionActionTypes {

  SHOW_EDITOR = '[HR_TRANSACTION - PROMOTIONS] Show Editor Promotion',
  HIDE_EDITOR = '[HR_TRANSACTION - PROMOTIONS] Hide Editor Promotion',

  SHOW_SUBMISSION_PROCESS_EDITOR = '[HR_TRANSACTION - PROMOTIONS] Show Submission Process Editor Promotion',
  HIDE_SUBMISSION_PROCESS_EDITOR = '[HR_TRANSACTION - PROMOTIONS] Hide Submission Process Editor Promotion',

  SHOW_VIEWER = '[HR_TRANSACTION - PROMOTIONS] Show Viewer Promotion',
  HIDE_VIEWER = '[HR_TRANSACTION - PROMOTIONS] Hide Viewer Promotion',

  LOADING = '[HR_TRANSACTION - PROMOTIONS] Loading Promotion',
  NOT_LOADING = '[HR_TRANSACTION - PROMOTIONS] Not Loading Promotion',

  PROCESSING = '[HR_TRANSACTION - PROMOTIONS] Processing Promotion',
  NOT_PROCESSING = '[HR_TRANSACTION - PROMOTIONS] Not Processing Promotion Success',

  LOAD_PENDING_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Pending Data Promotion',
  LOAD_PENDING_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Pending Data Promotion Success',

  LOAD_APPROVED_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Approved Data Promotion',
  LOAD_APPROVED_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Approved Data Promotion Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Awaiting Approval Data Promotion',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Awaiting Approval Data Promotion Success',

  LOAD_ARREARS_STATUS_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Arrears Status Data Promotion',
  LOAD_ARREARS_STATUS_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Arrears Status Data Promotion Success',

  LOAD_ACTIONS_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Actions Data Promotion',
  LOAD_ACTIONS_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Actions Data Promotion Success',

  LOAD_PAYGRADE_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Paygrade Data Promotion',
  LOAD_PAYGRADE_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Paygrade Data Promotion Success',

  LOAD_PAYGROUP_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Paygroup Data Promotion',
  LOAD_PAYGROUP_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Paygroup Data Promotion Success',

  LOAD_CURRENT_PAYGRADE_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Current Paygrade Data Promotion',
  LOAD_CURRENT_PAYGRADE_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Current Paygrade Data Promotion Success',

  LOAD_CURRENT_PAYGROUP_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Current Paygroup Data Promotion',
  LOAD_CURRENT_PAYGROUP_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Current Paygroup Data Promotion Success',

  LOAD_SUBMISSION_PROCESS_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Submission Process Data Promotion',
  LOAD_SUBMISSION_PROCESS_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Submission Process Data Promotion Success',

  LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Employee Current Grade and Paygroup Data Promotion',
  LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Employee Current Grade and Paygroup Data Promotion Success',

  LOAD_SELECTED_PROMOTION_DATA = '[HR_TRANSACTION - PROMOTIONS] Load Selected Promotion Data Promotion',
  LOAD_SELECTED_PROMOTION_DATA_SUCCESS = '[HR_TRANSACTION - PROMOTIONS] Load Selected Promotion Data Promotion Success',

  DELETE_DATA = '[HR_TRANSACTION - PROMOTIONS] Delete Data Promotion',

  SAVE_DATA = '[HR_TRANSACTION - PROMOTIONS] Save Data Promotion',

  SUBMIT_DATA = '[HR_TRANSACTION - PROMOTIONS] Submit Data Promotion',
}

export class ShowEditorPromotion implements Action {
  readonly type = PromotionActionTypes.SHOW_EDITOR;
}

export class HideEditorPromotion implements Action {
  readonly type = PromotionActionTypes.HIDE_EDITOR;
}

export class ShowSubmissionProcessEditorPromotion implements Action {
  readonly type = PromotionActionTypes.SHOW_SUBMISSION_PROCESS_EDITOR;
}

export class HideSubmissionProcessEditorPromotion implements Action {
  readonly type = PromotionActionTypes.HIDE_SUBMISSION_PROCESS_EDITOR;
}

export class ShowViewerPromotion implements Action {
  readonly type = PromotionActionTypes.SHOW_VIEWER;
}

export class HideViewerPromotion implements Action {
  readonly type = PromotionActionTypes.HIDE_VIEWER;
}

export class LoadingPromotion implements Action {
  readonly type = PromotionActionTypes.LOADING;
}

export class NotLoadingPromotion implements Action {
  readonly type = PromotionActionTypes.NOT_LOADING;
}

export class ProcessingPromotion implements Action {
  readonly type = PromotionActionTypes.PROCESSING;
}

export class NotProcessingPromotion implements Action {
  readonly type = PromotionActionTypes.NOT_PROCESSING;
}

export class LoadPendingDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_PENDING_DATA;

  constructor() {}
}

export class LoadPendingDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_PENDING_DATA_SUCCESS;

  constructor(public payload: IPromotion[]) {}
}

export class LoadApprovedDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_APPROVED_DATA;

  constructor() {}
}

export class LoadApprovedDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPromotion[]) {}
}

export class LoadAwaitingApprovalDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_AWAITING_APPROVAL_DATA;

  constructor() {}
}

export class LoadAwaitingApprovalDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPromotion[]) {}
}

export class LoadArrearsStatusDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_ARREARS_STATUS_DATA;

  constructor() {}
}

export class LoadArrearsStatusDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_ARREARS_STATUS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadActionDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_ACTIONS_DATA;

  constructor() {}
}

export class LoadActionDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_ACTIONS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygradeDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_PAYGRADE_DATA;

  constructor() {}
}

export class LoadPaygradeDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_PAYGRADE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygroupDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_PAYGROUP_DATA;

  constructor(public payload: {gradeId: number}) {}
}

export class LoadPaygroupDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_PAYGROUP_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadCurrentPaygradeDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_CURRENT_PAYGRADE_DATA;

  constructor() {}
}

export class LoadCurrentPaygradeDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_CURRENT_PAYGRADE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadCurrentPaygroupDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_CURRENT_PAYGROUP_DATA;
}

export class LoadCurrentPaygroupDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_CURRENT_PAYGROUP_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadSubmissionProcessDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_SUBMISSION_PROCESS_DATA;
}

export class LoadSubmissionProcessDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_SUBMISSION_PROCESS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadEmployeeCurrentGradePaygroupDataPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA;

  constructor(public payload: {employeeId: number}) {}
}

export class LoadEmployeeCurrentGradePaygroupDataPromotionSuccess implements Action {
  readonly type = PromotionActionTypes.LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA_SUCCESS;

  constructor(public payload: ICurrentGradePaygroup) {}
}

export class LoadSelectedPromotion implements Action {
  readonly type = PromotionActionTypes.LOAD_SELECTED_PROMOTION_DATA;

  constructor(public payload: IPromotion[]) {}
}

export class DeleteDataPromotion implements Action {
  readonly type = PromotionActionTypes.DELETE_DATA;

  constructor(public payload: {promotion_id: number}) {}
}


export class SaveDataPromotion implements Action {
  readonly type = PromotionActionTypes.SAVE_DATA;

  constructor(public payload: {promotion_id: number, editMode: boolean, data: IPromotion}) {}
}

export class SubmitDataPromotion implements Action {
  readonly type = PromotionActionTypes.SUBMIT_DATA;

  constructor(public payload: {processId?: number, data: IPromotionSubmit[]}) {}
}

export type PromotionActions =
| ShowEditorPromotion
| HideEditorPromotion
| ShowSubmissionProcessEditorPromotion
| HideSubmissionProcessEditorPromotion
| ShowViewerPromotion
| HideViewerPromotion
| LoadingPromotion
| NotLoadingPromotion
| ProcessingPromotion
| NotProcessingPromotion
| LoadPendingDataPromotion
| LoadPendingDataPromotionSuccess
| LoadApprovedDataPromotion
| LoadApprovedDataPromotionSuccess
| LoadAwaitingApprovalDataPromotion
| LoadAwaitingApprovalDataPromotionSuccess
| LoadArrearsStatusDataPromotion
| LoadArrearsStatusDataPromotionSuccess
| LoadActionDataPromotion
| LoadActionDataPromotionSuccess
| LoadPaygradeDataPromotion
| LoadPaygradeDataPromotionSuccess
| LoadPaygroupDataPromotion
| LoadPaygroupDataPromotionSuccess
| LoadCurrentPaygradeDataPromotion
| LoadCurrentPaygradeDataPromotionSuccess
| LoadCurrentPaygroupDataPromotion
| LoadCurrentPaygroupDataPromotionSuccess
| DeleteDataPromotion
| SaveDataPromotion
| SubmitDataPromotion
| LoadSubmissionProcessDataPromotion
| LoadSubmissionProcessDataPromotionSuccess
| LoadSelectedPromotion
| LoadEmployeeCurrentGradePaygroupDataPromotion
| LoadEmployeeCurrentGradePaygroupDataPromotionSuccess;

