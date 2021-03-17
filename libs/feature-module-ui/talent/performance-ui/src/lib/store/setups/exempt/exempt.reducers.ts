import { initialExemptState, IExemptState } from './exempt.state';
import { ExemptActions, ExemptActionTypes } from './exempt.actions';

export function exemptReducer(
  state = initialExemptState,
  action: ExemptActions
): IExemptState {
  switch (action.type) {
    case ExemptActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ExemptActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ExemptActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ExemptActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ExemptActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ExemptActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ExemptActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, exemptData: action.payload.map(data =>
        Object.assign(
          data,
          {
            emp_fullname: `${data.EmployeeInfo.employee_surname} ${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} - ${data.EmployeeInfo.employee_number}`
          }
        )
      )  };
    case ExemptActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    case ExemptActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planList: action.payload };
    case ExemptActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ExemptActionTypes.REMOVE_DATA:
      return { ...state, exemptData: state.exemptData.filter(item => item.id !== action.payload.recordId) };
    case ExemptActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case ExemptActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };
    case ExemptActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };
    case ExemptActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case ExemptActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };
    case ExemptActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };
    case ExemptActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    default: {
      return state;
    }
  }
}

