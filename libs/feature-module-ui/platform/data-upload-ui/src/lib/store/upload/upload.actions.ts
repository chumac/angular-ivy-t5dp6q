import { Action } from '@ngrx/store';
import { IUpload, ITemplateImport, IUploadStatus } from '@nutela/models/platform/data-upload';
import { ISelectOption } from '@nutela/models/core-data';



export enum UploadActionTypes {

  SHOW_EDITOR = '[ UPLOAD] Show Editor',
  HIDE_EDITOR = '[UPLOAD] Hide Editor',

  SHOW_VIEWER = '[ UPLOAD] Show VIEWER',
  HIDE_VIEWER = '[UPLOAD] Hide VIEWER',

  PROCESSING = '[ UPLOAD ] Processing',
  NOT_PROCESSING = '[ UPLOAD ] Not Processing',

  LOADING = '[ UPLOAD ] LOADING',
  NOT_LOADING = '[ UPLOAD ] Not LOADING',

  LOAD_UPLOAD_DATA = '[ UPLOAD] Load UPLOAD Data',
  LOAD_UPLOAD_DATA_SUCCESS = '[ UPLOAD] Load UPLOAD Data Success',

  LOAD_TEMPLATE_DATA = '[ UPLOAD] Load TEMPLATE Data',
  LOAD_TEMPLATE_DATA_SUCCESS = '[ UPLOAD] Load TEMPLATE Data Success',

  LOAD_UPLOAD_STATUS = '[ UPLOAD] Load UPLOAD STATUS',
  LOAD_UPLOAD_STATUS_SUCCESS = '[ UPLOAD] Load UPLOAD STATUS Success',

  LOAD_STATUS = '[ UPLOAD] Load STATUS',
  LOAD_STATUS_SUCCESS = '[ UPLOAD] Load STATUS Success',

  LOAD_CURRENT_STATUS_SUCCESS = '[ UPLOAD] Load CURRENT STATUS Success',

  LOAD_DESTINATION = '[ UPLOAD] Load DESTINATION',
  LOAD_DESTINATION_SUCCESS = '[ UPLOAD] Load DESTINATION Success',

  SAVE = '[UPLOAD] Save',
  SAVE_SUCCESS = '[ UPLOAD] Save Success',

  UPDATE = '[UPDATE UPLOAD] UPDATE',
  UPDATE_SUCCESS = '[UPDATE UPLOAD] UPDATE Success',

  REVERSE = '[REVERSE UPLOAD] REVERSE',
  REVERSE_SUCCESS = '[REVERSE UPLOAD] REVERSE Success',

  DELETE_UPLOAD_DATA = '[UPLOAD] Delete UPLOAD Data',
}


export class ShowEditorUpload implements Action {
  readonly type = UploadActionTypes.SHOW_EDITOR;
}

export class HideEditorUpload implements Action {
  readonly type = UploadActionTypes.HIDE_EDITOR;
}

export class ShowViewerUpload implements Action {
  readonly type = UploadActionTypes.SHOW_VIEWER;
}

export class HideViewerUpload implements Action {
  readonly type = UploadActionTypes.HIDE_VIEWER;
}

export class ProcessingUpload implements Action {
  readonly type = UploadActionTypes.PROCESSING;
}

export class NotProcessingUpload implements Action {
  readonly type = UploadActionTypes.NOT_PROCESSING;
}

export class LoadingUpload implements Action {
  readonly type = UploadActionTypes.LOADING;
}

export class NotLoadingUpload implements Action {
  readonly type = UploadActionTypes.NOT_LOADING;
}


export class LoadUploadData implements Action {
  readonly type = UploadActionTypes.LOAD_UPLOAD_DATA;
  constructor(public payload: { statusId:number}) {}
}

export class LoadUploadSuccess implements Action {
  readonly type = UploadActionTypes.LOAD_UPLOAD_DATA_SUCCESS;
  constructor(public payload: IUpload[]) {}
}

export class LoadTemplateData implements Action {
  readonly type = UploadActionTypes.LOAD_TEMPLATE_DATA;
}

export class LoadTemplateSuccess implements Action {
  readonly type = UploadActionTypes.LOAD_TEMPLATE_DATA_SUCCESS;
  constructor(public payload: ITemplateImport[]) {}
}

export class LoadUploadStatus implements Action {
  readonly type = UploadActionTypes.LOAD_UPLOAD_STATUS;
  constructor(public payload: { Id:number}) {}
}

export class LoadUploadStatusSuccess implements Action {
  readonly type = UploadActionTypes.LOAD_UPLOAD_STATUS_SUCCESS;
  constructor(public payload: IUploadStatus[]) {}
}

export class LoadStatus implements Action {
  readonly type = UploadActionTypes.LOAD_STATUS;
}

export class LoadStatusSuccess implements Action {
  readonly type = UploadActionTypes.LOAD_STATUS_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}


export class LoadCurrentStatusSuccess implements Action {
  readonly type = UploadActionTypes.LOAD_CURRENT_STATUS_SUCCESS;
  constructor(public payload: any) {}
}


export class LoadDestination implements Action {
  readonly type = UploadActionTypes.LOAD_DESTINATION;
}

export class LoadDestinationSuccess implements Action {
  readonly type = UploadActionTypes.LOAD_DESTINATION_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveUpload implements Action {
  readonly type = UploadActionTypes.SAVE;
  constructor(public payload: {data: IUpload, statusId:number}) {}
}

export class UpdateUpload implements Action {
  readonly type = UploadActionTypes.UPDATE;
  constructor(public payload: {data: IUpload, recordId: number}) {}
}

export class ReverseUpload implements Action {
  readonly type = UploadActionTypes.REVERSE;
  constructor(public payload: {recordId:number, statusId: number}) {}
}

export class DeleteUpload implements Action{
  readonly type =UploadActionTypes.DELETE_UPLOAD_DATA;
  constructor(public payload: { recordId: number, statusId: number}) {}
}

export type UploadActions =
  | ShowEditorUpload
  | HideEditorUpload
  | ShowViewerUpload
  | HideViewerUpload
  | ProcessingUpload
  | NotProcessingUpload
  | LoadingUpload
  | NotLoadingUpload
  | LoadUploadData
  | LoadUploadSuccess
  | LoadTemplateData
  | LoadTemplateSuccess
  | LoadUploadStatus
  | LoadUploadStatusSuccess
  | LoadStatus
  | LoadStatusSuccess
  | LoadCurrentStatusSuccess
  | LoadDestination
  | LoadDestinationSuccess
  | SaveUpload
  | UpdateUpload
  | ReverseUpload
  | DeleteUpload;
