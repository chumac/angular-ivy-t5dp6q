import { Action } from '@ngrx/store';

import { IPerfDashboardMasters, IPerfDashboardObjectives, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum PerformanceDashboardActionTypes {

  PROCESSING = '[PERFORMANCE_DASHBOARDS] Processing',
  NOT_PROCESSING = '[PERFORMANCE_DASHBOARDS] Not Processing',

  LOAD_DASH_MASTERS = '[PERFORMANCE_DASHBOARDS] Load Dashboard Masters',
  LOAD_DASH_MASTERS_SUCCESS = '[PERFORMANCE_DASHBOARDS] Load Dashboard Masters Success',

  LOAD_DASH_OBJECTIVES = '[PERFORMANCE_DASHBOARDS] Load Dashboard Objectives',
  LOAD_DASH_OBJECTIVES_SUCCESS = '[PERFORMANCE_DASHBOARDS] Load Dashboard Objectives Success',

  PROCESSING_TEAM = '[PERFORMANCE_DASHBOARDS] Processing Team',
  NOT_PROCESSING_TEAM = '[PERFORMANCE_DASHBOARDS] Not Processing Team',

  LOAD_DASH_TEAM_MASTERS = '[PERFORMANCE_DASHBOARDS] Load Dashboard Team Masters',
  LOAD_DASH_TEAM_MASTERS_SUCCESS = '[PERFORMANCE_DASHBOARDS] Load Dashboard Team Masters Success',

  LOAD_DASH_TEAM_OBJECTIVES = '[PERFORMANCE_DASHBOARDS] Load Dashboard Team Objectives',
  LOAD_DASH_TEAM_OBJECTIVES_SUCCESS = '[PERFORMANCE_DASHBOARDS] Load Dashboard Team Objectives Success',


  LOAD_CURR_PLAN = '[PERFORMANCE_DASHBOARDS] Load Current Plan',
  LOAD_CURR_PLAN_SUCCESS = '[PERFORMANCE_DASHBOARDS] Load Current Plan Success',
}

export class ProcessingPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.PROCESSING;
}

export class NotProcessingPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.NOT_PROCESSING;
}

export class LoadCurrentPlanPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_CURR_PLAN;
}

export class LoadCurrentPlanPerformanceDashboardSuccess implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_CURR_PLAN_SUCCESS;
  constructor(public payload: IPlan) {}
}

export class LoadMastersPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_MASTERS;
  constructor(public payload: {planId: number}) {}
}

export class LoadMastersPerformanceDashboardSuccess implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_MASTERS_SUCCESS;
  constructor(public payload: IPerfDashboardMasters) {}
}

export class LoadObjectivesPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_OBJECTIVES;
  constructor(public payload: {planId: number}) {}
}

export class LoadObjectivesPerformanceDashboardSuccess implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_OBJECTIVES_SUCCESS;
  constructor(public payload: IPerfDashboardObjectives[]) {}
}

//
export class ProcessingTeamPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.PROCESSING_TEAM;
}

export class NotProcessingTeamPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.NOT_PROCESSING_TEAM;
}

export class LoadTeamMastersPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_TEAM_MASTERS;
  constructor(public payload: {planId: number, employeeId: number}) {}
}

export class LoadTeamMastersPerformanceDashboardSuccess implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_TEAM_MASTERS_SUCCESS;
  constructor(public payload: IPerfDashboardMasters) {}
}

export class LoadTeamObjectivesPerformanceDashboard implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_TEAM_OBJECTIVES;
  constructor(public payload: {planId: number, employeeId: number}) {}
}

export class LoadTeamObjectivesPerformanceDashboardSuccess implements Action {
  readonly type = PerformanceDashboardActionTypes.LOAD_DASH_TEAM_OBJECTIVES_SUCCESS;
  constructor(public payload: IPerfDashboardObjectives[]) {}
}

export type PerformanceDashboardActions =
  | ProcessingPerformanceDashboard
  | NotProcessingPerformanceDashboard
  | LoadMastersPerformanceDashboard
  | LoadMastersPerformanceDashboardSuccess
  | LoadObjectivesPerformanceDashboard
  | LoadObjectivesPerformanceDashboardSuccess
  | LoadCurrentPlanPerformanceDashboard
  | LoadCurrentPlanPerformanceDashboardSuccess
  | ProcessingTeamPerformanceDashboard
  | NotProcessingTeamPerformanceDashboard
  | LoadTeamMastersPerformanceDashboard
  | LoadTeamMastersPerformanceDashboardSuccess
  | LoadTeamObjectivesPerformanceDashboard
  | LoadTeamObjectivesPerformanceDashboardSuccess;
