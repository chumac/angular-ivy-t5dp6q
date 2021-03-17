import { initialFeedbackRatingState, IFeedbackRatingState } from './feedback-rating.state';
import { FeedbackRatingActions, FeedbackRatingActionTypes } from './feedback-rating.actions';

export function feedbackRatingReducer(
  state = initialFeedbackRatingState,
  action: FeedbackRatingActions
): IFeedbackRatingState {
  switch (action.type) {
    case FeedbackRatingActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FeedbackRatingActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FeedbackRatingActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FeedbackRatingActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FeedbackRatingActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FeedbackRatingActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FeedbackRatingActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, feedbackRatingData: action.payload };
    case FeedbackRatingActionTypes.REMOVE_DATA:
      return { ...state, feedbackRatingData: state.feedbackRatingData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

