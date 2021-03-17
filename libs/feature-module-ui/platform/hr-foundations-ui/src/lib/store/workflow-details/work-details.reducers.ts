import { initialWorkDetailsState, IWorkDetailsState } from './work-details.state';
import { WorkDetailsActions, WorkDetailsActionTypes } from './work-details.actions';

export function workDetailsReducer(
  state = initialWorkDetailsState,
  action: WorkDetailsActions
): IWorkDetailsState {
  switch (action.type) {
    case WorkDetailsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case WorkDetailsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case WorkDetailsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case WorkDetailsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case WorkDetailsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case WorkDetailsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case WorkDetailsActionTypes.LOADING:
      return { ...state, isLoading: true };
    case WorkDetailsActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case WorkDetailsActionTypes.LOAD_WORK_DETAILS_DATA_SUCCESS:
      return { ...state, workDetailsData: action.payload };
    case WorkDetailsActionTypes.PROCESSING_RULE_SUCCESS:
      return { ...state, processingRule: action.payload };
    case WorkDetailsActionTypes.CLEAR_WORK_DETAILS_DATA:
      return { ...state, workDetailsData: []};
    default: {
      return state;
    }
  }
}
