import { Action } from '@ngrx/store';
import { ITeamDeployment, ITeamDeploymentTransaction, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IPosition } from '@nutela/models/workforce/personnel';

export enum TeamDeploymentActionTypes {
  LOAD_DEPLOYMENT_DATA = '[TEAM_DEPLOYMENTS] Load Deployment Data',
  LOAD_DEPLOYMENT_DATA_SUCCESS = '[TEAM_DEPLOYMENTS] Load Deployment Data Success',

  LOAD_TRANSACTION_DATA = '[TEAM_DEPLOYMENTS] Load Transaction Data',
  LOAD_TRANSACTION_DATA_SUCCESS = '[TEAM_DEPLOYMENTS] Load Transaction Data Success',

  LOAD_TEAM_MEMBERS = '[TEAM_DEPLOYMENTS] Load Team Member',
  LOAD_TEAM_MEMBERS_SUCCESS = '[TEAM_DEPLOYMENTS] Load Team Member Success',

  LOAD_POSITION_LIST = '[TEAM_DEPLOYMENTS] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[TEAM_DEPLOYMENTS] Load Position List Success',

  LOAD_SUPERVISOR_SUGGESTION = '[TEAM_DEPLOYMENTS] Load Supervisor Suggestion',
  LOAD_SUPERVISOR_SUGGESTION_SUCCESS = '[TEAM_DEPLOYMENTS] Load Supervisor Suggestion Success',

  SHOW_EDITOR = '[TEAM_DEPLOYMENTS] Show Editor',
  HIDE_EDITOR = '[TEAM_DEPLOYMENTS] Hide Editor',

  SHOW_VIEWER = '[TEAM_DEPLOYMENTS] Show Viewer',
  HIDE_VIEWER = '[TEAM_DEPLOYMENTS] Hide Viewer',

  PROCESSING = '[TEAM_DEPLOYMENTS] Processing',
  NOT_PROCESSING = '[TEAM_DEPLOYMENTS] Not Processing',

  LOADING = '[TEAM_DEPLOYMENTS] Loading',
  NOT_LOADING = '[TEAM_DEPLOYMENTS] Not Loading',

  LOADING_SUGGESTION = '[TEAM_DEPLOYMENTS] Loading Suggestion',
  NOT_LOADING_SUGGESTION = '[TEAM_DEPLOYMENTS] Not Loading Suggestion',

  DEPLOY_SELF = '[TEAM_DEPLOYMENTS] Deploy Self',
  DEPLOY_SELF_SUCCESS = '[TEAM_DEPLOYMENTS] Deploy Self Success',

  DEPLOY_TEAM_MEMBER = '[TEAM_DEPLOYMENTS] Deploy Team Member',
  DEPLOY_TEAM_MEMBER_SUCCESS = '[TEAM_DEPLOYMENTS] Deploy Team Member Success',

  SAVE = '[TEAM_DEPLOYMENTS] Save',
  SAVE_SUCCESS = '[TEAM_DEPLOYMENTS] Save Success',

  DELETE_DATA = '[TEAM_DEPLOYMENTS] Delete Data',
}

export class LoadDeploymentDataTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_DEPLOYMENT_DATA;
  constructor(public payload: {employeeId: number}) {}
}

export class LoadDeploymentDataTeamDeploymentSuccess implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_DEPLOYMENT_DATA_SUCCESS;

  constructor(public payload: ITeamDeployment[]) {}
}

export class LoadTransactionsDataTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_TRANSACTION_DATA;
  constructor(public payload: {employeeId: number}) {}
}

export class LoadTransactionsDataTeamDeploymentSuccess implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_TRANSACTION_DATA_SUCCESS;

  constructor(public payload: ITeamDeploymentTransaction[]) {}
}

export class LoadPositionListTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_POSITION_LIST;
  }

export class LoadPositionListTeamDeploymentSuccess implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: IPosition[]) {}
}

export class LoadTeamMembersTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_TEAM_MEMBERS;
  
  constructor() {}
}
export class LoadTeamMembersTeamDeploymentSuccess implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_TEAM_MEMBERS_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export class LoadSuggestedSupervisorTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_SUPERVISOR_SUGGESTION;

  constructor(public payload: {employeeId: number, structureDetailId: number, positionId: number }) {}
}

export class LoadSuggestedSupervisorTeamDeploymentSuccess implements Action {
  readonly type = TeamDeploymentActionTypes.LOAD_SUPERVISOR_SUGGESTION_SUCCESS;

  constructor(public payload: number) {}
}

export class ShowEditorTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.SHOW_EDITOR;
}

export class HideEditorTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.HIDE_EDITOR;
}
export class ShowViewerTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.SHOW_VIEWER;
}

export class HideViewerTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.HIDE_VIEWER;
}

export class ProcessingTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.PROCESSING;
}
export class NotProcessingTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.NOT_PROCESSING;
}

export class LoadingTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOADING;
}
export class NotLoadingTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.NOT_LOADING;
}

export class LoadingSuggestionTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.LOADING_SUGGESTION;
}
export class NotLoadingSuggestionTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.NOT_LOADING_SUGGESTION;
}

export class DeloySelfTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.DEPLOY_SELF;

  constructor(public payload: {data: ITeamDeployment}) {}
}

export class DeployTeamMemberTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.DEPLOY_TEAM_MEMBER;

  constructor(public payload: {data: ITeamDeployment}) {}
}

export class SaveTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.SAVE;

  constructor(public payload: {data: ITeamDeployment, recordId: number, editMode: boolean}) {}
}

export class DeleteDataTeamDeployment implements Action {
  readonly type = TeamDeploymentActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type TeamDeploymentActions =
| ShowEditorTeamDeployment
| HideEditorTeamDeployment
| ShowViewerTeamDeployment
| HideViewerTeamDeployment
| ProcessingTeamDeployment
| NotProcessingTeamDeployment
| LoadingTeamDeployment
| NotLoadingTeamDeployment
| LoadingSuggestionTeamDeployment
| NotLoadingSuggestionTeamDeployment
| LoadDeploymentDataTeamDeployment
| LoadDeploymentDataTeamDeploymentSuccess
| LoadTransactionsDataTeamDeployment
| LoadTransactionsDataTeamDeploymentSuccess
| LoadSuggestedSupervisorTeamDeployment
| LoadSuggestedSupervisorTeamDeploymentSuccess
| LoadTeamMembersTeamDeployment
| LoadTeamMembersTeamDeploymentSuccess
| LoadPositionListTeamDeployment
| LoadPositionListTeamDeploymentSuccess
| SaveTeamDeployment
| DeloySelfTeamDeployment
| DeployTeamMemberTeamDeployment
| DeleteDataTeamDeployment;

