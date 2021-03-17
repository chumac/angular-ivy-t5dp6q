import { Action } from '@ngrx/store';
import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export enum ReviewWorkflowProcessActionTypes {
  LOADING_REVIEW_WORKFLOW_PROCESS = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Loading Review Workflow Process',
  NOT_LOADING_REVIEW_WORKFLOW_PROCESS = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Not Loading Review Workflow Process',

  LOAD_REVIEW_WORKFLOW_PROCESS = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Load Review Workflow Process',
  LOAD_REVIEW_WORKFLOW_PROCESS_SUCCESS = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Load Review Workflow Process Success',

  RETRIEVE_FIRST_WORKFLOW_PROCESS_STEP = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Retrieve First Workflow Process Step',

  INITIALIZE_APPRAISAL = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Initialize Appraisal',

  INITIALIZE_APPRAISAL_BY_PLAN_ID = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Initialize Appraisal By Plan Id',

  REAPPRAISE = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Reappraise',

  RESTART = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Restart',

  RE_REROUTE_APPRAISAL = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Re-route Appraisal',

  RESULT_COMMAND = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Result Command',

  MOVE_TO_HR = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Move to HR',
  MOVE_TO_MODERATION = '[PERFORMANCE - REVIEW WORKFLOW PROCESS] Move to Moderation'
}

export class RetrieveFirstWorkflowProcessStepReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.RETRIEVE_FIRST_WORKFLOW_PROCESS_STEP;

  constructor(public payload: { selectedPlan: number}) {}
}

export class LoadingDataReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.LOADING_REVIEW_WORKFLOW_PROCESS;
}

export class NotLoadingDataReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.NOT_LOADING_REVIEW_WORKFLOW_PROCESS;
}

export class LoadDataReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS;

  constructor(public payload: number) {}
}

export class LoadDataReviewWorkflowProcessSuccess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS_SUCCESS;

  constructor(public payload: IReviewWorkflowProcess[]) {}
}

export class InitializeAppraisalReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.INITIALIZE_APPRAISAL;
}

export class InitializeAppraisalByPlanIdReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.INITIALIZE_APPRAISAL_BY_PLAN_ID;

  constructor(public payload: number) {}
}

export class ReappraiseReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.REAPPRAISE;

  constructor(public payload: {employeeId: number, planId: number}) {}
}

export class RestartReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.RESTART;

  constructor(public payload: {employeeId: number, planId: number}) {}
}

export class MoveToHRReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.MOVE_TO_HR;

  constructor(public payload: {employeeId: number, planId: number}) {}
}

export class MoveToModerationReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.MOVE_TO_MODERATION;

  constructor(public payload: {employeeId: number, planId: number}) {}
}

export class ReRouteAppraisalWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.RE_REROUTE_APPRAISAL;

  constructor(public payload: { role: number, employeeId : number, planId : number, rerouteFrom : number, rerouteTo : number }) {}
}

export class MutateResultReviewWorkflowProcess implements Action {
  readonly type = ReviewWorkflowProcessActionTypes.RESULT_COMMAND;

  constructor(public payload: number) {}
}

export type ReviewWorkflowProcessActions =
  | RetrieveFirstWorkflowProcessStepReviewWorkflowProcess
  | LoadDataReviewWorkflowProcess
  | LoadingDataReviewWorkflowProcess
  | NotLoadingDataReviewWorkflowProcess
  | LoadDataReviewWorkflowProcessSuccess
  | InitializeAppraisalReviewWorkflowProcess
  | InitializeAppraisalByPlanIdReviewWorkflowProcess
  | ReappraiseReviewWorkflowProcess
  | RestartReviewWorkflowProcess
  | ReRouteAppraisalWorkflowProcess
  | MutateResultReviewWorkflowProcess;

