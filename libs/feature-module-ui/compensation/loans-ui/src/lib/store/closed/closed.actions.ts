import { Action } from '@ngrx/store';
import { IApprovedLoan, ILoanRepayment } from '@nutela/models/compensation/loans';

export enum ClosedActionTypes {

  SHOW_VIEWER = '[HR LOAN - LOAN_CLOSED] Show Viewer',
  HIDE_VIEWER = '[HR LOAN - LOAN_CLOSED] Hide Viewer',

  SHOW_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - LOAN_CLOSED] Show Generic Schedule Viewer',
  HIDE_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - LOAN_CLOSED] Hide Generic Schedule Viewer',

  SHOW_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - LOAN_CLOSED] Show Repayment Schedule Viewer',
  HIDE_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - LOAN_CLOSED] Hide Repayment Schedule Viewer',

  LOADING_CLOSED = '[HR LOAN - LOAN_CLOSED] Loading Closed',
  NOT_LOADING_CLOSED = '[HR LOAN - LOAN_CLOSED] Not Loading Closed',

  LOAD_CLOSED_DATA = '[HR LOAN - LOAN_CLOSED] Load Closed Data',
  LOAD_CLOSED_DATA_SUCCESS = '[HR LOAN - LOAN_CLOSED] Load Closed Data Success',

  LOAD_REPAYMENTS_SCHEDULE_DATA_CLOSED = '[HR LOAN - LOAN_CLOSED] Load Repayments Schedule Data Closed',
  LOAD_REPAYMENTS_SCHEDULE_DATA_CLOSED_SUCCESS = '[HR LOAN - LOAN_CLOSED] Load Repayments Schedule Data Success Closed',

  LOAD_GENERIC_SCHEDULE_DATA_CLOSED = '[HR LOAN - LOAN_CLOSED] Load Generic Schedule Data Closed',
  LOAD_GENERIC_SCHEDULE_DATA_CLOSED_SUCCESS = '[HR LOAN - LOAN_CLOSED] Load Generic Schedule Data Success Closed',
}


export class ShowViewerClosed implements Action {
  readonly type = ClosedActionTypes.SHOW_VIEWER;
}

export class HideViewerClosed implements Action {
  readonly type = ClosedActionTypes.HIDE_VIEWER;
}

export class ShowViewerGenericScheduleClosed implements Action {
  readonly type = ClosedActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER;
}

export class HideViewerGenericScheduleClosed implements Action {
  readonly type = ClosedActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER;
}

export class ShowViewerRepaymentScheduleClosed implements Action {
  readonly type = ClosedActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER;
}

export class HideViewerRepaymentScheduleClosed implements Action {
  readonly type = ClosedActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER;
}

export class LoadingClosedData implements Action {
  readonly type = ClosedActionTypes.LOADING_CLOSED;
}

export class NotLoadingClosedData implements Action {
  readonly type = ClosedActionTypes.NOT_LOADING_CLOSED;
}

export class LoadClosedData implements Action {
  readonly type = ClosedActionTypes.LOAD_CLOSED_DATA;
}

export class LoadClosedDataSuccess implements Action {
  readonly type = ClosedActionTypes.LOAD_CLOSED_DATA_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadGenericScheduleData implements Action {
  readonly type =
    ClosedActionTypes.LOAD_GENERIC_SCHEDULE_DATA_CLOSED;

    constructor(public payload: { loanId: number, loanAmount: number, interestRate: number, tenor: number, effectiveDate: string }) {}
}

export class LoadGenericScheduleDataSuccess implements Action {
  readonly type =
    ClosedActionTypes.LOAD_GENERIC_SCHEDULE_DATA_CLOSED_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadRepaymentsScheduleData implements Action {
  readonly type =
    ClosedActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_CLOSED;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadRepaymentsScheduleDataSuccess implements Action {
  readonly type =
    ClosedActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_CLOSED_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}


export type ClosedActions =
  | ShowViewerClosed
  | HideViewerClosed
  | ShowViewerGenericScheduleClosed
  | HideViewerGenericScheduleClosed
  | ShowViewerRepaymentScheduleClosed
  | HideViewerRepaymentScheduleClosed
  | LoadingClosedData
  | NotLoadingClosedData
  | LoadClosedData
  | LoadClosedDataSuccess
  | LoadRepaymentsScheduleData
  | LoadRepaymentsScheduleDataSuccess
  | LoadGenericScheduleData
  | LoadGenericScheduleDataSuccess
  | LoadClosedDataSuccess
  | LoadClosedDataSuccess
