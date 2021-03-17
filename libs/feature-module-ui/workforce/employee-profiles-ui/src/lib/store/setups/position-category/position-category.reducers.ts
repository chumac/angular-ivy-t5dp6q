import { initialPositionCategorySetupState, IPositionCategorySetupState } from './position-category.state';
import { PositionCategorySetupActions, PositionCategorySetupActionTypes } from './position-category.actions';

export function positionCategorySetupReducer(
  state = initialPositionCategorySetupState,
  action: PositionCategorySetupActions
): IPositionCategorySetupState {
  switch (action.type) {
    case PositionCategorySetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PositionCategorySetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PositionCategorySetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PositionCategorySetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PositionCategorySetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PositionCategorySetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PositionCategorySetupActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PositionCategorySetupActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PositionCategorySetupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case PositionCategorySetupActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PositionCategorySetupActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

