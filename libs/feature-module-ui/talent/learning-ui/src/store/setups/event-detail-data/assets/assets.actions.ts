import { Action } from '@ngrx/store';
import { IEventDetailAssets, IEventDetailAssetAvaiability, IEventDetailType } from '@nutela/models/talent/learning';

export enum AssetsActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS ASSETS] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS ASSETS] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS ASSETS] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS ASSETS] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS ASSETS] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS ASSETS] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS ASSETS] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS ASSETS] Load Data Success',

  LOAD_ASSETS_DOCUMENT = '[LEARNING SETUPS ASSETS] Load Document',
  LOAD_ASSETS_DOCUMENT_SUCCESS = '[LEARNING SETUPS ASSETS] Load Document Success',

  LOAD_DATA_TYPE = '[LEARNING SETUPS ASSETS] Load Data Type',
  LOAD_DATA_TYPE_SUCCESS = '[LEARNING SETUPS ASSETS] Load Data Type Success',

  LOAD_DATA_AVAILABLE = '[LEARNING SETUPS ASSETS] Load Data Available',
  LOAD_DATA_AVAILABLE_SUCCESS = '[LEARNING SETUPS ASSETS] Load Data Available Success',

  SAVE = '[LEARNING SETUPS ASSETS] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS ASSETS] Save Success',

  ADD = '[LEARNING SETUPS ASSETS] Add',
  ADD_SUCCESS = '[LEARNING SETUPS ASSETS] Add Success',

  DELETE_DATA = '[LEARNING SETUPS ASSETS] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS ASSETS] Remove Data',

}

export class ShowEditorAssets implements Action {
  readonly type = AssetsActionTypes.SHOW_EDITOR;
}

export class HideEditorAssets implements Action {
  readonly type = AssetsActionTypes.HIDE_EDITOR;
}


export class ShowViewerAssets implements Action {
  readonly type = AssetsActionTypes.SHOW_VIEWER;
}

export class HideViewerAssets implements Action {
  readonly type = AssetsActionTypes.HIDE_VIEWER;
}


export class ProcessingAssets implements Action {
  readonly type = AssetsActionTypes.PROCESSING;
}

export class NotProcessingAssets implements Action {
  readonly type = AssetsActionTypes.NOT_PROCESSING;
}


export class LoadDataAssets implements Action {
  readonly type = AssetsActionTypes.LOAD_DATA;

  constructor(public payload: {recordId: number}) {}
  
}

export class LoadDataAssetsSuccess implements Action {
  readonly type = AssetsActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEventDetailAssets[]) {}
}


export class LoadDocumentAssets implements Action {
  readonly type = AssetsActionTypes.LOAD_ASSETS_DOCUMENT;

  constructor(public payload: {docGuid: string, docExt: string}) {}
}

export class LoadDocumentAssetsSuccess implements Action {
  readonly type = AssetsActionTypes.LOAD_ASSETS_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}


export class SaveAssets implements Action {
  readonly type = AssetsActionTypes.SAVE;

  constructor(public payload: {data: IEventDetailAssets, recordId: number, editMode: boolean, eventDetailId: number }) {}
}

export class AddAssets implements Action {
  readonly type = AssetsActionTypes.ADD;

  constructor(public payload: {data: IEventDetailAssets, eventDetailId: number}) {}
}


export class DeleteDataAssets implements Action {
  readonly type = AssetsActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, eventDetailId: number}) {}
}


export class RemoveDataAssets implements Action {
  readonly type = AssetsActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadDataAvailableAssets implements Action {
  readonly type = AssetsActionTypes.LOAD_DATA_AVAILABLE;
}

export class LoadDataAvailableAssetsSuccess implements Action {
  readonly type = AssetsActionTypes.LOAD_DATA_AVAILABLE_SUCCESS;

  constructor(public payload: IEventDetailAssetAvaiability[]) {}
}

export class LoadDataAssetsType implements Action {
  readonly type = AssetsActionTypes.LOAD_DATA_TYPE;
}

export class LoadDataAssetsTypeSuccess implements Action {
  readonly type = AssetsActionTypes.LOAD_DATA_TYPE_SUCCESS;

  constructor(public payload: IEventDetailType[]) {}
}

export type AssetsActions =
  | ShowEditorAssets
  | HideEditorAssets
  | ShowViewerAssets
  | HideViewerAssets
  | ProcessingAssets
  | NotProcessingAssets
  | LoadDataAssets
  | LoadDataAssetsSuccess
  | SaveAssets
  | AddAssets
  | DeleteDataAssets
  | LoadDataAvailableAssets
  | LoadDataAvailableAssetsSuccess
  | LoadDataAssetsType
  | LoadDataAssetsTypeSuccess
  | LoadDocumentAssets
  | LoadDocumentAssetsSuccess
  | RemoveDataAssets;
