import { initialRatingAssetDetailState, IRatingAssetDetailState } from './rating-asset-detail.state';
import { RatingAssetDetailActions, RatingAssetDetailActionTypes } from './rating-asset-detail.actions';

export function ratingAssetDetailReducer(
  state = initialRatingAssetDetailState,
  action: RatingAssetDetailActions
): IRatingAssetDetailState {
  switch (action.type) {
    case RatingAssetDetailActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RatingAssetDetailActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case RatingAssetDetailActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case RatingAssetDetailActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case RatingAssetDetailActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case RatingAssetDetailActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case RatingAssetDetailActionTypes.LOAD_DATA:
      return { ...state, ratingAssetDetailData: [] };
    case RatingAssetDetailActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, ratingAssetDetailData: action.payload };
    case RatingAssetDetailActionTypes.LOAD_RATING_TABLE_DATA_SUCCESS:
      return { ...state, ratingTableData: action.payload };
    case RatingAssetDetailActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case RatingAssetDetailActionTypes.REMOVE_DATA:
      return { ...state, ratingAssetDetailData: state.ratingAssetDetailData.filter(item => item.id !== action.payload.recordId) };
    case RatingAssetDetailActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

