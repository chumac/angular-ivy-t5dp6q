import { Action } from '@ngrx/store';

import { IFamily } from '@nutela/models/workforce/employee-profiles';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum FamilyActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - FAMILY] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - FAMILY] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - FAMILY] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - FAMILY] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - FAMILY] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - FAMILY] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - FAMILY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - FAMILY] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = '[MY PERSONAL DATA - FAMILY] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = '[MY PERSONAL DATA - FAMILY] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = '[MY PERSONAL DATA - FAMILY] Clear Approved Data Map',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - FAMILY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - FAMILY] Load Awaiting Approval Data Success',

  LOAD_APPROVED_PHOTO = '[MY PERSONAL DATA - PERSONAL FAMILY] Load Approved Photo',
  LOAD_APPROVED_PHOTO_SUCCESS = '[MY PERSONAL DATA - PERSONAL FAMILY] Load Approved Photo Success',


  LOAD_AWAITING_APPROVAL_PHOTO = '[MY PERSONAL DATA - PERSONAL FAMILY] Load Awaiting Approval Photo',
  LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS = '[MY PERSONAL DATA - PERSONAL FAMILY] Load Awaiting Approval Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY PERSONAL DATA - PERSONAL FAMILY] Clear Viewer Photo',

  LOAD_STATES = '[MY PERSONAL DATA - FAMILY] Load States',
  LOAD_STATES_READY = '[MY PERSONAL DATA - FAMILY] Load States Ready',

  LOAD_CITIES = '[MY PERSONAL DATA - FAMILY] Load Cities',
  LOAD_CITIES_READY = '[MY PERSONAL DATA - FAMILY] Load Cities Ready',

  LOAD_DOCUMENT = '[MY PERSONAL DATA - FAMILY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - FAMILY] Load Document Success',
  CLEAR_DOCUMENT = '[MY PERSONAL DATA - FAMILY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY PERSONAL DATA - FAMILY] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[MY PERSONAL DATA - FAMILY] Load Inline Document Success',

  SAVE = '[MY PERSONAL DATA - FAMILY] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - FAMILY] Save Success',

  DELETE_APPROVED_DATA = '[MY PERSONAL DATA - FAMILY] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - FAMILY] Delete Awaiting Approval Data',

  REMOVE_APPROVED_DATA = '[MY PERSONAL DATA - FAMILY] Remove Approved Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - FAMILY] Remove Awaiting Approval Data',

  REFRESH_DATA = '[MY PERSONAL DATA - FAMILY] Refresh Data',
}

export class ShowEditorFamily implements Action {
  readonly type = FamilyActionTypes.SHOW_EDITOR;
}

export class HideEditorFamily implements Action {
  readonly type = FamilyActionTypes.HIDE_EDITOR;
}


export class ShowViewerFamily implements Action {
  readonly type = FamilyActionTypes.SHOW_VIEWER;
}

export class HideViewerFamily implements Action {
  readonly type = FamilyActionTypes.HIDE_VIEWER;
}


export class ProcessingFamily implements Action {
  readonly type = FamilyActionTypes.PROCESSING;
}

export class NotProcessingFamily implements Action {
  readonly type = FamilyActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_APPROVED_DATA;

}

export class LoadApprovedDataFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IFamily[]) {}
}

export class LoadApprovedDataItemFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_APPROVED_DATA_ITEM;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedDataItemFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS;

  constructor(public payload: IFamily) {}
}

export class ClearApprovedDataMapFamily implements Action {
  readonly type = FamilyActionTypes.CLEAR_APPROVED_DATA_MAP;
}

export class LoadAwaitingApprovalDataFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_AWAITING_APPROVAL_DATA;

}

export class LoadAwaitingApprovalDataFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IFamily[]) {}
}

export class LoadStatesFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_STATES ;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesFamilyReady implements Action {
  readonly type = FamilyActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesFamilyReady implements Action {
  readonly type = FamilyActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}



export class LoadDocumentFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentFamily implements Action {
  readonly type = FamilyActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}



export class SaveFamily implements Action {
  readonly type = FamilyActionTypes.SAVE;

  constructor(public payload: {data: IFamily, recordId: number, editMode: boolean}) {}
}


export class DeleteApprovedDataFamily implements Action {
  readonly type = FamilyActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class DeleteAwaitingApprovalDataFamily implements Action {
  readonly type = FamilyActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveApprovedDataFamily implements Action {
  readonly type = FamilyActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveAwaitingApprovalDataFamily implements Action {
  readonly type = FamilyActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {
  }
}

export class LoadApprovedPhotoFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_APPROVED_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedPhotoFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_APPROVED_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalPhotoFamily implements Action {
  readonly type = FamilyActionTypes.LOAD_AWAITING_APPROVAL_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadAwaitingApprovalPhotoFamilySuccess implements Action {
  readonly type = FamilyActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoFamily implements Action {
  readonly type = FamilyActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadDataFamily implements Action {
  readonly type = FamilyActionTypes.REFRESH_DATA;
}

export type FamilyActions =
  | ShowEditorFamily
  | HideEditorFamily
  | ShowViewerFamily
  | HideViewerFamily
  | ProcessingFamily
  | NotProcessingFamily
  | LoadApprovedDataFamily
  | LoadApprovedDataFamilySuccess
  | LoadApprovedDataItemFamily
  | LoadApprovedDataItemFamilySuccess
  | ClearApprovedDataMapFamily
  | LoadAwaitingApprovalDataFamily
  | LoadAwaitingApprovalDataFamilySuccess
  | LoadStatesFamily
  | LoadStatesFamilyReady
  | LoadCitiesFamily
  | LoadCitiesFamilyReady
  | LoadDocumentFamily
  | LoadDocumentFamilySuccess
  | ClearDocumentFamily
  | LoadInlineDocumentFamily
  | LoadInlineDocumentFamilySuccess
  | SaveFamily
  | DeleteApprovedDataFamily
  | DeleteAwaitingApprovalDataFamily
  | RemoveApprovedDataFamily
  | RemoveAwaitingApprovalDataFamily
  | LoadApprovedPhotoFamily
  | LoadApprovedPhotoFamilySuccess
  | LoadAwaitingApprovalPhotoFamily
  | LoadAwaitingApprovalPhotoFamilySuccess
  | ClearViewerPhotoFamily
  | LoadDataFamily;
