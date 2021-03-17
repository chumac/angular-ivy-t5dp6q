import { Action } from '@ngrx/store';
import { IEnterpriseStructure, IVirtualLinkTransform } from '../../models/interfaces';
import { ISelectOption } from '@nutela/models/core-data';


export enum EnterpriseStructureTypeActionTypes {
  SHOW_EDITOR = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Show Editor',
  HIDE_EDITOR = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Hide Editor',

  SHOW_EDITOR_VIRTUAL_LINK = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Show Virtual Link Editor',
  HIDE_EDITOR_VIRTUAL_LINK = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Hide Virtual Link Editor',

  PROCESSING = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Processing',
  NOT_PROCESSING = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Not Processing',

  PROCESSING_V_LINK = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Processing Virtual Links',
  NOT_PROCESSING_V_LINK = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Not Processing Virtual Links',

  LOAD_ENTERPRISE_STRUCTURE_TYPES = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Enterprise Structure Types',
  LOAD_ENTERPRISE_STRUCTURE_TYPES_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Enterprise Structure Type Success',

  LOAD_DATA_KNOWN_TYPES = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Data Known Types',
  LOAD_DATA_KNOWN_TYPES_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Data Known Types Success',

  LOAD_VIRTUAL_LINKS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Virtual Links',
  LOAD_VIRTUAL_LINKS_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Virtual Links Success',

  LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Enterprise Structure Type Data Item',
  LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Load Enterprise Structure Type Data Item Success',
  CLEAR_LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM_MAP = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Clear Enterprise Structure Type Data Map',

  DEACTIVATE_ENTERPRISE_STRUCTURE_TYPE_DATA = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Deactivate Enterprise Structure',

  REMOVE_ENTERPRISE_STURCTURE_TYPE_DATA = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Remove Enterprise Structure',

  SAVE = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Save',
  SAVE_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Save Success',

  SAVE_UPDATE = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Save Update',
  SAVE_UPDATE_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Save Update Success',

  SAVE_VIRTUAL_LINKS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Save Virtual Links',
  SAVE_VIRTUAL_LINKS_SUCCESS = '[HR ENTERPRISE STRUCTURE TYPE DATA - ENTERPRISE STRUCTURE] Save Virtual Links Success',

}

export class ShowEditorEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.SHOW_EDITOR;
}

export class HideEditorEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.HIDE_EDITOR;
}

export class ShowEditorVirtualLink implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.SHOW_EDITOR_VIRTUAL_LINK;
}

export class HideEditorVirtualLink implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.HIDE_EDITOR_VIRTUAL_LINK;
}

export class ProcessingEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.PROCESSING;
}

export class NotProcessingEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.NOT_PROCESSING;
}

export class ProcessingVirtualLinks implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.PROCESSING_V_LINK;
}

export class NotProcessingVirtualLinks implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.NOT_PROCESSING_V_LINK;
}


export class LoadEnterpriseStructureTypes implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES;
}


export class LoadEnterpriseStructureTypesSuccess implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES_SUCCESS;

  constructor(public payload: IEnterpriseStructure[], public payloadTransformed: ISelectOption[]) { }

}

export class LoadKnownTypesEnterpriseStructure implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_DATA_KNOWN_TYPES;
}


export class LoadKnownTypesEnterpriseStructureSuccess implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_DATA_KNOWN_TYPES_SUCCESS;

  constructor(public payload: ISelectOption[]) { }

}

export class LoadVirtualLinks implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_VIRTUAL_LINKS;

  constructor(public payload: { recordId: number }) { }
}


export class LoadVirtualLinksSuccess implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_VIRTUAL_LINKS_SUCCESS;

  constructor(public payload: any[]) { }

}

export class LoadDataItemEnterpriseStructureTypes implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM;

  constructor(public payload: { recordId: number }) { }
}

export class LoadDataItemEnterpriseStructureTypesSuccess implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM_SUCCESS;

  constructor(public payload: IEnterpriseStructure) { }
}

export class ClearDataMapEnterpriseStructureTypes implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.CLEAR_LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM_MAP;
}

export class DeactivateDataEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.DEACTIVATE_ENTERPRISE_STRUCTURE_TYPE_DATA;

  constructor(public payload: { recordId: number, data: IEnterpriseStructure }) { }
}


export class RemoveDataEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.REMOVE_ENTERPRISE_STURCTURE_TYPE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class SaveEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.SAVE;

  constructor(public payload: { data: IEnterpriseStructure }) { }
}
export class SaveUpdateEnterpriseStructureType implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.SAVE_UPDATE;

  constructor(public payload: { data: IEnterpriseStructure, recordId: number, editMode: boolean }) { }
}

export class SaveVirtualLinks implements Action {
  readonly type = EnterpriseStructureTypeActionTypes.SAVE_VIRTUAL_LINKS;

  constructor(public payload: { data: IVirtualLinkTransform, recordId: number }) { }
}


export type EnterpriseStructureTypeActions =
  | ShowEditorEnterpriseStructureType
  | HideEditorEnterpriseStructureType
  | ShowEditorVirtualLink
  | HideEditorVirtualLink
  | ProcessingEnterpriseStructureType
  | NotProcessingEnterpriseStructureType
  | ProcessingVirtualLinks
  | NotProcessingVirtualLinks
  | LoadDataItemEnterpriseStructureTypes
  | LoadDataItemEnterpriseStructureTypesSuccess
  | ClearDataMapEnterpriseStructureTypes
  | LoadEnterpriseStructureTypes
  | LoadEnterpriseStructureTypesSuccess
  | LoadKnownTypesEnterpriseStructure
  | LoadKnownTypesEnterpriseStructureSuccess
  | SaveEnterpriseStructureType
  | SaveUpdateEnterpriseStructureType
  | DeactivateDataEnterpriseStructureType
  | RemoveDataEnterpriseStructureType
  | SaveVirtualLinks
  | LoadVirtualLinks
  | LoadVirtualLinksSuccess
