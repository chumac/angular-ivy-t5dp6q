import { Action } from '@ngrx/store';

import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { INationalitySelectOption, IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export enum DependantActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - DEPENDANTS] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - DEPENDANTS] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - DEPENDANTS] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - DEPENDANTS] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - DEPENDANTS] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - DEPENDANTS] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - DEPENDANTS] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - DEPENDANTS] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = '[MY PERSONAL DATA - DEPENDANTS] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = '[MY PERSONAL DATA - DEPENDANTS] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = '[MY PERSONAL DATA - DEPENDANTS] Clear Approved Data Map',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - DEPENDANTS] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - DEPENDANTS] Load Awaiting Approval Data Success',

  LOAD_APPROVED_PHOTO = '[MY PERSONAL DATA - PERSONAL DEPENDANTS] Load Approved Photo',
  LOAD_APPROVED_PHOTO_SUCCESS = '[MY PERSONAL DATA - PERSONAL DEPENDANTS] Load Approved Photo Success',


  LOAD_AWAITING_APPROVAL_PHOTO = '[MY PERSONAL DATA - PERSONAL DEPENDANTS] Load Awaiting Approval Photo',
  LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS = '[MY PERSONAL DATA - PERSONAL DEPENDANTS] Load Awaiting Approval Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY PERSONAL DATA - PERSONAL DEPENDANTS] Clear Viewer Photo',


  LOAD_STATES = '[MY PERSONAL DATA - DEPENDANTS] Load States',
  LOAD_STATES_READY = '[MY PERSONAL DATA - DEPENDANTS] Load States Ready',

  LOAD_CITIES = '[MY PERSONAL DATA - DEPENDANTS] Load Cities',
  LOAD_CITIES_READY = '[MY PERSONAL DATA - DEPENDANTS] Load Cities Ready',



  SAVE = '[MY PERSONAL DATA - DEPENDANTS] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - DEPENDANTSL] Save Success',

  DELETE_APPROVED_DATA = '[MY PERSONAL DATA - DEPENDANTS] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - DEPENDANTS] Delete Awaiting Approval Data',

  REMOVE_APPROVED_DATA = '[MY PERSONAL DATA - DEPENDANTS] Remove Approved Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - DEPENDANTS] Remove Awaiting Approval Data',

  REFRESH_DATA = '[MY PERSONAL DATA - DEPENDANTS] Refresh Data',
}

export class ShowEditorDependant implements Action {
  readonly type = DependantActionTypes.SHOW_EDITOR;
}

export class HideEditorDependant implements Action {
  readonly type = DependantActionTypes.HIDE_EDITOR;
}


export class ShowViewerDependant implements Action {
  readonly type = DependantActionTypes.SHOW_VIEWER;
}

export class HideViewerDependant implements Action {
  readonly type = DependantActionTypes.HIDE_VIEWER;
}


export class ProcessingDependant implements Action {
  readonly type = DependantActionTypes.PROCESSING;
}

export class NotProcessingDependant implements Action {
  readonly type = DependantActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataDependant implements Action {
  readonly type = DependantActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataDependantSuccess implements Action {
  readonly type = DependantActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IDependant[]) {}
}


export class LoadApprovedDataItemDependant implements Action {
  readonly type = DependantActionTypes.LOAD_APPROVED_DATA_ITEM;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedDataItemDependantSuccess implements Action {
  readonly type = DependantActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS;

  constructor(public payload: IDependant) {}
}

export class ClearApprovedDataMapDependant implements Action {
  readonly type = DependantActionTypes.CLEAR_APPROVED_DATA_MAP;
}


export class LoadAwaitingApprovalDataDependant implements Action {
  readonly type = DependantActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataDependantSuccess implements Action {
  readonly type = DependantActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IDependant[]) {}
}

export class SaveDependant implements Action {
  readonly type = DependantActionTypes.SAVE;

  constructor(public payload: {data: IDependant, recordId: number, editMode: boolean}) {}
}

export class DeleteApprovedDataDependant implements Action {
  readonly type = DependantActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class DeleteAwaitingApprovalDataDependant implements Action {
  readonly type = DependantActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveApprovedDataDependant implements Action {
  readonly type = DependantActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveAwaitingApprovalDataDependant implements Action {
  readonly type = DependantActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}




export class LoadStatesDependant implements Action {
  readonly type = DependantActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesDependantReady implements Action {
  readonly type = DependantActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesDependant implements Action {
  readonly type = DependantActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesDependantReady implements Action {
  readonly type = DependantActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}

export class LoadApprovedPhotoDependant implements Action {
  readonly type = DependantActionTypes.LOAD_APPROVED_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedPhotoDependantSuccess implements Action {
  readonly type = DependantActionTypes.LOAD_APPROVED_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalPhotoDependant implements Action {
  readonly type = DependantActionTypes.LOAD_AWAITING_APPROVAL_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadAwaitingApprovalPhotoDependantSuccess implements Action {
  readonly type = DependantActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoDependant implements Action {
  readonly type = DependantActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadDataDependant implements Action {
  readonly type = DependantActionTypes.REFRESH_DATA;
}

export type DependantsActions =
  | ShowEditorDependant
  | HideEditorDependant
  | ShowViewerDependant
  | HideViewerDependant
  | ProcessingDependant
  | NotProcessingDependant
  | LoadApprovedDataDependant
  | LoadApprovedDataDependantSuccess
  | LoadApprovedDataItemDependant
  | LoadApprovedDataItemDependantSuccess
  | ClearApprovedDataMapDependant
  | LoadAwaitingApprovalDataDependant
  | LoadAwaitingApprovalDataDependantSuccess
  | LoadStatesDependant
  | LoadStatesDependantReady
  | LoadCitiesDependant
  | LoadCitiesDependantReady
  | SaveDependant
  | DeleteApprovedDataDependant
  | DeleteAwaitingApprovalDataDependant
  | RemoveApprovedDataDependant
  | RemoveAwaitingApprovalDataDependant
  | LoadApprovedPhotoDependant
  | LoadApprovedPhotoDependantSuccess
  | LoadAwaitingApprovalPhotoDependant
  | LoadAwaitingApprovalPhotoDependantSuccess
  | ClearViewerPhotoDependant
  | LoadDataDependant;
