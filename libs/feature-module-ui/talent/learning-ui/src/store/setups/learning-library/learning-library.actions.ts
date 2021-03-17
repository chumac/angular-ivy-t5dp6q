import { Action } from '@ngrx/store';
import { ILearningLibrary, ILearningApply, ILearningEnroll } from '@nutela/models/talent/learning';

export enum LearningLibraryActionTypes {

  PROCESSING = '[LEARNING SETUPS LEARNING Library] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS LEARNING Library] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS LEARNING Library] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS LEARNING Library] Load Data Success',

  CREATE_ENROLL = '[LEARNING SETUPS LEARNING Library] Create Enroll',
  CREATE_ENROLL_SUCCESS = '[LEARNING SETUPS LEARNING Library] Create Enroll Success',

  CREATE_APPLY = '[LEARNING SETUPS LEARNING Library] Create Apply',
  CREATE_APPLY_SUCCESS = '[LEARNING SETUPS LEARNING Library] Create Apply Success',

  SHOW_ENROLL_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Show Enroll Editor',
  HIDE_ENROLL_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Hide Enroll Editor',

  SHOW_APPLY_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Show Apply Editor',
  HIDE_APPLY_EDITOR = '[LEARNING SETUPS LEARNING PLAN] Hide Apply Editor',

}

export class ProcessingLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.PROCESSING;
}

export class NotProcessingLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.NOT_PROCESSING;
}

export class LoadDataLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.LOAD_DATA;
}

export class LoadDataLearningLibrarySuccess implements Action {
  readonly type = LearningLibraryActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ILearningLibrary[]) { }
}

export class ApplyLearningSaveLibrary implements Action {
  readonly type = LearningLibraryActionTypes.CREATE_APPLY;

  constructor(public payload: { data: ILearningApply }) { }
}

export class ApplyLearningSaveLibrarySuccess implements Action {
  readonly type = LearningLibraryActionTypes.CREATE_APPLY_SUCCESS;

  constructor(public payload: ILearningApply[]) { }
}

export class EnrollLearningSaveLibrary implements Action {
  readonly type = LearningLibraryActionTypes.CREATE_ENROLL;

  constructor(public payload: { data: ILearningEnroll }) { }
}

export class EnrollLearningSaveLibrarySuccess implements Action {
  readonly type = LearningLibraryActionTypes.CREATE_ENROLL_SUCCESS;

  constructor(public payload: ILearningEnroll[]) { }
}

export class ShowEnrollLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.SHOW_ENROLL_EDITOR;
}

export class HideEnrollLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.HIDE_ENROLL_EDITOR;
}

export class ShowApplyLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.SHOW_APPLY_EDITOR;
}

export class HideApplyLearningLibrary implements Action {
  readonly type = LearningLibraryActionTypes.HIDE_APPLY_EDITOR;
}

export type LearningLibraryActions =
  | ProcessingLearningLibrary
  | NotProcessingLearningLibrary
  | LoadDataLearningLibrary
  | LoadDataLearningLibrarySuccess
  | ApplyLearningSaveLibrary
  | ApplyLearningSaveLibrarySuccess
  | EnrollLearningSaveLibrarySuccess
  | EnrollLearningSaveLibrary
  | ShowEnrollLearningLibrary
  | HideEnrollLearningLibrary
  | ShowApplyLearningLibrary
  | HideApplyLearningLibrary