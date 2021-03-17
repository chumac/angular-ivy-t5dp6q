import { initialSeparationReasonSetupState, ISeparationReasonSetupState } from './separation-reason.state';
import { SeparationReasonSetupActions, SeparationReasonSetupActionTypes } from './separation-reason.actions';

export function separationReasonSetupReducer(
  state = initialSeparationReasonSetupState,
  action: SeparationReasonSetupActions
): ISeparationReasonSetupState {
  switch (action.type) {
    case SeparationReasonSetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SeparationReasonSetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SeparationReasonSetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SeparationReasonSetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SeparationReasonSetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SeparationReasonSetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SeparationReasonSetupActionTypes.LOADING:
      return { ...state, isLoading: true };
    case SeparationReasonSetupActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case SeparationReasonSetupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}

