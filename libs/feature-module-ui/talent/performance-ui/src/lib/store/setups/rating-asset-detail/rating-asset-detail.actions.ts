import { Action } from '@ngrx/store';

import { IRatingAssetDetail, IRatingAssetDefinition } from '@nutela/models/talent/performance';

export enum RatingAssetDetailActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Data Success',

  LOAD_RATING_TABLE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Rating Table Data',
  LOAD_RATING_TABLE_DATA_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Rating Table Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Save Success',

  ADD = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DETAILS] Remove Data',

}

export class ShowEditorRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.SHOW_EDITOR;
}

export class HideEditorRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.HIDE_EDITOR;
}


export class ShowViewerRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.SHOW_VIEWER;
}

export class HideViewerRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.HIDE_VIEWER;
}


export class ProcessingRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.PROCESSING;
}

export class NotProcessingRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.NOT_PROCESSING;
}


export class LoadDataRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_DATA;

  constructor(public payload: {ratingDefId: number}) {}
}

export class LoadDataRatingAssetDetailSuccess implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IRatingAssetDetail[]) {}
}

export class LoadRatingTableRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_RATING_TABLE_DATA;
}

export class LoadRatingTableRatingAssetDetailSuccess implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_RATING_TABLE_DATA_SUCCESS;

  constructor(public payload: IRatingAssetDefinition[]) {}
}


export class LoadDocumentRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentRatingAssetDetailSuccess implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.SAVE;

  constructor(public payload: {data: IRatingAssetDetail, recordId: number, editMode: boolean, ratingDefId: number}) {}
}

export class AddRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.ADD;

  constructor(public payload: {data: IRatingAssetDetail, ratingDefId: number}) {}
}


export class DeleteDataRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, assetDefId: number}) {}
}


export class RemoveDataRatingAssetDetail implements Action {
  readonly type = RatingAssetDetailActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type RatingAssetDetailActions =
  | ShowEditorRatingAssetDetail
  | HideEditorRatingAssetDetail
  | ShowViewerRatingAssetDetail
  | HideViewerRatingAssetDetail
  | ProcessingRatingAssetDetail
  | NotProcessingRatingAssetDetail
  | LoadDataRatingAssetDetail
  | LoadDataRatingAssetDetailSuccess
  | LoadRatingTableRatingAssetDetail
  | LoadRatingTableRatingAssetDetailSuccess
  | LoadDocumentRatingAssetDetail
  | LoadDocumentRatingAssetDetailSuccess
  | ClearDocumentRatingAssetDetail
  | LoadInlineDocumentRatingAssetDetail
  | SaveRatingAssetDetail
  | AddRatingAssetDetail
  | DeleteDataRatingAssetDetail
  | RemoveDataRatingAssetDetail;
