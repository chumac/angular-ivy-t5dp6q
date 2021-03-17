import { Action } from '@ngrx/store';
import { IObjectiveDto, IPlan } from '@nutela/models/talent/performance';

export enum MultiEmployeeLoadObjectivesActionTypes {
  SHOW_EDITOR = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Hide Viewer',

  VALIDATING = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Validating',
  NOT_VALIDATING = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Not Validating',

  IMPORTING = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Importing',
  NOT_IMPORTING = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Not Importing',

  UPLOAD_EVENT = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Upload Event',
  VALIDATE_EVENT = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Validate Event',
  IMPORT_EVENT = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Import Event',
  RESET_EVENT = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Reset Event',

  PROCESSING = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Not Processing',

  PROCESSING_DATA_GRID = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Not Processing Data Grid',

  OBJECTIVE_EXISTS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Objective Exists',
  OBJECTIVE_EXISTS_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Objective Exists Success',
  OBJECTIVE_EXISTS_FAILURE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Objective Exists Failure',

  LOAD_PLAN_LIST = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Load Plan List Success',

  MULTI_EMPLOYEE_LOAD_OBJECTIVE_DATA = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Load Objective Data',
  MULTI_EMPLOYEE_LOAD_OBJECTIVE_DATA_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Load Objective Data Success',

  SAVE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Save',
  SAVE_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Save Success',
  SAVE_FAILURE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Save Failure',

  UPLOAD = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Upload',
  UPLOAD_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Upload Success',
  UPLOAD_FAILURE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Upload Failure',

  VALIDATE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Validate',
  VALIDATE_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Validate Success',
  VALIDATE_FAILURE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Validate Failure',

  DELETE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Delete',

  RESET = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Reset',
  RESET_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Reset Success',
  RESET_FAILURE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Reset Failure',

  IMPORT = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Import',
  IMPORT_SUCCESS = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Import Success',
  IMPORT_FAILURE = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Import Failure',

  HAS_ISSUES = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Has Isues',

  RESET_COMPONENT = '[PERFORMANCE MULTI EMPLOYEE LOAD OBJECTIVES] Reset Component',

}

export class ShowEditorMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.SHOW_EDITOR;
}

export class HideEditorMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.HIDE_EDITOR;
}

export class ShowViewerMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.SHOW_VIEWER;
}

export class HideViewerMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.HIDE_VIEWER;
}


export class ProcessingMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.PROCESSING;
}

export class NotProcessingMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.NOT_PROCESSING;
}

export class ProcessingDataGridMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.NOT_PROCESSING_DATA_GRID;
}


export class MultiEmployeeObjectiveExists implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.OBJECTIVE_EXISTS;
  constructor(public payload: Number ) {}
}

export class MultiEmployeeObjectiveExistsSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.OBJECTIVE_EXISTS_SUCCESS;
  constructor(public payload: boolean) {}
}

export class MultiEmployeeObjectiveExistsFailure implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.OBJECTIVE_EXISTS_FAILURE;
  constructor(public error: any) {}
}


export class SaveMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.SAVE;
  constructor(public payload: { objectiveData: IObjectiveDto }) {}
}

export class SaveMultiEmployeeLoadObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.SAVE_SUCCESS;
}

export class SaveMultiEmployeeLoadObjectivesFailure implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.MULTI_EMPLOYEE_LOAD_OBJECTIVE_DATA;

  constructor(public payload: {planID: number, eventID: number}) {}
}

export class MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.MULTI_EMPLOYEE_LOAD_OBJECTIVE_DATA_SUCCESS;

  constructor(public payload: IObjectiveDto[]) {}
}

export class LoadPlanlistMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanlistMultiEmployeeLoadObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class UploadMultiEmployeeObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.UPLOAD;
  constructor(public payload: { objectiveData: IObjectiveDto[], planID: number, filename: string }) {}
}

export class UploadMultiEmployeeObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.UPLOAD_SUCCESS;
}

export class UploadMultiEmployeeObjectivesFailure implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.UPLOAD_FAILURE;

  constructor(public error: any) {}
}

export class ValidateMultiEmployeeObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.VALIDATE;
  constructor(public payload: { planId: number }) {}
}

export class ValidateMultiEmployeeObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.VALIDATE_SUCCESS;
}

export class ValidateMultiEmployeeObjectivesFailure implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.VALIDATE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteObjectiveDataMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.DELETE;

  constructor(public payload: {recordId: number, planID: number}) {}
}

export class ResetObjectiveDataMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.RESET;

  constructor(public payload: {planID: number}) {}
}

export class ResetObjectiveDataMultiEmployeeLoadObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.RESET_SUCCESS;
}

export class ResetObjectiveDataMultiEmployeeLoadObjectivesFailure implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.RESET_FAILURE;
  constructor(public error: any) {}
}

export class ImportMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.IMPORT;
  constructor(public payload: { planID: number }) {}
}

export class ImportMultiEmployeeLoadObjectivesSuccess implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.IMPORT_SUCCESS;
}

export class ImportMultiEmployeeLoadObjectivesFailure implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.IMPORT_FAILURE;

  constructor(public error: any) {}
}

export class ResetComponentMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.RESET_COMPONENT;
}

export class ImportingMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.IMPORTING;
}

export class NotImportingMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.NOT_IMPORTING;
}


export class ValidatingMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.VALIDATING;
}

export class NotValidatingMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.NOT_VALIDATING;
}

export class UploadEventMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.UPLOAD_EVENT;
}
export class ValidateEventMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.VALIDATE_EVENT;
}

export class ImportEventMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.IMPORT_EVENT;
}

export class ResetEventMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.RESET_EVENT;
}

export class HasIssuesMultiEmployeeLoadObjectives implements Action {
  readonly type = MultiEmployeeLoadObjectivesActionTypes.HAS_ISSUES;
  constructor(public payload: boolean) {}
}



export type MultiEmployeeLoadObjectivesActions =
  | ShowEditorMultiEmployeeLoadObjectives
  | HideEditorMultiEmployeeLoadObjectives
  | ShowViewerMultiEmployeeLoadObjectives
  | HideViewerMultiEmployeeLoadObjectives
  | ProcessingMultiEmployeeLoadObjectives
  | NotProcessingMultiEmployeeLoadObjectives
  | ProcessingDataGridMultiEmployeeLoadObjectives
  | NotProcessingDataGridMultiEmployeeLoadObjectives
  | SaveMultiEmployeeLoadObjectives
  | SaveMultiEmployeeLoadObjectivesSuccess
  | SaveMultiEmployeeLoadObjectivesFailure
  | MultiEmployeeObjectiveExists
  | MultiEmployeeObjectiveExistsSuccess
  | MultiEmployeeObjectiveExistsFailure
  | LoadPlanlistMultiEmployeeLoadObjectives
  | LoadPlanlistMultiEmployeeLoadObjectivesSuccess
  | MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives
  | MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectivesSuccess
  | UploadMultiEmployeeObjectives
  | UploadMultiEmployeeObjectivesSuccess
  | UploadMultiEmployeeObjectivesFailure
  | ValidateMultiEmployeeObjectives
  | ValidateMultiEmployeeObjectivesSuccess
  | ValidateMultiEmployeeObjectivesFailure
  | DeleteObjectiveDataMultiEmployeeLoadObjectives
  | ResetObjectiveDataMultiEmployeeLoadObjectives
  | ResetObjectiveDataMultiEmployeeLoadObjectivesSuccess
  | ResetObjectiveDataMultiEmployeeLoadObjectivesFailure
  | ImportMultiEmployeeLoadObjectives
  | ImportMultiEmployeeLoadObjectivesSuccess
  | ImportMultiEmployeeLoadObjectivesFailure
  | ResetComponentMultiEmployeeLoadObjectives
  | ImportingMultiEmployeeLoadObjectives
  | NotImportingMultiEmployeeLoadObjectives
  | ValidatingMultiEmployeeLoadObjectives
  | NotValidatingMultiEmployeeLoadObjectives
  | UploadEventMultiEmployeeLoadObjectives
  | ValidateEventMultiEmployeeLoadObjectives
  | ImportEventMultiEmployeeLoadObjectives
  | ResetEventMultiEmployeeLoadObjectives
  | HasIssuesMultiEmployeeLoadObjectives;
