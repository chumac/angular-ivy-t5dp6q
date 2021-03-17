import { initialFeedbackQuestionState, IFeedbackQuestionState } from './feedback-question.state';
import { FeedbackQuestionActions, FeedbackQuestionActionTypes } from './feedback-question.actions';

export function feedbackQuestionReducer(
  state = initialFeedbackQuestionState,
  action: FeedbackQuestionActions
): IFeedbackQuestionState {
  switch (action.type) {
    case FeedbackQuestionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FeedbackQuestionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FeedbackQuestionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FeedbackQuestionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FeedbackQuestionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FeedbackQuestionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FeedbackQuestionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, feedbackQuestionData: action.payload };
    case FeedbackQuestionActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planList: action.payload };
    case FeedbackQuestionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case FeedbackQuestionActionTypes.REMOVE_DATA:
      return { ...state, feedbackQuestionData: state.feedbackQuestionData.filter(item => item.id !== action.payload.recordId) };
    case FeedbackQuestionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

