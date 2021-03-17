import { Action } from '@ngrx/store';
import { IPositionSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum PositionSetupActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - POSITION] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - POSITION] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - POSITION] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - POSITION] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - POSITION] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - POSITION] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - POSITION] LOADING',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - POSITION] Not LOADING',

  LOAD_APPROVED_DATA = '[HR_TRANSACTION SETUPS - POSITION] Load APPROVED Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load APPROVED Data Success',

  LOAD_AWAITING_DATA = '[HR_TRANSACTION SETUPS - POSITION] Load AWAITING Data',
  LOAD_AWAITING_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load AWAITING Data Success',

  LOAD_SPECIFIC_TYPE_DATA = '[HR_TRANSACTION SETUPS - POSITION] Load  SPECIFIC TYPE  Data',
  LOAD_SPECIFIC_TYPE_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load SPECIFIC TYPE Data Success',

  LOAD_SPECIFIC_STRUCTURE_DATA = '[HR_TRANSACTION SETUPS - POSITION] Load  SPECIFIC STRUCTURE Data',
  LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load SPECIFIC STRUCTURE Data Success',

  LOAD_COST_CENTER = '[HR_TRANSACTION SETUPS - POSITION] Load Cost Center Data',
  LOAD_COST_CENTER_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load Cost Center Data Success',

  LOAD_GET_STRUCTURE_DATA = '[[HR_TRANSACTION SETUPS - POSITION] Load  GET STRUCTURE Data',
  LOAD_GET_STRUCTURE_DATA_SUCCESS = '[[HR_TRANSACTION SETUPS - POSITION] Load GET STRUCTURE Data Success',

  LOAD_POSITION_LIST = '[HR_TRANSACTION SETUPS - POSITION] Load Position List Data',
  LOAD_POSITION_LIST_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Position List Center Data Success',

  LOAD_GRADE_LIST = '[HR_TRANSACTION SETUPS - POSITION] Load Grade List Data',
  LOAD_GRADE_LIST_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load Grade List Data Success',

  LOAD_POSITION_CATEGORY = '[HR_TRANSACTION SETUPS - POSITION] Load POSITION CATEGORY',
  LOAD_POSITION_CATEGORY_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION ] Load POSITION CATEGORY Success',

  LOAD_DOCUMENT = '[HR_TRANSACTION SETUPS - POSITION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION SETUPS - POSITION] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION SETUPS - POSITION] Load Inline Document',

  ADD = '[HR_TRANSACTION SETUPS - POSITION] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - POSITION] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION] Save Success',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - POSITION] Delete Data',
}

export class ShowEditorPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.SHOW_EDITOR;
}

export class HideEditorPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.HIDE_EDITOR;
}


export class ShowViewerPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.SHOW_VIEWER;
}

export class HideViewerPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.HIDE_VIEWER;
}


export class ProcessingPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.PROCESSING;
}

export class NotProcessingPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.NOT_PROCESSING;
}

export class LoadingPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.LOADING;
}

export class NotLoadingPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.NOT_LOADING;
}

export class LoadApprovedDataPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataPositionSetupSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPositionSetup[]) {}
}

export class LoadAwaitingDataPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.LOAD_AWAITING_DATA;
}

export class LoadAwaitingDataPositionSetupSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_AWAITING_DATA_SUCCESS;

  constructor(public payload: IPositionSetup[]) {}
}

export class LoadDocumentPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPositionSetupSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadSpecificTypePosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_SPECIFIC_TYPE_DATA;
}

export class  LoadSpecificTypePositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_SPECIFIC_TYPE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadSpecificStructurePosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA;
  constructor(public payload: {Id:number}) {}
}

export class  LoadSpecificStructurePositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadCostCenterPosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_COST_CENTER;
  constructor(public payload: {analysis_det_id:number}) {}
}

export class LoadCostCenterPositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_COST_CENTER_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadGetStructurePosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_GET_STRUCTURE_DATA;
  constructor(public payload: {Id:number}) {}
}

export class  LoadGetStructurePositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_GET_STRUCTURE_DATA_SUCCESS;
  constructor(public payload: any[]) {}
}

export class LoadPositionListPosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListPositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadGradeListPosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListPositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPositionCategoryPosition implements Action {
  readonly type = PositionSetupActionTypes.LOAD_POSITION_CATEGORY;
}

export class LoadPositionCategoryPositionSuccess implements Action {
  readonly type = PositionSetupActionTypes.LOAD_POSITION_CATEGORY_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class AddPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.ADD;

  constructor(public payload: {data: IPositionSetup}) {}
}

export class SavePositionSetup implements Action {
  readonly type = PositionSetupActionTypes.SAVE;

  constructor(public payload: {data: IPositionSetup, recordId: number}) {}
}

export class DeleteDataPositionSetup implements Action {
  readonly type = PositionSetupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type PositionSetupActions =
  | ShowEditorPositionSetup
  | HideEditorPositionSetup
  | ShowViewerPositionSetup
  | HideViewerPositionSetup
  | ProcessingPositionSetup
  | NotProcessingPositionSetup
  | LoadApprovedDataPositionSetup
  | LoadApprovedDataPositionSetupSuccess
  | LoadAwaitingDataPositionSetup
  | LoadAwaitingDataPositionSetupSuccess
  | LoadDocumentPositionSetup
  | LoadDocumentPositionSetupSuccess
  | ClearDocumentPositionSetup
  | LoadInlineDocumentPositionSetup
  | LoadSpecificTypePosition
  | LoadSpecificTypePositionSuccess
  | LoadSpecificStructurePosition
  | LoadSpecificStructurePositionSuccess
  | LoadCostCenterPosition
  | LoadCostCenterPositionSuccess
  | LoadGetStructurePosition
  | LoadGetStructurePositionSuccess
  | LoadGradeListPosition
  | LoadGradeListPositionSuccess
  | LoadPositionListPosition
  | LoadPositionListPositionSuccess
  | LoadPositionCategoryPosition
  | LoadPositionCategoryPositionSuccess
  | SavePositionSetup
  | AddPositionSetup
  | LoadingPositionSetup
  | NotLoadingPositionSetup
  | DeleteDataPositionSetup;
