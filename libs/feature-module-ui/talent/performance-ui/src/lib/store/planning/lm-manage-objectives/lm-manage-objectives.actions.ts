import { Action } from '@ngrx/store';
import { IObjectiveMasterDto, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum LmManageObjectivesActionTypes {

  PROCESSING = '[PERFORMANCE LM MANAGE OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE LM MANAGE OBJECTIVES] Not Processing',

  LOAD_PLAN_LIST = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Plan List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Employee List Success',

  LOAD_OBJECTIVE_MASTER_DATA = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Objective Master Data',
  LOAD_OBJECTIVE_MASTER_DATA_SUCCESS = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Objective Master Data Success',

  LOAD_PRESCORED_OBJECTIVE_MASTER_DATA = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Pre-scored Objective Master Data',
  LOAD_PRESCORED_OBJECTIVE_MASTER_DATA_SUCCESS = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Pre-scored Objective Master Data Success',

  LOAD_OBJECTIVE_OBJECTIVE_INFO_SUCCESS = '[PERFORMANCE LM MANAGE OBJECTIVES] Load Objective Info Success',

  SET_SELECTED_EMPLOYEE_ID = '[PERFORMANCE LM MANAGE OBJECTIVES] Set Selected Employee ID',

  RESET_COMPONENTS = '[PERFORMANCE LM MANAGE OBJECTIVES] Reset Components LM'
}

export class ProcessingLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.PROCESSING;
}

export class NotProcessingLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.NOT_PROCESSING;
}

export class LoadPlanlistLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_PLAN_LIST;

}

export class LoadPlanlistLmManageObjectivesSuccess implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class LoadEmployeelistLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_EMPLOYEE_LIST;
  constructor(public payload: { planId: number, employeeId: number}) {}
}

export class LoadEmployeelistLmManageObjectivesSuccess implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export class LoadObjectiveMasterDataLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA;

  constructor(public payload: { planId: number, employeeId: number}) {}
}

export class LoadObjectiveMasterDataLmManageObjectivesSuccess implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA_SUCCESS;

  constructor(public payload: IObjectiveMasterDto[]) {}
}

export class LoadPreScoredObjectiveMasterDataLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA;

  constructor(public payload: { planId: number, employeeId: number}) {}
}

export class LoadPreScoredObjectiveMasterDataLmManageObjectivesSuccess implements Action {
  readonly type = LmManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA_SUCCESS;

  constructor(public payload: IObjectiveMasterDto[]) {}
}

export class SetSelectedEmployeeId implements Action {
  readonly type = LmManageObjectivesActionTypes.SET_SELECTED_EMPLOYEE_ID;

  constructor(public payload: {employeeId: number}) {}
}

export class ResetComponentsLmManageObjectives implements Action {
  readonly type = LmManageObjectivesActionTypes.RESET_COMPONENTS;
}


export type LmManageObjectivesActions =
  | ProcessingLmManageObjectives
  | NotProcessingLmManageObjectives
  | LoadPlanlistLmManageObjectives
  | LoadPlanlistLmManageObjectivesSuccess
  | LoadEmployeelistLmManageObjectives
  | LoadEmployeelistLmManageObjectivesSuccess
  | LoadObjectiveMasterDataLmManageObjectives
  | LoadObjectiveMasterDataLmManageObjectivesSuccess
  | SetSelectedEmployeeId
  | LoadPreScoredObjectiveMasterDataLmManageObjectives
  | LoadPreScoredObjectiveMasterDataLmManageObjectivesSuccess
  | ResetComponentsLmManageObjectives;
