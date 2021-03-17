import { Action } from '@ngrx/store';

import { IPerformanceRecommendation, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum RecommendationActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS RECOMMENDATIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS RECOMMENDATIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS RECOMMENDATIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS RECOMMENDATIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS RECOMMENDATIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS RECOMMENDATIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS RECOMMENDATIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS RECOMMENDATIONS] Load Data Success',

  SAVE = '[PERFORMANCE SETUPS RECOMMENDATIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS RECOMMENDATIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS RECOMMENDATIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS RECOMMENDATIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS RECOMMENDATIONS] Delete Data',

  ACTIVATE_DATA = '[PERFORMANCE SETUPS RECOMMENDATIONS] Activate Data',
  DE_ACTIVATE_DATA = '[PERFORMANCE SETUPS RECOMMENDATIONS] De-Activate Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS RECOMMENDATIONS] Remove Data',

}

export class ShowEditorRecommendation implements Action {
  readonly type = RecommendationActionTypes.SHOW_EDITOR;
}

export class HideEditorRecommendation implements Action {
  readonly type = RecommendationActionTypes.HIDE_EDITOR;
}


export class ShowViewerRecommendation implements Action {
  readonly type = RecommendationActionTypes.SHOW_VIEWER;
}

export class HideViewerRecommendation implements Action {
  readonly type = RecommendationActionTypes.HIDE_VIEWER;
}


export class ProcessingRecommendation implements Action {
  readonly type = RecommendationActionTypes.PROCESSING;
}

export class NotProcessingRecommendation implements Action {
  readonly type = RecommendationActionTypes.NOT_PROCESSING;
}


export class LoadDataRecommendation implements Action {
  readonly type = RecommendationActionTypes.LOAD_DATA;
}

export class LoadDataRecommendationSuccess implements Action {
  readonly type = RecommendationActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPerformanceRecommendation[]) {}
}

export class SaveRecommendation implements Action {
  readonly type = RecommendationActionTypes.SAVE;

  constructor(public payload: {data: IPerformanceRecommendation, recordId: number, editMode: boolean}) {}
}

export class AddRecommendation implements Action {
  readonly type = RecommendationActionTypes.ADD;

  constructor(public payload: {data: IPerformanceRecommendation}) {}
}


export class DeleteDataRecommendation implements Action {
  readonly type = RecommendationActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class ActivateRecommendation implements Action {
  readonly type = RecommendationActionTypes.ACTIVATE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class DeActivateRecommendation implements Action {
  readonly type = RecommendationActionTypes.DE_ACTIVATE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveDataRecommendation implements Action {
  readonly type = RecommendationActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type RecommendationActions =
  | ShowEditorRecommendation
  | HideEditorRecommendation
  | ShowViewerRecommendation
  | HideViewerRecommendation
  | ProcessingRecommendation
  | NotProcessingRecommendation
  | LoadDataRecommendation
  | LoadDataRecommendationSuccess
  | SaveRecommendation
  | AddRecommendation
  | DeleteDataRecommendation
  | RemoveDataRecommendation;
