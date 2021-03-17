import { Action } from '@ngrx/store';

import { IGuarantor } from '@nutela/models/workforce/employee-profiles';

export enum ReboardGuarantorActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - GUARANTOR] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - GUARANTOR] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - GUARANTOR] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - GUARANTOR] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - GUARANTOR] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - GUARANTOR] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - GUARANTOR] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - GUARANTOR] Load Data Success',

  LOAD_PHOTO = '[MY REBOARDING DATA - GUARANTOR] Load Photo',
  LOAD_PHOTO_SUCCESS = '[MY REBOARDING DATA - GUARANTOR] Load Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY REBOARDING DATA - GUARANTOR] Clear Viewer Photo',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - GUARANTOR] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - GUARANTOR] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - GUARANTOR] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - GUARANTOR] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - GUARANTOR] Load Inline Document Success',

  SAVE = '[MY REBOARDING DATA - GUARANTOR] Save',
  UPDATE = '[MY REBOARDING DATA - GUARANTOR] Save Update',
  DELETE_DATA = '[MY REBOARDING DATA - GUARANTOR] Delete Data',
}

export class ShowEditorReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.PROCESSING;
}

export class NotProcessingReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_DATA;
}

export class LoadDataReboardGuarantorSuccess implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IGuarantor[]) {}
}

export class LoadDocumentReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardGuarantorSuccess implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentReboardGuarantorSuccess implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.SAVE;

  constructor(public payload: {data: IGuarantor}) {}
}

export class SaveUpdateReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.UPDATE;

  constructor(public payload: {data: IGuarantor, recordId: number}) {}
}

export class DeleteDataReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class LoadPhotoReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPhotoReboardGuarantorSuccess implements Action {
  readonly type = ReboardGuarantorActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoReboardGuarantor implements Action {
  readonly type = ReboardGuarantorActionTypes.CLEAR_VIEWER_PHOTO;
}

export type ReboardGuarantorActions =
  | ShowEditorReboardGuarantor
  | HideEditorReboardGuarantor
  | ShowViewerReboardGuarantor
  | HideViewerReboardGuarantor
  | ProcessingReboardGuarantor
  | NotProcessingReboardGuarantor
  | LoadDataReboardGuarantor
  | LoadDataReboardGuarantorSuccess
  | LoadDocumentReboardGuarantor
  | LoadDocumentReboardGuarantorSuccess
  | ClearDocumentReboardGuarantor
  | LoadInlineDocumentReboardGuarantor
  | LoadInlineDocumentReboardGuarantorSuccess
  | SaveReboardGuarantor
  | SaveUpdateReboardGuarantor
  | DeleteDataReboardGuarantor
  | LoadPhotoReboardGuarantor
  | LoadPhotoReboardGuarantorSuccess
  | ClearViewerPhotoReboardGuarantor
  | LoadDataReboardGuarantor;
