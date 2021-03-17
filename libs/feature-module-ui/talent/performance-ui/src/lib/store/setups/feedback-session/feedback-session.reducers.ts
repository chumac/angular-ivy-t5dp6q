import { initialFeedbackSessionState, IFeedbackSessionState } from './feedback-session.state';
import { FeedbackSessionActions, FeedbackSessionActionTypes } from './feedback-session.actions';

export function feedbackSessionReducer(
  state = initialFeedbackSessionState,
  action: FeedbackSessionActions
): IFeedbackSessionState {
  switch (action.type) {
    case FeedbackSessionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FeedbackSessionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FeedbackSessionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FeedbackSessionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FeedbackSessionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FeedbackSessionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    // case FeedbackSessionActionTypes.LOAD_DATA:
    //   return { ...state, feedbackSessionData: [] };
    case FeedbackSessionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, feedbackSessionData: action.payload };
    case FeedbackSessionActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planList: action.payload };
    case FeedbackSessionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case FeedbackSessionActionTypes.REMOVE_DATA:
      return { ...state, feedbackSessionData: state.feedbackSessionData.filter(item => item.id !== action.payload.recordId) };
    case FeedbackSessionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

