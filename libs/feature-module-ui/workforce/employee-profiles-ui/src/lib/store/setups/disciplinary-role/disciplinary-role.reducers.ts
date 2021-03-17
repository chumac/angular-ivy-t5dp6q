import { initialDisciplinaryRoleSetupState, IDisciplinaryRoleSetupState } from './disciplinary-role.state';
import { DisciplinaryRoleSetupActions, DisciplinaryRoleSetupActionTypes } from './disciplinary-role.actions';

export function disciplinaryRoleSetupReducer(
  state = initialDisciplinaryRoleSetupState,
  action: DisciplinaryRoleSetupActions
): IDisciplinaryRoleSetupState {
  switch (action.type) {
    case DisciplinaryRoleSetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DisciplinaryRoleSetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DisciplinaryRoleSetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case DisciplinaryRoleSetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case DisciplinaryRoleSetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DisciplinaryRoleSetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DisciplinaryRoleSetupActionTypes.LOADING:
      return { ...state, isLoading: true };
    case DisciplinaryRoleSetupActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case DisciplinaryRoleSetupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}

