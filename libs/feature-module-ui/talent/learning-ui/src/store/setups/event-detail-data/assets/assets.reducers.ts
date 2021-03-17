import { initialAssetsState, IAssetsState } from './assets.state';
import { AssetsActions, AssetsActionTypes } from './assets.actions';

export function AssetsReducer(
  state = initialAssetsState,
  action: AssetsActions
): IAssetsState {
  switch (action.type) {
    case AssetsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case AssetsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case AssetsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case AssetsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case AssetsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case AssetsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case AssetsActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, AssetsData: action.payload };
    case AssetsActionTypes.LOAD_DATA_AVAILABLE_SUCCESS:
      return { ...state, assetsAvailableData: action.payload };
    case AssetsActionTypes.LOAD_DATA_TYPE_SUCCESS:
      return { ...state, assetsType: action.payload };
    case AssetsActionTypes.LOAD_ASSETS_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case AssetsActionTypes.REMOVE_DATA:
      return { ...state, AssetsData: state.AssetsData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

