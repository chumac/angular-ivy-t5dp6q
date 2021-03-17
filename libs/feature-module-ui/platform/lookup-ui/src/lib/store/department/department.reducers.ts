import { initialDepartmentState, IDepartmentState } from './department.state';
import { DepartmentActions, DepartmentActionTypes } from './department.actions';

export function departmentReducer(
  state = initialDepartmentState,
  action: DepartmentActions
): IDepartmentState {
  switch (action.type) {
    case DepartmentActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DepartmentActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DepartmentActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DepartmentActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DepartmentActionTypes.LOADING:
      return { ...state, isLoading: true };
    case DepartmentActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case DepartmentActionTypes.LOAD_DEPARTMENT_DATA_SUCCESS:
      return { ...state, departmentData: action.payload };
    default: {
      return state;
    }
  }
}
