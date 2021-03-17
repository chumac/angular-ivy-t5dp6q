import { Action } from '@ngrx/store';
import { IObjectiveDto, IPlan, ILibraryObjective, IPerspective } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum LoadLibraryObjectivesActionTypes {

  LOAD_PLAN_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Plan List Success',

  UPLOAD = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Upload Library Objectives',
  UPLOAD_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Upload Library Objectives Success',
  UPLOAD_FAILURE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Upload Library Objectives Failure',

  LOAD_LIBRARY_OBJECTIVE_DATA = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Objective Data',
  LOAD_LIBRARY_OBJECTIVE_DATA_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Objective Data Success',

  LIBRARY_OBJECTIVE_EXISTS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Library Objective Exists',
  LIBRARY_OBJECTIVE_EXISTS_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Library Objective Exists Success',
  LIBRARY_OBJECTIVE_EXISTS_FAILURE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Library Objective Exists Failure',
  LIBRARY_OBJECTIVE_NOT_EXIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Library Objective Not Exist',


  SHOW_LIBRARY_EDITOR = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Show Library Editor',
  HIDE_LIBRARY_EDITOR = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Hide Library Editor',

  SHOW_LIBRARY_VIEWER = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Show Library Viewer',
  HIDE_LIBRARY_VIEWER = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Hide Library Viewer',

  VALIDATING = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Validating',
  NOT_VALIDATING = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Not Validating',

  IMPORTING = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Importing',
  NOT_IMPORTING = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Not Importing',

  PROCESSING = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Not Processing',

  PROCESSING_DATA_GRID = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Not Processing Data Grid',

  SAVE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Save',
  SAVE_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Save Success',
  SAVE_FAILURE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Save Failure',

  CREATE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Create',
  CREATE_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Create Success',
  CREATE_FAILURE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Create Failure',

  DELETE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Delete',

  RESET = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Reset',

  IMPORT = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Import',

  VALIDATE = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Validate',

  RESET_COMPONENT = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Reset Component',

  TRIGGER_OBJECTIVE_EXIST_BTN_ACTION = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Objective Exists Btn Action',
  TRIGGER_OBJECTIVE_NON_EXIST_BTN_ACTION = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Objective Non Exists Btn Action',
  TRIGGER_OBJECTIVE_VALID_BTN_ACTION = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Validated Objectives Btn Action',
  TRIGGER_OBJECTIVE_RESET_BTN_ACTION = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Reset Objectives Btn Action',
  TRIGGER_OBJECTIVE_IMPORT_BTN_ACTION = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Import Objectives Btn Action',

  LOAD_PERSPECTIVE_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Perspective List',
  LOAD_PERSPECTIVE_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Perspective List Success',

  LOAD_ANALYSIS_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE LIBRARY LOAD OBJECTIVES] Load Employee List Success',



}


export class LoadLibraryObjectiveData implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_LIBRARY_OBJECTIVE_DATA;

  // constructor(public payload: Number) {}
}

export class LoadLibraryObjectiveDataSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_LIBRARY_OBJECTIVE_DATA_SUCCESS;

  constructor(public payload: ILibraryObjective[]) {}
}

export class LoadLibraryPlanlist implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_PLAN_LIST;
}

export class LoadLibraryPlanlistSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class UploadLibraryObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.UPLOAD;
  constructor(public payload: { objectiveData: ILibraryObjective[], filename: string }) {}
}

export class UploadLibraryObjectivesSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.UPLOAD_SUCCESS;
}

export class UploadLibraryObjectivesFailure implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.UPLOAD_FAILURE;

  constructor(public error: any) {}
}

export class LibraryObjectiveExists implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_EXISTS;
  constructor(public payload: Number ) {}
}

export class LibraryObjectiveExistsSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_EXISTS_SUCCESS;
  constructor(public payload: boolean) {}
}

export class LibraryObjectiveExistsFailure implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_EXISTS_FAILURE;

  constructor(public error: any) {}
}

export class LibraryObjectiveNotExists implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_NOT_EXIST;
  constructor(public payload: boolean ) {}
}


export class ShowEditorLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.SHOW_LIBRARY_EDITOR;
}

export class HideEditorLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.HIDE_LIBRARY_EDITOR;
}

export class ShowViewerLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.SHOW_LIBRARY_VIEWER;
}

export class HideViewerLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.HIDE_LIBRARY_VIEWER;
}


export class ProcessingLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.PROCESSING;
}

export class NotProcessingLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.NOT_PROCESSING;
}

export class ProcessingDataGridLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.NOT_PROCESSING_DATA_GRID;
}

export class ImportingLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.IMPORTING;
}

export class NotImportingLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.NOT_IMPORTING;
}


export class ValidatingLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.VALIDATING;
}

export class NotValidatingLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.NOT_VALIDATING;
}

export class SaveLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.SAVE;
  constructor(public payload: { objectiveData: ILibraryObjective }) {}
}

export class SaveLibraryLoadObjectivesSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.SAVE_SUCCESS;
}

export class SaveLibraryLoadObjectivesFailure implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class CreateLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.CREATE;
  constructor(public payload: { objectiveData: ILibraryObjective }) {}
}

export class CreateLibraryLoadObjectivesSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.CREATE_SUCCESS;
}

export class CreateLibraryLoadObjectivesFailure implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.CREATE_FAILURE;

  constructor(public error: any) {}
}

export class ResetComponentLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.RESET_COMPONENT;
}

export class ResetLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.RESET;

  constructor(public payload: {planID: number}) {}
}

export class ImportLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.IMPORT;
  constructor(public payload: { planID: Number }) {}
}

export class ValidateLibraryObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.VALIDATE;
  constructor(public payload: { planId: Number }) {}
}

export class DeleteLibraryLoadObjectives implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.DELETE;

  constructor(public payload: {recordId: number, planID: number}) {}
}

export class TriggerLibraryObjectiveExistBtnAction implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_EXIST_BTN_ACTION;
}

export class TriggerLibraryObjectiveNonExistBtnAction implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_NON_EXIST_BTN_ACTION;
}

export class TriggerLibraryObjectiveValidBtnAction implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_VALID_BTN_ACTION;
}

export class TriggerLibraryObjectiveResetBtnAction implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_RESET_BTN_ACTION;
}

export class TriggerLibraryObjectiveImportBtnAction implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_IMPORT_BTN_ACTION;
}




export class LoadLibraryPerspectiveList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_PERSPECTIVE_LIST;
}

export class LoadLibraryPerspectiveListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS;

  constructor(public payload: IPerspective[]) {}
}

export class LoadLibraryAnalysisList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadLibraryAnalysisListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadLibraryAnalysisDetList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
}

export class LoadLibraryAnalysisDetListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadLibraryPositionList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_POSITION_LIST;
}

export class LoadLibraryPositionListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadLibraryDesignationList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadLibraryDesignationListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadLibraryGradeList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_GRADE_LIST;
}

export class LoadLibraryGradeListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadLibraryEmployeeList implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadLibraryEmployeeListSuccess implements Action {
  readonly type = LoadLibraryObjectivesActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}





export type LoadLibraryObjectivesActions =
  | LoadLibraryObjectiveData
  | LoadLibraryObjectiveDataSuccess
  | LoadLibraryPlanlist
  | LoadLibraryPlanlistSuccess
  | UploadLibraryObjectives
  | UploadLibraryObjectivesSuccess
  | UploadLibraryObjectivesFailure
  | LibraryObjectiveExists
  | LibraryObjectiveExistsSuccess
  | LibraryObjectiveExistsFailure
  | LibraryObjectiveNotExists
  | ShowEditorLibraryLoadObjectives
  | HideEditorLibraryLoadObjectives
  | ShowViewerLibraryLoadObjectives
  | HideViewerLibraryLoadObjectives
  | ProcessingLibraryLoadObjectives
  | NotProcessingLibraryLoadObjectives
  | ProcessingDataGridLibraryLoadObjectives
  | NotProcessingDataGridLibraryLoadObjectives
  | ImportingLibraryLoadObjectives
  | NotImportingLibraryLoadObjectives
  | ValidatingLibraryLoadObjectives
  | NotValidatingLibraryLoadObjectives
  | SaveLibraryLoadObjectives
  | SaveLibraryLoadObjectivesSuccess
  | SaveLibraryLoadObjectivesFailure
  | ResetLibraryLoadObjectives
  | ResetLibraryLoadObjectives
  | ImportLibraryLoadObjectives
  | ValidateLibraryObjectives
  | ResetComponentLibraryLoadObjectives
  | DeleteLibraryLoadObjectives
  | TriggerLibraryObjectiveExistBtnAction
  | TriggerLibraryObjectiveNonExistBtnAction
  | TriggerLibraryObjectiveValidBtnAction
  | TriggerLibraryObjectiveResetBtnAction
  | TriggerLibraryObjectiveImportBtnAction
  | CreateLibraryLoadObjectives
  | CreateLibraryLoadObjectivesSuccess
  | CreateLibraryLoadObjectivesFailure

  | LoadLibraryPerspectiveList
  | LoadLibraryPerspectiveListSuccess
  | LoadLibraryAnalysisList
  | LoadLibraryAnalysisListSuccess
  | LoadLibraryAnalysisDetList
  | LoadLibraryAnalysisDetListSuccess
  | LoadLibraryPositionList
  | LoadLibraryPositionListSuccess
  | LoadLibraryDesignationList
  | LoadLibraryDesignationListSuccess
  | LoadLibraryGradeList
  | LoadLibraryGradeListSuccess
  | LoadLibraryEmployeeList
  | LoadLibraryEmployeeListSuccess;