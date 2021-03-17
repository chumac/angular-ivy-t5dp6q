import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { ILoanRepayment, IApprovedLoan } from '@nutela/models/compensation/loans';

export enum RepaymentsActionTypes {
  SHOW_EDITOR = '[HR LOANS - LOAN REPAYMENTS] Show Editor',
  HIDE_EDITOR = '[HR LOANS - LOAN REPAYMENTS] Hide Editor',

  SHOW_PAYMENTS_VIEWER = '[HR LOANS - LOAN REPAYMENTS] Show Payments Viewer',
  HIDE_PAYMENTS_VIEWER = '[HR LOANS - LOAN REPAYMENTS] Hide Payments Viewer',

  SHOW_REPAYMENT_VIEWER= '[HR LOANS - LOAN REPAYMENTS] Show Repayment Viewer',
  HIDE_REPAYMENT_VIEWER = '[HR LOANS - LOAN REPAYMENTS] Hide Repayment Viewer',

  SHOW_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - LOAN REPAYMENTS] Show Repayment Schedule Viewer',
  HIDE_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - LOAN REPAYMENTS] Hide Repayment Schedule Viewer',

  PROCESSING_REPAYMENTS = '[HR LOANS - LOAN REPAYMENTS] Processing Repayments',
  NOT_PROCESSING_REPAYMENTS = '[HR LOANS - LOAN REPAYMENTS] Not Processing Repayments',

  LOADING_REPAYMENTS = '[HR LOANS - LOAN REPAYMENTS] Loading Repayments',
  NOT_LOADING_REPAYMENTS = '[HR LOANS - LOAN REPAYMENTS] Not Loading Repayments',

  LOAD_DATA_LOAN_REPAYMENTS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Repayments',
  LOAD_DATA_LOAN_REPAYMENTS_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Repayments Success',

  LOAD_DATA_PAYMENTS_HISTORY = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Payments',
  LOAD_DATA_PAYMENTS_HISTORY_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Payments Success',

  LOAD_DATA_RUNNING_LOANS_REPAYMENTS = '[HR LOANS - LOAN REPAYMENTS] Load Data Running Loans Repayments',
  LOAD_DATA_RUNNING_LOANS_REPAYMENTS_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Running Loans Repayments Success',

  LOAD_DATA_LOAN_REPAYMENT_TYPES = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Repayment Types',
  LOAD_DATA_LOAN_REPAYMENT_TYPES_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Repayment Types Success',

  LOAD_DATA_LOAN_REPAYMENT_INTEREST = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Repayment Interest',
  LOAD_DATA_LOAN_REPAYMENT_INTEREST_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Repayment Interest Success',

  LOAD_DATA_LOAN_PAYMENT_INSTRUMENTS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Payment Instruments',
  LOAD_DATA_LOAN_PAYMENT_INSTRUMENTS_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Payment Instruments Success',

  LOAD_DATA_LOAN_DEFINITIONS_REPAYMENT = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Definitions Repayment',
  LOAD_DATA_LOAN_DEFINITIONS_REPAYMENT_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Data Loan Definitions Repayment Success',

  LOAD_REPAYMENTS_SCHEDULE_DATA_REPAYMENT = '[HR LOANS - LOAN REPAYMENTS] Load Repayments Schedule Data Repayment',
  LOAD_REPAYMENTS_SCHEDULE_DATA_REPAYMENT_SUCCESS = '[HR LOANS - LOAN REPAYMENTS] Load Repayments Schedule Data Success Repayment',

  SAVE = '[HR LOANS - LOAN REPAYMENTS] Save Loan Repayment',

}

export class ShowEditorRepayment implements Action {
  readonly type = RepaymentsActionTypes.SHOW_EDITOR;
}

export class HideEditorRepayment implements Action {
  readonly type = RepaymentsActionTypes.HIDE_EDITOR;
}

export class ShowViewerRepayment implements Action {
  readonly type = RepaymentsActionTypes.SHOW_REPAYMENT_VIEWER;
}

export class HideViewerRepayment implements Action {
  readonly type = RepaymentsActionTypes.HIDE_REPAYMENT_VIEWER;
}

export class ShowViewerRepaymentScheduleRepayment implements Action {
  readonly type = RepaymentsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER;
}

export class HideViewerRepaymentScheduleRepayment implements Action {
  readonly type = RepaymentsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER;
}

export class ShowViewerPaymentsHistory implements Action {
  readonly type = RepaymentsActionTypes.SHOW_PAYMENTS_VIEWER;
}

export class HideViewerPaymentsHistory implements Action {
  readonly type = RepaymentsActionTypes.HIDE_PAYMENTS_VIEWER;
}


export class ProcessingRepayments implements Action {
  readonly type = RepaymentsActionTypes.PROCESSING_REPAYMENTS;
}

export class NotProcessingRepayments implements Action {
  readonly type = RepaymentsActionTypes.NOT_PROCESSING_REPAYMENTS;
}

export class LoadingRepayments implements Action {
  readonly type = RepaymentsActionTypes.LOADING_REPAYMENTS;
}

export class NotLoadingRepayments implements Action {
  readonly type = RepaymentsActionTypes.NOT_LOADING_REPAYMENTS;
}

export class LoadDataRepayments implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENTS;
}

export class LoadDataRepaymentsSuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENTS_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadDataRepaymentInterest implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_INTEREST;
  constructor(public payload: {effectiveDate: string, loandetailId: number, returnInterestOnly: number}) {}
}

export class LoadDataRepaymentInterestSuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_INTEREST_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadRunningLoansRepayments implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_RUNNING_LOANS_REPAYMENTS;
}

export class LoadRunningLoansRepaymentsSuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_RUNNING_LOANS_REPAYMENTS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadPaymentsHistory implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_PAYMENTS_HISTORY;

  constructor(public payload: {loanDetailId: number, employeeId: number}) {}
}

export class LoadPaymentsHistorySuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_PAYMENTS_HISTORY_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadDataRepaymentTypes implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_TYPES;
}

export class LoadDataRepaymentTypesSuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_TYPES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDataPaymentInstruments implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_PAYMENT_INSTRUMENTS;
}

export class LoadDataPaymentInstrumentsSuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_PAYMENT_INSTRUMENTS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDefinitionsRepayment implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_REPAYMENT;
}

export class LoadDefinitionsRepaymentSuccess implements Action {
  readonly type = RepaymentsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_REPAYMENT_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class SaveRepayment implements Action {
  readonly type = RepaymentsActionTypes.SAVE;

  constructor(public payload: {data: ILoanRepayment}) {}
}

export class LoadRepaymentsScheduleData implements Action {
  readonly type =
    RepaymentsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_REPAYMENT;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadRepaymentsScheduleDataSuccess implements Action {
  readonly type =
    RepaymentsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_REPAYMENT_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export type RepaymentsActions =
  | ShowEditorRepayment
  | HideEditorRepayment
  | ShowViewerRepayment
  | HideViewerRepayment
  | ShowViewerPaymentsHistory
  | HideViewerPaymentsHistory
  | ShowViewerRepaymentScheduleRepayment
  | HideViewerRepaymentScheduleRepayment
  | ProcessingRepayments
  | NotProcessingRepayments
  | LoadingRepayments
  | NotLoadingRepayments
  | LoadDataRepayments
  | LoadDataRepaymentsSuccess
  | LoadPaymentsHistory
  | LoadPaymentsHistorySuccess
  | LoadDataRepaymentTypes
  | LoadDataRepaymentTypesSuccess
  | LoadDataPaymentInstruments
  | LoadDataPaymentInstrumentsSuccess
  | LoadDefinitionsRepayment
  | LoadDefinitionsRepaymentSuccess
  | LoadRunningLoansRepayments
  | LoadRunningLoansRepaymentsSuccess
  | LoadDataRepaymentInterest
  | LoadDataRepaymentInterestSuccess
  | LoadRepaymentsScheduleData
  | LoadRepaymentsScheduleDataSuccess
  | SaveRepayment
