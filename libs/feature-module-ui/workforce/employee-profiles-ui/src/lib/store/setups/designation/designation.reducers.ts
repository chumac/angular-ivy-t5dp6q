import { initialDesignationSetupState, IDesignationSetupState } from './designation.state';
import { DesignationSetupActions, DesignationSetupActionTypes } from './designation.actions';

export function designationSetupReducer(
  state = initialDesignationSetupState,
  action: DesignationSetupActions
): IDesignationSetupState {
  switch (action.type) {
    case DesignationSetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DesignationSetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DesignationSetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case DesignationSetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case DesignationSetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DesignationSetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DesignationSetupActionTypes.LOADING:
      return { ...state, isLoading: true };
    case DesignationSetupActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case DesignationSetupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload.map(data => Object.assign({}, data, {
        position: data.PositionInfo? data.PositionInfo.description: null
      }))
      };
    case DesignationSetupActionTypes.LOAD_AWAITING_DATA_SUCCESS:
      return { ...state, awaitingData: action.payload };
    case DesignationSetupActionTypes.LOAD_POSITION_DATA_SUCCESS:
      return { ...state, positions: action.payload };
    case DesignationSetupActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

