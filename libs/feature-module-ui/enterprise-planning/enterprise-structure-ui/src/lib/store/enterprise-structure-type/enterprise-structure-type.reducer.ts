import { initialEnterpriseStructureTypeState, IEnterpriseStructureTypeState } from "./enterprise-structure-type.state";
import { EnterpriseStructureTypeActionTypes, EnterpriseStructureTypeActions, LoadDataItemEnterpriseStructureTypesSuccess } from "./enterprise-structure-type.actions";


export function enterpriseStructureTypeReducer(
  state = initialEnterpriseStructureTypeState,
  action: EnterpriseStructureTypeActions
): IEnterpriseStructureTypeState {
  switch (action.type) {
    case EnterpriseStructureTypeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EnterpriseStructureTypeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EnterpriseStructureTypeActionTypes.SHOW_EDITOR_VIRTUAL_LINK:
      return { ...state, showVLinkEditor: true };
    case EnterpriseStructureTypeActionTypes.HIDE_EDITOR_VIRTUAL_LINK:
      return { ...state, showVLinkEditor: false };
    case EnterpriseStructureTypeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EnterpriseStructureTypeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EnterpriseStructureTypeActionTypes.PROCESSING_V_LINK:
      return { ...state, isProcessingVlink: true };
    case EnterpriseStructureTypeActionTypes.NOT_PROCESSING_V_LINK:
      return { ...state, isProcessingVlink: false };
    case EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES_SUCCESS:
      return { ...state, enterpriseStructuretypes: action.payload, structureTransformed: action.payloadTransformed };
    case EnterpriseStructureTypeActionTypes.LOAD_DATA_KNOWN_TYPES_SUCCESS:
      return { ...state, knownTypes: action.payload };
    case EnterpriseStructureTypeActionTypes.LOAD_VIRTUAL_LINKS_SUCCESS:
      return { ...state, virtualLinks: action.payload };
    case EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPE_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadDataItemEnterpriseStructureTypesSuccess>action);
      return newState;
    default: {
      return state;
    }
  }
}


function updateState(
  state: IEnterpriseStructureTypeState,
  action: LoadDataItemEnterpriseStructureTypesSuccess
): IEnterpriseStructureTypeState {
  const data = action.payload;

  const newState = Object.assign({}, state);

  return newState;
}
