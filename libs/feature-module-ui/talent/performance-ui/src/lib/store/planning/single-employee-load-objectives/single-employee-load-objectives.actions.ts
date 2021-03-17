import { Action } from '@ngrx/store';
import { IObjectiveDto, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum LoadSingleEmployeeObjectivesActionTypes {

  LOAD_PLAN_LIST = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Load Plan List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Load Employee List Success',

  UPLOAD = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Upload Single Employee',
  UPLOAD_SUCCESS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Upload Single Employee Success',
  UPLOAD_FAILURE = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Upload Single Employee Failure',

  LOAD_SINGLE_EMPLOYEE_OBJECTIVE_DATA = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Load Objective Data',
  LOAD_SINGLE_EMPLOYEE_OBJECTIVE_DATA_SUCCESS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Load Objective Data Success',

  SINGLE_EMPLOYEE_OBJECTIVE_EXISTS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Single Employees Objective Exists',
  SINGLE_EMPLOYEE_OBJECTIVE_EXISTS_SUCCESS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Single Employees Objective Exists Success',
  SINGLE_EMPLOYEE_OBJECTIVE_EXISTS_FAILURE = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Single Employees Objective Exists Failure',

  SHOW_SINGLE_EMPLOYEE_EDITOR = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Show Single employee Editor',
  HIDE_SINGLE_EMPLOYEE_EDITOR = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Hide Single employee Editor',

  SHOW_SINGLE_EMPLOYEE_VIEWER = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Show Single employee Viewer',
  HIDE_SINGLE_EMPLOYEE_VIEWER = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Hide Single employee Viewer',

  VALIDATING = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Validating',
  NOT_VALIDATING = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Not Validating',

  IMPORTING = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Importing',
  NOT_IMPORTING = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Not Importing',

  PROCESSING = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Not Processing',

  PROCESSING_DATA_GRID = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Not Processing Data Grid',

  SAVE = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Save',
  SAVE_SUCCESS = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Save Success',
  SAVE_FAILURE = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Save Failure',

  DELETE = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Delete',

  RESET = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Reset',

  IMPORT = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Import',

  VALIDATE = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Validate',

  RESET_COMPONENT = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Reset Component',

  TRIGGER_OBJECTIVE_EXIST_BTN_ACTION = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Objective Exists Btn Action',
  TRIGGER_OBJECTIVE_NON_EXIST_BTN_ACTION = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Objective Non Exists Btn Action',
  TRIGGER_OBJECTIVE_VALID_BTN_ACTION = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Validated Objectives Btn Action',
  TRIGGER_OBJECTIVE_RESET_BTN_ACTION = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Reset Objectives Btn Action',
  TRIGGER_OBJECTIVE_IMPORT_BTN_ACTION = '[PERFORMANCE SINGLE EMPLOYEE LOAD OBJECTIVES] Import Objectives Btn Action',


}


export class LoadSingleEmployeeObjectiveData implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.LOAD_SINGLE_EMPLOYEE_OBJECTIVE_DATA;

  constructor(public payload: { planID: number, employeeID: number}) {}
}

export class LoadSingleEmployeeObjectiveDataSuccess implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.LOAD_SINGLE_EMPLOYEE_OBJECTIVE_DATA_SUCCESS;

  constructor(public payload: IObjectiveDto[]) {}
}

export class LoadSingleEmployeePlanlist implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.LOAD_PLAN_LIST;
}

export class LoadSingleEmployeePlanlistSuccess implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class LoadSingleLoadEmployeelist implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadSingleLoadEmployeelistSuccess implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export class UploadSingleEmployeeObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.UPLOAD;
  constructor(public payload: { objectiveData: IObjectiveDto[], planID: number, employeeID: number, filename: string }) {}
}

export class UploadSingleEmployeeObjectivesSuccess implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.UPLOAD_SUCCESS;
}

export class UploadSingleEmployeeObjectivesFailure implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.UPLOAD_FAILURE;

  constructor(public error: any) {}
}

export class SingleEmployeeObjectiveExists implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SINGLE_EMPLOYEE_OBJECTIVE_EXISTS;
  constructor(public payload: { planID: number, employeeID: number} ) {}
}

export class SingleEmployeeObjectiveExistsSuccess implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SINGLE_EMPLOYEE_OBJECTIVE_EXISTS_SUCCESS;
  constructor(public payload: boolean) {}
}

export class SingleEmployeeObjectiveExistsFailure implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SINGLE_EMPLOYEE_OBJECTIVE_EXISTS_FAILURE;

  constructor(public error: any) {}
}


export class ShowEditorSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SHOW_SINGLE_EMPLOYEE_EDITOR;
}

export class HideEditorSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.HIDE_SINGLE_EMPLOYEE_EDITOR;
}

export class ShowViewerSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SHOW_SINGLE_EMPLOYEE_VIEWER;
}

export class HideViewerSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.HIDE_SINGLE_EMPLOYEE_VIEWER;
}


export class ProcessingSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.PROCESSING;
}

export class NotProcessingSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.NOT_PROCESSING;
}

export class ProcessingDataGridSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.NOT_PROCESSING_DATA_GRID;
}

export class ImportingSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.IMPORTING;
}

export class NotImportingSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.NOT_IMPORTING;
}


export class ValidatingSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.VALIDATING;
}

export class NotValidatingSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.NOT_VALIDATING;
}

export class SaveSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SAVE;
  constructor(public payload: { objectiveData: IObjectiveDto, employeeID: number }) {}
}

export class SaveSingleEmployeeLoadObjectivesSuccess implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SAVE_SUCCESS;
}

export class SaveSingleEmployeeLoadObjectivesFailure implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class ResetComponentSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.RESET_COMPONENT;
}

export class ResetSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.RESET;

  constructor(public payload: {planID: number, employeeID: number }) {}
}

export class ImportSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.IMPORT;
  constructor(public payload: { planID: number, employeeID: number }) {}
}

export class ValidateSingleEmployeeObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.VALIDATE;
  constructor(public payload: { planId: number, employeeID: number }) {}
}

export class DeleteSingleEmployeeLoadObjectives implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.DELETE;

  constructor(public payload: {recordId: number, planID: number, employeeID: number}) {}
}

export class TriggerSingleEmployeeObjectiveExistBtnAction implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_EXIST_BTN_ACTION;
}

export class TriggerSingleEmployeeObjectiveNonExistBtnAction implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_NON_EXIST_BTN_ACTION;
}

export class TriggerSingleEmployeeObjectiveValidBtnAction implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_VALID_BTN_ACTION;
}

export class TriggerSingleEmployeeObjectiveResetBtnAction implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_RESET_BTN_ACTION;
}

export class TriggerSingleEmployeeObjectiveImportBtnAction implements Action {
  readonly type = LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_IMPORT_BTN_ACTION;
}






export type LoadSingleEmployeeObjectivesActions =
  | LoadSingleEmployeeObjectiveData
  | LoadSingleEmployeeObjectiveDataSuccess
  | LoadSingleEmployeePlanlist
  | LoadSingleEmployeePlanlistSuccess
  | LoadSingleLoadEmployeelist
  | LoadSingleLoadEmployeelistSuccess
  | UploadSingleEmployeeObjectives
  | UploadSingleEmployeeObjectivesSuccess
  | UploadSingleEmployeeObjectivesFailure
  | SingleEmployeeObjectiveExists
  | SingleEmployeeObjectiveExistsSuccess
  | SingleEmployeeObjectiveExistsFailure
  | ShowEditorSingleEmployeeLoadObjectives
  | HideEditorSingleEmployeeLoadObjectives
  | ShowViewerSingleEmployeeLoadObjectives
  | HideViewerSingleEmployeeLoadObjectives
  | ProcessingSingleEmployeeLoadObjectives
  | NotProcessingSingleEmployeeLoadObjectives
  | ProcessingDataGridSingleEmployeeLoadObjectives
  | NotProcessingDataGridSingleEmployeeLoadObjectives
  | ImportingSingleEmployeeLoadObjectives
  | NotImportingSingleEmployeeLoadObjectives
  | ValidatingSingleEmployeeLoadObjectives
  | NotValidatingSingleEmployeeLoadObjectives
  | SaveSingleEmployeeLoadObjectives
  | SaveSingleEmployeeLoadObjectivesSuccess
  | SaveSingleEmployeeLoadObjectivesFailure
  | ResetSingleEmployeeLoadObjectives
  | ResetSingleEmployeeLoadObjectives
  | ImportSingleEmployeeLoadObjectives
  | ValidateSingleEmployeeObjectives
  | ResetComponentSingleEmployeeLoadObjectives
  | DeleteSingleEmployeeLoadObjectives
  | TriggerSingleEmployeeObjectiveExistBtnAction
  | TriggerSingleEmployeeObjectiveNonExistBtnAction
  | TriggerSingleEmployeeObjectiveValidBtnAction
  | TriggerSingleEmployeeObjectiveResetBtnAction
  | TriggerSingleEmployeeObjectiveImportBtnAction; 