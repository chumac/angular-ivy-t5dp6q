import { Action } from '@ngrx/store';
import { IProcessStep } from '../../interfaces/process-step.interface';
import { IResignationLetter, IResponseBody } from '../../interfaces';
import { IChecklistTransaction } from '../../interfaces/checklist-transaction.interface';

export enum HrProcessActionTypes {

  SHOW_VALIDATE_EDITOR = '[HR RESIGNATION - PROCESS] Show Validate Editor',
  HIDE_VALIDATE_EDITOR = '[HR RESIGNATION - PROCESS] Hide Validate Editor',

  SHOW_RESPONSE_VIEWER = '[HR RESIGNATION - PROCESS] Show Response Viewer',
  HIDE_RESPONSE_VIEWER = '[HR RESIGNATION - PROCESS] Hide Response Viewer',

  LOADING = '[HR RESIGNATION - PROCESS] Loading',
  NOT_LOADING = '[HR RESIGNATION - PROCESS] Not Loading',

  PROCESSING = '[HR RESIGNATION - PROCESS] Processing',
  NOT_PROCESSING = '[HR RESIGNATION - PROCESS] Not Processing',

  LOAD_EMPLOYEE_SUBMITTED_LETTER = '[HR RESIGNATION - PROCESS] Load Employee Submitted Letter',
  LOAD_EMPLOYEE_SUBMITTED_LETTER_SUCCESS = '[HR RESIGNATION - PROCESS] Load Employee Submitted Letter Success',

  LOAD_EMPLOYEE_PROCESS_DATA = '[HR RESIGNATION - PROCESS] Load Employee Process List Data',
  LOAD_EMPLOYEE_PROCESS_DATA_SUCCESS = '[HR RESIGNATION - PROCESS] Load Employee Process List Data Success',

  LOAD_DATA_FINALIZE_WORKFLOW = '[HR RESIGNATION - PROCESS] Load Data Finalize workflow',
  LOAD_DATA_FINALIZE_WORKFLOW_SUCCESS = '[HR RESIGNATION - PROCESS] Load Data Finalize workflow Success',

  LOAD_CHECKLIST_TRANSACTIONS = '[HR RESIGNATION - PROCESS] Load Employee Checklist Transactions',
  LOAD_CHECKLIST_TRANSACTIONS_SUCCESS = '[HR RESIGNATION - PROCESS] Load Employee Checklist Transactions Success',

  // LOAD_DATA_SEPARATION_TRANSACTION = '[HR RESIGNATION - PROCESS] Load Employee Separation Transaction',
  // LOAD_DATA_SEPARATION_TRANSACTION_SUCCESS = '[HR RESIGNATION - PROCESS] Load Employee Separation Transaction Success',

  LOAD_LETTER_DOCUMENT_SUCCESS = '[HR RESIGNATION - PROCESS] Load Letter Document Success',
  SUBMIT_CHECKLIST_TRANSACTIONS = '[HR RESIGNATION - PROCESS] Submit Checklist Transactions',
  SUBMIT_CHECKLIST_TRANSACTIONS_SUCCESS = '[HR RESIGNATION - PROCESS] Submit Checklist Transactions Success',

  IS_USER_ADMIN = '[HR RESIGNATION - PROCESS] Is User Admin',
  SHOW_SEPARATION_EDITOR = '[HR RESIGNATION - PROCESS] Show Separation Editor',

  SUBMIT_EXIT_SEPARATION_TRANSACTION = '[HR RESIGNATION - PROCESS] Create Exit Separation Transaction',
}


export class ProcessingHRProcessData implements Action {
  readonly type = HrProcessActionTypes.PROCESSING;
}

export class NotProcessingHRProcessData implements Action {
  readonly type = HrProcessActionTypes.NOT_PROCESSING;
}

export class LoadingEmployeeProcessData implements Action {
  readonly type = HrProcessActionTypes.LOADING;
}

export class NotLoadingEmployeeProcessData implements Action {
  readonly type = HrProcessActionTypes.NOT_LOADING;
}

export class ShowSeparationEditor implements Action {
  readonly type = HrProcessActionTypes.SHOW_SEPARATION_EDITOR;

  constructor(public payload: boolean) { }
}

export class LoadEmployeeSubmittedLetter implements Action {
  readonly type = HrProcessActionTypes.LOAD_EMPLOYEE_SUBMITTED_LETTER;
  constructor(public payload: {employeeId: number}) { }
}

export class LoadEmployeeSubmittedLetterSuccess implements Action {
  readonly type = HrProcessActionTypes.LOAD_EMPLOYEE_SUBMITTED_LETTER_SUCCESS;

  constructor(public payload: IResignationLetter) { }
}

export class LoadEmployeeProcessListData implements Action {
  readonly type = HrProcessActionTypes.LOAD_EMPLOYEE_PROCESS_DATA;
  constructor(public payload: {employeeId: number}) { }
}

export class LoadEmployeeProcessListDataSuccess implements Action {
  readonly type = HrProcessActionTypes.LOAD_EMPLOYEE_PROCESS_DATA_SUCCESS;

  constructor(public payload: IProcessStep[]) { }
}

export class LoadDataFinalizeWorkflow implements Action {
  readonly type = HrProcessActionTypes.LOAD_DATA_FINALIZE_WORKFLOW;
  constructor(public payload: { msgId: number }) { }
}

export class LoadDataFinalizeWorkflowSuccess implements Action {
  readonly type = HrProcessActionTypes.LOAD_DATA_FINALIZE_WORKFLOW_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadChecklistTransactionsHR implements Action {
  readonly type = HrProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS;

  constructor(public payload: { resignationId: number, employeeId?: number }) { }
}

export class LoadChecklistTransactionsHRSuccess implements Action {
  readonly type = HrProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS_SUCCESS;

  constructor(public payload: IChecklistTransaction[]) { }
}

export class SubmitChecklistTransactionHR implements Action {
  readonly type = HrProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS;

  constructor(public payload: { requestType: string, resignationId: number, employeeId: number, data: IResponseBody[] }) { }
}

export class SubmitChecklistTransactionHRSuccess implements Action {
  readonly type = HrProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS_SUCCESS;

  constructor(public payload: boolean) { }
}


export class IsUserAdmin implements Action {
  readonly type = HrProcessActionTypes.IS_USER_ADMIN;

  constructor(public payload: boolean) { }
}


export class LoadEmployeeLetterDocumentSuccess implements Action {
  readonly type = HrProcessActionTypes.LOAD_LETTER_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}


export class SubmitExitSeparationTransaction implements Action {
  readonly type = HrProcessActionTypes.SUBMIT_EXIT_SEPARATION_TRANSACTION;

  constructor(public payload: {data: any}) { }
}

export type HrProcessActions =

  | ProcessingHRProcessData
  | NotProcessingHRProcessData
  | LoadingEmployeeProcessData
  | NotLoadingEmployeeProcessData
  | LoadEmployeeSubmittedLetter
  | LoadEmployeeSubmittedLetterSuccess
  | LoadEmployeeProcessListData
  | LoadEmployeeProcessListDataSuccess
  | LoadChecklistTransactionsHR
  | LoadChecklistTransactionsHRSuccess
  | IsUserAdmin
  | ShowSeparationEditor
  | LoadDataFinalizeWorkflow
  | LoadEmployeeLetterDocumentSuccess
  | SubmitChecklistTransactionHR
  | SubmitChecklistTransactionHRSuccess
  | SubmitExitSeparationTransaction
  | LoadDataFinalizeWorkflowSuccess;
