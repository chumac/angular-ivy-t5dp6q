import { Action } from '@ngrx/store';
import { IObjectiveMasterDto, IPlan, IRecallObjective, IObjectiveMasterInfo } from '@nutela/models/talent/performance';
import { IPerspective } from 'libs/models/talent/performance/src/lib/interfaces/perspective.interface';

export enum ManageObjectivesActionTypes {
  SHOW_EDITOR = '[PERFORMANCE MANAGE OBJECTIVES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE MANAGE OBJECTIVES] Hide Editor',

  SHOW_RECALL = '[PERFORMANCE MANAGE OBJECTIVES] Show Recall',
  HIDE_RECALL = '[PERFORMANCE MANAGE OBJECTIVES] Hide Recall',

  SHOW_VIEWER = '[PERFORMANCE MANAGE OBJECTIVES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE MANAGE OBJECTIVES] Hide Viewer',

  PROCESSING = '[PERFORMANCE MANAGE OBJECTIVES] Processing',
  NOT_PROCESSING = '[PERFORMANCE MANAGE OBJECTIVES] Not Processing',

  PROCESSING_DATA_GRID = '[PERFORMANCE MANAGE OBJECTIVES] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[PERFORMANCE MANAGE OBJECTIVES] Not Processing Data Grid',

  LOAD_PLAN_LIST = '[PERFORMANCE MANAGE OBJECTIVES] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Load Plan List Success',

  LOAD_PERSPECTIVE_LIST = '[PERFORMANCE MANAGE OBJECTIVES] Load Perspective List',
  LOAD_PERSPECTIVE_LIST_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Load Perspective List Success',

  LOAD_UNSUBMITTED_OBJECTIVE_MASTER_DATA = '[PERFORMANCE MANAGE OBJECTIVES] Load Unsubmitted Objective Master Data',
  LOAD_SUBMITTED_OBJECTIVE_MASTER_DATA = '[PERFORMANCE MANAGE OBJECTIVES] Load Submitted Objective Master Data',
  LOAD_APPROVED_OBJECTIVE_MASTER_DATA = '[PERFORMANCE MANAGE OBJECTIVES] Load Approved Objective Master Data',

  LOAD_OBJECTIVE_MASTER_DATA = '[PERFORMANCE MANAGE OBJECTIVES] Load Objective Master Data',
  LOAD_OBJECTIVE_MASTER_DATA_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Load Objective Master Data Success',

  LOAD_PRESCORED_OBJECTIVE_MASTER_DATA = '[PERFORMANCE MANAGE OBJECTIVES] Load Pre-scored Objective Master Data',
  LOAD_PRESCORED_OBJECTIVE_MASTER_DATA_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Load Pre-scored Objective Master Data Success',


  LOAD_OBJECTIVE_OBJECTIVE_INFO_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Load Objective Info Success',

  LOAD_WEIGHT_BALANCE = '[PERFORMANCE MANAGE OBJECTIVES] Load Objective Weight Balance',
  LOAD_WEIGHT_BALANCE_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Load Objective Weight Balance Success',


  LM_LOAD_WEIGHT_BALANCE = '[PERFORMANCE MANAGE OBJECTIVES] LM Load Objective Weight Balance',
  LM_LOAD_WEIGHT_BALANCE_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] LM Load Objective Weight Balance Success',


  SAVE = '[PERFORMANCE MANAGE OBJECTIVES] Save',
  SAVE_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Save Success',
  SAVE_FAILURE = '[PERFORMANCE MANAGE OBJECTIVES] Save Failure',

  SAVE_FROM_APPROVAL = '[PERFORMANCE MANAGE OBJECTIVES] Save From Approval',
  SAVE_FROM_APPROVAL_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Save From Approval Success',
  SAVE_FROM_APPROVAL_FAILURE = '[PERFORMANCE MANAGE OBJECTIVES] Save From Approval Failure',

  EDIT_FROM_APPROVAL = '[PERFORMANCE MANAGE OBJECTIVES] Edit From Approval',
  EDIT_FROM_APPROVAL_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Edit From Approval Success',
  EDIT_FROM_APPROVAL_FAILURE = '[PERFORMANCE MANAGE OBJECTIVES] Edit From Approval Failure',

  EDIT = '[PERFORMANCE MANAGE OBJECTIVES] Edit',
  EDIT_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Edit Success',
  EDIT_FAILURE = '[PERFORMANCE MANAGE OBJECTIVES] Edit Failure',

  RECALL = '[PERFORMANCE MANAGE OBJECTIVES] Recall',
  RECALL_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Recall Success',
  RECALL_FAILURE = '[PERFORMANCE MANAGE OBJECTIVES] Recall Failure',

  SUBMIT = '[PERFORMANCE MANAGE OBJECTIVES] Submit',
  SUBMIT_SUCCESS = '[PERFORMANCE MANAGE OBJECTIVES] Submit Success',
  SUBMIT_FAILURE = '[PERFORMANCE MANAGE OBJECTIVES] Submit Failure',

  DELETE = '[PERFORMANCE MANAGE OBJECTIVES] Delete',

  DELETE_ALL = '[PERFORMANCE MANAGE OBJECTIVES] Delete All',

  RESET_COMPONENT = '[PERFORMANCE MANAGE OBJECTIVES] Reset Component',

  TRIGGER_UNSUBMITTED_BTN_ACTION = '[PERFORMANCE MANAGE OBJECTIVES] UnSubmitted Btn Action',
  TRIGGER_AWAITING_APPROVAL_BTN_ACTION = '[PERFORMANCE MANAGE OBJECTIVES]  Awaiting Approval Btn Action',
  TRIGGER_APPROVED_BTN_ACTION = '[PERFORMANCE MANAGE OBJECTIVES]  Approved Btn Action',


}

export class ShowEditorManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.SHOW_EDITOR;
}

export class HideEditorManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.HIDE_EDITOR;
}

export class ShowRecallManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.SHOW_RECALL;
}

export class HideRecallManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.HIDE_RECALL;
}

export class ShowViewerManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.SHOW_VIEWER;
}

export class HideViewerManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.HIDE_VIEWER;
}


export class ProcessingManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.PROCESSING;
}

export class NotProcessingManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.NOT_PROCESSING;
}

export class ProcessingDataGridManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.NOT_PROCESSING_DATA_GRID;
}

export class LoadPlanlistManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_PLAN_LIST;

}

export class LoadPlanlistManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class LoadPerspectivelistManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_PERSPECTIVE_LIST;

}

export class LoadPerspectivelistManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS;

  constructor(public payload: IPerspective[]) {}
}

export class SaveManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.SAVE;
  constructor(public payload: { objectiveData: IObjectiveMasterDto, recordId: number, editMode: boolean, planId: number }) {}
}

export class SaveManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.SAVE_SUCCESS;
}

export class SaveManageObjectivesFailure implements Action {
  readonly type = ManageObjectivesActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class SaveFromApprovalManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.SAVE_FROM_APPROVAL;
  constructor(public payload: { objectiveData: IObjectiveMasterDto, recordId: number, editMode: boolean, approvalInfo: any }) {}
}

export class SaveFromApprovalManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.SAVE_FROM_APPROVAL_SUCCESS;
}

export class SaveFromApprovalManageObjectivesFailure implements Action {
  readonly type = ManageObjectivesActionTypes.SAVE_FROM_APPROVAL_FAILURE;

  constructor(public error: any) {}
}

export class EditManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.EDIT;
  constructor(public payload: { objectiveData: IObjectiveMasterDto, recordId: number, editMode: boolean, planID: number }) {}
}

export class EditManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.EDIT_SUCCESS;
}

export class EditManageObjectivesFailure implements Action {
  readonly type = ManageObjectivesActionTypes.EDIT_FAILURE;

  constructor(public error: any) {}
}

export class EditFromApprovalManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.EDIT_FROM_APPROVAL;
  constructor(public payload: { objectiveData: IObjectiveMasterDto, recordId: number, editMode: boolean, planID: number, approvalInfo: any }) {}
}

export class EditFromApprovalManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.EDIT_FROM_APPROVAL_SUCCESS;
}

export class EditFromApprovalManageObjectivesFailure implements Action {
  readonly type = ManageObjectivesActionTypes.EDIT_FROM_APPROVAL_FAILURE;

  constructor(public error: any) {}
}




export class LoadPreScoredObjectiveMasterDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA;

  constructor(public payload: {planId: number}) {}
}


export class LoadPreScoredObjectiveMasterDataManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA_SUCCESS;

  constructor(public payload: IObjectiveMasterDto[]) {}
}


export class LoadObjectiveMasterDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA;

  constructor(public payload: number) {}
}

export class LoadUnsubmittedObjectiveMasterDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_UNSUBMITTED_OBJECTIVE_MASTER_DATA;

  constructor(public payload: number) {}
}

export class LoadSubmittedObjectiveMasterDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_SUBMITTED_OBJECTIVE_MASTER_DATA;

  constructor(public payload: number) {}
}

export class LoadApprovedObjectiveMasterDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_APPROVED_OBJECTIVE_MASTER_DATA;

  constructor(public payload: number) {}
}

export class LoadObjectiveMasterDataManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA_SUCCESS;

  constructor(public payload: IObjectiveMasterDto[]) {}
}

export class LoadWeightBalance implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_WEIGHT_BALANCE;

  constructor(public payload: { perspectiveId: number, planId: number}) {}
}

export class LoadWeightBalanceSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_WEIGHT_BALANCE_SUCCESS;

  constructor(public payload: string) {}
}

export class LoadWeightBalanceLM implements Action {
  readonly type = ManageObjectivesActionTypes.LM_LOAD_WEIGHT_BALANCE;

  constructor(public payload: { perspectiveId: number, planId: number, employeeId: number}) {}
}

export class LoadWeightBalanceLMSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LM_LOAD_WEIGHT_BALANCE_SUCCESS;

  constructor(public payload: string) {}
}

export class RecallManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.RECALL;
  constructor(public payload: { recallData: IRecallObjective }) {}
}

export class RecallManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.RECALL_SUCCESS;
}

export class RecallManageObjectivesFailure implements Action {
  readonly type = ManageObjectivesActionTypes.RECALL_FAILURE;

  constructor(public error: any) {}
}

export class SubmitManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.SUBMIT;
  constructor(public payload: number) {}
}

export class SubmitManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.SUBMIT_SUCCESS;
}

export class SubmitManageObjectivesFailure implements Action {
  readonly type = ManageObjectivesActionTypes.SUBMIT_FAILURE;

  constructor(public error: any) {}
}

export class DeleteObjectiveDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.DELETE;

  constructor(public payload: {recordId: number, planID: number}) {}
}

export class DeleteAllObjectiveDataManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.DELETE_ALL;

  constructor(public payload: {recordId: number, planID: number}) {}
}

export class ResetComponentManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.RESET_COMPONENT;
}

export class TriggerUnSubmittedBtnManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.TRIGGER_UNSUBMITTED_BTN_ACTION;
}

export class TriggerAwaitingApprovalBtnManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.TRIGGER_AWAITING_APPROVAL_BTN_ACTION;
}

export class TriggerApprovedBtnManageObjectives implements Action {
  readonly type = ManageObjectivesActionTypes.TRIGGER_APPROVED_BTN_ACTION;
}

export class LoadObjectiveInfoManageObjectivesSuccess implements Action {
  readonly type = ManageObjectivesActionTypes.LOAD_OBJECTIVE_OBJECTIVE_INFO_SUCCESS;
  constructor(public payload: IObjectiveMasterDto) {}
}


export type ManageObjectivesActions =
  | ShowEditorManageObjectives
  | HideEditorManageObjectives
  | ShowRecallManageObjectives
  | HideRecallManageObjectives
  | ShowViewerManageObjectives
  | HideViewerManageObjectives
  | ProcessingManageObjectives
  | NotProcessingManageObjectives
  | ProcessingDataGridManageObjectives
  | NotProcessingDataGridManageObjectives
  | LoadPlanlistManageObjectives
  | LoadPlanlistManageObjectivesSuccess
  | LoadPerspectivelistManageObjectives
  | LoadPerspectivelistManageObjectivesSuccess
  | LoadObjectiveMasterDataManageObjectives
  | LoadObjectiveMasterDataManageObjectivesSuccess
  | LoadWeightBalance
  | LoadWeightBalanceSuccess
  | LoadWeightBalanceLM
  | LoadWeightBalanceLMSuccess
  | LoadUnsubmittedObjectiveMasterDataManageObjectives
  | LoadSubmittedObjectiveMasterDataManageObjectives
  | LoadApprovedObjectiveMasterDataManageObjectives
  | RecallManageObjectives
  | RecallManageObjectivesSuccess
  | RecallManageObjectivesFailure
  | SubmitManageObjectives
  | SubmitManageObjectivesSuccess
  | SubmitManageObjectivesFailure
  | DeleteObjectiveDataManageObjectives
  | DeleteAllObjectiveDataManageObjectives
  | ResetComponentManageObjectives
  | TriggerUnSubmittedBtnManageObjectives
  | TriggerAwaitingApprovalBtnManageObjectives
  | TriggerApprovedBtnManageObjectives
  | LoadObjectiveInfoManageObjectivesSuccess
  | LoadPreScoredObjectiveMasterDataManageObjectives
  | LoadPreScoredObjectiveMasterDataManageObjectivesSuccess;
