import { Action } from '@ngrx/store';
import { ITransferTransaction, ITransferImportTransaction, ICurrentJob, ICurrentLocation } from "@nutela/models/workforce/employee-profiles";
import { ISelectOption } from '@nutela/models/core-data';


export enum TransferActionTypes {

  SHOW_EDITOR = '[HR_TRANSACTION - TRANSFERS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - TRANSFERS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - TRANSFERS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - TRANSFERS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - TRANSFERS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - TRANSFERS] Not Processing',

  LOADING = '[HR_TRANSACTION - TRANSFERS] Loading',
  NOT_LOADING = '[HR_TRANSACTION - TRANSFERS] Not Loading',

  LOAD_APPROVED_DIRECT = '[HR_TRANSACTION - TRANSFERS] Load  APPROVED DIRECT',
  LOAD_APPROVED_DIRECT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load APPROVED DIRECT Success',

  LOAD_AWAITING_DIRECT = '[HR_TRANSACTION - TRANSFERS] Load  AWAITING DIRECT',
  LOAD_AWAITING_DIRECT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load AWAITING DIRECT Success',

  LOAD_TREE_ROOT = '[HR_TRANSACTION - TRANSFERS] Load  TREE ROOT DIRECT',
  LOAD_TREE_ROOT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load TREE ROOT DIRECT Success',

  LOAD_TREE_DETAILS = '[HR_TRANSACTION - TRANSFERS] Load  TREE DETAILS DIRECT',
  LOAD_TREE_DETAILS_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load TREE DETAILS Success',
  CLEAR_TREE_DETAILS = '[HR_TRANSACTION - TRANSFERS] Load CLEAR TREE DETAILS Success',

  LOAD_IMPORT = '[HR_TRANSACTION - TRANSFERS] Load  IMPORT',
  LOAD_IMPORT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load IMPORT Success',

  LOAD_STATUS_DATA = '[HR_TRANSACTION - TRANSFERS] Load  STATUS  Data',
  LOAD_STATUS_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load  STATUS Data Success',

  LOAD_BATCH_DATA = '[HR_TRANSACTION - TRANSFERS] Load  BATCH  Data',
  LOAD_BATCH_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load  BATCH Data Success',

  LOAD_POSITION_DATA = '[HR_TRANSACTION - TRANSFERS] Load  POSITION  Data',
  LOAD_POSITION_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load  POSITION Data Success',

  LOAD_DESIGNATION_DATA = '[HR_TRANSACTION - TRANSFERS] Load  DESIGNATION  Data',
  LOAD_DESIGNATION_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load  DESIGNATION Data Success',

  LOAD_LOCATION_DATA = '[HR_TRANSACTION - TRANSFERS] Load  LOCATION  Data',
  LOAD_LOCATION_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load  LOCATION Data Success',


  LOAD_SPECIFIC_TYPE_DATA = '[HR_TRANSACTION - TRANSFERS] Load  SPECIFIC TYPE  Data',
  LOAD_SPECIFIC_TYPE_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load SPECIFIC TYPE Data Success',

  LOAD_SPECIFIC_STRUCTURE_DATA = '[HR_TRANSACTION - TRANSFERS] Load  SPECIFIC STRUCTURE Data',
  LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load SPECIFIC STRUCTURE Data Success',

  LOAD_COST_CENTER = '[HR_TRANSACTION - TRANSFERS] Load Cost Center Data',
  LOAD_COST_CENTER_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load Cost Center Data Success',

  LOAD_PICKED = '[HR_TRANSACTION - TRANSFERS] Load PICKED Data Success',

  LOAD_GET_STRUCTURE_DATA = '[HR_TRANSACTION - TRANSFERS] Load  GET STRUCTURE Data',
  LOAD_GET_STRUCTURE_DATA_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load GET STRUCTURE Data Success',

  LOAD_CURRENT_JOB = '[HR_TRANSACTION - TRANSFERS] Load CURRENT JOB Data',
  LOAD_CURRENT_JOB_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Load CURRENT JOB Data Success',

  SAVE_DIRECT = '[HR_TRANSACTION - TRANSFERS] Save DIRECT',
  SAVE_DIRECT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Save DIRECT Success',

  UPDATE_DIRECT = '[HR_TRANSACTION - TRANSFERS] UPDATE DIRECT',
  UPDATE_DIRECT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] UPDATE DIRECT Success',

  SAVE_IMPORT = '[HR_TRANSACTION - TRANSFERS] Save IMPORT',
  SAVE_IMPORT_SUCCESS = '[HR_TRANSACTION - TRANSFERS] Save IMPORT Success',

  DELETE = '[HR_TRANSACTION - TRANSFERS] DELETE',
}

export class ShowEditorTransfer implements Action {
  readonly type = TransferActionTypes.SHOW_EDITOR;
}

export class HideEditorTransfer implements Action {
  readonly type = TransferActionTypes.HIDE_EDITOR;
}


export class ShowViewerTransfer implements Action {
  readonly type = TransferActionTypes.SHOW_VIEWER;
}

export class HideViewerTransfer implements Action {
  readonly type = TransferActionTypes.HIDE_VIEWER;
}


export class ProcessingTransfer implements Action {
  readonly type = TransferActionTypes.PROCESSING;
}

export class NotProcessingTransfer implements Action {
  readonly type = TransferActionTypes.NOT_PROCESSING;
}

export class LoadingTransfer implements Action {
  readonly type = TransferActionTypes.LOADING;
}

export class NotLoadingTransfer implements Action {
  readonly type = TransferActionTypes.NOT_LOADING;
}

export class LoadApprovedDirectTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_APPROVED_DIRECT;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadApprovedDirectTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_APPROVED_DIRECT_SUCCESS;

  constructor(public payload: ITransferTransaction[]) { }
}

export class LoadAwaitingDirectTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_AWAITING_DIRECT;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadAwaitingDirectTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_AWAITING_DIRECT_SUCCESS;

  constructor(public payload: ITransferTransaction[]) { }
}

export class LoadTreeRootTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_TREE_ROOT;

  constructor() { }
}

export class LoadTreeRootTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_TREE_ROOT_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadTreeDetailsTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_TREE_DETAILS;

  constructor(public payload: { structureId: number }) { }
}

export class LoadTreeDetailsTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_TREE_DETAILS_SUCCESS;

  constructor(public payload: any[]) { }
}

export class ClearTreeDetails implements Action {
  readonly type = TransferActionTypes.CLEAR_TREE_DETAILS;

  // constructor(public payload: any[]) {}
}

export class LoadImportTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_IMPORT;

  constructor() { }
}

export class LoadImportTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_IMPORT_SUCCESS;

  constructor(public payload: ITransferImportTransaction[]) { }
}

export class LoadStatusTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_STATUS_DATA;
}

export class LoadStatusTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_STATUS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadPicked implements Action {
  readonly type = TransferActionTypes.LOAD_PICKED;

  constructor(public payload: { locationId: number, locationDetailsId: number }) { }
}

export class LoadPositionTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_POSITION_DATA;
}

export class LoadPositionTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_POSITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadDesignationTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_DESIGNATION_DATA;
  constructor(public payload: { positionId: number }) { }
}

export class LoadDesignationTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_DESIGNATION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadBatchTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_BATCH_DATA;
}

export class LoadBatchTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_BATCH_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadLocationTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_LOCATION_DATA;
  constructor(public payload: { employeeId: number }) { }
}

export class LoadLocationTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_LOCATION_DATA_SUCCESS;

  constructor(public payload: ICurrentLocation) { }
}

export class LoadSpecificTypeTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_SPECIFIC_TYPE_DATA;
}

export class LoadSpecificTypeTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_SPECIFIC_TYPE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadSpecificStructureTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA;
  constructor(public payload: { Id: number }) { }
}

export class LoadSpecificStructureTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadCostCenterTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_COST_CENTER;
  constructor(public payload: { analysis_det_id: number }) { }
}


export class LoadGetStructureTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_GET_STRUCTURE_DATA;
  constructor(public payload: { Id: number }) { }
}

export class LoadGetStructureTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_GET_STRUCTURE_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadCostCenterTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_COST_CENTER_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadCurrentJobTransfer implements Action {
  readonly type = TransferActionTypes.LOAD_CURRENT_JOB;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadCurrentJobTransferSuccess implements Action {
  readonly type = TransferActionTypes.LOAD_CURRENT_JOB_SUCCESS;

  constructor(public payload: ICurrentJob) { }
}

export class SaveDirectTransfer implements Action {
  readonly type = TransferActionTypes.SAVE_DIRECT;

  constructor(public payload: { data: ITransferTransaction }) { }
}

export class UpdateDirectTransfer implements Action {
  readonly type = TransferActionTypes.UPDATE_DIRECT;

  constructor(public payload: { data: ITransferTransaction, recordId: number }) { }
}

export class SaveImportTransfer implements Action {
  readonly type = TransferActionTypes.SAVE_IMPORT;

  constructor(public payload: { batchId: number }) { }
}


export class DeleteTransfer implements Action {
  readonly type = TransferActionTypes.DELETE;

  constructor(public payload: { recordId: number, employeeId: number }) { }
}

export type TransferActions =
  | ShowEditorTransfer
  | HideEditorTransfer
  | ShowViewerTransfer
  | HideViewerTransfer
  | ProcessingTransfer
  | NotProcessingTransfer
  | LoadingTransfer
  | NotLoadingTransfer
  | LoadApprovedDirectTransfer
  | LoadApprovedDirectTransferSuccess
  | LoadAwaitingDirectTransfer
  | LoadAwaitingDirectTransferSuccess
  | LoadTreeRootTransfer
  | LoadTreeRootTransferSuccess
  | LoadTreeDetailsTransfer
  | LoadTreeDetailsTransferSuccess
  | LoadImportTransfer
  | LoadImportTransferSuccess
  | LoadBatchTransfer
  | LoadBatchTransferSuccess
  | LoadStatusTransfer
  | LoadStatusTransferSuccess
  | LoadPositionTransfer
  | LoadPositionTransferSuccess
  | LoadDesignationTransfer
  | LoadDesignationTransferSuccess
  | LoadLocationTransfer
  | LoadLocationTransferSuccess
  | LoadSpecificTypeTransfer
  | LoadSpecificTypeTransferSuccess
  | LoadSpecificStructureTransfer
  | LoadSpecificStructureTransferSuccess
  | LoadCostCenterTransfer
  | LoadCostCenterTransferSuccess
  | LoadGetStructureTransfer
  | LoadGetStructureTransferSuccess
  | LoadCurrentJobTransfer
  | LoadCurrentJobTransferSuccess
  | LoadPicked
  | ClearTreeDetails
  | SaveDirectTransfer
  | UpdateDirectTransfer
  | SaveImportTransfer
  | DeleteTransfer;

