import { Action } from '@ngrx/store';
import { IEmployeeOptOutEvent, ILearningApply, ILearningEnroll, ILearningPlan, IUpdateMyEvent } from '@nutela/models/talent/learning';

export enum LearningPlanActionTypes {

  SHOW_OPTOUT_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Show Optout Editor',
  HIDE_OPTOUT_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Hide Optout Editor',

  SHOW_EDIT_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Show Editor',
  HIDE_EDIT_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Hide Editor',

  PROCESSING = '[LEARNING SETUPS LEARNING PLAN] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS LEARNING PLAN] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS LEARNING PLAN] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS LEARNING PLAN] Load Data Success',

  GOTO_DATA = '[LEARNING SETUPS LEARNING PLAN] Goto Data',
  GOTO_DATA_SUCCESS = '[LEARNING SETUPS LEARNING PLAN] Goto Data Success',
  GOTO_DATA_AFTER_SUCCESS = '[LEARNING SETUPS LEARNING PLAN] Goto Data After Success',

  EMPLOYEE_OPTOUT_DATA = '[LEARNING SETUPS LEARNING PLAN] Employee optout data',
  EMPLOYEE_OPTOUT_DATA_SUCCESS = '[LEARNING SETUPS LEARNING PLAN] Employee optout data success',

  DELETE_DATA = '[LEARNING SETUPS LEARNING PLAN] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS LEARNING PLAN] Remove Data',

  CREATE_ENROLL = '[LEARNING SETUPS LEARNING Library] Create Enroll',
  CREATE_ENROLL_SUCCESS = '[LEARNING SETUPS LEARNING Library] Create Enroll Success',

  CREATE_APPLY = '[LEARNING SETUPS LEARNING Library] Create Apply',
  CREATE_APPLY_SUCCESS = '[LEARNING SETUPS LEARNING Library] Create Apply Success',

  EDIT_EVENT = '[LEARNING SETUPS LEARNING Library] Edit event',
  EDIT_EVENT_SUCCESS = '[LEARNING SETUPS LEARNING Library] Edit event Success',

  SHOW_ENROLL_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Show Enroll Editor',
  HIDE_ENROLL_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Hide Enroll Editor',

  SHOW_APPLY_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Show Apply Editor',
  HIDE_APPLY_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Hide Apply Editor',

}

export class ShowOptOutEditorLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.SHOW_OPTOUT_EDITOR;
}

export class HideOptOutEditorLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.HIDE_OPTOUT_EDITOR;
}

export class ShowEditorLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.SHOW_EDIT_EDITOR;
}

export class HideEditorLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.HIDE_EDIT_EDITOR;
}

export class ProcessingLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.PROCESSING;
}

export class NotProcessingLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.NOT_PROCESSING;
}


export class LoadDataLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.LOAD_DATA;

  constructor(public payload: {recordId: number}) {}

}

export class LoadDataLearningPlanSuccess implements Action {
  readonly type = LearningPlanActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ILearningPlan[]) {}
}

export class GotoDataLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.GOTO_DATA;

  constructor(public payload: {code: string}) {}

}

export class GotoDataLearningPlanSuccess implements Action {
  readonly type = LearningPlanActionTypes.GOTO_DATA_SUCCESS;

  constructor(public payload: any) {}

}

export class GotoDataLearningPlanAfterSuccess implements Action {
  readonly type = LearningPlanActionTypes.GOTO_DATA_AFTER_SUCCESS;
}



export class EmployeeOptOutEvent implements Action {
  readonly type = LearningPlanActionTypes.EMPLOYEE_OPTOUT_DATA;

  constructor(public payload: {data: IEmployeeOptOutEvent, recordId: number, eventType: number}) {}
}

export class EmployeeOptOutEventSuccess implements Action {
  readonly type = LearningPlanActionTypes.EMPLOYEE_OPTOUT_DATA_SUCCESS;

  constructor(public payload: IEmployeeOptOutEvent[]) {}
}

export class DeleteDataLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, eventType: number}) {}
}


export class RemoveDataLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number, eventType: number}) {}
}

export class ApplyLearningLibrary implements Action {
  readonly type = LearningPlanActionTypes.CREATE_APPLY;

  constructor(public payload: { data: ILearningApply }) { }
}

export class ApplyLearningLibrarySuccess implements Action {
  readonly type = LearningPlanActionTypes.CREATE_APPLY_SUCCESS;

  constructor(public payload: ILearningApply[]) { }
}

export class EditLearningPlan implements Action {
  readonly type = LearningPlanActionTypes.EDIT_EVENT;

  constructor(public payload: { data: IUpdateMyEvent, recordId: number }) { }
}

export class EditLearningPlanSuccess implements Action {
  readonly type = LearningPlanActionTypes.EDIT_EVENT_SUCCESS;

  constructor(public payload: IUpdateMyEvent[]) { }
}

export class EnrollLearningLibrary implements Action {
  readonly type = LearningPlanActionTypes.CREATE_ENROLL;

  constructor(public payload: { data: ILearningEnroll }) { }
}

export class EnrollLearningLibrarySuccess implements Action {
  readonly type = LearningPlanActionTypes.CREATE_ENROLL_SUCCESS;

  constructor(public payload: ILearningEnroll[]) { }
}

export class ShowEnrollEditorLearningLibrary implements Action {
  readonly type = LearningPlanActionTypes.SHOW_ENROLL_EDITOR;
}

export class HideEnrollEditorLearningLibrary implements Action {
  readonly type = LearningPlanActionTypes.HIDE_ENROLL_EDITOR;
}

export class ShowApplyEditorLearningLibrary implements Action {
  readonly type = LearningPlanActionTypes.SHOW_APPLY_EDITOR;
}

export class HideApplyEditorLearningLibrary implements Action {
  readonly type = LearningPlanActionTypes.HIDE_APPLY_EDITOR;
}

export type LearningPlanActions =
  | ShowOptOutEditorLearningPlan
  | HideOptOutEditorLearningPlan
  | ProcessingLearningPlan
  | NotProcessingLearningPlan
  | LoadDataLearningPlan
  | LoadDataLearningPlanSuccess
  | DeleteDataLearningPlan
  | EmployeeOptOutEvent
  | EmployeeOptOutEventSuccess
  | ApplyLearningLibrary
  | ApplyLearningLibrarySuccess
  | EnrollLearningLibrarySuccess
  | EnrollLearningLibrary
  | ShowEnrollEditorLearningLibrary
  | HideEnrollEditorLearningLibrary
  | ShowApplyEditorLearningLibrary
  | HideApplyEditorLearningLibrary
  | GotoDataLearningPlan
  | GotoDataLearningPlanSuccess
  | EditLearningPlan
  | EditLearningPlanSuccess
  | ShowEditorLearningPlan
  | HideEditorLearningPlan
  | GotoDataLearningPlanAfterSuccess
  | RemoveDataLearningPlan;
