import { initialCustomUserGroupState, ICustomUserGroupState } from './custom-user-group.state';
import { CustomUserGroupActions, CustomUserGroupActionTypes } from './custom-user-group.actions';

export function customUserGroupReducer(
  state = initialCustomUserGroupState,
  action: CustomUserGroupActions
): ICustomUserGroupState {
  switch (action.type) {
    case CustomUserGroupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CustomUserGroupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CustomUserGroupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CustomUserGroupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CustomUserGroupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CustomUserGroupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CustomUserGroupActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return {
        ...state, approvedData: action.payload.map(data => Object.assign({}, data, {
          employee_name: data.EmployeeInfo ? `${data.EmployeeInfo.employee_surname} ${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} ${data.EmployeeInfo.employee_number}` : null,
          custom_description: data.StaffCustomInfo ? `${data.StaffCustomInfo.description}` : null,
        }))
      };
    case CustomUserGroupActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case CustomUserGroupActionTypes.LOAD_CUSTOM_GROUPS_SUCCESS:
      return { ...state, customGroups: action.payload };
    case CustomUserGroupActionTypes.LOAD_VALUES_SUCCESS:
      return { ...state, values: action.payload };
    case CustomUserGroupActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case CustomUserGroupActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}