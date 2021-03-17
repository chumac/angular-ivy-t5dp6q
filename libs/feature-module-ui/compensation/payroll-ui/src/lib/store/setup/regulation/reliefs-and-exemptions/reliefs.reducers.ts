import { initialReliefState, IReliefState } from './reliefs.state';
import { ReliefActionTypes, ReliefActions } from './reliefs.actions';

export function reliefReducer(
  state = initialReliefState,
  action: ReliefActions
): IReliefState {
  switch (action.type) {
    case ReliefActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReliefActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReliefActionTypes.SHOW_ADD_EDITOR:
      return { ...state, showAddReliefEditor: true };
    case ReliefActionTypes.HIDE_ADD_EDITOR:
      return { ...state, showAddReliefEditor: false };
    case ReliefActionTypes.SHOW_CONFIG_EDITOR:
      return { ...state, showConfigReliefEditor: true };
    case ReliefActionTypes.HIDE_CONFIG_EDITOR:
      return { ...state, showConfigReliefEditor: false };
    case ReliefActionTypes.SHOW_GRADE_EDITOR:
      return { ...state, showGradesReliefEditor: true };
    case ReliefActionTypes.HIDE_GRADE_EDITOR:
      return { ...state, showGradesReliefEditor: false };
    case ReliefActionTypes.SHOW_PAYGROUP_EDITOR:
      return { ...state, showPayGroupReliefEditor: true };
    case ReliefActionTypes.HIDE_PAYGROUP_EDITOR:
      return { ...state, showPayGroupReliefEditor: false };
    case ReliefActionTypes.SHOW_EMPLOYEE_EDITOR:
      return { ...state, showEmployeeReliefEditor: true };
    case ReliefActionTypes.HIDE_EMPLOYEE_EDITOR:
      return { ...state, showEmployeeReliefEditor: false };
      return { ...state, showGradesReliefEditor: false };
    case ReliefActionTypes.HIDE_ADD_EDITOR:
      return { ...state, showAddReliefEditor: false };
    case ReliefActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReliefActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReliefActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ReliefActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ReliefActionTypes.LOAD_RELIEF_DATA_SUCCESS:
      return { ...state, reliefsList: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_PROFILE_SUCCESS:
      return { ...state, reliefProfile: action.payload };
    case ReliefActionTypes.LOAD_STATUTORY_DATA_SUCCESS:
      return { ...state, relieStatutory: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_TYPE_DATA_SUCCESS:
      return { ...state, reliefType: action.payload };
    case ReliefActionTypes.LOAD_USE_RULE_DATA_SUCCESS:
      return { ...state, useRule: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_CURRENCY_DATA_SUCCESS:
      return { ...state, reliefCurrencies: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_GRADE_DATA_SUCCESS:
      return { ...state, reliefGrades: action.payload };
    case ReliefActionTypes.LOAD_PAY_GROUP_DATA_SUCCESS:
      return { ...state, payGroupGrades: action.payload };
    case ReliefActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS:
      return { ...state, employee: action.payload };
    case ReliefActionTypes.GET_RELIEF_GRADE_DATA_SUCCESS:
      return { ...state, gradeData: action.payload };
    case ReliefActionTypes.GET_EMPLOYEE_DATA_SUCCESS:
      return { ...state, EmployeeData: action.payload };
    case ReliefActionTypes.GET_PAYGROUP_DATA_SUCCESS:
      return { ...state, payGroupData: action.payload };
    case ReliefActionTypes.GET_RELIEF_GRADE_DATA_SUCCESS:
      return { ...state, gradeData: action.payload };
    case ReliefActionTypes.SHOW_VIEW_EDITOR:
      return { ...state, showViewEditor: true };
    case ReliefActionTypes.HIDE_VIEW_EDITOR:
      return { ...state, showViewEditor: false };
    case ReliefActionTypes.SHOW_FIXED_DEDUCTION:
      return { ...state, showFixedDeduction: true };
    case ReliefActionTypes.HIDE_FIXED_DEDUCTION:
      return { ...state, showFixedDeduction: false };
    case ReliefActionTypes.LOAD_FIXED_DEDUCTION_DATA_SUCCESS:
      return { ...state, fixedDeduction: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_GRADE_LIST_DATA_SUCCESS:
      return { ...state, reliefGradeList: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_PAYGROUP_LIST_DATA_SUCCESS:
      return { ...state, reliefPayGroupList: action.payload };
    case ReliefActionTypes.LOAD_RELIEF_EMPLOYEE_LIST_DATA_SUCCESS:
      return { ...state, reliefEmployeeList: action.payload };

    default: {
      return state;
    }
  }
}
