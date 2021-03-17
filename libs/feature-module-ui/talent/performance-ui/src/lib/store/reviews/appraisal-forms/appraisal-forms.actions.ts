import { Action } from '@ngrx/store';
import { IEmployeeReviewForm, IReviewWorkflowProcess, IEmployeePageScore } from '@nutela/models/talent/performance';
import { IPageNavigatorData } from '../../../models';

export enum AppraisalFormsActionTypes {
  LOAD_EMPLOYEE_REVIEW_FORMS = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Review Forms',
  LOAD_EMPLOYEE_REVIEW_FORMS_SUCCESS = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Review Forms Success',
  LOAD_PAGE_NAVIGATOR_LIST = '[PERFORMANCE -APPRAISAL FORMS] Load Page Navigator List',
  RELOAD_PAGE_NAVIGATOR_LIST = '[PERFORMANCE -APPRAISAL FORMS] Reload Page Navigator List',

  LOAD_REVIEW_WORKFLOW_PROCESS = '[PERFORMANCE -APPRAISAL FORMS] Load Review Workflow Process',
  LOAD_REVIEW_WORKFLOW_PROCESS_SUCCESS = '[PERFORMANCE -APPRAISAL FORMS] Load Review Workflow Process Success',

  TOGGLE_SAVE_CONTINUE_DISABLED_STATUS = '[PERFORMANCE -APPRAISAL FORMS] Toggle Save Continue Disabled Status',

  LOAD_EMPLOYEE_INFORMATION_REPORT_KEY = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Information Report Key',

  LOAD_EMPLOYEE_PAGE_SCORES = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Page Scores',
  LOAD_EMPLOYEE_PAGE_SCORES_SUCCESS = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Page Scores Success',
  CLEAR_EMPLOYEE_PAGE_SCORES = '[PERFORMANCE -APPRAISAL FORMS] Clear Employee Page Scores',

  LOAD_EMPLOYEE_CONFIRMATION_STATUS = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Confirmation Status',
  LOAD_EMPLOYEE_CONFIRMATION_STATUS_SUCCESS = '[PERFORMANCE -APPRAISAL FORMS] Load Employee Confirmation Status Success',

}

export class LoadEmployeeReviewFormsAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_REVIEW_FORMS;

  constructor(public payload: { selectedPlan: number, role: number, employeeId: number }) {}
}


export class LoadEmployeeReviewFormsAppraisalFormsSuccess implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_REVIEW_FORMS_SUCCESS;

  constructor(public payload: IEmployeeReviewForm[]) {}
}

export class LoadPageNavigatorAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_PAGE_NAVIGATOR_LIST;

  constructor(public payload: IPageNavigatorData[]) {}
}

export class ReLoadPageNavigatorAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.RELOAD_PAGE_NAVIGATOR_LIST;

  constructor(public payload: { selectedPlan: number, role: number, employeeId: number }) {}
}

export class ToggleSaveContinueDisabledStatusAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.TOGGLE_SAVE_CONTINUE_DISABLED_STATUS;

  constructor(public payload: boolean) {}
}



export class LoadReviewWorkflowProcessAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS;

  constructor(public payload: number) {}
}

export class LoadReviewWorkflowProcessAppraisalFormsSuccess implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS_SUCCESS;

  constructor(public payload: IReviewWorkflowProcess) {}
}

export class LoadEmployeeInformationReportKeyAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_INFORMATION_REPORT_KEY;

  constructor(public payload: number) {}
}

export class LoadEmployeePageScoresAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_PAGE_SCORES;

  constructor(public payload: { selectedPlan: number, role: number, employeeId: number, roleScoreRequired: number }) {}
}

export class LoadEmployeePageScoresAppraisalFormsSuccess implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_PAGE_SCORES_SUCCESS;

  constructor(public payload: IEmployeePageScore[]) {}
}

export class ClearEmployeePageScoresAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.CLEAR_EMPLOYEE_PAGE_SCORES;

  constructor() {}
}

export class LoadEmployeeConfirmationStatusAppraisalForms implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_CONFIRMATION_STATUS;

  constructor(public payload: { selectedPlan: number, employeeId: number }) {}
}


export class LoadEmployeeConfirmationStatusAppraisalFormsSuccess implements Action {
  readonly type = AppraisalFormsActionTypes.LOAD_EMPLOYEE_CONFIRMATION_STATUS_SUCCESS;

  constructor(public payload: string) {}
}


export type AppraisalFormsActions =
  | LoadEmployeeReviewFormsAppraisalForms
  | LoadEmployeeReviewFormsAppraisalFormsSuccess
  | LoadPageNavigatorAppraisalForms
  | ReLoadPageNavigatorAppraisalForms
  | ToggleSaveContinueDisabledStatusAppraisalForms
  | LoadReviewWorkflowProcessAppraisalForms
  | LoadReviewWorkflowProcessAppraisalFormsSuccess
  | LoadEmployeeInformationReportKeyAppraisalForms
  | LoadEmployeePageScoresAppraisalForms
  | LoadEmployeePageScoresAppraisalFormsSuccess
  | ClearEmployeePageScoresAppraisalForms
  | LoadEmployeeConfirmationStatusAppraisalForms
  | LoadEmployeeConfirmationStatusAppraisalFormsSuccess;
