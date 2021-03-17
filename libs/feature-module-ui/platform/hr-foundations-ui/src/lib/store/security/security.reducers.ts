import { initialSecurityState, ISecurityState } from './security.state';
import { SecurityActions, SecurityActionTypes } from './security.actions';

export function securityReducer(
  state = initialSecurityState,
  action: SecurityActions
): ISecurityState {
  switch (action.type) {
    case SecurityActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SecurityActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SecurityActionTypes.SHOW_BULK_EDITOR:
      return { ...state, showBulkEditor: true };
    case SecurityActionTypes.HIDE_BULK_EDITOR:
      return { ...state, showBulkEditor: false };
    case SecurityActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SecurityActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SecurityActionTypes.SHOW_TREE_VIEW:
      return { ...state, showTreeView: true };
    case SecurityActionTypes.HIDE_TREE_VIEW:
      return { ...state, showTreeView: false };
    case SecurityActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SecurityActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SecurityActionTypes.LOADING:
      return { ...state, isLoading: true };
    case SecurityActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case SecurityActionTypes.LOADING_DROPDOWN:
      return { ...state, isLoadingDropdown: action.payload };
    case SecurityActionTypes.LOAD_PROCESSED_DATA_SUCCESS:
      return { ...state, processedData: action.payload };
      case SecurityActionTypes.LOAD_WAITING_DATA_SUCCESS:
      return { ...state, waitingData: action.payload };
    case SecurityActionTypes.LOAD_ROLE_DATA_SUCCESS:
      return { ...state, role: action.payload };
    case SecurityActionTypes.LOAD_USERS_DATA_SUCCESS:
      return {
        ...state, users: action.payload };
    case SecurityActionTypes.LOAD_INDIVIDUAL_DATA_SUCCESS:
      return { ...state, individual: action.payload };
    case SecurityActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS:
      return { ...state, specificStructure: action.payload };
    case SecurityActionTypes.LOAD_SPECIFIC_TYPE_DATA_SUCCESS:
      return { ...state, specificType: action.payload };
    case SecurityActionTypes.LOAD_BULK_ACTION_SUCCESS:
      return { ...state, bulkAction: action.payload };
    case SecurityActionTypes.LOAD_SINGLE_ACTION_SUCCESS:
      return { ...state, singleAction: action.payload };
    case SecurityActionTypes.CLEAR_ROLE_DATA:
        return { ...state, role:null};
    default: {
      return state;
    }
  }
}
