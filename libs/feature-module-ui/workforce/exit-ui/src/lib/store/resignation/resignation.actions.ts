import { Action } from '@ngrx/store';
import {
  IResignationSubmitted,
  IResponse,
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter } from '../../interfaces';
import { IEmployee } from '@nutela/models/compensation/loans';

export enum ResignationActionTypes {

  SHOW_VALIDATE_EDITOR = '[MY EXIT - RESIGNATION] Show Validate Editor',
  HIDE_VALIDATE_EDITOR = '[MY EXIT - RESIGNATION] Hide Validate Editor',

  SHOW_EDITOR = '[MY EXIT - RESIGNATION] Show Editor',
  HIDE_EDITOR = '[MY EXIT - RESIGNATION] Hide Editor',

  SHOW_RESPONSE_VIEWER = '[MY EXIT - RESIGNATION] Show Response Viewer',
  HIDE_RESPONSE_VIEWER = '[MY EXIT - RESIGNATION] Hide Response Viewer',

  LOADING = '[MY EXIT - RESIGNATION] Loading',
  NOT_LOADING = '[MY EXIT - RESIGNATION] Not Loading',

  PROCESSING = '[MY EXIT - RESIGNATION] Processing',
  NOT_PROCESSING = '[MY EXIT - RESIGNATION] Not Processing',

  LOAD_RESIGNATION_TYPES_SELECT_OPTION = '[MY EXIT - RESIGNATION] Load Resignation Types Select Option',
  LOAD_RESIGNATION_TYPES_SELECT_OPTION_SUCCESS = '[MY EXIT - RESIGNATION] Load Resignation Types Select Option Success',

  LOAD_SUBMITTED_RESIGNATIONS_DATA = '[MY EXIT - RESIGNATION] Load Submitted Resignations',
  LOAD_SUBMITTED_RESIGNATIONS_DATA_SUCCESS = '[MY EXIT - RESIGNATION] Load Submitted Resignations Success',

  LOAD_PROXY_RESIGNATIONS_DATA = '[MY EXIT - RESIGNATION] Load Proxy Resignations',
  LOAD_PROXY_RESIGNATIONS_DATA_SUCCESS = '[MY EXIT - RESIGNATION] Load Proxy Resignations Success',

  LOAD_RESPONSES_DATA = '[MY EXIT - RESIGNATION] Load Review Checklist Data',
  LOAD_RESPONSES_DATA_SUCCESS = '[MY EXIT - RESIGNATION] Load Review Checklist Data Success',

  LOAD_MY_SUBORDINATES = '[MY EXIT - RESIGNATION] Load Employee Subordinates',
  LOAD_MY_SUBORDINATES_SUCCESS = '[MY EXIT - RESIGNATION] Load Employee Subordinates Success',

  LOAD_EMPLOYEE_PROCESS_INITIATION_STATUS = '[MY EXIT - RESIGNATION] Load Employee Process Initiation Status',
  LOAD_EMPLOYEE_PROCESS_INITIATION_STATUS_SUCCESS = '[MY EXIT - RESIGNATION] Load Employee Process Initiation Status Success',

  LOAD_WORKFLOW_DATA = '[MY EXIT - RESIGNATION] Load Workflow Data',
  LOAD_WORKFLOW_DATA_SUCCESS = '[MY EXIT - RESIGNATION] Load Workflow Data Success',

  LOAD_DOCUMENT = '[MY EXIT - RESIGNATION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY EXIT - RESIGNATION] Load Document Success',

  SAVE = '[MY EXIT - RESIGNATION] Save',
  SAVE_SUCCESS = '[MY EXIT - RESIGNATION] Save Success',
  SAVE_FAILURE = '[MY EXIT - RESIGNATION] Save Failure',

  LOAD_EXIT_INITIATION_STATUS = '[MY EXIT - RESIGNATION] Load Exit Initiation Status',
  LOAD_EXIT_INITIATION_STATUS_SUCCESS = '[MY EXIT - RESIGNATION] Load Exit Initiation Status Success',

  LOAD_NUMBER_OF_RESPONSE_NOTIFICATIONS = '[MY EXIT - RESIGNATION] Load Number Of Response Notifications',

  START_INTERVIEW = '[MY EXIT - RESIGNATION] Start Interview',
  START_INTERVIEW_SUCCESS = '[MY EXIT - RESIGNATION] Start Interview Success',
}


export class ShowLetterEditor implements Action {
  readonly type = ResignationActionTypes.SHOW_EDITOR;
}

export class HideLetterEditor implements Action {
  readonly type = ResignationActionTypes.HIDE_EDITOR;
}

export class ShowValidateEditor implements Action {
  readonly type = ResignationActionTypes.SHOW_VALIDATE_EDITOR;
}

export class HideValidateEditor implements Action {
  readonly type = ResignationActionTypes.HIDE_VALIDATE_EDITOR;
}

export class ShowResponseViewerResignation implements Action {
  readonly type = ResignationActionTypes.SHOW_RESPONSE_VIEWER;
}

export class HideResponseViewerResignation implements Action {
  readonly type = ResignationActionTypes.HIDE_RESPONSE_VIEWER;
}

export class ProcessingResignation implements Action {
  readonly type = ResignationActionTypes.PROCESSING;
}

export class NotProcessingResignation implements Action {
  readonly type = ResignationActionTypes.NOT_PROCESSING;
}

export class LoadingResignation implements Action {
  readonly type = ResignationActionTypes.LOADING;
}

export class NotLoadingResignation implements Action {
  readonly type = ResignationActionTypes.NOT_LOADING;
}

export class LoadDataSubmittedResignation implements Action {
  readonly type = ResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA;
}

export class LoadDataSubmittedResignationSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA_SUCCESS;

  constructor(public payload: IResignationSubmitted[]) { }
}

export class LoadDataProxyResignations implements Action {
  readonly type = ResignationActionTypes.LOAD_PROXY_RESIGNATIONS_DATA;
}

export class LoadDataProxyResignationsSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_PROXY_RESIGNATIONS_DATA_SUCCESS;

  constructor(public payload: IResignationSubmitted[]) { }
}

export class LoadResignationTypesSelectOption implements Action {
  readonly type = ResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION;
}

export class LoadResignationTypesSelectOptionSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadMySubordinates implements Action {
  readonly type = ResignationActionTypes.LOAD_MY_SUBORDINATES;
}

export class LoadMySubordinatesSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_MY_SUBORDINATES_SUCCESS;

  constructor(public payload: IEmployee[]) { }
}

export class LoadEmployeeExitProcessInitiationStatus implements Action {
  readonly type = ResignationActionTypes.LOAD_EMPLOYEE_PROCESS_INITIATION_STATUS;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadEmployeeExitProcessInitiationStatusSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_EMPLOYEE_PROCESS_INITIATION_STATUS_SUCCESS;

  constructor(public payload: boolean) { }
}

export class LoadDataResponsesResignation implements Action {
  readonly type = ResignationActionTypes.LOAD_RESPONSES_DATA;

  constructor(public payload: { letterId: number }) { }
}

export class LoadDataResponsesResignationSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_RESPONSES_DATA_SUCCESS;

  constructor(public payload: IResponse[]) { }
}

export class LoadWorkflowDefinition implements Action {
  readonly type = ResignationActionTypes.LOAD_WORKFLOW_DATA;
}

export class LoadWorkflowDefinitionSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_WORKFLOW_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadDocumentResign implements Action {
  readonly type = ResignationActionTypes.LOAD_DOCUMENT;
}

export class LoadDocumentResignSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class SubmitResignationLetter implements Action {
  readonly type = ResignationActionTypes.SAVE;

  constructor(public payload: { employeeId?: number, data: IResignationLetter }) { }
}

export class SubmitResignationLetterSuccess implements Action {
  readonly type = ResignationActionTypes.SAVE_SUCCESS;
}

export class SubmitResignationLetterFailure implements Action {
  readonly type = ResignationActionTypes.SAVE_FAILURE;
}

export class LoadExitInitiationStatus implements Action {
  readonly type = ResignationActionTypes.LOAD_EXIT_INITIATION_STATUS;
}

export class LoadExitInitiationStatusSuccess implements Action {
  readonly type = ResignationActionTypes.LOAD_EXIT_INITIATION_STATUS_SUCCESS;

  constructor(public payload: boolean) { }
}

export class LoadNumberofResponseNotifications implements Action {
  readonly type = ResignationActionTypes.LOAD_NUMBER_OF_RESPONSE_NOTIFICATIONS;
  constructor(public payload: number) { }
}

export class StartInterview implements Action {
  readonly type = ResignationActionTypes.START_INTERVIEW;
  constructor(public payload: {resignationId: number}) { }
}

export class StartInterviewSuccess implements Action {
  readonly type = ResignationActionTypes.START_INTERVIEW_SUCCESS;
  constructor(public payload: boolean) { }
}

export type ResignationActions =

  | ShowValidateEditor
  | HideValidateEditor
  | ShowLetterEditor
  | HideLetterEditor
  | ShowResponseViewerResignation
  | HideResponseViewerResignation
  | ProcessingResignation
  | NotProcessingResignation
  | LoadingResignation
  | NotLoadingResignation
  | LoadMySubordinates
  | LoadMySubordinatesSuccess
  | LoadEmployeeExitProcessInitiationStatus
  | LoadEmployeeExitProcessInitiationStatusSuccess
  | LoadDataSubmittedResignation
  | LoadDataSubmittedResignationSuccess
  | LoadDataProxyResignations
  | LoadDataProxyResignationsSuccess
  | LoadWorkflowDefinition
  | LoadWorkflowDefinitionSuccess
  | LoadDataResponsesResignation
  | LoadDataResponsesResignationSuccess
  | LoadDocumentResign
  | LoadDocumentResignSuccess
  | LoadResignationTypesSelectOption
  | LoadResignationTypesSelectOptionSuccess
  | SubmitResignationLetter
  | SubmitResignationLetterSuccess
  | SubmitResignationLetterFailure
  | StartInterview
  | StartInterviewSuccess
  | LoadExitInitiationStatus
  | LoadExitInitiationStatusSuccess
  | LoadNumberofResponseNotifications;
