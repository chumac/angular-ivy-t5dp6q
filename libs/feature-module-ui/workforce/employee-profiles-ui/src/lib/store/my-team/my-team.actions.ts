import { Action } from '@ngrx/store';

import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum MyTeamActionTypes {
  LOADING_MY_TEAM = '[EMPLOYEE PROFILES - MY TEAM] Loading My Team',
  NOT_LOADING_MY_TEAM = '[EMPLOYEE PROFILES - MY TEAM] Not Loading My Team',

  LOAD_EMPLOYEE_TEAM = '[EMPLOYEE PROFILES - EMPLOYEE TEAM] Load EMPLOYEE Team',
  LOAD_EMPLOYEE_TEAM_SUCCESS = '[EMPLOYEE PROFILES - EMPLOYEE TEAM] Load EMPLOYEE Team Success',

  LOAD_MY_TEAM = '[EMPLOYEE PROFILES - MY TEAM] Load My Team',
  LOAD_MY_TEAM_SUCCESS = '[EMPLOYEE PROFILES - MY TEAM] Load My Team Success',

  LOAD_TEAM_MEMBERS_PROFILE_PICTURE = '[EMPLOYEE PROFILES - MY TEAM] Load Team Members Profile Picture',
  LOAD_TEAM_MEMBERS_PROFILE_PICTURE_SUCCESS = '[EMPLOYEE PROFILES - MY TEAM] Load Team Members Profile Picture Success'
}


export class LoadDataMyTeam implements Action {
  readonly type = MyTeamActionTypes.LOAD_MY_TEAM;
  
  constructor() {}
}


export class LoadDataMyTeamSuccess implements Action {
  readonly type = MyTeamActionTypes.LOAD_MY_TEAM_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}


export class LoadDataEmployeeTeam implements Action {
  readonly type = MyTeamActionTypes.LOAD_EMPLOYEE_TEAM;

  constructor(public payload: number) {}
}

export class LoadDataEmployeeTeamSuccess implements Action {
  readonly type = MyTeamActionTypes.LOAD_EMPLOYEE_TEAM_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export class LoadingDataMyTeam implements Action {
  readonly type = MyTeamActionTypes.LOADING_MY_TEAM;
}

export class NotLoadingDataMyTeam implements Action {
  readonly type = MyTeamActionTypes.NOT_LOADING_MY_TEAM;
}

export class LoadTeamMemberProfilePicture implements Action {
  readonly type = MyTeamActionTypes.LOAD_TEAM_MEMBERS_PROFILE_PICTURE;

  constructor(public payload: number) { }
}

export class LoadTeamMemberProfilePictureSuccess implements Action {
  readonly type = MyTeamActionTypes.LOAD_TEAM_MEMBERS_PROFILE_PICTURE_SUCCESS;

  constructor(public payload: any) {}
}

export type MyTeamActions =
  LoadDataMyTeam
| LoadDataMyTeamSuccess

| LoadDataEmployeeTeam
| LoadDataEmployeeTeamSuccess

| NotLoadingDataMyTeam
| LoadingDataMyTeam

| LoadTeamMemberProfilePicture
| LoadTeamMemberProfilePictureSuccess
