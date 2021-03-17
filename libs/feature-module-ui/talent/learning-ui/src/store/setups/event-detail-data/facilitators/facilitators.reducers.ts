import { initialFacilitatorsState, IFacilitatorsState } from './facilitators.state';
import { FacilitatorsActions, FacilitatorsActionTypes } from './facilitators.actions';

export function FacilitatorsReducer(
  state = initialFacilitatorsState,
  action: FacilitatorsActions
): IFacilitatorsState {
  switch (action.type) {
    case FacilitatorsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FacilitatorsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FacilitatorsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FacilitatorsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FacilitatorsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FacilitatorsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FacilitatorsActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, FacilitatorsData: action.payload };
    case FacilitatorsActionTypes.LOAD_DATA_TYPE_SUCCESS:
      return { ...state, FacilitatorsTypeData: action.payload };
    case FacilitatorsActionTypes.LOAD_FACILITATORS_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case FacilitatorsActionTypes.LOAD_FACILITATORS_IMAGE_SUCCESS:
      return { ...state, image: action.payload };
    case FacilitatorsActionTypes.REMOVE_DATA:
      return { ...state, FacilitatorsData: state.FacilitatorsData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

