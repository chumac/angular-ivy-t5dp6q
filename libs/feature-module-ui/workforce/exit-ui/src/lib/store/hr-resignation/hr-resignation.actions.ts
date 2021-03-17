import { Action } from '@ngrx/store';
import {
  IResignationSubmitted,
  IResponse,
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter } from '../../interfaces';

export enum HrResignationActionTypes {

  LOADING = '[HR EXIT - RESIGNATION] Loading',
  NOT_LOADING = '[HR EXIT - RESIGNATION] Not Loading',

  PROCESSING = '[HR EXIT - RESIGNATION] Processing',
  NOT_PROCESSING = '[HR EXIT - RESIGNATION] Not Processing',

  SHOW_EDITOR = '[HR EXIT - RESIGNATION] Show Editor',
  HIDE_EDITOR = '[HR EXIT - RESIGNATION] Hide Editor',

  LOAD_RESIGNATION_TYPES_SELECT_OPTION = '[HR EXIT - RESIGNATION] Load Resignation Types Select Option',
  LOAD_RESIGNATION_TYPES_SELECT_OPTION_SUCCESS = '[HR EXIT - RESIGNATION] Load Resignation Types Select Option Success',

  LOAD_SUBMITTED_RESIGNATIONS_DATA = '[HR EXIT - RESIGNATION] Load Submitted Resignation',
  LOAD_SUBMITTED_RESIGNATIONS_DATA_SUCCESS = '[HR EXIT - RESIGNATION] Load Submitted Resignation Success',

  LOAD_DOCUMENT = '[HR EXIT - RESIGNATION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR EXIT - RESIGNATION] Load Document Success',

  LOAD_HR_RESPONSE_QUEUE = '[HR EXIT - RESIGNATION] Load HR Response Queue',
  LOAD_HR_RESPONSE_QUEUE_SUCCESS = '[HR EXIT - RESIGNATION] Load HR Response Queue Success',

  CLOSE_ALL_CHECKLISTS = '[HR EXIT - RESIGNATION] Close All Checklists',

  SAVE = '[HR EXIT - RESIGNATION] Save',
  SAVE_SUCCESS = '[HR EXIT - RESIGNATION] Save Success',
  SAVE_FAILURE = '[HR EXIT - RESIGNATION] Save Failure',

  LOAD_REPORT_URL = '[EMPLOYEE EXIT - RESIGNATION] Load Report URL Data',
  LOAD_REPORT_URL_SUCCESS = '[EMPLOYEE EXIT - RESIGNATION] Load Report URL Data Success',
}

export class ProcessingResignation implements Action {
  readonly type = HrResignationActionTypes.PROCESSING;
}

export class NotProcessingResignation implements Action {
  readonly type = HrResignationActionTypes.NOT_PROCESSING;
}

export class LoadingResignation implements Action {
  readonly type = HrResignationActionTypes.LOADING;
}

export class NotLoadingResignation implements Action {
  readonly type = HrResignationActionTypes.NOT_LOADING;
}

export class ShowResignationEditor implements Action {
  readonly type = HrResignationActionTypes.SHOW_EDITOR;
}

export class HideResignationEditor implements Action {
  readonly type = HrResignationActionTypes.HIDE_EDITOR;
}

export class LoadDataSubmittedLetters implements Action {
  readonly type = HrResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA;
}

export class LoadDataSubmittedLettersSuccess implements Action {
  readonly type = HrResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA_SUCCESS;

  constructor(public payload: IResignationSubmitted[]) { }
}

export class LoadResignationTypesSelectOption implements Action {
  readonly type = HrResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION;
}

export class LoadResignationTypesSelectOptionSuccess implements Action {
  readonly type = HrResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadLetterDocument implements Action {
  readonly type = HrResignationActionTypes.LOAD_DOCUMENT;

  constructor(public payload: { recordId: number }) { }
}

export class LoadLetterDocumentSuccess implements Action {
  readonly type = HrResignationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadHrResponseQueue implements Action {
  readonly type = HrResignationActionTypes.LOAD_HR_RESPONSE_QUEUE;

  constructor(public payload: { recordId: number }) { }
}

export class LoadHrResponseQueueSuccess implements Action {
  readonly type = HrResignationActionTypes.LOAD_HR_RESPONSE_QUEUE_SUCCESS;

  constructor(public payload: any) { }
}

export class CloseAllChecklists implements Action {
  readonly type = HrResignationActionTypes.CLOSE_ALL_CHECKLISTS;

  constructor(public payload: {employeeId: number, resignationId: number}) { }
}

export class SubmitEmployeeResignationLetter implements Action {
  readonly type = HrResignationActionTypes.SAVE;

  constructor(public payload: { data: IResignationLetter }) { }
}

export class LoadResignationReportUrl implements Action {
  readonly type = HrResignationActionTypes.LOAD_REPORT_URL;

  constructor(public payload: { resignationId: number }) { }
}

export class LoadResignationReportUrlSuccess implements Action {
  readonly type = HrResignationActionTypes.LOAD_REPORT_URL_SUCCESS;

  constructor(public payload: IResignationSubmitted[]) { }
}

export type HrResignationActions =

  | ProcessingResignation
  | NotProcessingResignation
  | LoadingResignation
  | NotLoadingResignation
  | ShowResignationEditor
  | HideResignationEditor
  | LoadDataSubmittedLetters
  | LoadDataSubmittedLettersSuccess
  | LoadLetterDocument
  | LoadLetterDocumentSuccess
  | LoadHrResponseQueue
  | LoadHrResponseQueueSuccess
  | LoadResignationTypesSelectOption
  | CloseAllChecklists
  | SubmitEmployeeResignationLetter
  | LoadResignationReportUrl
  | LoadResignationReportUrlSuccess
  | LoadResignationTypesSelectOptionSuccess;
