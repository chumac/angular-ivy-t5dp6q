import { initialRatingAssetDefinitionState, IRatingAssetDefinitionState } from './rating-asset-definition.state';
import { RatingAssetDefinitionActions, RatingAssetDefinitionActionTypes } from './rating-asset-definition.actions';

export function ratingAssetDefinitionReducer(
  state = initialRatingAssetDefinitionState,
  action: RatingAssetDefinitionActions
): IRatingAssetDefinitionState {
  switch (action.type) {
    case RatingAssetDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RatingAssetDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case RatingAssetDefinitionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case RatingAssetDefinitionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case RatingAssetDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case RatingAssetDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case RatingAssetDefinitionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case RatingAssetDefinitionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case RatingAssetDefinitionActionTypes.LOAD_DATA:
      return { ...state, ratingAssetDefinitionData: [] };
    case RatingAssetDefinitionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, ratingAssetDefinitionData: action.payload };
    case RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA:
      return { ...state, pageList: [] };
    case RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA_SUCCESS:
      return { ...state, pageList: action.payload };
    case RatingAssetDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case RatingAssetDefinitionActionTypes.REMOVE_DATA:
      return { ...state, ratingAssetDefinitionData: state.ratingAssetDefinitionData.filter(item => item.id !== action.payload.recordId) };
    case RatingAssetDefinitionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

