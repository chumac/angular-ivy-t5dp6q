import { initialFeedbackFormsState, IFeedbackFormsState } from './feedback-forms.state';
import { FeedbackFormsActions, FeedbackFormsActionTypes } from './feedback-forms.actions';

export function FeedbackFormsReducer(
  state = initialFeedbackFormsState,
  action: FeedbackFormsActions
): IFeedbackFormsState {
  switch (action.type) {
    case FeedbackFormsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FeedbackFormsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FeedbackFormsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FeedbackFormsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FeedbackFormsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FeedbackFormsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FeedbackFormsActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, FeedbackFormsData: action.payload };
    case FeedbackFormsActionTypes.LOAD_FORM_DATA_SUCCESS:
      return { ...state, CustomFormsData: action.payload };
    case FeedbackFormsActionTypes.LOAD_FORM_AVAILABILITY_DATA_SUCCESS:
      return { ...state, FeedbackFormsAvailabilityData: action.payload };
    case FeedbackFormsActionTypes.LOAD_FORM_ROLE_DATA_SUCCESS:
      return { ...state, FeedbackFormsRoleData: action.payload };

    case FeedbackFormsActionTypes.REMOVE_DATA:
      return { ...state, FeedbackFormsData: state.FeedbackFormsData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

