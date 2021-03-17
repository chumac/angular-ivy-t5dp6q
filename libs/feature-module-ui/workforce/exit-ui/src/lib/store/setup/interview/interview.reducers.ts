import { initialInterviewState, IInterviewState } from './interview.state';
import { InterviewActions, InterviewActionTypes } from './interview.actions';

export function interviewReducer(
  state = initialInterviewState,
  action: InterviewActions
): IInterviewState {
  switch (action.type) {
    case InterviewActionTypes.SHOW_FORM_EDITOR:
      return { ...state, showFormEditor: true };
    case InterviewActionTypes.HIDE_FORM_EDITOR:
      return { ...state, showFormEditor: false };
    case InterviewActionTypes.SHOW_FORM_VIEWER:
      return { ...state, showFormViewer: true };
    case InterviewActionTypes.HIDE_FORM_VIEWER:
      return { ...state, showFormViewer: false };
    case InterviewActionTypes.SHOW_QUESTION_EDITOR:
      return { ...state, showQuestionEditor: true };
    case InterviewActionTypes.HIDE_QUESTION_EDITOR:
      return { ...state, showQuestionEditor: false };
    case InterviewActionTypes.SHOW_QUESTION_VIEWER:
      return { ...state, showQuestionViewer: true };
    case InterviewActionTypes.HIDE_QUESTION_VIEWER:
      return { ...state, showQuestionViewer: false };
    case InterviewActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case InterviewActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case InterviewActionTypes.LOADING:
      return { ...state, isLoading: true };
    case InterviewActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case InterviewActionTypes.LOAD_FORMS_DATA_SUCCESS:
      return { ...state, interviewFormsData: action.payload };
    case InterviewActionTypes.LOAD_QUESTIONS_DATA_SUCCESS:
      return { ...state, questionsData: action.payload };
    default: {
      return state;
    }
  }
}
