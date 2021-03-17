import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IEnterpriseStructureDetail, ICostCentreTransform, INameAndId } from '../../models/interfaces';


export enum EnterpriseStructureDetailActionTypes {
  SHOW_EDITOR = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Editor',
  HIDE_EDITOR = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Editor',

  SHOW_EDITOR_CONNECT = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Editor Connect',
  HIDE_EDITOR_CONNECT = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Editor Connect',

  SHOW_EDITOR_CONNECT_CHILDREN = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Editor Connect Children',
  HIDE_EDITOR_CONNECT_CHILDREN = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Editor Connect Children',

  SHOW_EDITOR_SHARED_CODE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Shared Code Editor',
  HIDE_EDITOR_SHARED_CODE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Shared Code Editor',

  SHOW_EDITOR_ADD_COST_CENTRE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Editor Add Cost Centre',
  HIDE_EDITOR_ADD_COST_CENTRE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Editor Add Cost Centre',

  SHOW_EDITOR_REMOVE_COST_CENTRE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Editor Remove Cost Centre',
  HIDE_EDITOR_REMOVE_COST_CENTRE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Editor Remove Cost Centre',

  SHOW_PROMOTER = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Promoter',
  HIDE_PROMOTER = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Promoter',

  SHOW_MOVER = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Mover',
  HIDE_MOVER = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Mover',

  SHOW_DEMOTER = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Show Demoter',
  HIDE_DEMOTER = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Hide Demoter',

  PROCESSING = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Processing',
  NOT_PROCESSING = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Not Processing',

  LOAD_ENTERPRISE_STRUCTURE_DETAILS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Enterprise Structure Details',
  LOAD_ENTERPRISE_STRUCTURE_DETAILS_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Enterprise Structure Details Success',

  LOAD_SELECTED_ROWS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Selected Rows',

  LOAD_STRUCTURE_NAME_AND_ID = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Structure Name and Id',

  LOAD_ENTERPRISE_STRUCTURE_LINK = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Enterprise Structure Link',
  LOAD_ENTERPRISE_STRUCTURE_LINK_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Enterprise Structure Link Success',

  LOAD_POSITIONS_DATA = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Positions',
  LOAD_POSITIONS_DATA_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Positions Success',

  SAVE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save',
  SAVE_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Success',

  SAVE_RECONNECT = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Reconnect',
  SAVE_RECONNECT_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Reconnect Success',

  SAVE_RECONNECT_CHILDREN = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Reconnect Children',
  SAVE_RECONNECT_CHILDREN_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Reconnect Children Success',

  SAVE_UPDATE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Update',
  SAVE_UPDATE_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Update Success',

  REMOVE_ALL_EMPLOYEES = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Remove All Employees',
  REMOVE_ALL_EMPLOYEES_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Remove All Employees Success',

  SHARE_CODE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Share Code',
  SHARE_CODE_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Share Code Success',

  SAVE_PROMOTE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Promote',
  SAVE_PROMOTE_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Promote Success',

  CHANGE_STRUCTURE_TYPE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Change Structure Type',
  CHANGE_STRUCTURE_TYPE_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Change Structure Type Success',

  LOAD_COST_CENTRES = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Cost Centres Data',
  LOAD_COST_CENTRES_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load Cost Centres Data Success',

  LOAD_BY_ID_COST_CENTRES = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load By Id Cost Centres Data',
  LOAD_BY_ID_COST_CENTRES_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Load By Id Cost Centres Data Success',

  SAVE_DEMOTE = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Demote',
  SAVE_DEMOTE_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Save Demote Success',

  ADD_COST_CENTRES = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Add Cost Centres',
  ADD_COST_CENTRES_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Add Cost Centres Success',

  REMOVE_COST_CENTRES = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Remove Cost Centres',
  REMOVE_COST_CENTRES_SUCCESS = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Remove Cost Centres Success',

  DEACTIVATE_ENTERPRISE_STRUCTURE_DETAIL_DATA = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Deactivate Enterprise Structure Detail',

  REMOVE_ENTERPRISE_STURCTURE_DETAIL_DATA = '[HR ENTERPRISE STRUCTURE DETAILS DATA - ENTERPRISE STRUCTURE DETAIL] Remove Enterprise Structure Detail',

}

export class ShowEditorEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_EDITOR;
}

export class HideEditorEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_EDITOR;
}

export class ShowEditorConnectEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_EDITOR_CONNECT;
}

export class HideEditorConnectEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_EDITOR_CONNECT;
}

export class ShowEditorConnectChildrenEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_EDITOR_CONNECT_CHILDREN;
}

export class HideEditorConnectChildrenEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_EDITOR_CONNECT_CHILDREN;
}

export class ShowEditorSharedCode implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_EDITOR_SHARED_CODE;
}

export class HideEditorSharedCode implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_EDITOR_SHARED_CODE;
}

export class ShowEditorAddCostCentreEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_EDITOR_ADD_COST_CENTRE;
}

export class HideEditorAddCostCentreEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_EDITOR_ADD_COST_CENTRE;
}

export class ShowEditorRemoveCostCentreEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_EDITOR_REMOVE_COST_CENTRE;
}

export class HideEditorRemoveCostCentreEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_EDITOR_REMOVE_COST_CENTRE;
}

export class ShowPromoterEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_PROMOTER;
}

export class HidePromoterEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_PROMOTER;
}

export class ShowMoverEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_MOVER;
}

export class HideMoverEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_MOVER;
}

export class ShowDemoterEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHOW_DEMOTER;
}

export class HideDemoterEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.HIDE_DEMOTER;
}

export class ProcessingEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.PROCESSING;
}

export class NotProcessingEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.NOT_PROCESSING;
}

export class SaveEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SAVE;

  constructor(public payload: { data: IEnterpriseStructureDetail }) { }
}

export class SaveUpdateEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SAVE_UPDATE;

  constructor(public payload: { data: IEnterpriseStructureDetail, recordId: number, editMode: boolean }) { }
}

export class ChangeStructureTypeEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.CHANGE_STRUCTURE_TYPE;

  constructor(public payload: { data?: any, currentType: number, newType: number }) { }
}

export class RemoveAllEmployeesFromDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.REMOVE_ALL_EMPLOYEES;

  constructor(public payload: { data?: any, recordId: number }) { }
}

export class ShareCodeEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SHARE_CODE;

  constructor(public payload: { recordId: number, data?: any }) { }
}

export class SaveEnterpriseStructureDetailPromote implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SAVE_PROMOTE;

  constructor(public payload: { data: any[], recordId: number, destinationId: number }) { }
}

export class AddCostCentres implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.ADD_COST_CENTRES;

  constructor(public payload: { data: any[], recordId: number }) { }
}

export class RemoveCostCentres implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.REMOVE_COST_CENTRES;

  constructor(public payload: { data?: any[], recordId: number }) { }
}

export class SaveEnterpriseStructureDetailReconnect implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SAVE_RECONNECT;

  constructor(public payload: { data: any[], recordId: number, destinationId: number }) { }
}

export class SaveEnterpriseStructureDetailReconnectChildren implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SAVE_RECONNECT_CHILDREN;

  constructor(public payload: { data?: any[], analysisDetailId: number, destinationId: number }) { }
}

export class SaveEnterpriseStructureDetailDemote implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.SAVE_DEMOTE;

  constructor(public payload: { data: any[], recordId: number, destinationId: number, orphanParentId: number }) { }
}

export class LoadEnterpriseStructureDetails implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS;

  constructor(public payload: { recordId: number }) { }
}


export class LoadEnterpriseStructureDetailsSuccess implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS_SUCCESS;

  constructor(public payload: IEnterpriseStructureDetail[]) { }
}

export class LoadSelectedRowsData implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_SELECTED_ROWS;

  constructor(public payload: IEnterpriseStructureDetail[]) { }
}

export class LoadStructureNameAndIdData implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_STRUCTURE_NAME_AND_ID;

  constructor(public payload: INameAndId) { }
}

export class LoadEnterpriseStructureLink implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_LINK;

  constructor(public payload: { recordId: number }) { }
}

export class LoadEnterpriseStructureLinkSuccess implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_LINK_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class LoadCostCentresData implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_COST_CENTRES;
}

export class LoadCostCentresDataSuccess implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_COST_CENTRES_SUCCESS;

  constructor(public payload: ICostCentreTransform[]) { }
}

export class LoadByIdCostCentresData implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_BY_ID_COST_CENTRES;

  constructor(public payload: { recordId: number }) { }
}

export class LoadByIdCostCentresDataSuccess implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_BY_ID_COST_CENTRES_SUCCESS;

  constructor(public payload: ICostCentreTransform[]) { }
}

export class LoadPositionsData implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_POSITIONS_DATA;
}


export class LoadPositionsDataSuccess implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.LOAD_POSITIONS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) { }
}

export class DeactivateDataEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.DEACTIVATE_ENTERPRISE_STRUCTURE_DETAIL_DATA;

  constructor(public payload: { recordId: number, data: IEnterpriseStructureDetail }) { }
}

export class RemoveDataEnterpriseStructureDetail implements Action {
  readonly type = EnterpriseStructureDetailActionTypes.REMOVE_ENTERPRISE_STURCTURE_DETAIL_DATA;

  constructor(public payload: { recordId: number }) { }
}


export type EnterpriseStructureDetailActions =
  | ShowEditorEnterpriseStructureDetail
  | HideEditorEnterpriseStructureDetail
  | ShowEditorConnectEnterpriseStructureDetail
  | HideEditorConnectEnterpriseStructureDetail
  | ShowEditorConnectChildrenEnterpriseStructureDetail
  | HideEditorConnectChildrenEnterpriseStructureDetail
  | ShowEditorAddCostCentreEnterpriseStructureDetail
  | HideEditorAddCostCentreEnterpriseStructureDetail
  | ShowEditorRemoveCostCentreEnterpriseStructureDetail
  | HideEditorRemoveCostCentreEnterpriseStructureDetail
  | ShowPromoterEnterpriseStructureDetail
  | HidePromoterEnterpriseStructureDetail
  | ShowEditorSharedCode
  | HideEditorSharedCode
  | ShowMoverEnterpriseStructureDetail
  | HideMoverEnterpriseStructureDetail
  | ShowDemoterEnterpriseStructureDetail
  | HideDemoterEnterpriseStructureDetail
  | ProcessingEnterpriseStructureDetail
  | NotProcessingEnterpriseStructureDetail
  | SaveEnterpriseStructureDetail
  | SaveUpdateEnterpriseStructureDetail
  | ShareCodeEnterpriseStructureDetail
  | LoadEnterpriseStructureDetails
  | LoadEnterpriseStructureDetailsSuccess
  | LoadSelectedRowsData
  | LoadStructureNameAndIdData
  | LoadEnterpriseStructureLink
  | LoadEnterpriseStructureLinkSuccess
  | DeactivateDataEnterpriseStructureDetail
  | RemoveDataEnterpriseStructureDetail
  | LoadPositionsData
  | LoadPositionsDataSuccess
  | SaveEnterpriseStructureDetailPromote
  | SaveEnterpriseStructureDetailDemote
  | SaveEnterpriseStructureDetailReconnect
  | SaveEnterpriseStructureDetailReconnectChildren
  | RemoveAllEmployeesFromDetail
  | ChangeStructureTypeEnterpriseStructureDetail
  | LoadCostCentresData
  | LoadCostCentresDataSuccess
  | LoadByIdCostCentresData
  | LoadByIdCostCentresDataSuccess
  | AddCostCentres
  | RemoveCostCentres
