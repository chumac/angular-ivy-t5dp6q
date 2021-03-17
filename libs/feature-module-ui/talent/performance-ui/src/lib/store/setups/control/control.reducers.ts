import { initialControlState, IControlState } from './control.state';
import { ControlActions, ControlActionTypes } from './control.actions';

export function controlReducer(
  state = initialControlState,
  action: ControlActions
): IControlState {
  switch (action.type) {
    case ControlActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ControlActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ControlActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ControlActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ControlActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ControlActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ControlActionTypes.PROCESSING_GRID:
      return { ...state, isProcessingGrid: true };
    case ControlActionTypes.NOT_PROCESSING_GRID:
      return { ...state, isProcessingGrid: false };
    case ControlActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, controlData: action.payload };
    case ControlActionTypes.LOAD_CUSTOM_PAGE_LIST_SUCCESS:
      return { ...state, customPagesList: action.payload };
    case ControlActionTypes.LOAD_SECTION_LIST_SUCCESS:
      return { ...state, sectionList: action.payload };
    case ControlActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ControlActionTypes.REMOVE_DATA:
      return { ...state, controlData: state.controlData.filter(item => item.id !== action.payload.recordId) };
    case ControlActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

