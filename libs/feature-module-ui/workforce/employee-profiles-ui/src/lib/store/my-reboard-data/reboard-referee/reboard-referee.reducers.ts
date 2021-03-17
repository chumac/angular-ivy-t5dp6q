import { initialReboardRefereeState, IReboardRefereeState } from './reboard-referee.state';
import { ReboardRefereeActions, ReboardRefereeActionTypes } from './reboard-referee.actions';

export function reboardRefereeReducer(
  state = initialReboardRefereeState,
  action: ReboardRefereeActions
): IReboardRefereeState {
  switch (action.type) {
    case ReboardRefereeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardRefereeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardRefereeActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardRefereeActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardRefereeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardRefereeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardRefereeActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardRefereeActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS:
      return { ...state, inlineDocument: action.payload };
    case ReboardRefereeActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case ReboardRefereeActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
