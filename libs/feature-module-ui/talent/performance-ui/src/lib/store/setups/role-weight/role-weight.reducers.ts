import { initialRoleWeightState, IRoleWeightState } from './role-weight.state';
import { RoleWeightActions, RoleWeightActionTypes } from './role-weight.actions';

export function roleWeightReducer(
  state = initialRoleWeightState,
  action: RoleWeightActions
): IRoleWeightState {
  switch (action.type) {
    case RoleWeightActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RoleWeightActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case RoleWeightActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case RoleWeightActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case RoleWeightActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case RoleWeightActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case RoleWeightActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, roleWeightData: action.payload };
    case RoleWeightActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case RoleWeightActionTypes.REMOVE_DATA:
      return { ...state, roleWeightData: state.roleWeightData.filter(item => item.id !== action.payload.recordId) };
    case RoleWeightActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case RoleWeightActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };
    case RoleWeightActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };
    case RoleWeightActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case RoleWeightActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };
    case RoleWeightActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };
    case RoleWeightActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    default: {
      return state;
    }
  }
}

