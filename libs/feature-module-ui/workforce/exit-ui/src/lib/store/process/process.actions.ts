import { Action } from '@ngrx/store';
import { IProcessStep } from '../../interfaces/process-step.interface';
import { IResignationLetter, IChecklistItem, IResponseBody } from '../../interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IChecklistTransaction } from '../../interfaces/checklist-transaction.interface';
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';

export enum ProcessActionTypes {

  SHOW_VALIDATE_EDITOR = '[MY EXIT - PROCESS] Show Validate Editor',
  HIDE_VALIDATE_EDITOR = '[MY EXIT - PROCESS] Hide Validate Editor',

  SHOW_RESPONSE_VIEWER = '[MY EXIT - PROCESS] Show Response Viewer',
  HIDE_RESPONSE_VIEWER = '[MY EXIT - PROCESS] Hide Response Viewer',

  LOADING = '[MY EXIT - PROCESS] Loading',
  NOT_LOADING = '[MY EXIT - PROCESS] Not Loading',

  PROCESSING = '[MY EXIT - PROCESS] Processing',
  NOT_PROCESSING = '[MY EXIT - PROCESS] Not Processing',

  PROCESSING_SAVE = '[MY EXIT - PROCESS] Processing Save',
  PROCESSING_REDIRECT = '[MY EXIT - PROCESS] Processing Redirect',

  LOAD_SUBMITTED_LETTER = '[MY EXIT - PROCESS] Load Submitted Letter',
  LOAD_SUBMITTED_LETTER_SUCCESS = '[MY EXIT - PROCESS] Load Submitted Letter Success',

  LOAD_PROCESS_DATA = '[MY EXIT - PROCESS] Load Process List Data',
  LOAD_PROCESS_DATA_SUCCESS = '[MY EXIT - PROCESS] Load Process List Data Success',

  LOAD_INTERVIEW_LINK_DATA = '[MY EXIT - PROCESS] Load Interview Link',
  LOAD_INTERVIEW_LINK_DATA_SUCCESS = '[MY EXIT - PROCESS] Load Interview Link Success',

  LOAD_CHECKLIST_TYPES = '[MY EXIT - PROCESS] Load Checklist Types',
  LOAD_CHECKLIST_TYPES_SUCCESS = '[MY EXIT - PROCESS] Load Checklist Types Success',

  LOAD_CHECKLIST_TRANSACTIONS = '[MY EXIT - PROCESS] Load Checklist Transactions',
  LOAD_CHECKLIST_TRANSACTIONS_SUCCESS = '[MY EXIT - PROCESS] Load Checklist Transactions Success',

  SUBMIT_CHECKLIST_TRANSACTIONS = '[MY EXIT - PROCESS] Submit Checklist Transactions',
  SUBMIT_CHECKLIST_TRANSACTIONS_SUCCESS = '[MY EXIT - PROCESS] Submit Checklist Transactions Success',
  CANCEL_MY_PROCESS = '[MY EXIT - PROCESS] Cancel Process',

  LOAD_LETTER_DOCUMENT = '[MY EXIT - PROCESS] Load Letter Document',
  LOAD_LETTER_DOCUMENT_SUCCESS = '[MY EXIT - PROCESS] Load Letter Document Success',

  SHOW_PENDING_RESPONSES_VIEWER = '[MY EXIT - PROCESS] Show Pending Responses Viewer',
  HIDE_PENDING_RESPONSES_VIEWER = '[MY EXIT - PROCESS] Hide Pending Responses Viewer Success',

  LOAD_PENDING_RESPONSES = '[MY EXIT - PROCESS] Load Pending Responses',
  LOAD_PENDING_RESPONSES_SUCCESS = '[MY EXIT - PROCESS] Load Pending Responses Success',

  LOAD_CUSTOM_FORM_DATA = '[MY EXIT - PROCESS] Load Custom Form Data',
  LOAD_CUSTOM_FORM_DATA_SUCCESS = '[MY EXIT - PROCESS] Load Custom Form Data Success',

  LOAD_EMPLOYEE_PHOTO = '[MY EXIT - PROCESS] Load Employee Photo',
  LOAD_EMPLOYEE_PHOTO_SUCCESS = '[MY EXIT - PROCESS] Load Employee Photo Success',
}


export class ProcessingProcessData implements Action {
  readonly type = ProcessActionTypes.PROCESSING;
}

export class NotProcessingProcessData implements Action {
  readonly type = ProcessActionTypes.NOT_PROCESSING;
}

export class ProcessingSaveData implements Action {
  readonly type = ProcessActionTypes.PROCESSING_SAVE;

  constructor(public payload: boolean) { }
}

export class ProcessingRedirectData implements Action {
  readonly type = ProcessActionTypes.PROCESSING_REDIRECT;

  constructor(public payload: boolean) { }
}

export class LoadExitEmployeePhoto implements Action {
  readonly type = ProcessActionTypes.LOAD_EMPLOYEE_PHOTO;

  constructor(public payload: number) { }
}

export class LoadExitEmployeePhotoSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) { }
}


export class LoadingProcessData implements Action {
  readonly type = ProcessActionTypes.LOADING;
}

export class NotLoadingProcessData implements Action {
  readonly type = ProcessActionTypes.NOT_LOADING;
}

export class LoadSubmittedLetter implements Action {
  readonly type = ProcessActionTypes.LOAD_SUBMITTED_LETTER;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadSubmittedLetterSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_SUBMITTED_LETTER_SUCCESS;

  constructor(public payload: IResignationLetter) { }
}

export class LoadProcessListData implements Action {
  readonly type = ProcessActionTypes.LOAD_PROCESS_DATA;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadProcessListDataSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_PROCESS_DATA_SUCCESS;

  constructor(public payload: IProcessStep[]) { }
}

export class LoadChecklistTypes implements Action {
  readonly type = ProcessActionTypes.LOAD_CHECKLIST_TYPES;
}

export class LoadChecklistTypesSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_CHECKLIST_TYPES_SUCCESS;

  constructor(public payload: IChecklistItem[]) { }
}

export class LoadChecklistTransactions implements Action {
  readonly type = ProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS;

  constructor(public payload: { isLM: boolean, resignationId: number, employeeId?: number }) { }
}

export class LoadChecklistTransactionsSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS_SUCCESS;

  constructor(public payload: IChecklistTransaction[]) { }
}

export class SubmitChecklistTransaction implements Action {
  readonly type = ProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS;

  constructor(public payload: { requestType: string, isLM: boolean, resignationId: number, employeeId: number, data: IResponseBody[]}) { }
}

export class SubmitChecklistTransactionSuccess implements Action {
  readonly type = ProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS_SUCCESS;

  constructor(public payload: boolean) { }
}

export class LoadInterviewLink implements Action {
  readonly type = ProcessActionTypes.LOAD_INTERVIEW_LINK_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class LoadInterviewLinkSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_INTERVIEW_LINK_DATA_SUCCESS;

  constructor(public payload: any) { }
}

export class CancelMyProcess implements Action {
  readonly type = ProcessActionTypes.CANCEL_MY_PROCESS;
}

export class LoadLetterDocument implements Action {
  readonly type = ProcessActionTypes.LOAD_LETTER_DOCUMENT;
}

export class LoadLetterDocumentSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_LETTER_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class ShowPendingResponsesViewer implements Action {
  readonly type = ProcessActionTypes.SHOW_PENDING_RESPONSES_VIEWER;
}

export class HidePendingResponsesViewer implements Action {
  readonly type = ProcessActionTypes.HIDE_PENDING_RESPONSES_VIEWER;
}

export class LoadPendingResponses implements Action {
  readonly type = ProcessActionTypes.LOAD_PENDING_RESPONSES;

  constructor(public payload: {resignationId: number}) { }
}

export class LoadPendingResponsesSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_PENDING_RESPONSES_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadCustomFormData implements Action {
  readonly type = ProcessActionTypes.LOAD_CUSTOM_FORM_DATA;
  constructor(public payload: { transactionId: number }) { }
}

export class LoadCustomFormDataSuccess implements Action {
  readonly type = ProcessActionTypes.LOAD_CUSTOM_FORM_DATA_SUCCESS;
  constructor(public payload: ICustomDataForm) { }
}


export type ProcessActions =

  | ProcessingProcessData
  | NotProcessingProcessData
  | ProcessingSaveData
  | ProcessingRedirectData
  | LoadingProcessData
  | NotLoadingProcessData
  | LoadSubmittedLetter
  | LoadSubmittedLetterSuccess
  | LoadProcessListData
  | LoadProcessListDataSuccess
  | LoadInterviewLink
  | LoadInterviewLinkSuccess
  | LoadChecklistTypes
  | LoadChecklistTypesSuccess
  | LoadLetterDocument
  | LoadLetterDocumentSuccess
  | LoadChecklistTransactions
  | LoadChecklistTransactionsSuccess
  | ShowPendingResponsesViewer
  | HidePendingResponsesViewer
  | LoadPendingResponses
  | LoadPendingResponsesSuccess
  | LoadCustomFormData
  | LoadCustomFormDataSuccess
  | LoadExitEmployeePhoto
  | LoadExitEmployeePhotoSuccess
  | CancelMyProcess
  | SubmitChecklistTransaction
  | SubmitChecklistTransactionSuccess;
