import { initialMyActionState, IMyActionState } from './my-action.state';
import { MyActionActions, MyActionActionTypes } from './my-action.actions';

export function MyActionReducer(
  state = initialMyActionState,
  action: MyActionActions
): IMyActionState {
  switch (action.type) {
    case MyActionActionTypes.SHOW_ACTION_OPTOUT_EDITOR:
      return { ...state, showActionOptOutEditor: true };
    case MyActionActionTypes.HIDE_ACTION_OPTOUT_EDITOR:
      return { ...state, showActionOptOutEditor: false };
    case MyActionActionTypes.SHOW_FEEDBACK_FORM_EDITOR:
      return { ...state, showActionFeedbackFormEditor: true };
    case MyActionActionTypes.HIDE_FEEDBACK_FORM_EDITOR:
      return { ...state, showActionFeedbackFormEditor: false };
    case MyActionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case MyActionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case MyActionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, MyActionData: action.payload };
    case MyActionActionTypes.LOAD_FORM_DATA_SUCCESS:
      return { ...state, MyFormActionData: action.payload };
    case MyActionActionTypes.SHOW_FACULTY_NOMINATION_EDITOR:
      return { ...state, showActionNominationEditor: true };
    case MyActionActionTypes.HIDE_FACULTY_NOMINATION_EDITOR:
      return { ...state, showActionNominationEditor: false };
    case MyActionActionTypes.MANAGER_OPTOUT_DATA_SUCCESS:
      return { ...state, managerOptOut: action.payload };
    case MyActionActionTypes.FEEDBACK_FORM_DATA_SUCCESS:
      return { ...state, saveFeedbackForm: action.payload };
    default: {
      return state;
    }
  }
}

