import { Action } from '@ngrx/store';
import { IClosure, IApprovedLoan, ILoanRepayment } from '@nutela/models/compensation/loans';

export enum ClosureActionTypes {
  SHOW_EDITOR = '[HR LOAN - LOAN_CLOSURE] Show Editor',
  HIDE_EDITOR = '[HR LOAN - LOAN_CLOSURE] Hide Editor',

  SHOW_VIEWER = '[HR LOAN - LOAN_CLOSURE] Show Viewer',
  HIDE_VIEWER = '[HR LOAN - LOAN_CLOSURE] Hide Viewer',

  SHOW_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - LOAN CLOSURE] Show Generic Schedule Viewer',
  HIDE_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - LOAN CLOSURE] Hide Generic Schedule Viewer',

  SHOW_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - LOAN CLOSURE] Show Repayment Schedule Viewer',
  HIDE_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - LOAN CLOSURE] Hide Repayment Schedule Viewer',

  PROCESSING = '[HR LOAN - LOAN CLOSURE] Processing',
  NOT_PROCESSING = '[HR LOAN - LOAN CLOSURE] Not Processing',

  LOADING_CLOSURE = '[HR LOAN - LOAN CLOSURE] Loading Closure',
  NOT_LOADING_CLOSURE = '[HR LOAN - LOAN CLOSURE] Not Loading Closure',

  LOAD_APPLICATIONS_DATA_LOAN_CLOSURE = '[HR LOAN - LOAN CLOSURE] Load Applications Data Loan Closure',
  LOAD_APPLICATIONS_DATA_LOAN_CLOSURE_SUCCESS = '[HR LOAN - LOAN CLOSURE] Load Applications Data Loan Closure Success',

  LOAD_AWAITING_APPROVAL_DATA_LOAN_CLOSURE = '[HR LOAN - LOAN CLOSURE] Load Awaiting Approval Data Loan Closure',
  LOAD_AWAITING_APPROVAL_DATA_LOAN_CLOSURE_SUCCESS = '[HR LOAN - LOAN CLOSURE] Load Awaiting Approval Data Loan Closure Success',

  LOAD_REPAYMENTS_SCHEDULE_DATA_LOAN_CLOSURE = '[HR HR LOAN - LOAN CLOSURE] Load Repayments Schedule Data Closure',
  LOAD_REPAYMENTS_SCHEDULE_DATA_LOAN_CLOSURE_SUCCESS = '[HR HR LOAN - LOAN CLOSURE] Load Repayments Schedule Data Success Closure',

  LOAD_GENERIC_SCHEDULE_DATA_LOAN_CLOSURE = '[HR LOAN - LOAN CLOSURE] Load Generic Schedule Data Closure',
  LOAD_GENERIC_SCHEDULE_DATA_LOAN_CLOSURE_SUCCESS = '[HR LOAN - LOAN CLOSURE] Load Generic Schedule Data Success Closure',

  SAVE = '[HR LOAN - LOAN CLOSURE] Save Loan Closure'
}

export class ShowEditorClosure implements Action {
  readonly type = ClosureActionTypes.SHOW_EDITOR;
}

export class HideEditorClosure implements Action {
  readonly type = ClosureActionTypes.HIDE_EDITOR;
}

export class ShowViewerClosure implements Action {
  readonly type = ClosureActionTypes.SHOW_VIEWER;
}

export class HideViewerClosure implements Action {
  readonly type = ClosureActionTypes.HIDE_VIEWER;
}

export class ShowViewerGenericScheduleClosure implements Action {
  readonly type = ClosureActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER;
}

export class HideViewerGenericScheduleClosure implements Action {
  readonly type = ClosureActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER;
}

export class ShowViewerRepaymentScheduleClosure implements Action {
  readonly type = ClosureActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER;
}

export class HideViewerRepaymentScheduleClosure implements Action {
  readonly type = ClosureActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER;
}

export class ProcessingClosures implements Action {
  readonly type = ClosureActionTypes.PROCESSING;
}

export class NotProcessingClosures implements Action {
  readonly type = ClosureActionTypes.NOT_PROCESSING;
}


export class LoadingClosures implements Action {
  readonly type = ClosureActionTypes.LOADING_CLOSURE;
}

export class NotLoadingClosures implements Action {
  readonly type = ClosureActionTypes.NOT_LOADING_CLOSURE;
}

export class LoadApplicationsDataClosure implements Action {
  readonly type = ClosureActionTypes.LOAD_APPLICATIONS_DATA_LOAN_CLOSURE;
}

export class LoadApplicationsDataClosureSuccess implements Action {
  readonly type = ClosureActionTypes.LOAD_APPLICATIONS_DATA_LOAN_CLOSURE_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadAwaitingApprovalDataClosure implements Action {
  readonly type = ClosureActionTypes.LOAD_AWAITING_APPROVAL_DATA_LOAN_CLOSURE;
}

export class LoadAwaitingApprovalDataClosureSuccess implements Action {
  readonly type = ClosureActionTypes.LOAD_AWAITING_APPROVAL_DATA_LOAN_CLOSURE_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadGenericScheduleData implements Action {
  readonly type =
    ClosureActionTypes.LOAD_GENERIC_SCHEDULE_DATA_LOAN_CLOSURE;

    constructor(public payload: { loanId: number, loanAmount: number, interestRate: number, tenor: number, effectiveDate: string }) {}
}

export class LoadGenericScheduleDataSuccess implements Action {
  readonly type =
    ClosureActionTypes.LOAD_GENERIC_SCHEDULE_DATA_LOAN_CLOSURE_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadRepaymentsScheduleData implements Action {
  readonly type =
    ClosureActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_LOAN_CLOSURE;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadRepaymentsScheduleDataSuccess implements Action {
  readonly type =
    ClosureActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_LOAN_CLOSURE_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class SaveClosure implements Action {
  readonly type = ClosureActionTypes.SAVE;

  constructor(public payload: {data: IClosure}) {}
}

export type ClosureActions =
  | ShowEditorClosure
  | HideEditorClosure
  | ShowViewerClosure
  | HideViewerClosure
  | ShowViewerGenericScheduleClosure
  | HideViewerGenericScheduleClosure
  | ShowViewerRepaymentScheduleClosure
  | HideViewerRepaymentScheduleClosure
  | ProcessingClosures
  | NotProcessingClosures
  | LoadingClosures
  | NotLoadingClosures
  | LoadApplicationsDataClosure
  | LoadApplicationsDataClosureSuccess
  | LoadRepaymentsScheduleData
  | LoadRepaymentsScheduleDataSuccess
  | LoadGenericScheduleData
  | LoadGenericScheduleDataSuccess
  | LoadAwaitingApprovalDataClosure
  | LoadAwaitingApprovalDataClosureSuccess
  | SaveClosure
