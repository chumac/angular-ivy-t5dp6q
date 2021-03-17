import { initialHrReboardGuarantorState, IHrReboardGuarantorState } from './hr-reboard-guarantor.state'
import { HrReboardGuarantorActions, HrReboardGuarantorActionTypes } from './hr-reboard-guarantor.actions';

export function hrReboardGuarantorReducer(
  state = initialHrReboardGuarantorState,
  action: HrReboardGuarantorActions
): IHrReboardGuarantorState {
  switch (action.type) {
    case HrReboardGuarantorActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardGuarantorActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardGuarantorActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardGuarantorActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardGuarantorActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardGuarantorActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardGuarantorActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardGuarantorActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT:
      return { ...state, inlineDocument: [] };
    case HrReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS:
      return { ...state, inlineDocument: action.payload };
    case HrReboardGuarantorActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case HrReboardGuarantorActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case HrReboardGuarantorActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, photo: null };

    default: {
      return state;
    }
  }
}
