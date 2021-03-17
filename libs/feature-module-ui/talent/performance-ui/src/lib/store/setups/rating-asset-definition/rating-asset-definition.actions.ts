import { Action } from '@ngrx/store';

import { IRatingAssetDefinition, IPage } from '@nutela/models/talent/performance';

export enum RatingAssetDefinitionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Not Processing',

  LOADING = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Loading',
  NOT_LOADING = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Not Loading',

  LOAD_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Data Success',

  LOAD_PAGE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Page',
  LOAD_PAGE_DATA_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Page Success',

  LOAD_360PAGE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load 360 Page',
  LOAD_360PAGE_DATA_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load 360 Page Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS RATING_ASSET_DEFINITIONS] Remove Data',

}

export class ShowEditorRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.HIDE_EDITOR;
}


export class ShowViewerRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.SHOW_VIEWER;
}

export class HideViewerRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.HIDE_VIEWER;
}


export class ProcessingRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.PROCESSING;
}

export class NotProcessingRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.NOT_PROCESSING;
}

export class LoadingRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOADING;
}

export class NotLoadingRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.NOT_LOADING;
}



export class LoadDataRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_DATA;
  constructor(public payload: {assetTypeId: number}) {}
}

export class LoadDataRatingAssetDefinitionSuccess implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IRatingAssetDefinition[]) {}
}

export class LoadPageDataRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA;
  constructor(public payload: {pageType : number}) {}
}

export class LoadPageDataRatingAssetDefinitionSuccess implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadPageData360RatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA;
  constructor(public payload: {pageType : number}) {}
}

export class LoadPageData360RatingAssetDefinitionSuccess implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadDocumentRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentRatingAssetDefinitionSuccess implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.SAVE;

  constructor(public payload: {data: IRatingAssetDefinition, recordId: number, editMode: boolean, assetTypeId: number}) {}
}

export class AddRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.ADD;

  constructor(public payload: {data: IRatingAssetDefinition, assetTypeId: number}) {}
}


export class DeleteDataRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, assetTypeId: number}) {}
}


export class RemoveDataRatingAssetDefinition implements Action {
  readonly type = RatingAssetDefinitionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type RatingAssetDefinitionActions =
  | ShowEditorRatingAssetDefinition
  | HideEditorRatingAssetDefinition
  | ShowViewerRatingAssetDefinition
  | HideViewerRatingAssetDefinition
  | ProcessingRatingAssetDefinition
  | NotProcessingRatingAssetDefinition
  | LoadingRatingAssetDefinition
  | NotLoadingRatingAssetDefinition
  | LoadDataRatingAssetDefinition
  | LoadDataRatingAssetDefinitionSuccess
  | LoadPageDataRatingAssetDefinition
  | LoadPageDataRatingAssetDefinitionSuccess
  | LoadPageData360RatingAssetDefinition
  | LoadPageData360RatingAssetDefinitionSuccess
  | LoadDocumentRatingAssetDefinition
  | LoadDocumentRatingAssetDefinitionSuccess
  | ClearDocumentRatingAssetDefinition
  | LoadInlineDocumentRatingAssetDefinition
  | SaveRatingAssetDefinition
  | AddRatingAssetDefinition
  | DeleteDataRatingAssetDefinition
  | RemoveDataRatingAssetDefinition;
