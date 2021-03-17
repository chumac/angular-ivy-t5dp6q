import { Action } from '@ngrx/store';
import { ICalendar, IProfile, IProfileCalendar, ISalaryReviewGroup, ISalaryReviewPlan } from '@nutela/models/compensation/payroll';
import { ISelectOption } from 'dist/libs/models/core-data';



export enum SalaryReviewActionTypes {

  SHOW_EDITOR = '[ PAYROLL - SALARY-REVIEW ] Show Editor',
  HIDE_EDITOR = '[ PAYROLL - SALARY-REVIEW ] Hide Editor',

  SHOW_VIEWER = '[ PAYROLL - SALARY-REVIEW ] Show Viewer',
  HIDE_VIEWER = '[ PAYROLL - SALARY-REVIEW ] Hide Viewer',

  SHOW_PLAN_EDITOR = '[ PAYROLL - SALARY-REVIEW ] Show Plan Editor',
  HIDE_PLAN_EDITOR = '[ PAYROLL - SALARY-REVIEW ] Hide Plan Editor',

  SHOW_PLAN_VIEWER = '[ PAYROLL - SALARY-REVIEW ] Show Plan Viewer',
  HIDE_PLAN_VIEWER = '[ PAYROLL - SALARY-REVIEW ] Hide Plan Viewer',

  SHOW_DETAIL_EDITOR = '[ PAYROLL - SALARY-REVIEW ] Show Detail Editor',
  HIDE_DETAIL_EDITOR = '[ PAYROLL - SALARY-REVIEW ] Hide Detail Editor',

  SHOW_DETAIL_VIEWER = '[ PAYROLL - SALARY-REVIEW ] Show Detail Viewer',
  HIDE_DETAIL_VIEWER = '[ PAYROLL - SALARY-REVIEW ] Hide Detail Viewer',

  LOADING = '[ PAYROLL - SALARY-REVIEW ] Loading',
  NOT_LOADING = '[ PAYROLL - SALARY-REVIEW ] Not Loading',

  PROCESSING = '[ PAYROLL - SALARY-REVIEW ] Processing',
  NOT_PROCESSING = '[ PAYROLL - SALARY-REVIEW ] Not Processing',

  PROCESSING_DETAIL = '[ PAYROLL - SALARY-REVIEW ] Processing Detail',
  NOT_PROCESSING_DETAIL = '[ PAYROLL - SALARY-REVIEW ] Not Processing Detail',

  LOAD_PLAN_DATA = '[ PAYROLL - SALARY-REVIEW ] Load Plan Data',
  LOAD_PLAN_DATA_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Plan Data Success',

  LOAD_DATA = '[ PAYROLL - SALARY-REVIEW ] Load Data',
  LOAD_DATA_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Data Success',
  LOAD_DATA_FILTERED = '[ PAYROLL - SALARY-REVIEW ] Load Data Filtered Success',

  LOAD_DETAILS_DATA = '[ PAYROLL - SALARY-REVIEW ] Load Detail Data',
  LOAD_DETAILS_DATA_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Detail Data Success',

  LOAD_STATUS_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Status List',
  LOAD_STATUS_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Status List Success',

  LOAD_PAYROLL_PROFILE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Payroll Profile List Success',

  LOAD_ALLOWANCE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Allowance List',
  LOAD_ALLOWANCE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Allowance List Success',

  LOAD_ITEM_TYPE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Item Type List',
  LOAD_ITEM_TYPE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Item Type List Success',

  LOAD_REVIEW_RULE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Review Rule List',
  LOAD_REVIEW_RULE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Review Rule List Success',

  LOAD_ELIGIBILITY_RULE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Eligibility Rule List',
  LOAD_ELIGIBILITY_RULE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Eligibility Rule List Success',

  LOAD_ALLOWANCE_AFFECTED_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Allowance Affected List',
  LOAD_ALLOWANCE_AFFECTED_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Allowance Affected List Success',

  LOAD_ALLOWANCE_RULE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Allowance Rule List',
  LOAD_ALLOWANCE_RULE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Allowance Rule List Success',

  LOAD_DEDUCTION_AFFECTED_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Deduction Rule List',
  LOAD_DEDUCTION_AFFECTED_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Deduction Rule List Success',

  LOAD_DEDUCTION_RULE_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Deduction Affected List',
  LOAD_DEDUCTION_RULE_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Deduction Affected List Success',

  LOAD_DEDUCTION_LIST = '[ PAYROLL - SALARY-REVIEW ] Load Deduction List',
  LOAD_DEDUCTION_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load Deduction List Success',

  LOAD_PAYGROUP_LIST = '[ PAYROLL - SALARY-REVIEW ] Load paygroup List',
  LOAD_PAYGROUP_LIST_SUCCESS = '[ PAYROLL - SALARY-REVIEW ] Load paygroup List Success',

  SAVE_PLAN = '[ PAYROLL - SALARY-REVIEW ] Save Plan',
  UPDATE_PLAN = '[ PAYROLL - SALARY-REVIEW ] Update Plan',
  DELETE_PLAN = '[ PAYROLL - SALARY-REVIEW ] Delete Plan',
  EXECUTE_PLAN = '[ PAYROLL - SALARY-REVIEW ] Execute Plan',
  REVERSE_PLAN = '[ PAYROLL - SALARY-REVIEW ] Reverse Plan',

  SAVE_GROUP = '[ PAYROLL - SALARY-REVIEW ] Save Group',
  UPDATE_GROUP = '[ PAYROLL - SALARY-REVIEW ] Update Group',
  EXECUTE_GROUP = '[ PAYROLL - SALARY-REVIEW ] Execute Group',
  REVERSE_GROUP = '[ PAYROLL - SALARY-REVIEW ] Reverse Group',
  DELETE_GROUP = '[ PAYROLL - SALARY-REVIEW ] Delete Group',

  SAVE_PLAN_DETAIL = '[ PAYROLL - SALARY-REVIEW ] Save Plan Detail',
  UPDATE_PLAN_DETAIL = '[ PAYROLL - SALARY-REVIEW ] Update Plan Detail',
  REMOVE_DETAIL_DATA = '[ PAYROLL - SALARY-REVIEW ] Remove Detail Data',
}


export class ShowEditorReviewGroup implements Action {
  readonly type = SalaryReviewActionTypes.SHOW_EDITOR;
}

export class HideEditorReviewGroup implements Action {
  readonly type = SalaryReviewActionTypes.HIDE_EDITOR;
}

export class ShowViewerReviewGroup implements Action {
  readonly type = SalaryReviewActionTypes.SHOW_VIEWER;
}

export class HideViewerReviewGroup implements Action {
  readonly type = SalaryReviewActionTypes.HIDE_VIEWER;
}

export class ShowEditorReviewPlan implements Action {
  readonly type = SalaryReviewActionTypes.SHOW_PLAN_EDITOR;
}

export class HideEditorReviewPlan implements Action {
  readonly type = SalaryReviewActionTypes.HIDE_PLAN_EDITOR;
}

export class ShowViewerReviewPlan implements Action {
  readonly type = SalaryReviewActionTypes.SHOW_PLAN_VIEWER;
}

export class HideViewerReviewPlan implements Action {
  readonly type = SalaryReviewActionTypes.HIDE_PLAN_VIEWER;
}

export class ProcessingReview implements Action {
  readonly type = SalaryReviewActionTypes.PROCESSING;
}

export class NotProcessingReview implements Action {
  readonly type = SalaryReviewActionTypes.NOT_PROCESSING;
}

export class ShowEditorReviewPlanDetail implements Action {
  readonly type = SalaryReviewActionTypes.SHOW_DETAIL_EDITOR;
}

export class HideEditorReviewPlanDetail implements Action {
  readonly type = SalaryReviewActionTypes.HIDE_DETAIL_EDITOR;
}

export class ShowViewerReviewPlanDetail implements Action {
  readonly type = SalaryReviewActionTypes.SHOW_DETAIL_VIEWER;
}

export class HideViewerReviewPlanDetail implements Action {
  readonly type = SalaryReviewActionTypes.HIDE_DETAIL_VIEWER;
}

export class ProcessingReviewDetail implements Action {
  readonly type = SalaryReviewActionTypes.PROCESSING_DETAIL;
}

export class NotProcessingReviewDetail implements Action {
  readonly type = SalaryReviewActionTypes.NOT_PROCESSING_DETAIL;
}

export class LoadingReviews implements Action {
  readonly type = SalaryReviewActionTypes.LOADING;
}

export class NotLoadingReviews implements Action {
  readonly type = SalaryReviewActionTypes.NOT_LOADING;
}

export class LoadReviewGroups implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DATA;
}

export class LoadReviewGroupsSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DATA_SUCCESS;
  constructor(public payload: ISalaryReviewGroup[]) {}
}

export class LoadReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_PLAN_DATA;
  constructor(public payload: {groupId: number, profileId: number}) { }
}

export class LoadReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_PLAN_DATA_SUCCESS;
  constructor(public payload: ISalaryReviewPlan[]) {}
}

export class LoadReviewPlanDetails implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DETAILS_DATA;
  constructor(public payload: {planId: number}) { }
}

export class LoadReviewPlanDetailsSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DETAILS_DATA_SUCCESS;
  constructor(public payload: IProfile[]) {}
}

export class LoadFilteredReviewGroups implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DATA_FILTERED;
  constructor(public payload: {statusId: number}) {}
}

export class LoadStatusListReviewGroups implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_STATUS_LIST;
}

export class LoadStatusListReviewGroupsSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_STATUS_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPayrollProfileListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadPayrollProfileListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadReviewRuleListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_REVIEW_RULE_LIST;
}

export class LoadReviewRuleListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_REVIEW_RULE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}
export class LoadPaygroupListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_PAYGROUP_LIST;
}

export class LoadPaygroupListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_PAYGROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadEligibilityRuleListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ELIGIBILITY_RULE_LIST;
}

export class LoadEligibilityRuleListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ELIGIBILITY_RULE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadAllowanceRuleListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ALLOWANCE_RULE_LIST;
}

export class LoadAllowanceRuleListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ALLOWANCE_RULE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadAllowanceAffectedListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ALLOWANCE_AFFECTED_LIST;
}

export class LoadAllowanceAffectedListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ALLOWANCE_AFFECTED_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadDeductionRuleListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DEDUCTION_RULE_LIST;
}

export class LoadDeductionRuleListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DEDUCTION_RULE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadDeductionAffectedListReviewPlans implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DEDUCTION_AFFECTED_LIST;
}

export class LoadDeductionAffectedListReviewPlansSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DEDUCTION_AFFECTED_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveReviewPlanDetail implements Action {
  readonly type = SalaryReviewActionTypes.SAVE_PLAN_DETAIL;
  constructor(public payload: { data: ISalaryReviewPlan}) {}
}

export class UpdateReviewPlanDetail implements Action {
  readonly type = SalaryReviewActionTypes.UPDATE_PLAN_DETAIL;
  constructor(public payload: {data: ISalaryReviewPlan, recordId: number}) {}
}

export class SaveReviewPlan implements Action {
  readonly type = SalaryReviewActionTypes.SAVE_PLAN;
  constructor(public payload: { data: ISalaryReviewPlan, groupId: number, profileId: number}) {}
}

export class UpdateReviewPlan implements Action {
  readonly type = SalaryReviewActionTypes.UPDATE_PLAN;
  constructor(public payload: {data: ISalaryReviewPlan, recordId: number, groupId: number, profileId: number}) {}
}

export class SaveReviewGroup implements Action {
  readonly type = SalaryReviewActionTypes.SAVE_GROUP;
  constructor(public payload: {data: ISalaryReviewGroup}) {}
}

export class UpdateReviewGroup implements Action {
  readonly type = SalaryReviewActionTypes.UPDATE_GROUP;
  constructor(public payload: {data: ISalaryReviewGroup, recordId: number}) {}
}

export class ArchiveReviewGroup implements Action{
  readonly type =SalaryReviewActionTypes.DELETE_GROUP;
  constructor(public payload: { recordId: number}) {}
}

export class ExecuteReviewGroup implements Action{
  readonly type =SalaryReviewActionTypes.EXECUTE_GROUP;
  constructor(public payload: { recordId: number}) {}
}

export class ReverseReviewGroup implements Action{
  readonly type = SalaryReviewActionTypes.REVERSE_GROUP;
  constructor(public payload: { recordId: number}) {}
}

export class ExecuteReviewPlan implements Action{
  readonly type = SalaryReviewActionTypes.EXECUTE_PLAN;
  constructor(public payload: { recordId: number, groupId: number, profileId: number}) {}
}

export class ReverseReviewPlan implements Action{
  readonly type = SalaryReviewActionTypes.REVERSE_PLAN;
  constructor(public payload: { recordId: number, groupId: number, profileId: number}) {}
}

export class ArchiveReviewPlan implements Action{
  readonly type =SalaryReviewActionTypes.DELETE_PLAN;
  constructor(public payload: { recordId: number, groupId: number, profileId: number}) {}
}

export class RemoveReviewPlanDetail implements Action{
  readonly type =SalaryReviewActionTypes.REMOVE_DETAIL_DATA;
  constructor(public payload: { recordId: number, planId: number}) {}
}




export class LoadAllowanceListReviewPlanDetails implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ALLOWANCE_LIST;
}
export class LoadAllowanceListReviewPlanDetailsSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ALLOWANCE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadItemTypeListReviewPlanDetails implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ITEM_TYPE_LIST;
}

export class LoadItemTypeListReviewPlanDetailsSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_ITEM_TYPE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}
export class LoadDeductionListReviewPlanDetails implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DEDUCTION_LIST;
}

export class LoadDeductionListReviewPlanDetailsSuccess implements Action {
  readonly type = SalaryReviewActionTypes.LOAD_DEDUCTION_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export type SalaryReviewActions =
  | LoadingReviews
  | NotLoadingReviews
  | ProcessingReview
  | NotProcessingReview
  | LoadReviewGroups
  | LoadReviewGroupsSuccess
  | LoadFilteredReviewGroups
  | ShowEditorReviewGroup
  | HideEditorReviewGroup
  | ShowViewerReviewGroup
  | HideViewerReviewGroup
  | ReverseReviewGroup
  | ExecuteReviewGroup
  | ArchiveReviewGroup

  | LoadReviewPlans
  | LoadReviewPlansSuccess
  | ShowEditorReviewPlan
  | HideEditorReviewPlan
  | ShowViewerReviewPlan
  | HideViewerReviewPlan
  | LoadStatusListReviewGroups
  | LoadStatusListReviewGroupsSuccess
  | LoadPayrollProfileListReviewPlans
  | LoadPayrollProfileListReviewPlansSuccess
  | LoadReviewRuleListReviewPlans
  | LoadReviewRuleListReviewPlansSuccess
  | LoadPaygroupListReviewPlans
  | LoadPaygroupListReviewPlansSuccess
  | LoadEligibilityRuleListReviewPlans
  | LoadEligibilityRuleListReviewPlansSuccess
  | LoadAllowanceRuleListReviewPlans
  | LoadAllowanceRuleListReviewPlansSuccess
  | LoadAllowanceAffectedListReviewPlans
  | LoadAllowanceAffectedListReviewPlansSuccess
  | LoadDeductionRuleListReviewPlans
  | LoadDeductionRuleListReviewPlansSuccess
  | LoadDeductionAffectedListReviewPlans
  | LoadDeductionAffectedListReviewPlansSuccess
  | SaveReviewPlan
  | UpdateReviewPlan
  | ReverseReviewPlan
  | ArchiveReviewPlan

  | ShowEditorReviewPlanDetail
  | HideEditorReviewPlanDetail
  | ShowViewerReviewPlanDetail
  | HideViewerReviewPlanDetail
  | ProcessingReviewDetail
  | NotProcessingReviewDetail
  | LoadReviewPlanDetails
  | LoadReviewPlanDetailsSuccess
  | SaveReviewPlanDetail
  | UpdateReviewPlanDetail
  | LoadAllowanceListReviewPlanDetails
  | LoadAllowanceListReviewPlanDetailsSuccess
  | LoadItemTypeListReviewPlanDetails
  | LoadItemTypeListReviewPlanDetailsSuccess
  | LoadDeductionListReviewPlanDetails
  | LoadDeductionListReviewPlanDetailsSuccess;
