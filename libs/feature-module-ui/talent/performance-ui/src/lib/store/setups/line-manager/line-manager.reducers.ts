import { initialLineManagerState, ILineManagerState } from './line-manager.state';
import { LineManagerActions, LineManagerActionTypes } from './line-manager.actions';

export function lineManagerReducer(
  state = initialLineManagerState,
  action: LineManagerActions
): ILineManagerState {
  switch (action.type) {
    case LineManagerActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LineManagerActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LineManagerActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case LineManagerActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case LineManagerActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LineManagerActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LineManagerActionTypes.PROCESSING_GRID:
      return { ...state, isProcessingGrid: true };
    case LineManagerActionTypes.NOT_PROCESSING_GRID:
      return { ...state, isProcessingGrid: false };
    case LineManagerActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, lineManagerData: action.payload };
    case LineManagerActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planList: action.payload };
    case LineManagerActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    case LineManagerActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case LineManagerActionTypes.REMOVE_DATA:
      return { ...state, lineManagerData: state.lineManagerData.filter(item => item.id !== action.payload.recordId) };
    case LineManagerActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

