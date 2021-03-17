import { initialReboardGuarantorState, IReboardGuarantorState } from './reboard-guarantor.state'
import { ReboardGuarantorActions, ReboardGuarantorActionTypes } from './reboard-guarantor.actions';

export function reboardGuarantorReducer(
  state = initialReboardGuarantorState,
  action: ReboardGuarantorActions
): IReboardGuarantorState {
  switch (action.type) {
    case ReboardGuarantorActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardGuarantorActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardGuarantorActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardGuarantorActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardGuarantorActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardGuarantorActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardGuarantorActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardGuarantorActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT:
      return { ...state, inlineDocument: [] };
    case ReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS:
      return { ...state, inlineDocument: action.payload };
    case ReboardGuarantorActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case ReboardGuarantorActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case ReboardGuarantorActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, photo: null };

    default: {
      return state;
    }
  }
}
