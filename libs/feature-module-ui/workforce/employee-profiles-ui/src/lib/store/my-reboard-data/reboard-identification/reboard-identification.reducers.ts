import { initialReboardIdentificationState, IReboardIdentificationState } from './reboard-identification.state';
import { ReboardIdentificationActions, ReboardIdentificationActionTypes } from './reboard-identification.actions';

export function reboardIdentificationReducer(state = initialReboardIdentificationState, action: ReboardIdentificationActions): IReboardIdentificationState {
  switch (action.type) {
    case ReboardIdentificationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardIdentificationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardIdentificationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardIdentificationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardIdentificationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardIdentificationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardIdentificationActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ReboardIdentificationActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ReboardIdentificationActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE_SUCCESS:
      return { ...state, signature: action.payload };
    case ReboardIdentificationActionTypes.LOAD_PAYGROUP_SUCCESS:
      return { ...state, paygroupList: action.payload };
    case ReboardIdentificationActionTypes.LOAD_GRADE_SUCCESS:
      return { ...state, gradeList: action.payload };
    case ReboardIdentificationActionTypes.LOAD_POSITION_SUCCESS:
      return { ...state, positionList: action.payload };
    default: {
      return state;
    }
  }
}
