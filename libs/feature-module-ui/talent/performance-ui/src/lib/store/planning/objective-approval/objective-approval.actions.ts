import { Action } from '@ngrx/store';
import { IObjectiveMasterDto, IPerspective } from '@nutela/models/talent/performance';

export enum ObjectiveApprovalActionTypes {

  SHOW_VIEWER = '[PERFORMANCE OBJECTIVES APPROVAL] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE OBJECTIVES APPROVAL] Hide Viewer',

  SHOW_EDITOR = '[PERFORMANCE OBJECTIVES APPROVAL] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE OBJECTIVES APPROVAL] Hide Editor',

  PROCESSING = '[PERFORMANCE OBJECTIVES APPROVAL] Processing',
  NOT_PROCESSING = '[PERFORMANCE OBJECTIVES APPROVAL] Not Processing',

  PROCESSING_DATA_GRID = '[PERFORMANCE OBJECTIVES APPROVAL] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[PERFORMANCE OBJECTIVES APPROVAL] Not Processing Data Grid',

  LOAD_OBJECTIVE_MASTER_DATA = '[PERFORMANCE OBJECTIVES APPROVAL] Load Objective Master Data',
  LOAD_OBJECTIVE_MASTER_DATA_SUCCESS = '[PERFORMANCE OBJECTIVES APPROVAL] Load Objective Master Data Success',

  LOAD_HR_OBJECTIVE_MASTER_DATA = '[PERFORMANCE OBJECTIVES APPROVAL] Load Hr Objective Master Data',
  LOAD_HR_OBJECTIVE_MASTER_DATA_SUCCESS = '[PERFORMANCE OBJECTIVES APPROVAL] Load Hr Objective Master Data Success',


  LOAD_WORKFLOW_DATA = '[PERFORMANCE OBJECTIVES APPROVAL] Load Workflow Data',
  LOAD_WORKFLOW_DATA_SUCCESS = '[PERFORMANCE OBJECTIVES APPROVAL] Load Workflow Data Success',

  LOAD_PERSPECTIVE_LIST = '[PERFORMANCE OBJECTIVES APPROVAL] Load Perspective List',
  LOAD_PERSPECTIVE_LIST_SUCCESS = '[PERFORMANCE OBJECTIVES APPROVAL] Load Perspective List Success',

  LOAD_WEIGHT_BALANCE = '[PERFORMANCE OBJECTIVES APPROVAL] Load Objective Weight Balance',
  LOAD_WEIGHT_BALANCE_SUCCESS = '[PERFORMANCE OBJECTIVES APPROVAL] Load Objective Weight Balance Success',

  DELETE = '[PERFORMANCE OBJECTIVES APPROVAL] Delete',

}

export class ShowEditorObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.SHOW_EDITOR;
}

export class HideEditorObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.HIDE_EDITOR;
}

export class ShowViewerObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.SHOW_VIEWER;
}

export class HideViewerObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.HIDE_VIEWER;
}


export class ProcessingObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.PROCESSING;
}

export class NotProcessingObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.NOT_PROCESSING;
}

export class ProcessingDataGridObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.NOT_PROCESSING_DATA_GRID;
}

export class LoadObjectiveMasterDataObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_OBJECTIVE_MASTER_DATA;

  constructor(public payload: { employee_id: number, plan_id: number }) {}
}

export class LoadObjectiveMasterDataObjectiveApprovalSuccess implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_OBJECTIVE_MASTER_DATA_SUCCESS;

  constructor(public payload: IObjectiveMasterDto[]) {}
}

export class LoadHrObjectiveMasterDataObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_HR_OBJECTIVE_MASTER_DATA;

  constructor(public payload: { employee_id: number, plan_id: number }) {}
}

export class LoadHrObjectiveMasterDataObjectiveApprovalSuccess implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_HR_OBJECTIVE_MASTER_DATA_SUCCESS;

  constructor(public payload: IObjectiveMasterDto[]) {}
}

export class LoadWorkflowDataObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_WORKFLOW_DATA;

  constructor(public payload: number) {}
}

export class LoadWorkflowDataObjectiveApprovalSuccess implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_WORKFLOW_DATA_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPerspectivelistObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_PERSPECTIVE_LIST;

}

export class LoadPerspectivelistObjectiveApprovalSuccess implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS;

  constructor(public payload: IPerspective[]) {}
}

export class LoadWeightBalanceObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_WEIGHT_BALANCE;

  constructor(public payload: {perspectiveId: number, planId: number}) {}
}

export class LoadWeightBalanceObjectiveApprovalSuccess implements Action {
  readonly type = ObjectiveApprovalActionTypes.LOAD_WEIGHT_BALANCE_SUCCESS;

  constructor(public payload: string) {}
}

export class DeleteObjectiveApproval implements Action {
  readonly type = ObjectiveApprovalActionTypes.DELETE;

  constructor(public payload: {recordId: number, approvalInfo: any[]}) {}
}


export type ObjectiveApprovalActions =
  | ShowEditorObjectiveApproval
  | HideEditorObjectiveApproval
  | ShowViewerObjectiveApproval
  | HideViewerObjectiveApproval
  | ProcessingObjectiveApproval
  | NotProcessingObjectiveApproval
  | ProcessingDataGridObjectiveApproval
  | NotProcessingDataGridObjectiveApproval
  | LoadPerspectivelistObjectiveApproval
  | LoadPerspectivelistObjectiveApprovalSuccess
  | LoadWeightBalanceObjectiveApproval
  | LoadWeightBalanceObjectiveApprovalSuccess
  | LoadObjectiveMasterDataObjectiveApproval
  | LoadObjectiveMasterDataObjectiveApprovalSuccess
  | LoadHrObjectiveMasterDataObjectiveApproval
  | LoadHrObjectiveMasterDataObjectiveApprovalSuccess
  | LoadWorkflowDataObjectiveApproval
  | LoadWorkflowDataObjectiveApprovalSuccess
  | DeleteObjectiveApproval;
