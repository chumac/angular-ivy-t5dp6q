import { initialDisciplinaryActionSetupState, IDisciplinaryActionSetupState } from './disciplinary-action.state';
import { DisciplinaryActionSetupActions, DisciplinaryActionSetupActionTypes } from './disciplinary-action.actions';

export function disciplinaryActionSetupReducer(
  state = initialDisciplinaryActionSetupState,
  action: DisciplinaryActionSetupActions
): IDisciplinaryActionSetupState {
  switch (action.type) {
    case DisciplinaryActionSetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DisciplinaryActionSetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DisciplinaryActionSetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case DisciplinaryActionSetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case DisciplinaryActionSetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DisciplinaryActionSetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DisciplinaryActionSetupActionTypes.LOADING:
      return { ...state, isLoading: false };
    case DisciplinaryActionSetupActionTypes.NOT_LOADING:
      return { ...state, isLoading: true };
    case DisciplinaryActionSetupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}

