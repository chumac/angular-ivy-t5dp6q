import { Action } from '@ngrx/store';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';

export enum BeneficiaryActionTypes {
  SHOW_EDITOR = '[MY PERSONAL DATA - BENEFICIARY] Show Editor',
  HIDE_EDITOR = '[MY PERSONAL DATA - BENEFICIARY] Hide Editor',

  SHOW_VIEWER = '[MY PERSONAL DATA - BENEFICIARY] Show Viewer',
  HIDE_VIEWER = '[MY PERSONAL DATA - BENEFICIARY] Hide Viewer',

  PROCESSING = '[MY PERSONAL DATA - BENEFICIARY] Processing',
  NOT_PROCESSING = '[MY PERSONAL DATA - BENEFICIARY] Not Processing',

  LOAD_APPROVED_DATA = '[MY PERSONAL DATA - BENEFICIARY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[MY PERSONAL DATA - BENEFICIARY] Load Approved Data Success',

  LOAD_APPROVED_DATA_ITEM = '[MY PERSONAL DATA - BENEFICIARY] Load Approved Data Item',
  LOAD_APPROVED_DATA_ITEM_SUCCESS = '[MY PERSONAL DATA - BENEFICIARY] Load Approved Data Item Success',
  CLEAR_APPROVED_DATA_MAP = '[MY PERSONAL DATA - BENEFICIARY] Clear Approved Data Map',

  LOAD_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - BENEFICIARY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[MY PERSONAL DATA - BENEFICIARY] Load Awaiting Approval Data Success',

  LOAD_APPROVED_PHOTO = '[MY PERSONAL DATA - PERSONAL BENEFICIARY] Load Approved Photo',
  LOAD_APPROVED_PHOTO_SUCCESS = '[MY PERSONAL DATA - PERSONAL BENEFICIARY] Load Approved Photo Success',


  LOAD_AWAITING_APPROVAL_PHOTO = '[MY PERSONAL DATA - PERSONAL BENEFICIARY] Load Awaiting Approval Photo',
  LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS = '[MY PERSONAL DATA - PERSONAL BENEFICIARY] Load Awaiting Approval Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY PERSONAL DATA - PERSONAL BENEFICIARY] Clear Viewer Photo',

  LOAD_STATES = '[MY PERSONAL DATA - BENEFICIARY] Load States',
  LOAD_STATES_READY = '[MY PERSONAL DATA - BENEFICIARY] Load States Ready',

  LOAD_CITIES = '[MY PERSONAL DATA - BENEFICIARY] Load Cities',
  LOAD_CITIES_READY = '[MY PERSONAL DATA - BENEFICIARY] Load Cities Ready',


  SAVE = '[MY PERSONAL DATA - BENEFICIARY] Save',
  SAVE_SUCCESS = '[MY PERSONAL DATA - BENEFICIARYL] Save Success',

  DELETE_APPROVED_DATA = '[MY PERSONAL DATA - BENEFICIARY] Delete Approved Data',
  DELETE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - BENEFICIARY] Delete Awaiting Approval Data',

  REMOVE_APPROVED_DATA = '[MY PERSONAL DATA - BENEFICIARY] Remove Approved Data',
  REMOVE_AWAITING_APPROVAL_DATA = '[MY PERSONAL DATA - BENEFICIARY] Remove Awaiting Approval Data',

  REFRESH_DATA = '[MY PERSONAL DATA - BENEFICIARY] Refresh Data',
}

export class ShowEditorBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.SHOW_EDITOR;
}

export class HideEditorBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.HIDE_EDITOR;
}


export class ShowViewerBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.SHOW_VIEWER;
}

export class HideViewerBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.HIDE_VIEWER;
}


export class ProcessingBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.PROCESSING;
}

export class NotProcessingBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataBeneficiarySuccess implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IBeneficiary[]) {}
}

export class LoadApprovedDataItemBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM;

  constructor(public payload: { recordId: number }) { }
}

export class LoadApprovedDataItemBeneficiarySuccess implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS;

  constructor(public payload: IBeneficiary) { }
}

export class ClearApprovedDataMapBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.CLEAR_APPROVED_DATA_MAP;
}


export class LoadAwaitingApprovalDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataBeneficiarySuccess implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IBeneficiary[]) {}
}


export class LoadStatesBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_STATES;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesBeneficiaryReady implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesBeneficiaryReady implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}



export class SaveBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.SAVE;

  constructor(public payload: {data: IBeneficiary, recordId: number, editMode: boolean}) {}
}


export class DeleteApprovedDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.DELETE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class DeleteAwaitingApprovalDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveApprovedDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.REMOVE_APPROVED_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveAwaitingApprovalDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) { }
}

export class LoadApprovedPhotoBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_APPROVED_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadApprovedPhotoBeneficiarySuccess implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_APPROVED_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}




export class LoadAwaitingApprovalPhotoBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadAwaitingApprovalPhotoBeneficiarySuccess implements Action {
  readonly type = BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadDataBeneficiary implements Action {
  readonly type = BeneficiaryActionTypes.REFRESH_DATA;
}


export type BeneficiaryActions =
  | ShowEditorBeneficiary
  | HideEditorBeneficiary
  | ShowViewerBeneficiary
  | HideViewerBeneficiary
  | ProcessingBeneficiary
  | NotProcessingBeneficiary
  | LoadApprovedDataBeneficiary
  | LoadApprovedDataBeneficiarySuccess
  | LoadApprovedDataItemBeneficiary
  | LoadApprovedDataItemBeneficiarySuccess
  | ClearApprovedDataMapBeneficiary
  | LoadAwaitingApprovalDataBeneficiary
  | LoadAwaitingApprovalDataBeneficiarySuccess
  | LoadStatesBeneficiary
  | LoadStatesBeneficiaryReady
  | LoadCitiesBeneficiary
  | LoadCitiesBeneficiaryReady
  | SaveBeneficiary
  | DeleteApprovedDataBeneficiary
  | DeleteAwaitingApprovalDataBeneficiary
  | RemoveApprovedDataBeneficiary
  | RemoveAwaitingApprovalDataBeneficiary
  | LoadApprovedPhotoBeneficiary
  | LoadApprovedPhotoBeneficiarySuccess
  | LoadAwaitingApprovalPhotoBeneficiary
  | LoadAwaitingApprovalPhotoBeneficiarySuccess
  | ClearViewerPhotoBeneficiary
  | LoadDataBeneficiary;
