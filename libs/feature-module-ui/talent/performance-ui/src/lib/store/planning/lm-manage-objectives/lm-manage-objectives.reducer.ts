import { initialLmManageObjectivesState, ILmManageObjectivesState } from './lm-manage-objectives.state';
import {
  LmManageObjectivesActionTypes,
  LmManageObjectivesActions
} from './lm-manage-objectives.actions';

export function lmManageObjectivesReducer(
  state = initialLmManageObjectivesState,
  action: LmManageObjectivesActions
): ILmManageObjectivesState {
  switch (action.type) {
    case LmManageObjectivesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LmManageObjectivesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LmManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA_SUCCESS:
      return { ...state, objectiveMasterData: action.payload };
    case LmManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA_SUCCESS:
      return { ...state, preScoredObjectiveMasterData: action.payload };
    case LmManageObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planlist: action.payload };
    case LmManageObjectivesActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload.map(data => Object.assign({}, data, {
        employee_fullname: `${data.employee_firstname} ${data.employee_midname} ${data.employee_surname} (${data.staff_number})`,
      })) };
    case LmManageObjectivesActionTypes.SET_SELECTED_EMPLOYEE_ID:
      return { ...state, selectedEmployeeId: action.payload.employeeId };
    case LmManageObjectivesActionTypes.RESET_COMPONENTS:
      return { ...state, objectiveMasterData: [], preScoredObjectiveMasterData: [] };
    default: {
      return state;
    }
  }
}
