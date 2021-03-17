import { Action } from '@ngrx/store';

import { IWorkLifeData } from '@nutela/models/workforce/employee-profiles';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { ISecurityRole, IStructureTree } from '@nutela/models/common';

export enum WorkLifeDataActionTypes {
  LOAD = '[WORK LIFE DATA] Load',
  LOAD_SUCCESS = '[WORK LIFE DATA] Load Success',
  LOAD_FAILURE = '[WORK LIFE DATA] Load Failure',
  SET_WORKFLOW_MESSAGE_COUNT = '[WORK LIFE DATA] Set Workflow Message Count',

  LOADING = '[WORK LIFE DATA] Loading',
  NOT_LOADING = '[WORK LIFE DATA] Not Loading',

  LOAD_WORKFLOW_MESSAGES = '[WORK LIFE DATA] Load Workflow Messages',
  LOAD_WORKFLOW_MESSAGES_SUCCESS = '[WORK LIFE DATA] Load Workflow Messages Success',
  LOAD_WORKFLOW_MESSAGES_FAILURE = '[WORK LIFE DATA] Load Workflow Messages Failure',

  LOAD_WORKFLOW_SUBMISSIONS = '[WORK LIFE DATA] Load Workflow Submissions',
  LOAD_WORKFLOW_SUBMISSIONS_SUCCESS = '[WORK LIFE DATA] Load Workflow Submissions Success',
  LOAD_WORKFLOW_SUBMISSIONS_FAILURE = '[WORK LIFE DATA] Load Workflow Submissions Failure',

  LOAD_SECURITY_ROLES = '[WORK LIFE DATA] Load Security Roles',
  LOAD_SECURITY_ROLES_SUCCESS = '[WORK LIFE DATA] Load Security Roles Success',

  LOAD_ANALYSIS_DETAIL = '[WORK LIFE DATA] Load Analysis Detail',
  LOAD_ANALYSIS_DETAIL_SUCCESS = '[WORK LIFE DATA] Load Analysis Detail Success',

  LOAD_QUEUE_ID = '[WORK LIFE DATA] Load QUEUE ID',
  HAS_AGREED_TO_POLICY = '[WORK LIFE DATA] User Agreed to Policy',
}

export class WorkLifeDataLoad implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD;

  constructor() {}
}

export class WorkLifeDataLoadSuccess implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_SUCCESS;

  constructor(public payload: IWorkLifeData) {}
}

export class LoadingWorkLifeData implements Action {
  readonly type = WorkLifeDataActionTypes.LOADING;
}
export class NotLoadingWorkLifeData implements Action {
  readonly type = WorkLifeDataActionTypes.NOT_LOADING;
}

export class WorkLifeDataLoadFailure implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_FAILURE;

  constructor(public error: any) {}
}


export class WorkLifeDataLoadWorkflowMessages implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_WORKFLOW_MESSAGES;

  constructor(public payload: {id:number}) {}
}

export class WorkLifeDataLoadWorkflowMessagesSuccess implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_WORKFLOW_MESSAGES_SUCCESS;

  constructor(public payload: IWorkflowMessage[]) {}
}

export class WorkLifeDataLoadWorkflowMessagesFailure implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_WORKFLOW_MESSAGES_FAILURE;

  constructor(public error: any) {}
}


export class WorkLifeDataLoadWorkflowSubmissions implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_WORKFLOW_SUBMISSIONS;

  constructor() {}
}

export class WorkLifeDataLoadWorkflowSubmissionsSuccess implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_WORKFLOW_SUBMISSIONS_SUCCESS;

  constructor(public payload: IWorkflowMessage[]) {}
}

export class WorkLifeDataLoadWorkflowSubmissionsFailure implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_WORKFLOW_SUBMISSIONS_FAILURE;

  constructor(public error: any) {}
}



export class WorkLifeDataSetWorkflowMessageCount implements Action {
  readonly type = WorkLifeDataActionTypes.SET_WORKFLOW_MESSAGE_COUNT;

  constructor(public payload: number) {}
}


export class WorkLifeDataLoadSecurityRoles implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_SECURITY_ROLES;

  constructor() {}
}

export class WorkLifeDataLoadSecurityRolesSuccess implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_SECURITY_ROLES_SUCCESS;

  constructor(public payload: ISecurityRole[]) {}
}

export class WorkLifeDataMyAnalysisDetail implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_ANALYSIS_DETAIL;

  constructor() {}
}

export class WorkLifeDataMyAnalysisDetailSuccess implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_ANALYSIS_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}


export class LoadQueueId implements Action {
  readonly type = WorkLifeDataActionTypes.LOAD_QUEUE_ID;

  constructor(public payload: number) {}
}

export class HasAgreedToPolicy implements Action {
  readonly type = WorkLifeDataActionTypes.HAS_AGREED_TO_POLICY;

  constructor(public payload: boolean) {}
}


export type WorkLifeDataActions =
  | WorkLifeDataLoad
  | WorkLifeDataLoadSuccess
  | WorkLifeDataLoadFailure

  | WorkLifeDataLoadWorkflowMessages
  | WorkLifeDataLoadWorkflowMessagesSuccess
  | WorkLifeDataLoadWorkflowMessagesFailure

  | WorkLifeDataLoadWorkflowSubmissions
  | WorkLifeDataLoadWorkflowSubmissionsSuccess
  | WorkLifeDataLoadWorkflowSubmissionsFailure

  | WorkLifeDataSetWorkflowMessageCount

  | LoadingWorkLifeData
  | NotLoadingWorkLifeData

  | WorkLifeDataLoadSecurityRoles
  | WorkLifeDataLoadSecurityRolesSuccess

  | WorkLifeDataMyAnalysisDetail
  | WorkLifeDataMyAnalysisDetailSuccess

  | LoadQueueId

  | HasAgreedToPolicy
  ;
