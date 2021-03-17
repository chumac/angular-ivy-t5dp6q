import { initialEnterpriseStructureDetailState, IEnterpriseStructureDetailState } from './enterprise-structure-detail.state';
import { EnterpriseStructureDetailActions, EnterpriseStructureDetailActionTypes } from './enterprise-structure-detail.action';


export function enterpriseStructureDetailReducer(
  state = initialEnterpriseStructureDetailState,
  action: EnterpriseStructureDetailActions
): IEnterpriseStructureDetailState {
  switch (action.type) {
    case EnterpriseStructureDetailActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EnterpriseStructureDetailActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EnterpriseStructureDetailActionTypes.SHOW_EDITOR_CONNECT:
      return { ...state, showEditorConnect: true };
    case EnterpriseStructureDetailActionTypes.HIDE_EDITOR_CONNECT:
      return { ...state, showEditorConnect: false };
    case EnterpriseStructureDetailActionTypes.SHOW_EDITOR_CONNECT_CHILDREN:
      return { ...state, showEditorConnectChildren: true };
    case EnterpriseStructureDetailActionTypes.HIDE_EDITOR_CONNECT_CHILDREN:
      return { ...state, showEditorConnectChildren: false };
    case EnterpriseStructureDetailActionTypes.SHOW_EDITOR_SHARED_CODE:
      return { ...state, showSharedCodeEditor: true };
    case EnterpriseStructureDetailActionTypes.HIDE_EDITOR_SHARED_CODE:
      return { ...state, showSharedCodeEditor: false };
    case EnterpriseStructureDetailActionTypes.SHOW_EDITOR_ADD_COST_CENTRE:
      return { ...state, showEditorAddCostCentre: true };
    case EnterpriseStructureDetailActionTypes.HIDE_EDITOR_ADD_COST_CENTRE:
      return { ...state, showEditorAddCostCentre: false };
    case EnterpriseStructureDetailActionTypes.SHOW_EDITOR_REMOVE_COST_CENTRE:
      return { ...state, showEditorRemoveCostCentre: true };
    case EnterpriseStructureDetailActionTypes.HIDE_EDITOR_REMOVE_COST_CENTRE:
      return { ...state, showEditorRemoveCostCentre: false };
    case EnterpriseStructureDetailActionTypes.SHOW_MOVER:
      return { ...state, showMover: true };
    case EnterpriseStructureDetailActionTypes.HIDE_MOVER:
      return { ...state, showMover: false };
    case EnterpriseStructureDetailActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EnterpriseStructureDetailActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EnterpriseStructureDetailActionTypes.LOAD_SELECTED_ROWS:
      return { ...state, selectedRows: action.payload };
    case EnterpriseStructureDetailActionTypes.LOAD_STRUCTURE_NAME_AND_ID:
      return { ...state, structureNameAndId: action.payload };
    case EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_LINK_SUCCESS:
      return { ...state, enterpriseStructureLink: action.payload };
    case EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS_SUCCESS:
      return { ...state, enterpriseStructureDetailList: action.payload };
    case EnterpriseStructureDetailActionTypes.LOAD_COST_CENTRES_SUCCESS:
      return { ...state, costCentres: action.payload };
    case EnterpriseStructureDetailActionTypes.LOAD_BY_ID_COST_CENTRES_SUCCESS:
      return { ...state, costCentresById: action.payload };
    case EnterpriseStructureDetailActionTypes.LOAD_POSITIONS_DATA_SUCCESS:
      return { ...state, positionsDataList: action.payload };
    default: {
      return state;
    }
  }
}
