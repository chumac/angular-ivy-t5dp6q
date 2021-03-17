import { Action } from '@ngrx/store';
import { IObjectiveDto, IPlan } from '@nutela/models/talent/performance';

export enum LoadObjectivesActionTypes {
  SHOW_EDITOR = '[PERFORMANCE LOAD OBJECTIVES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE LOAD OBJECTIVES] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE LOAD OBJECTIVES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE LOAD OBJECTIVES] Hide Viewer',

  VALIDATING = '[PERFORMANCE LOAD OBJECTIVES] Validating',
  NOT_VALIDATING = '[PERFORMANCE LOAD OBJECTIVES] Not Validating',

  IMPORTING = '[PERFORMANCE LOAD OBJECTIVES] Importing',
  NOT_IMPORTING = '[PERFORMANCE LOAD OBJECTIVES] Not Importing',

  UPLOAD_EVENT = '[PERFORMANCE LOAD OBJECTIVES] Upload Event',
  VALIDATE_EVENT = '[PERFORMANCE LOAD OBJECTIVES] Validate Event',
  IMPORT_EVENT = '[PERFORMANCE LOAD OBJECTIVES] Import Event',
  RESET_EVENT = '[PERFORMANCE LOAD OBJECTIVES] Reset Event',

  PROCESSING = '[PERFORMANCE LOAD OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE LOAD OBJECTIVES] Not Processing',

  PROCESSING_DATA_GRID = '[PERFORMANCE LOAD OBJECTIVES] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[PERFORMANCE LOAD OBJECTIVES] Not Processing Data Grid',

  OBJECTIVE_EXISTS = '[PERFORMANCE LOAD OBJECTIVES] Objective Exists',
  OBJECTIVE_EXISTS_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Objective Exists Success',
  OBJECTIVE_EXISTS_FAILURE = '[PERFORMANCE LOAD OBJECTIVES] Objective Exists Failure',

  LOAD_PLAN_LIST = '[PERFORMANCE LOAD OBJECTIVES] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Load Plan List Success',

  LOAD_OBJECTIVE_DATA = '[PERFORMANCE LOAD OBJECTIVES] Load Objective Data',
  LOAD_OBJECTIVE_DATA_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Load Objective Data Success',

  SAVE = '[PERFORMANCE LOAD OBJECTIVES] Save',
  SAVE_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Save Success',
  SAVE_FAILURE = '[PERFORMANCE LOAD OBJECTIVES] Save Failure',

  UPLOAD = '[PERFORMANCE LOAD OBJECTIVES] Upload',
  UPLOAD_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Upload Success',
  UPLOAD_FAILURE = '[PERFORMANCE LOAD OBJECTIVES] Upload Failure',

  VALIDATE = '[PERFORMANCE LOAD OBJECTIVES] Validate',
  VALIDATE_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Validate Success',
  VALIDATE_FAILURE = '[PERFORMANCE LOAD OBJECTIVES] Validate Failure',

  DELETE = '[PERFORMANCE LOAD OBJECTIVES] Delete',

  RESET = '[PERFORMANCE LOAD OBJECTIVES] Reset',
  RESET_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Reset Success',
  RESET_FAILURE = '[PERFORMANCE LOAD OBJECTIVES] Reset Failure',

  IMPORT = '[PERFORMANCE LOAD OBJECTIVES] Import',
  IMPORT_SUCCESS = '[PERFORMANCE LOAD OBJECTIVES] Import Success',
  IMPORT_FAILURE = '[PERFORMANCE LOAD OBJECTIVES] Import Failure',

  HAS_ISSUES = '[PERFORMANCE LOAD OBJECTIVES] Has Isues',

  RESET_COMPONENT = '[PERFORMANCE LOAD OBJECTIVES] Reset Component',

}

export class ShowEditorLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.SHOW_EDITOR;
}

export class HideEditorLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.HIDE_EDITOR;
}

export class ShowViewerLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.SHOW_VIEWER;
}

export class HideViewerLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.HIDE_VIEWER;
}


export class ProcessingLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.PROCESSING;
}

export class NotProcessingLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.NOT_PROCESSING;
}

export class ProcessingDataGridLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.NOT_PROCESSING_DATA_GRID;
}


export class ObjectiveExists implements Action {
  readonly type = LoadObjectivesActionTypes.OBJECTIVE_EXISTS;
  constructor(public payload: Number ) {}
}

export class ObjectiveExistsSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.OBJECTIVE_EXISTS_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ObjectiveExistsFailure implements Action {
  readonly type = LoadObjectivesActionTypes.OBJECTIVE_EXISTS_FAILURE;
  constructor(public error: any) {}
}


export class SaveLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.SAVE;
  constructor(public payload: { objectiveData: IObjectiveDto }) {}
}

export class SaveLoadObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.SAVE_SUCCESS;
}

export class SaveLoadObjectivesFailure implements Action {
  readonly type = LoadObjectivesActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class LoadObjectiveDataLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.LOAD_OBJECTIVE_DATA;

  constructor(public payload: {planID: number, eventID: number}) {}
}

export class LoadObjectiveDataLoadObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.LOAD_OBJECTIVE_DATA_SUCCESS;

  constructor(public payload: IObjectiveDto[]) {}
}

export class LoadPlanlistLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanlistLoadObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class UploadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.UPLOAD;
  constructor(public payload: { objectiveData: IObjectiveDto[], planID: number, filename: string }) {}
}

export class UploadObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.UPLOAD_SUCCESS;
}

export class UploadObjectivesFailure implements Action {
  readonly type = LoadObjectivesActionTypes.UPLOAD_FAILURE;

  constructor(public error: any) {}
}

export class ValidateObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.VALIDATE;
  constructor(public payload: { planId: number }) {}
}

export class ValidateObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.VALIDATE_SUCCESS;
}

export class ValidateObjectivesFailure implements Action {
  readonly type = LoadObjectivesActionTypes.VALIDATE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteObjectiveDataLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.DELETE;

  constructor(public payload: {recordId: number, planID: number}) {}
}

export class ResetObjectiveDataLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.RESET;

  constructor(public payload: {planID: number}) {}
}

export class ResetObjectiveDataLoadObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.RESET_SUCCESS;
}

export class ResetObjectiveDataLoadObjectivesFailure implements Action {
  readonly type = LoadObjectivesActionTypes.RESET_FAILURE;
  constructor(public error: any) {}
}

export class ImportLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.IMPORT;
  constructor(public payload: { planID: number }) {}
}

export class ImportLoadObjectivesSuccess implements Action {
  readonly type = LoadObjectivesActionTypes.IMPORT_SUCCESS;
}

export class ImportLoadObjectivesFailure implements Action {
  readonly type = LoadObjectivesActionTypes.IMPORT_FAILURE;

  constructor(public error: any) {}
}

export class ResetComponentLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.RESET_COMPONENT;
}

export class ImportingLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.IMPORTING;
}

export class NotImportingLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.NOT_IMPORTING;
}


export class ValidatingLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.VALIDATING;
}

export class NotValidatingLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.NOT_VALIDATING;
}

export class UploadEventLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.UPLOAD_EVENT;
}
export class ValidateEventLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.VALIDATE_EVENT;
}

export class ImportEventLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.IMPORT_EVENT;
}

export class ResetEventLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.RESET_EVENT;
}

export class HasIssuesLoadObjectives implements Action {
  readonly type = LoadObjectivesActionTypes.HAS_ISSUES;
  constructor(public payload: boolean) {}
}



export type LoadObjectivesActions =
  | ShowEditorLoadObjectives
  | HideEditorLoadObjectives
  | ShowViewerLoadObjectives
  | HideViewerLoadObjectives
  | ProcessingLoadObjectives
  | NotProcessingLoadObjectives
  | ProcessingDataGridLoadObjectives
  | NotProcessingDataGridLoadObjectives
  | SaveLoadObjectives
  | SaveLoadObjectivesSuccess
  | SaveLoadObjectivesFailure
  | ObjectiveExists
  | ObjectiveExistsSuccess
  | ObjectiveExistsFailure
  | LoadPlanlistLoadObjectives
  | LoadPlanlistLoadObjectivesSuccess
  | LoadObjectiveDataLoadObjectives
  | LoadObjectiveDataLoadObjectivesSuccess
  | UploadObjectives
  | UploadObjectivesSuccess
  | UploadObjectivesFailure
  | ValidateObjectives
  | ValidateObjectivesSuccess
  | ValidateObjectivesFailure
  | DeleteObjectiveDataLoadObjectives
  | ResetObjectiveDataLoadObjectives
  | ResetObjectiveDataLoadObjectivesSuccess
  | ResetObjectiveDataLoadObjectivesFailure
  | ImportLoadObjectives
  | ImportLoadObjectivesSuccess
  | ImportLoadObjectivesFailure
  | ResetComponentLoadObjectives
  | ImportingLoadObjectives
  | NotImportingLoadObjectives
  | ValidatingLoadObjectives
  | NotValidatingLoadObjectives
  | UploadEventLoadObjectives
  | ValidateEventLoadObjectives
  | ImportEventLoadObjectives
  | ResetEventLoadObjectives
  | HasIssuesLoadObjectives;
