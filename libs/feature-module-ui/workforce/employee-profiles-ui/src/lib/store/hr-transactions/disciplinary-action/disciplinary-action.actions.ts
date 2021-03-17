import { Action } from '@ngrx/store';
import { IDisciplinaryActionTransaction, IDisciplinaryActionDefinition, IRecommendationType} from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum DisciplinaryActionActionTypes {
  LOADING = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Loading',
  NOT_LOADING = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Not Loading',

  PROCESSING = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Not Processing',

  SHOW_EDITOR = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Hide Viewer',

  LOAD_APPROVED_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Awaiting Approval Data Success',

  LOAD_TAKE_ACTION_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Take Action Data',
  LOAD_TAKE_ACTION_DATA_SUCCESS = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Take Action Data Success',

  LOAD_ACTION_ROLES_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Action Roles',
  LOAD_ACTION_ROLES_DATA_SUCCESS = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Action Roles Succes s',

  LOAD_RECOMMENDATION_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Recommendation',
  LOAD_RECOMMENDATION_DATA_SUCCESS = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Recommendation Success',

  LOAD_RECOMMENDATION_LIST_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Recommendation Select Option',
  LOAD_RECOMMENDATION_LIST_DATA_SUCCESS = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Load Recommendation Select Option Success',

  SAVE_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Save Data Disciplinary Action',
  UPDATE_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Update Data Disciplinary Action',
  DELETE_DATA = '[HR_TRANSACTION - DISCIPLINARY_ACTION] Delete Data Disciplinary Action',
}

export class LoadingDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOADING;
}

export class NotLoadingDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.NOT_LOADING;
}

export class ProcessingDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.PROCESSING;
}

export class NotProcessingDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.NOT_PROCESSING;
}

export class ShowEditorDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.SHOW_EDITOR;
}

export class HideEditorDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HIDE_EDITOR;
}

export class ShowViewerDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.SHOW_VIEWER;
}

export class HideViewerDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HIDE_VIEWER;
}

export class LoadApprovedDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_APPROVED_DATA;

  constructor() {}
}

export class LoadApprovedDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IDisciplinaryActionTransaction[]) {}
}

export class LoadAwaitingApprovalDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_AWAITING_APPROVAL_DATA;

  constructor() {}
}

export class LoadAwaitingApprovalDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IDisciplinaryActionTransaction[]) {}
}

export class LoadTakeActionSelectOptionDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_TAKE_ACTION_DATA;

  constructor() {}
}

export class LoadTakeActionSelectOptionDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_TAKE_ACTION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadRecommendationSelectOptionDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_LIST_DATA;

  constructor() {}
}

export class LoadRecommendationSelectOptionDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_LIST_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadActionRoleSelectOptionDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_ACTION_ROLES_DATA;

  constructor() {}
}

export class LoadActionRoleSelectOptionDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_ACTION_ROLES_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadRecommendationDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadRecommendationDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_DATA_SUCCESS;

  constructor(public payload: IRecommendationType) {}
}

export class DeleteDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.DELETE_DATA;

  constructor(public payload: {dactionId: number}) {}
}


export class SaveDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.SAVE_DATA;

  constructor(public payload: { data: IDisciplinaryActionTransaction }) {}
}

export class UpdateDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.UPDATE_DATA;

  constructor(public payload: {dactionId: number, data: IDisciplinaryActionTransaction}) {}
}

export type DisciplinaryActionActions =
| LoadingDisciplinaryAction
| NotLoadingDisciplinaryAction
| ProcessingDisciplinaryAction
| NotProcessingDisciplinaryAction
| ShowEditorDisciplinaryAction
| HideEditorDisciplinaryAction
| ShowViewerDisciplinaryAction
| HideViewerDisciplinaryAction
| LoadApprovedDataDisciplinaryAction
| LoadApprovedDataDisciplinaryActionSuccess
| LoadAwaitingApprovalDataDisciplinaryAction
| LoadAwaitingApprovalDataDisciplinaryActionSuccess
| LoadTakeActionSelectOptionDataDisciplinaryAction
| LoadTakeActionSelectOptionDataDisciplinaryActionSuccess
| LoadActionRoleSelectOptionDataDisciplinaryAction
| LoadActionRoleSelectOptionDataDisciplinaryActionSuccess
| LoadRecommendationSelectOptionDataDisciplinaryAction
| LoadRecommendationSelectOptionDataDisciplinaryActionSuccess
| LoadRecommendationDataDisciplinaryAction
| LoadRecommendationDataDisciplinaryActionSuccess
| SaveDataDisciplinaryAction
| UpdateDataDisciplinaryAction
| DeleteDataDisciplinaryAction

