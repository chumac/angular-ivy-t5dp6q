import { initialHrCustomDataFormState, IHrCustomDataFormState } from './hr-custom-data-form.state';
import { HrCustomDataFormActions, HrCustomDataFormActionTypes } from './hr-custom-data-form.actions';

export function hrCustomDataFormReducer(
  state = initialHrCustomDataFormState,
  action: HrCustomDataFormActions
): IHrCustomDataFormState {
  switch (action.type) {
    case HrCustomDataFormActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrCustomDataFormActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrCustomDataFormActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrCustomDataFormActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrCustomDataFormActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrCustomDataFormActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrCustomDataFormActionTypes.PROCESSING_ALT:
      return { ...state, isProcessingAlt: true };
    case HrCustomDataFormActionTypes.NOT_PROCESSING_ALT:
      return { ...state, isProcessingAlt: false };
    case HrCustomDataFormActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, hrCustomDataFormData: action.payload };
    case HrCustomDataFormActionTypes.REMOVE_DATA:
      return { ...state, hrCustomDataFormData: state.hrCustomDataFormData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

