import { Action } from '@ngrx/store';

import { IGuarantor } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardGuarantorActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - GUARANTOR] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - GUARANTOR] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - GUARANTOR] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - GUARANTOR] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - GUARANTOR] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - GUARANTOR] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - GUARANTOR] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - GUARANTOR] Load Data Success',

  LOAD_PHOTO = '[HR REBOARDING DATA - GUARANTOR] Load Photo',
  LOAD_PHOTO_SUCCESS = '[HR REBOARDING DATA - GUARANTOR] Load Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR REBOARDING DATA - GUARANTOR] Clear Viewer Photo',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - GUARANTOR] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - GUARANTOR] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - GUARANTOR] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - GUARANTOR] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - GUARANTOR] Load Inline Document Success',

  SAVE = '[HR REBOARDING DATA - GUARANTOR] Save',
  UPDATE = '[HR REBOARDING DATA - GUARANTOR] Save Update',
  DELETE_DATA = '[HR REBOARDING DATA - GUARANTOR] Delete Data',
}

export class ShowEditorHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.PROCESSING;
}

export class NotProcessingHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_DATA;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadDataHrReboardGuarantorSuccess implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IGuarantor[]) {}
}

export class LoadDocumentHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHrReboardGuarantorSuccess implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentHrReboardGuarantorSuccess implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.SAVE;

  constructor(public payload: {data: IGuarantor, employeeId: number}) {}
}

export class SaveUpdateHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.UPDATE;

  constructor(public payload: {data: IGuarantor, recordId: number, employeeId: number}) {}
}

export class DeleteDataHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.DELETE_DATA;

  constructor(public payload: { guarantorId: number, employeeId: number}) {}
}

export class LoadPhotoHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPhotoHrReboardGuarantorSuccess implements Action {
  readonly type = HrReboardGuarantorActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoHrReboardGuarantor implements Action {
  readonly type = HrReboardGuarantorActionTypes.CLEAR_VIEWER_PHOTO;
}

export type HrReboardGuarantorActions =
  | ShowEditorHrReboardGuarantor
  | HideEditorHrReboardGuarantor
  | ShowViewerHrReboardGuarantor
  | HideViewerHrReboardGuarantor
  | ProcessingHrReboardGuarantor
  | NotProcessingHrReboardGuarantor
  | LoadDataHrReboardGuarantor
  | LoadDataHrReboardGuarantorSuccess
  | LoadDocumentHrReboardGuarantor
  | LoadDocumentHrReboardGuarantorSuccess
  | ClearDocumentHrReboardGuarantor
  | LoadInlineDocumentHrReboardGuarantor
  | LoadInlineDocumentHrReboardGuarantorSuccess
  | SaveHrReboardGuarantor
  | SaveUpdateHrReboardGuarantor
  | DeleteDataHrReboardGuarantor
  | LoadPhotoHrReboardGuarantor
  | LoadPhotoHrReboardGuarantorSuccess
  | ClearViewerPhotoHrReboardGuarantor
  | LoadDataHrReboardGuarantor;
