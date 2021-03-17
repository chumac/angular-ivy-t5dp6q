import { initialConfiguration360State, IConfiguration360State } from './configuration360.state';
import { Configuration360Actions, Configuration360ActionTypes } from './configuration360.actions';

export function configuration360Reducer(
  state = initialConfiguration360State,
  action: Configuration360Actions
): IConfiguration360State {
  switch (action.type) {
    case Configuration360ActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case Configuration360ActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case Configuration360ActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case Configuration360ActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case Configuration360ActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case Configuration360ActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case Configuration360ActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, configuration360Data: action.payload };
    case Configuration360ActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case Configuration360ActionTypes.REMOVE_DATA:
      return { ...state, configuration360Data: state.configuration360Data.filter(item => item.id !== action.payload.recordId) };
    case Configuration360ActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case Configuration360ActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, plansList: action.payload };
    case Configuration360ActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };
    case Configuration360ActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };
    case Configuration360ActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case Configuration360ActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };
    case Configuration360ActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };
    case Configuration360ActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    default: {
      return state;
    }
  }
}

