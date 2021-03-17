import { initialTimeSheetProjectState, ITimeSheetProjectState } from './time-sheet-project.state';
import { TimeSheetProjectActions, TimeSheetProjectActionTypes } from './time-sheet-project.actions';

export function timeSheetProjectReducer(
  state = initialTimeSheetProjectState,
  action: TimeSheetProjectActions
): ITimeSheetProjectState {
  switch (action.type) {
    case TimeSheetProjectActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TimeSheetProjectActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TimeSheetProjectActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TimeSheetProjectActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TimeSheetProjectActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TimeSheetProjectActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TimeSheetProjectActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, timeSheetProjectData: action.payload.map(data => Object.assign({}, data, {
        cost_center: data.AnalysisDetailsMapDTO?data.AnalysisDetailsMapDTO.description:null,
      })) };
    case TimeSheetProjectActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case TimeSheetProjectActionTypes.REMOVE_DATA:
      return { ...state, timeSheetProjectData: state.timeSheetProjectData.filter(item => item.id !== action.payload.recordId) };
    case TimeSheetProjectActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

