import { initialRecommendationState, IRecommendationState } from './recommendation.state';
import { RecommendationActions, RecommendationActionTypes } from './recommendation.actions';

export function recommendationReducer(
  state = initialRecommendationState,
  action: RecommendationActions
): IRecommendationState {
  switch (action.type) {
    case RecommendationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RecommendationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case RecommendationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case RecommendationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case RecommendationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case RecommendationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case RecommendationActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, recommendationData: action.payload };
    case RecommendationActionTypes.REMOVE_DATA:
      return { ...state, recommendationData: state.recommendationData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

