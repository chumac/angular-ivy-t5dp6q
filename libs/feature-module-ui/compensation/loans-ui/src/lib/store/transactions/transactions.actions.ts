import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { ILoanDefinition, IApprovedLoan, ILoanRepayment } from '@nutela/models/compensation/loans';

export enum TransactionsActionTypes {
  SHOW_TRANSACTIONS_APPLICATIONS_EDITOR = '[HR LOANS - TRANSACTIONS APPLICATIONS] Show Transactions Editor',
  HIDE_TRANSACTIONS_APPLICATIONS_EDITOR = '[HR LOANS - TRANSACTIONS APPLICATIONS] Hide Transactions Editor',

  SHOW_TRANSACTIONS_APPLICATIONS_VIEWER= '[HR LOANS - TRANSACTIONS APPLICATIONS] Show Transactions Viewer',
  HIDE_TRANSACTIONS_APPLICATIONS_VIEWER = '[HR LOANS - TRANSACTIONS APPLICATIONS] Hide Transactions Viewer',

  SHOW_ACTUAL_SCHEDULE_VIEWER = '[HR LOAN - TRANSACTIONS APPLICATIONS] Show Actual Schedule Viewer',
  HIDE_ACTUAL_SCHEDULE_VIEWER = '[HR LOAN - TRANSACTIONS APPLICATIONS] Hide Actual Schedule Viewer',

  SHOW_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - TRANSACTIONS APPLICATIONS] Show Generic Schedule Viewer',
  HIDE_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - TRANSACTIONS APPLICATIONS] Hide Generic Schedule Viewer',

  PROCESSING_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Processing Transactions',
  NOT_PROCESSING_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Not Processing Transactions',

  LOADING_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Loading Transactions',
  NOT_LOADING_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Not Loading Transactions',

  LOAD_ACTUAL_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Actual Schedule Data Transaction Application',
  LOAD_ACTUAL_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Actual Schedule Data Success Transaction Application',

  LOAD_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Data Transactions',
  LOAD_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Data Transactions Success',

  LOAD_GENERIC_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Generic Schedule Data Transaction',
  LOAD_GENERIC_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Generic Schedule Data Success Transaction',

  LOAD_MONTHLY_DEDUCTION_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Monthly Deduction Data Transactions Applications',
  LOAD_MONTHLY_DEDUCTION_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Monthly Deduction Data Transactions Applications Success',

  LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Repayments Schedule Data Application',
  LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS = '[HR LOAN - TRANSACTIONS APPLICATIONS] Load Repayments Schedule Data Success Application',

  LOAD_APPROVED_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Approved Data Transactions',
  LOAD_APPROVED_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Approved Data Transactions Success',

  LOAD_AWAITING_APPROVAL_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Awaiting Approval Data Transactions',
  LOAD_AWAITING_APPROVAL_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Awaiting Appoval Data Transactions Success',

  LOAD_LOAN_TYPES_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Loan Types Data Transactions',
  LOAD_LOAN_TYPES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICAITONS] Load Loan Types Data Transactions Success',

  SHOW_REPAYMENT_SCHEDULE_VIEWER = '[HR LOANS - TRANSACTIONS APPLICATIONS] Show Repayment Schedule Viewer',
  HIDE_REPAYMENT_SCHEDULE_VIEWER = '[HR LOANS - TRANSACTIONS APPLICATIONS] Hide Repayment Schedule Viewer',

  LOAD_SELFSERVICE_SOURCES_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Self Service Source Data Transactions',
  LOAD_SELFSERVICE_SOURCES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Self Service Source Data Transactions Success',

  LOAD_CURRENCIES_DATA_TRANSACTIONS_APPLICATIONS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Currencies Data Transactions',
  LOAD_CURRENCIES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Currencies Data Transactions Success',

  DELETE_DATA_TRANSACTIONS_APPLICATION = '[HR LOANS - TRANSACTIONS APPLICATIONS] Delete Data Proxy Application',
  REMOVE_DATA_TRANSACTIONS_APPLICATION = '[HR LOANS - TRANSACTIONS APPLICATIONS] Delete Data Proxy Application',

  DELETE_APPROVED_DATA = '[HR LOANS - TRANSACTIONS APPLICATIONS] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[HR LOANS - TRANSACTIONS APPLICATIONS] Delete Awaiting Approval Data',

  LOAD_DOCUMENT = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[HR LOANS - TRANSACTIONS APPLICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR LOANS - TRANSACTIONS APPLICATIONS] Load Inline Document',

  SAVE = '[HR LOANS - TRANSACTIONS APPLICATIONS] Save Data Proxy Application',
  SAVE_UPDATE = '[HR LOANS - TRANSACTIONS APPLICATIONS] Save Update Data Proxy Application'
}

export class ShowEditorTransactionApply implements Action {
  readonly type = TransactionsActionTypes.SHOW_TRANSACTIONS_APPLICATIONS_EDITOR;
}

export class HideEditorTransactionApply implements Action {
  readonly type = TransactionsActionTypes.HIDE_TRANSACTIONS_APPLICATIONS_EDITOR;
}

export class ShowViewerTransactionApply implements Action {
  readonly type = TransactionsActionTypes.SHOW_TRANSACTIONS_APPLICATIONS_VIEWER;
}

export class HideViewerTransactionApply implements Action {
  readonly type = TransactionsActionTypes.HIDE_TRANSACTIONS_APPLICATIONS_VIEWER;
}

export class ShowViewerRepaymentScheduleTransaction implements Action {
  readonly type = TransactionsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER;
}

export class HideViewerRepaymentScheduleTransaction implements Action {
  readonly type = TransactionsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER;
}

export class ShowViewerActualScheduleTransaction implements Action {
  readonly type = TransactionsActionTypes.SHOW_ACTUAL_SCHEDULE_VIEWER;
}

export class HideViewerActualScheduleTransaction implements Action {
  readonly type = TransactionsActionTypes.HIDE_ACTUAL_SCHEDULE_VIEWER;
}

export class ProcessingDataTransactions implements Action {
  readonly type = TransactionsActionTypes.PROCESSING_TRANSACTIONS_APPLICATIONS;
}

export class NotProcessingTransactions implements Action {
  readonly type = TransactionsActionTypes.NOT_PROCESSING_TRANSACTIONS_APPLICATIONS;
}

export class LoadingDataTransactions implements Action {
  readonly type = TransactionsActionTypes.LOADING_TRANSACTIONS_APPLICATIONS;
}

export class NotLoadingTransactions implements Action {
  readonly type = TransactionsActionTypes.NOT_LOADING_TRANSACTIONS_APPLICATIONS;
}

export class LoadDataTransactions implements Action {
  readonly type = TransactionsActionTypes.LOAD_DATA_TRANSACTIONS_APPLICATIONS;
}

export class LoadDataTransactionsSuccess implements Action {
  readonly type = TransactionsActionTypes.LOAD_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadGenericScheduleData implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS;

    constructor(public payload: { loanId: number, loanAmount: number, interestRate: number, tenor: number, effectiveDate: string }) {}
}

export class LoadGenericScheduleDataSuccess implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadActualScheduleData implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadActualScheduleDataSuccess implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class ShowViewerGenericScheduleTransaction implements Action {
  readonly type = TransactionsActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER;
}

export class HideViewerGenericScheduleTransaction implements Action {
  readonly type = TransactionsActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER;
}

export class LoadAwaitingApprovalDataTransactions implements Action {
  readonly type = TransactionsActionTypes.LOAD_AWAITING_APPROVAL_DATA_TRANSACTIONS_APPLICATIONS;
}

export class LoadAwaitingApprovalDataTransactionsSuccess implements Action {
  readonly type = TransactionsActionTypes.LOAD_AWAITING_APPROVAL_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadApprovedDataTransactions implements Action {
  readonly type = TransactionsActionTypes.LOAD_APPROVED_DATA_TRANSACTIONS_APPLICATIONS;
}

export class LoadApprovedDataTransactionsSuccess implements Action {
  readonly type = TransactionsActionTypes.LOAD_APPROVED_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadCurrenciesDataTransactions implements Action {
  readonly type = TransactionsActionTypes.LOAD_CURRENCIES_DATA_TRANSACTIONS_APPLICATIONS;
}

export class LoadCurrenciesDataTransactionsSuccess implements Action {
  readonly type = TransactionsActionTypes.LOAD_CURRENCIES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadLoanTypesDataTransactions implements Action {
  readonly type = TransactionsActionTypes.LOAD_LOAN_TYPES_DATA_TRANSACTIONS_APPLICATIONS;
}

export class LoadLoanTypesDataTransactionsSuccess implements Action {
  readonly type = TransactionsActionTypes.LOAD_LOAN_TYPES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: {data: ILoanDefinition[], loanTypesTransformed: ISelectOption[]}) {}
}

export class LoadMonthlyDeductionAmountTransaction implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_TRANSACTIONS_APPLICATIONS;

    constructor(public payload: { rate: number, period: number, principal: number }) {}
}

export class LoadMonthlyDeductionAmountTransactionSuccess implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteDataProxyApplication implements Action {
  readonly type = TransactionsActionTypes.DELETE_DATA_TRANSACTIONS_APPLICATION;

  constructor(public payload: {recordId: number}) {}
}

export class SaveDataTransactionApplication implements Action {
  readonly type = TransactionsActionTypes.SAVE;

  constructor(public payload: {data: IApprovedLoan }) {}
}

export class SaveUpdateDataTransactionApplication implements Action {
  readonly type = TransactionsActionTypes.SAVE_UPDATE;

  constructor(public payload: {data: IApprovedLoan, recordId: number, employeeId: number, editMode: boolean }) {}
}

export class LoadRepaymentsScheduleDataTransaction implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadRepaymentsScheduleDataTransactionSuccess implements Action {
  readonly type =
    TransactionsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class DeleteApprovedLoanTransaction implements Action {
  readonly type = TransactionsActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {loanDetailId: number, employeeId: number}) {}
}

export class DeleteAwaitingApprovalLoanTransaction implements Action {
  readonly type = TransactionsActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {loanDetailId: number, employeeId: number}) {}
}

export class LoadDocumentTransaction implements Action {
  readonly type = TransactionsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {loanDetailId: number, employeeId: number, isApproved: boolean}) {}
}

export class LoadDocumentTransactionSuccess implements Action {
  readonly type = TransactionsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentTransaction implements Action {
  readonly type = TransactionsActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentTransaction implements Action {
  readonly type = TransactionsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export type TransactionsActions =
  | ShowEditorTransactionApply
  | HideEditorTransactionApply
  | ShowViewerTransactionApply
  | HideViewerTransactionApply
  | ProcessingDataTransactions
  | NotProcessingTransactions
  | LoadingDataTransactions
  | NotLoadingTransactions
  | LoadDataTransactions
  | LoadDataTransactionsSuccess
  | LoadMonthlyDeductionAmountTransaction
  | LoadMonthlyDeductionAmountTransactionSuccess
  | LoadApprovedDataTransactions
  | LoadApprovedDataTransactionsSuccess
  | LoadAwaitingApprovalDataTransactions
  | LoadAwaitingApprovalDataTransactionsSuccess
  | LoadLoanTypesDataTransactions
  | LoadLoanTypesDataTransactionsSuccess
  | LoadCurrenciesDataTransactions
  | LoadCurrenciesDataTransactionsSuccess
  | LoadActualScheduleData
  | LoadActualScheduleDataSuccess
  | DeleteDataProxyApplication
  | SaveDataTransactionApplication
  | SaveUpdateDataTransactionApplication
  | ShowViewerRepaymentScheduleTransaction
  | HideViewerRepaymentScheduleTransaction
  | ShowViewerActualScheduleTransaction
  | HideViewerActualScheduleTransaction
  | LoadRepaymentsScheduleDataTransaction
  | LoadRepaymentsScheduleDataTransactionSuccess
  | ShowViewerGenericScheduleTransaction
  | HideViewerGenericScheduleTransaction
  | LoadGenericScheduleData
  | LoadGenericScheduleDataSuccess
  | DeleteApprovedLoanTransaction
  | DeleteAwaitingApprovalLoanTransaction
  | LoadDocumentTransaction
  | LoadDocumentTransactionSuccess
  | ClearDocumentTransaction
  | LoadInlineDocumentTransaction
