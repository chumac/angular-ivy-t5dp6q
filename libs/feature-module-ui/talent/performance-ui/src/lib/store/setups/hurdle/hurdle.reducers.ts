import { initialHurdleState, IHurdleState } from './hurdle.state';
import { HurdleActions, HurdleActionTypes } from './hurdle.actions';

export function hurdleReducer(
  state = initialHurdleState,
  action: HurdleActions
): IHurdleState {
  switch (action.type) {
    case HurdleActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HurdleActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HurdleActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HurdleActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HurdleActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HurdleActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HurdleActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, hurdleData: action.payload };
    case HurdleActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HurdleActionTypes.REMOVE_DATA:
      return { ...state, hurdleData: state.hurdleData.filter(item => item.id !== action.payload.recordId)};
    case HurdleActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

