import { Action } from '@ngrx/store';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';

export enum HRBeneficiaryActionTypes {
  SHOW_EDITOR = '[HR PERSONAL DATA - BENEFICIARY] Show Editor',
  HIDE_EDITOR = '[HR PERSONAL DATA - BENEFICIARY] Hide Editor',

  SHOW_VIEWER = '[HR PERSONAL DATA - BENEFICIARY] Show Viewer',
  HIDE_VIEWER = '[HR PERSONAL DATA - BENEFICIARY] Hide Viewer',

  PROCESSING = '[HR PERSONAL DATA - BENEFICIARY] Processing',
  NOT_PROCESSING = '[HR PERSONAL DATA - BENEFICIARY] Not Processing',

  LOAD_APPROVED_DATA = '[HR PERSONAL DATA - BENEFICIARY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR PERSONAL DATA - BENEFICIARY] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = '[HR PERSONAL DATA - BENEFICIARY] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = '[HR PERSONAL DATA - BENEFICIARY] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = '[HR PERSONAL DATA - BENEFICIARY] Clear Approved Data Map',

  LOAD_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - BENEFICIARY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PERSONAL DATA - BENEFICIARY] Load Awaiting Approval Data Success',

  LOAD_APPROVED_PHOTO = '[HR PERSONAL DATA - PERSONAL BENEFICIARY] Load Approved Photo',
  LOAD_APPROVED_PHOTO_SUCCESS = '[HR PERSONAL DATA - PERSONAL BENEFICIARY] Load Approved Photo Success',


  LOAD_AWAITING_APPROVAL_PHOTO = '[HR PERSONAL DATA - PERSONAL BENEFICIARY] Load Awaiting Approval Photo',
  LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS = '[HR PERSONAL DATA - PERSONAL BENEFICIARY] Load Awaiting Approval Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR PERSONAL DATA - PERSONAL BENEFICIARY] Clear Viewer Photo',

  LOAD_STATES = '[HR PERSONAL DATA - BENEFICIARY] Load States',
  LOAD_STATES_READY = '[HR PERSONAL DATA - BENEFICIARY] Load States Ready',

  LOAD_CITIES = '[HR PERSONAL DATA - BENEFICIARY] Load Cities',
  LOAD_CITIES_READY = '[HR PERSONAL DATA - BENEFICIARY] Load Cities Ready',


  SAVE = '[HR PERSONAL DATA - BENEFICIARY] Save',
  SAVE_SUCCESS = '[HR PERSONAL DATA - BENEFICIARYL] Save Success',

  DELETE_APPROVED_DATA = '[HR PERSONAL DATA - BENEFICIARY] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - BENEFICIARY] Delete Awaiting Approval Data',

  REMOVE_APPROVED_DATA = '[HR PERSONAL DATA - BENEFICIARY] Remove Approved Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[HR PERSONAL DATA - BENEFICIARY] Remove Awaiting Approval Data',

  REFRESH_DATA = '[HR PERSONAL DATA - BENEFICIARY] Refresh Data',
}

export class ShowEditorHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.SHOW_EDITOR;
}

export class HideEditorHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.HIDE_EDITOR;
}


export class ShowViewerHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.SHOW_VIEWER;
}

export class HideViewerHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.HIDE_VIEWER;
}


export class ProcessingHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.PROCESSING;
}

export class NotProcessingHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_APPROVED_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadApprovedDataHRBeneficiarySuccess implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IBeneficiary[]) {}
}

export class LoadApprovedDataItemHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM;

  constructor(public payload: { recordId: number }) { }
}

export class LoadApprovedDataItemHRBeneficiarySuccess implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS;

  constructor(public payload: IBeneficiary) { }
}

export class ClearApprovedDataMapHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.CLEAR_APPROVED_DATA_MAP;
}


export class LoadAwaitingApprovalDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA;
  constructor(public payload: {employeeId:number}) {}
}

export class LoadAwaitingApprovalDataHRBeneficiarySuccess implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IBeneficiary[]) {}
}


export class LoadStatesHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesHRBeneficiaryReady implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesHRBeneficiaryReady implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}



export class SaveHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.SAVE;

  constructor(public payload: {data: IBeneficiary, recordId: number, editMode: boolean, employeeId: number}) {}
}


export class DeleteApprovedDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {data?: any, recordId: number, employeeId: number}) {}
}

export class DeleteAwaitingApprovalDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}


export class RemoveApprovedDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class RemoveAwaitingApprovalDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number, employeeId: number}) { }
}

export class LoadApprovedPhotoHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_APPROVED_PHOTO;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadApprovedPhotoHRBeneficiarySuccess implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_APPROVED_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalPhotoHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO;

  constructor(public payload: {recordId: number, employeeId:number}) {}
}

export class LoadAwaitingApprovalPhotoHRBeneficiarySuccess implements Action {
  readonly type = HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadDataHRBeneficiary implements Action {
  readonly type = HRBeneficiaryActionTypes.REFRESH_DATA;
}


export type HRBeneficiaryActions =
  | ShowEditorHRBeneficiary
  | HideEditorHRBeneficiary
  | ShowViewerHRBeneficiary
  | HideViewerHRBeneficiary
  | ProcessingHRBeneficiary
  | NotProcessingHRBeneficiary
  | LoadApprovedDataHRBeneficiary
  | LoadApprovedDataHRBeneficiarySuccess
  | LoadApprovedDataItemHRBeneficiary
  | LoadApprovedDataItemHRBeneficiarySuccess
  | ClearApprovedDataMapHRBeneficiary
  | LoadAwaitingApprovalDataHRBeneficiary
  | LoadAwaitingApprovalDataHRBeneficiarySuccess
  | LoadStatesHRBeneficiary
  | LoadStatesHRBeneficiaryReady
  | LoadCitiesHRBeneficiary
  | LoadCitiesHRBeneficiaryReady
  | SaveHRBeneficiary
  | DeleteApprovedDataHRBeneficiary
  | DeleteAwaitingApprovalDataHRBeneficiary
  | RemoveApprovedDataHRBeneficiary
  | RemoveAwaitingApprovalDataHRBeneficiary
  | LoadApprovedPhotoHRBeneficiary
  | LoadApprovedPhotoHRBeneficiarySuccess
  | LoadAwaitingApprovalPhotoHRBeneficiary
  | LoadAwaitingApprovalPhotoHRBeneficiarySuccess
  | ClearViewerPhotoHRBeneficiary
  | LoadDataHRBeneficiary;
