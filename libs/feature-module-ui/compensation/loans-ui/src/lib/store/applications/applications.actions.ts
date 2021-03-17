import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IApplicationCreate, ILoanRepayment, ILoanSchedule, IApplication, ILoanDefinition } from '@nutela/models/compensation/loans';

export enum ApplicationsActionTypes {
  SHOW_APPLY_EDITOR = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Apply Editor',
  HIDE_APPLY_EDITOR = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Apply Editor',

  SHOW_APPLY_VIEWER= '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Apply Viewer',
  HIDE_APPLY_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Apply Viewer',

  SHOW_ACTUAL_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Actual Schedule Viewer',
  HIDE_ACTUAL_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Actual Schedule Viewer',

  SHOW_GENERIC_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Generic Schedule Viewer',
  HIDE_GENERIC_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Generic Schedule Viewer',

  SHOW_STANDARD_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Standard Schedule Viewer',
  HIDE_STANDARD_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Standard Schedule Viewer',

  SHOW_REPAYMENT_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Repayment Schedule Viewer',
  HIDE_REPAYMENT_SCHEDULE_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Repayment Schedule Viewer',

  SHOW_APPLICATION_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Show Application Viewer',
  HIDE_APPLICATION_VIEWER = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Hide Application Viewer',

  PROCESSING_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Processing Application',
  NOT_PROCESSING_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Not Processing Application',

  LOADING_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Loading Application',
  NOT_LOADING_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Not Loading Application',

  LOAD_ALL_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load All Data Application',
  LOAD_ALL_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load All Data Application Success',

  LOAD_APPROVED_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Approved Data Application',
  LOAD_APPROVED_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Approved Data Application Success',

  LOAD_CLOSED_DATA_APPLICATIONS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Closed Data Application',
  LOAD_CLOSED_DATA_APPLICATIONS_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Closed Data Application Success',

  LOAD_AWAITING_APPROVAL_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Awaiting Approval Data Application',
  LOAD_AWAITING_APPROVAL_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Awaiting Approval Data Success Application',

  LOAD_STANDARD_SCHEDULE_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Standard Schedule Data Application',
  LOAD_STANDARD_SCHEDULE_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Standard Schedule Data Success Application',

  LOAD_ACTUAL_SCHEDULE_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Actual Schedule Data Application',
  LOAD_ACTUAL_SCHEDULE_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Actual Schedule Data Success Application',

  LOAD_GENERIC_SCHEDULE_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Generic Schedule Data Application',
  LOAD_GENERIC_SCHEDULE_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Generic Schedule Data Success Application',

  LOAD_MONTHLY_DEDUCTION_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Monthly Deduction Data Application',
  LOAD_MONTHLY_DEDUCTION_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Monthly Deduction Data Success Application',

  LOAD_LOAN_DEFINITION_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Loan Definition Data Application',
  LOAD_LOAN_DEFINITION_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN APPLICATIONS] Load Loan Definition Data Success Application',

  LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Repayments Schedule Data Application',
  LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Repayments Schedule Data Success Application',

  LOAD_PAYMENTS_SCHEDULE_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Loan Payments Schedule Data Application',
  LOAD_PAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Loan Payments Schedule Data Success Application',

  LOAD_LOAN_CURRENCY_DATA_APPLICATION = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Loan Currency Data Application',
  LOAD_LOAN_CURRENCY_DATA_APPLICATION_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Loan Currency Data Success Application',

  LOAD_DOCUMENT = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[SELF SERVICE LOAN - LOAN APPLICATIONS] Load Inline Document',

  SAVE = '[SELF SERVICE LOAN APPLICATIONS] Save Data Loan Application',
  SAVE_SUCCESS = '[SELF SERVICE LOAN APPLICATIONS] Save Data Loan Application Success'
}

export class ShowEditorApply implements Action {
  readonly type = ApplicationsActionTypes.SHOW_APPLY_EDITOR;
}

export class HideEditorApply implements Action {
  readonly type = ApplicationsActionTypes.HIDE_APPLY_EDITOR;
}

export class ShowViewerApply implements Action {
  readonly type = ApplicationsActionTypes.SHOW_APPLY_VIEWER;
}

export class HideViewerApply implements Action {
  readonly type = ApplicationsActionTypes.HIDE_APPLY_VIEWER;
}

export class ShowViewerActualSchedule implements Action {
  readonly type = ApplicationsActionTypes.SHOW_ACTUAL_SCHEDULE_VIEWER;
}

export class HideViewerActualSchedule implements Action {
  readonly type = ApplicationsActionTypes.HIDE_ACTUAL_SCHEDULE_VIEWER;
}

export class ShowViewerGenericSchedule implements Action {
  readonly type = ApplicationsActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER;
}

export class HideViewerGenericSchedule implements Action {
  readonly type = ApplicationsActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER;
}

export class ShowViewerStandardSchedule implements Action {
  readonly type = ApplicationsActionTypes.SHOW_STANDARD_SCHEDULE_VIEWER;
}

export class HideViewerStandardSchedule implements Action {
  readonly type = ApplicationsActionTypes.HIDE_STANDARD_SCHEDULE_VIEWER;
}

export class ShowViewerRepaymentSchedule implements Action {
  readonly type = ApplicationsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER;
}

export class HideViewerRepaymentSchedule implements Action {
  readonly type = ApplicationsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER;
}

export class ShowViewerApplication implements Action {
  readonly type = ApplicationsActionTypes.SHOW_APPLICATION_VIEWER;
}

export class HideViewerApplication implements Action {
  readonly type = ApplicationsActionTypes.HIDE_APPLICATION_VIEWER;
}

export class ProcessingApplication implements Action {
  readonly type = ApplicationsActionTypes.PROCESSING_APPLICATION;
}

export class NotProcessingApplication implements Action {
  readonly type = ApplicationsActionTypes.NOT_PROCESSING_APPLICATION;
}

export class LoadingApplication implements Action {
  readonly type = ApplicationsActionTypes.LOADING_APPLICATION;
}

export class NotLoadingApplication implements Action {
  readonly type = ApplicationsActionTypes.NOT_LOADING_APPLICATION;
}

export class LoadAllDataApplication implements Action {
  readonly type = ApplicationsActionTypes.LOAD_ALL_DATA_APPLICATION;
}

export class LoadAllDataApplicationSuccess implements Action {
  readonly type = ApplicationsActionTypes.LOAD_ALL_DATA_APPLICATION_SUCCESS;

  constructor(public payload: IApplication[]) {}
}

export class LoadApprovedDataApplication implements Action {
  readonly type = ApplicationsActionTypes.LOAD_APPROVED_DATA_APPLICATION;
}

export class LoadApprovedDataApplicationSuccess implements Action {
  readonly type = ApplicationsActionTypes.LOAD_APPROVED_DATA_APPLICATION_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadClosedDataApplications implements Action {
  readonly type = ApplicationsActionTypes.LOAD_CLOSED_DATA_APPLICATIONS;
}

export class LoadClosedDataApplicationsSuccess implements Action {
  readonly type = ApplicationsActionTypes.LOAD_CLOSED_DATA_APPLICATIONS_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadAwaitingApprovalDataApplication implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_APPLICATION;
}

export class LoadAwaitingApprovalDataApplicationSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_APPLICATION_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadStandardScheduleData implements Action {
  readonly type = ApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_APPLICATION;

  constructor(public payload: { recordId: number }) {}
}

export class LoadStandardScheduleDataSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_APPLICATION_SUCCESS;

  constructor(public payload: ILoanSchedule[]) {}
}

export class LoadRepaymentsScheduleData implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION;

    constructor(public payload: { recordId: number }) {}
}

export class LoadRepaymentsScheduleDataSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadActualScheduleData implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_APPLICATION;

    constructor(public payload: { recordId: number }) {}
}

export class LoadActualScheduleDataSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadGenericScheduleData implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_APPLICATION;

    constructor(public payload: { loanId: number, loanAmount: number, interestRate: number, tenor: number, effectiveDate: string }) {}
}

export class LoadGenericScheduleDataSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_APPLICATION_SUCCESS;

  constructor(public payload: ILoanRepayment[]) {}
}

export class LoadMonthlyDeductionAmount implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_APPLICATION;

    constructor(public payload: { rate: number, period: number, principal: number }) {}
}

export class LoadMonthlyDeductionAmountSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_APPLICATION_SUCCESS;

  constructor(public payload: number) {}
}

export class LoadLoanDefinitionDataApplication implements Action {
  readonly type = ApplicationsActionTypes.LOAD_LOAN_DEFINITION_DATA_APPLICATION;
}

export class LoadLoanDefinitionDataApplicationSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_LOAN_DEFINITION_DATA_APPLICATION_SUCCESS;

  constructor(public payload: {data: ILoanDefinition[], loanTypesSelect: ISelectOption[]}) {}
}

export class LoadLoanCurrencyDataApplication implements Action {
  readonly type = ApplicationsActionTypes.LOAD_LOAN_CURRENCY_DATA_APPLICATION;
}

export class LoadLoanCurrencyDataApplicationSuccess implements Action {
  readonly type =
    ApplicationsActionTypes.LOAD_LOAN_CURRENCY_DATA_APPLICATION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class SaveDataLoanApplication implements Action {
  readonly type = ApplicationsActionTypes.SAVE;

  constructor(public payload: { data: IApplicationCreate }) {}
}

export class SaveSuccessDataLoanApplication implements Action {
  readonly type = ApplicationsActionTypes.SAVE_SUCCESS;

  constructor(public payload: boolean) {}
}

export class LoadDocumentApplication implements Action {
  readonly type = ApplicationsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {loanDetailId: number, isApproved: boolean}) {}
}

export class LoadDocumentApplicationSuccess implements Action {
  readonly type = ApplicationsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentApplication implements Action {
  readonly type = ApplicationsActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentApplication implements Action {
  readonly type = ApplicationsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export type ApplicationActions =
  | ShowEditorApply
  | HideEditorApply
  | ShowViewerApply
  | HideViewerApply
  | ShowViewerActualSchedule
  | HideViewerActualSchedule
  | ShowViewerGenericSchedule
  | HideViewerGenericSchedule
  | ShowViewerStandardSchedule
  | HideViewerStandardSchedule
  | ShowViewerRepaymentSchedule
  | HideViewerRepaymentSchedule
  | ShowViewerApplication
  | HideViewerApplication
  | ProcessingApplication
  | NotProcessingApplication
  | LoadingApplication
  | NotLoadingApplication
  | LoadAllDataApplication
  | LoadAllDataApplicationSuccess
  | LoadApprovedDataApplication
  | LoadApprovedDataApplicationSuccess
  | LoadAwaitingApprovalDataApplication
  | LoadAwaitingApprovalDataApplicationSuccess
  | LoadLoanDefinitionDataApplication
  | LoadLoanDefinitionDataApplicationSuccess
  | LoadLoanCurrencyDataApplication
  | LoadLoanCurrencyDataApplicationSuccess
  | LoadActualScheduleData
  | LoadActualScheduleDataSuccess
  | LoadGenericScheduleData
  | LoadGenericScheduleDataSuccess
  | LoadMonthlyDeductionAmount
  | LoadMonthlyDeductionAmountSuccess
  | LoadRepaymentsScheduleData
  | LoadRepaymentsScheduleDataSuccess
  | LoadStandardScheduleData
  | LoadStandardScheduleDataSuccess
  | LoadClosedDataApplications
  | LoadClosedDataApplicationsSuccess
  | SaveDataLoanApplication
  | SaveSuccessDataLoanApplication
  | LoadDocumentApplication
  | LoadDocumentApplicationSuccess
  | ClearDocumentApplication

