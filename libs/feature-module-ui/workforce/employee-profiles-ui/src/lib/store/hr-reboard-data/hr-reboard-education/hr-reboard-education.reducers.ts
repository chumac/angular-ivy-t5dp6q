import { initialHrReboardEducationState, IHrReboardEducationState } from './hr-reboard-education.state';
import { HrReboardEducationActions, HrReboardEducationActionTypes } from './hr-reboard-education.actions';

export function hrReboardEducationReducer(
  state = initialHrReboardEducationState,
  action: HrReboardEducationActions
): IHrReboardEducationState {
  switch (action.type) {
    case HrReboardEducationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardEducationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardEducationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardEducationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardEducationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardEducationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardEducationActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardEducationActionTypes.LOAD_INSTITUTION_LIST_SUCCESS:
      return { ...state, institutionsList: action.payload };
    case HrReboardEducationActionTypes.LOAD_COUNTRY_LIST_SUCCESS:
      return { ...state, countryList: action.payload };
    case HrReboardEducationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardEducationActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
