import { initialCustomUserGroupSetupState, ICustomUserGroupSetupState } from './custom-user-group.state';
import { CustomUserGroupSetupActions, CustomUserGroupSetupActionTypes } from './custom-user-group.actions';

export function customUserGroupSetupReducer(
  state = initialCustomUserGroupSetupState,
  action: CustomUserGroupSetupActions
): ICustomUserGroupSetupState {
  switch (action.type) {
    case CustomUserGroupSetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CustomUserGroupSetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CustomUserGroupSetupActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case CustomUserGroupSetupActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };
    case CustomUserGroupSetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CustomUserGroupSetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CustomUserGroupSetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CustomUserGroupSetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CustomUserGroupSetupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case CustomUserGroupSetupActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case CustomUserGroupSetupActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
