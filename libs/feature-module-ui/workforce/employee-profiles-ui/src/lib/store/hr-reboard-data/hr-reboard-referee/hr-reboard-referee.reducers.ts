import { initialHrReboardRefereeState, IHrReboardRefereeState } from './hr-reboard-referee.state';
import { HrReboardRefereeActions, HrReboardRefereeActionTypes } from './hr-reboard-referee.actions';

export function hrReboardRefereeReducer(
  state = initialHrReboardRefereeState,
  action: HrReboardRefereeActions
): IHrReboardRefereeState {
  switch (action.type) {
    case HrReboardRefereeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardRefereeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardRefereeActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardRefereeActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardRefereeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardRefereeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardRefereeActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardRefereeActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS:
      return { ...state, inlineDocument: action.payload };
    case HrReboardRefereeActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case HrReboardRefereeActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
