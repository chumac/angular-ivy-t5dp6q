import { Action } from '@ngrx/store';

import { IWorkflowAlternates} from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';



export enum WorkflowAlternatesActionTypes {

  SHOW_EDITOR = '[ALT WORK MAP] Show Editor',
  HIDE_EDITOR = '[ALT WORK MAP] Hide Editor',

  PROCESSING = '[ALT WORK MAP] Processing',
  NOT_PROCESSING = '[ALT WORK MAP] Not Processing',

  LOADING = '[ALT WORK MAP] Loading',
  NOT_LOADING = '[ALT WORK MAP] Not Loading',

  LOAD_ALT_WORK_MAP_SINGLE_DATA = '[ALT WORK MAP] Load ALT WORK MAP Single Data',
  LOAD_ALT_WORK_MAP_SINGLE_DATA_SUCCESS = '[ALT WORK MAP] Load ALT WORK MAP Single Data Success',

  LOAD_ALT_WORK_MAP_DATA = '[ALT WORK MAP] Load ALT WORK MAP Data',
  LOAD_ALT_WORK_MAP_DATA_SUCCESS = '[ALT WORK MAP] Load ALT WORK MAP Data Success',

  LOAD_SYSTEM_DATA = '[ALT WORK MAP] Load System  Data',
  LOAD_SYSTEM_DATA_SUCCESS = '[ALT WORK MAP] Load System Data Success',

  LOAD_WORK_DEFINITION_DATA = '[ALT WORK MAP] Load Work Definition Data',
  LOAD_WORK_DEFINITION_DATA_SUCCESS = '[ALT WORK MAP] Load Work Definition Data Success',

  LOAD_COST_CENTER = '[ALT WORK MAP] Load Cost Center Data',
  LOAD_COST_CENTER_SUCCESS = '[ALT WORK MAP] Load Cost Center Data Success',

  LOAD_GRADE = '[ALT WORK MAP ] Load GRADE DATA',
  LOAD_GRADE_SUCCESS = '[ALT WORK MAP ] Load GRADE Data Success',

  LOAD_FOR_EMPLOYEE = '[ALT WORK MAP ] Load FOR EMPLOYEE DATA',
  LOAD_FOR_EMPLOYEE_SUCCESS = '[ALT WORK MAP ] Load FOR EMPLOYEE Data Success',

  LOAD_POSITION = '[ALT WORK MAP ] Load POSITION DATA',
  LOAD_POSITION_SUCCESS = '[ALT WORK MAP ] Load POSITION Data Success',

  LOAD_POSITION_CATEGORY = '[ALT WORK MAP ] Load POSITION CATEGORY DATA',
  LOAD_POSITION_CATEGORY_SUCCESS = '[ALT WORK MAP ] Load POSITION CATEGORY Data Success',

  LOAD_DESIGNATION = '[ALT WORK MAP ] Load DESIGNATION DATA',
  LOAD_DESIGNATION_SUCCESS = '[ALT WORK MAP ] Load DESIGNATION Data Success',

  LOAD_CATEGORY = '[ALT WORK MAP ] Load CATEGORY DATA',
  LOAD_CATEGORY_SUCCESS = '[ALT WORK MAP ] Load CATEGORY Data Success',

  LOAD_STAFF_GROUP = '[ALT WORK MAP ] Load STAFF_GROUP DATA',
  LOAD_STAFF_GROUP_SUCCESS = '[ALT WORK MAP ] Load STAFF_GROUP Data Success',

  SAVE = '[ALT WORK MAP] Save',
  SAVE_SUCCESS = '[ALT WORK MAP] Save Success',

  DELETE_ALT_WORK_MAP_DATA = '[ALT WORK MAP] Delete ALT WORK MAP Data',

}

export class ShowEditorWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.HIDE_EDITOR;
}


export class ProcessingWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.PROCESSING;
}

export class NotProcessingWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.NOT_PROCESSING;
}

export class LoadingWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOADING;
}

export class NotLoadingWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.NOT_LOADING;
}

export class LoadSingleWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_SINGLE_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class LoadSingleWorkflowAlternatesSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_SINGLE_DATA_SUCCESS;
  constructor(public payload: IWorkflowAlternates[]) {}
}

export class LoadWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_DATA;
}

export class LoadWorkflowAlternatesSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_DATA_SUCCESS;
  constructor(public payload: IWorkflowAlternates[]) {}
}

export class LoadSystemData implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_SYSTEM_DATA;
}

export class LoadSystemDataSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_SYSTEM_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadCostCenter implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_COST_CENTER;
  constructor(public payload: {analysis_det_id:number}) {}
}

export class LoadCostCenterSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_COST_CENTER_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadGrade implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_GRADE;
}

export class LoadGradeSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_GRADE_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadForEmployee implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_FOR_EMPLOYEE;
}

export class LoadForEmployeeSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_FOR_EMPLOYEE_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadWorkDefinition implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_WORK_DEFINITION_DATA;
}

export class  LoadWorkDefinitionSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_WORK_DEFINITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPosition implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_POSITION;
}

export class LoadPositionSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_POSITION_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPositionCategory implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_POSITION_CATEGORY;
}

export class LoadPositionCategorySuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_POSITION_CATEGORY_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadCategory implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_CATEGORY;
}

export class LoadCategorySuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_CATEGORY_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadDesignation implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_DESIGNATION;
}

export class LoadDesignationSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_DESIGNATION_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadStaffGroup implements Action {
  readonly type =WorkflowAlternatesActionTypes.LOAD_STAFF_GROUP;
}

export class LoadStaffGroupSuccess implements Action {
  readonly type = WorkflowAlternatesActionTypes.LOAD_STAFF_GROUP_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.SAVE;
 constructor(public payload: {data: IWorkflowAlternates,ruleType:number, editMode: boolean}) {}
}

export class DeleteWorkflowAlternates implements Action {
  readonly type = WorkflowAlternatesActionTypes.DELETE_ALT_WORK_MAP_DATA;
  constructor(public payload: {recordId: number, ruleType:number}) {}
}


export type IWorkflowAlternatesActions =
  | ShowEditorWorkflowAlternates
  | HideEditorWorkflowAlternates
  | ProcessingWorkflowAlternates
  | NotProcessingWorkflowAlternates
  | LoadingWorkflowAlternates
  | NotLoadingWorkflowAlternates
  | LoadSingleWorkflowAlternates
  | LoadSingleWorkflowAlternatesSuccess
  | LoadWorkflowAlternates
  | LoadWorkflowAlternatesSuccess
  | LoadSystemData
  | LoadSystemDataSuccess
  | LoadWorkDefinition
  | LoadWorkDefinitionSuccess
  | LoadCostCenter
  | LoadCostCenterSuccess
  | LoadGrade
  | LoadGradeSuccess
  | LoadForEmployee
  | LoadForEmployeeSuccess
  | LoadPosition
  | LoadPositionSuccess
  | LoadPositionCategory
  | LoadPositionCategorySuccess
  | LoadCategory
  | LoadCategorySuccess
  | LoadDesignation
  | LoadDesignationSuccess
  | LoadStaffGroup
  | LoadStaffGroupSuccess
  | SaveWorkflowAlternates
  | DeleteWorkflowAlternates;
