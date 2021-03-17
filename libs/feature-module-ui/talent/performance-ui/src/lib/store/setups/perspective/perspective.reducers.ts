import { initialPerspectiveState, IPerspectiveState } from './perspective.state';
import { PerspectiveActions, PerspectiveActionTypes } from './perspective.actions';

export function perspectiveReducer(
  state = initialPerspectiveState,
  action: PerspectiveActions
): IPerspectiveState {
  switch (action.type) {
    case PerspectiveActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PerspectiveActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PerspectiveActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PerspectiveActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PerspectiveActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PerspectiveActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PerspectiveActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, perspectiveData: action.payload };
    case PerspectiveActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PerspectiveActionTypes.REMOVE_DATA:
      return { ...state, perspectiveData: state.perspectiveData.filter(item => item.id !== action.payload.recordId)};
    case PerspectiveActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

