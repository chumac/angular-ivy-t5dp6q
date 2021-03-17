import { initialCustomDataFormState, ICustomDataFormState } from './custom-data-form.state';
import { CustomDataFormActions, CustomDataFormActionTypes } from './custom-data-form.actions';

export function customDataFormReducer(
  state = initialCustomDataFormState,
  action: CustomDataFormActions
): ICustomDataFormState {
  switch (action.type) {
    case CustomDataFormActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CustomDataFormActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CustomDataFormActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CustomDataFormActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CustomDataFormActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CustomDataFormActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CustomDataFormActionTypes.PROCESSING_ALT:
      return { ...state, isProcessingAlt: true };
    case CustomDataFormActionTypes.NOT_PROCESSING_ALT:
      return { ...state, isProcessingAlt: false };
    case CustomDataFormActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, customDataFormData: action.payload };
    case CustomDataFormActionTypes.REMOVE_DATA:
      return { ...state, customDataFormData: state.customDataFormData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

