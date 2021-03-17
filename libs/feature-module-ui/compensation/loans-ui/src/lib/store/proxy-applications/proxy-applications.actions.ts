import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IProxyApplication, ILoanDefinition, IApprovedLoan, ILoanRepayment, ILoanSchedule } from '@nutela/models/compensation/loans';

export enum ProxyApplicationsActionTypes {
  SHOW_PROXY_APPLY_EDITOR = '[HR LOANS - PROXY APPLICATIONS] Show Proxy Apply Editor',
  HIDE_PROXY_APPLY_EDITOR = '[HR LOANS - PROXY APPLICATIONS] Hide Proxy Apply Editor',

  SHOW_PROXY_APPLY_VIEWER= '[HR LOANS - PROXY APPLICATIONS] Show Proxy Apply Viewer',
  HIDE_PROXY_APPLY_VIEWER = '[HR LOANS - PROXY APPLICATIONS] Hide Proxy Apply Viewer',

  SHOW_ACTUAL_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Show Actual Schedule Viewer',
  HIDE_ACTUAL_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Hide Actual Schedule Viewer',

  SHOW_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Show Generic Schedule Viewer',
  HIDE_GENERIC_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Hide Generic Schedule Viewer',

  SHOW_STANDARD_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Show Standard Schedule Viewer',
  HIDE_STANDARD_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Hide Standard Schedule Viewer',

  SHOW_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Show Repayment Schedule Viewer',
  HIDE_REPAYMENT_SCHEDULE_VIEWER = '[HR LOAN - PROXY APPLICATIONS] Hide Repayment Schedule Viewer',

  PROCESSING_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Processing Proxy Applications',
  NOT_PROCESSING_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Not Processing Proxy Applications',

  LOADING_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Loading Proxy Applications',
  NOT_LOADING_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Not Loading Proxy Applications',

  LOAD_DATA_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Load Data Proxy Applications',
  LOAD_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Data Proxy Applications Success',

  LOAD_MONTHLY_DEDUCTION_DATA_PROXY_APPLICATIONS = '[HR LOAN - PROXY APPLICATIONS] Load Monthly Deduction Data Proxy Applications',
  LOAD_MONTHLY_DEDUCTION_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOAN - PROXY APPLICATIONS] Load Monthly Deduction Data Proxy Applications Success',

  LOAD_APPROVED_DATA_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Load Approved Data Proxy Applications',
  LOAD_APPROVED_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Approved Data Proxy Applications Success',

  LOAD_AWAITING_APPROVAL_DATA_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Load Awaiting Approval Data Proxy Applications',
  LOAD_AWAITING_APPROVAL_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Awaiting Appoval Data Proxy Applications Success',

  LOAD_LOAN_TYPES_DATA_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Load Loan Types Data Proxy Applications',
  LOAD_LOAN_TYPES_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOANS - PROXY APPLICAITONS] Load Loan Types Data Proxy Applications Success',

  LOAD_SELFSERVICE_SOURCES_DATA_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Load Self Service Source Data Proxy Applications',
  LOAD_SELFSERVICE_SOURCES_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Self Service Source Data Proxy Applications Success',

  LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS = '[HR LOANS - PROXY APPLICATIONS] Load Currencies Data Proxy Applications',
  LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Currencies Data Proxy Applications Success',

  LOAD_REPAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION = '[HR LOANS - PROXY APPLICATIONS] Load Repayments Schedule Data Proxy Application',
  LOAD_REPAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Repayments Schedule Data Success Proxy Application',

  LOAD_PAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION = '[HR LOANS - PROXY APPLICATIONS] Load Loan Payments Schedule Data Proxy Application',
  LOAD_PAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Loan Payments Schedule Data Success Proxy Application',

  LOAD_STANDARD_SCHEDULE_DATA_PROXY_APPLICATION = '[HR LOAN - PROXY APPLICATIONS] Load Standard Schedule Data Application',
  LOAD_STANDARD_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS = '[HR LOAN - PROXY APPLICATIONS] Load Standard Schedule Data Success Application',

  LOAD_ACTUAL_SCHEDULE_DATA_PROXY_APPLICATION = '[HR LOAN - PROXY APPLICATIONS] Load Actual Schedule Data Application',
  LOAD_ACTUAL_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS = '[HR LOAN - PROXY APPLICATIONS] Load Actual Schedule Data Success Application',

  LOAD_GENERIC_SCHEDULE_DATA_PROXY_APPLICATION = '[HR LOAN - PROXY APPLICATIONS] Load Generic Schedule Data Application',
  LOAD_GENERIC_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS = '[HR LOAN - PROXY APPLICATIONS] Load Generic Schedule Data Success Application',

  DELETE_APPROVED_DATA  = '[HR LOANS - PROXY APPLICATIONS] Delete Approved Data Proxy Application',
  DELETE_AWAITING_APPROVAL_DATA  = '[HR LOANS - PROXY APPLICATIONS] Delete Awaiting Approval Data Proxy Application',

  LOAD_DOCUMENT = '[HR LOANS - PROXY APPLICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR LOANS - PROXY APPLICATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[HR LOANS - PROXY APPLICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR LOANS - PROXY APPLICATIONS] Load Inline Document',

  SAVE = '[HR LOANS - PROXY APPLICATIONS] Save Data Proxy Application',
  SAVE_UPDATE = '[HR LOANS - PROXY APPLICATIONS] Save Update Data Proxy Application'
}

export class ShowEditorProxyApply implements Action {
  readonly type = ProxyApplicationsActionTypes.SHOW_PROXY_APPLY_EDITOR;
}

export class HideEditorProxyApply implements Action {
  readonly type = ProxyApplicationsActionTypes.HIDE_PROXY_APPLY_EDITOR;
}

export class ShowViewerProxyApply implements Action {
  readonly type = ProxyApplicationsActionTypes.SHOW_PROXY_APPLY_VIEWER;
}

export class HideViewerProxyApply implements Action {
  readonly type = ProxyApplicationsActionTypes.HIDE_PROXY_APPLY_VIEWER;
}


export class ProcessingDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.PROCESSING_PROXY_APPLICATIONS;
}

export class NotProcessingProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.NOT_PROCESSING_PROXY_APPLICATIONS;
}

export class LoadingDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOADING_PROXY_APPLICATIONS;
}

export class NotLoadingProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.NOT_LOADING_PROXY_APPLICATIONS;
}

export class LoadDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_DATA_PROXY_APPLICATIONS;
}

export class LoadDataProxyApplicationsSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadAwaitingApprovalDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_PROXY_APPLICATIONS;
}

export class LoadAwaitingApprovalDataProxyApplicationsSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadApprovedDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_APPROVED_DATA_PROXY_APPLICATIONS;
}

export class LoadApprovedDataProxyApplicationsSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_APPROVED_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: IApprovedLoan[]) {}
}

export class LoadSelfServiceSourceDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_SELFSERVICE_SOURCES_DATA_PROXY_APPLICATIONS;
}

export class LoadSelfServiceSourceDataProxyApplicationsSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_SELFSERVICE_SOURCES_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadCurrenciesDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS;
}

export class LoadCurrenciesDataProxyApplicationsSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadLoanTypesDataProxyApplications implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_LOAN_TYPES_DATA_PROXY_APPLICATIONS;
}

export class LoadLoanTypesDataProxyApplicationsSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_LOAN_TYPES_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: {data: ILoanDefinition[], loanTypesTransformed: ISelectOption[]}) {}
}

export class SaveDataProxyApplication implements Action {
  readonly type = ProxyApplicationsActionTypes.SAVE;

  constructor(public payload: {data: IApprovedLoan }) {}
}

export class SaveUpdateDataProxyApplication implements Action {
  readonly type = ProxyApplicationsActionTypes.SAVE_UPDATE;

  constructor(public payload: {data: IProxyApplication, recordId: number, employeeId: number, editMode: boolean }) {}
}

export class LoadMonthlyDeductionAmountProxyApplication implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_PROXY_APPLICATIONS;

    constructor(public payload: { rate: number, period: number, principal: number }) {}
}

export class LoadMonthlyDeductionAmountProxyApplicationSuccess implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_PROXY_APPLICATIONS_SUCCESS;

  constructor(public payload: number) {}
}



export class LoadStandardScheduleData implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_PROXY_APPLICATION;

  constructor(public payload: { recordId: number }) {}
}

export class LoadStandardScheduleDataSuccess implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS;

  constructor(public payload: ILoanSchedule[]) {}
}

export class LoadRepaymentsScheduleData implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadRepaymentsScheduleDataSuccess implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadActualScheduleData implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_PROXY_APPLICATION;

    constructor(public payload: { loanDetailId: number, employeeId: number }) {}
}

export class LoadActualScheduleDataSuccess implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadGenericScheduleData implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_PROXY_APPLICATION;

    constructor(public payload: { loanId: number, loanAmount: number, interestRate: number, tenor: number, effectiveDate: string }) {}
}

export class LoadGenericScheduleDataSuccess implements Action {
  readonly type =
    ProxyApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}


export class ShowViewerActualScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.SHOW_ACTUAL_SCHEDULE_VIEWER;
}

export class HideViewerActualScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.HIDE_ACTUAL_SCHEDULE_VIEWER;
}

export class ShowViewerGenericScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER;
}

export class HideViewerGenericScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER;
}

export class ShowViewerStandardScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.SHOW_STANDARD_SCHEDULE_VIEWER;
}

export class HideViewerStandardScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.HIDE_STANDARD_SCHEDULE_VIEWER;
}

export class ShowViewerRepaymentScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER;
}

export class HideViewerRepaymentScheduleProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER;
}

export class DeleteApprovedLoanProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {loanDetailId: number, employeeId: number}) {}
}

export class DeleteAwaitingApprovalLoanProxy implements Action {
  readonly type = ProxyApplicationsActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {loanDetailId: number, employeeId: number}) {}
}

export class LoadDocumentProxyApplication implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {loanDetailId: number, employeeId: number, isApproved: boolean}) {}
}

export class LoadDocumentProxyApplicationSuccess implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentProxyApplication implements Action {
  readonly type = ProxyApplicationsActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentProxyApplication implements Action {
  readonly type = ProxyApplicationsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export type ProxyApplicationsActions =
  | ShowEditorProxyApply
  | HideEditorProxyApply
  | ShowViewerProxyApply
  | HideViewerProxyApply
  | ProcessingDataProxyApplications
  | NotProcessingProxyApplications
  | LoadingDataProxyApplications
  | NotLoadingProxyApplications
  | LoadDataProxyApplications
  | LoadDataProxyApplicationsSuccess
  | LoadMonthlyDeductionAmountProxyApplication
  | LoadMonthlyDeductionAmountProxyApplicationSuccess
  | LoadApprovedDataProxyApplications
  | LoadApprovedDataProxyApplicationsSuccess
  | LoadAwaitingApprovalDataProxyApplications
  | LoadAwaitingApprovalDataProxyApplicationsSuccess
  | LoadLoanTypesDataProxyApplications
  | LoadLoanTypesDataProxyApplicationsSuccess
  | LoadCurrenciesDataProxyApplications
  | LoadCurrenciesDataProxyApplicationsSuccess
  | LoadSelfServiceSourceDataProxyApplications
  | LoadSelfServiceSourceDataProxyApplicationsSuccess
  | DeleteApprovedLoanProxy
  | DeleteAwaitingApprovalLoanProxy
  | SaveDataProxyApplication
  | SaveUpdateDataProxyApplication
  | LoadStandardScheduleData
  | LoadStandardScheduleDataSuccess
  | LoadRepaymentsScheduleData
  | LoadRepaymentsScheduleDataSuccess
  | LoadActualScheduleData
  | LoadActualScheduleDataSuccess
  | LoadGenericScheduleData
  | LoadGenericScheduleDataSuccess
  | ShowViewerActualScheduleProxy
  | HideViewerActualScheduleProxy
  | ShowViewerGenericScheduleProxy
  | HideViewerGenericScheduleProxy
  | ShowViewerStandardScheduleProxy
  | HideViewerStandardScheduleProxy
  | ShowViewerRepaymentScheduleProxy
  | HideViewerRepaymentScheduleProxy
  | LoadDocumentProxyApplication
  | LoadDocumentProxyApplicationSuccess
  | ClearDocumentProxyApplication
  | LoadInlineDocumentProxyApplication
