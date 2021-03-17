import { initialNewEmployeeState, INewEmployeeState } from './new-employee.state';
import { NewEmployeeActions, NewEmployeeActionTypes } from './new-employee.action';


export function newEmployeeReducer(
  state = initialNewEmployeeState,
  action: NewEmployeeActions
): INewEmployeeState {
  switch (action.type) {
    case NewEmployeeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case NewEmployeeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case NewEmployeeActionTypes.SHOW_TREE:
      return { ...state, showTree: true };
    case NewEmployeeActionTypes.HIDE_TREE:
      return { ...state, showTree: false };
    case NewEmployeeActionTypes.SHOW_PROVISIONED_EDITOR:
      return { ...state, showProvisionedEditor: true };
    case NewEmployeeActionTypes.HIDE_PROVISIONED_EDITOR:
      return { ...state, showProvisionedEditor: false };
    case NewEmployeeActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case NewEmployeeActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case NewEmployeeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case NewEmployeeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case NewEmployeeActionTypes.LOADING:
      return { ...state, isLoading: true };
    case NewEmployeeActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case NewEmployeeActionTypes.LOAD_ROLE_DATA_SUCCESS:
      return { ...state, rolesList: action.payload };
    case NewEmployeeActionTypes.LOAD_SELECTED_ROLES_DATA_SUCCESS:
      return { ...state, selectedRoles: action.payload };
    case NewEmployeeActionTypes.LOAD_PROVISIONED_DATA_SUCCESS:
      return { ...state, provisionedData: action.payload };
    case NewEmployeeActionTypes.LOAD_DESIGNATIONS_SUCCESS:
      return { ...state, designationList: action.payload };
    case NewEmployeeActionTypes.LOAD_USER_TYPES_SUCCESS:
      return { ...state, userTypes: action.payload };
    case NewEmployeeActionTypes.LOAD_EMAILS_TO_SUCCESS:
      return { ...state, sendEmailTo: action.payload };
    case NewEmployeeActionTypes.LOAD_RECORD_CATEGORIES_SUCCESS:
      return { ...state, recordCategories: action.payload };
    case NewEmployeeActionTypes.LOAD_POSITIONS_SUCCESS:
      return { ...state, positionList: action.payload };
    case NewEmployeeActionTypes.LOAD_STAFF_CATEGORIES_SUCCESS:
      return { ...state, staffCategoryList: action.payload };
    case NewEmployeeActionTypes.LOAD_PAYGRADES_SUCCESS:
      return { ...state, paygradeList: action.payload };
    case NewEmployeeActionTypes.LOAD_PAYGROUPS_SUCCESS:
      return { ...state, paygroupList: action.payload };
    case NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES_SUCCESS:
      return { ...state, structureTypeList: action.payload };
    case NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS_SUCCESS:
      return { ...state, structureDetailsList: action.payload.structureDetailsList};
    case NewEmployeeActionTypes.LOAD_COST_CENTERS_SUCCESS:
      return { ...state, costCentersList: action.payload};
    case NewEmployeeActionTypes.LOAD_USERNAME_SUCCESS:
      return { ...state, username: action.payload };
    case NewEmployeeActionTypes.LOAD_STAFF_NUMBER_SUCCESS:
      return { ...state, staffNumber: action.payload };
    default: {
      return state;
    }
  }
}
