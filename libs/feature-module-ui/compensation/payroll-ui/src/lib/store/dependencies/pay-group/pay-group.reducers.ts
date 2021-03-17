import { initialPayGroupState, IPayGroupState } from './pay-group.state';
import { PayGroupActions, PayGroupActionTypes } from './pay-group.actions';

export function payGroupReducer(
  state = initialPayGroupState,
  action: PayGroupActions
): IPayGroupState {
  switch (action.type) {
    case PayGroupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PayGroupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PayGroupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PayGroupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PayGroupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PayGroupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PayGroupActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PayGroupActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PayGroupActionTypes.LOAD_PAY_GROUP_DATA_SUCCESS:
      return {
        ...state, data: action.payload.map(data => Object.assign({}, data, {
          grade: data.gradeInfo ? data.gradeInfo.description: null
        }))
      };
    case PayGroupActionTypes.LOAD_FILTERED_PAYGROUP_DATA:
      console.log(state.data)
      return { ...state, filteredData: state.data.filter(val => typeof action.payload.statusId === 'number' ? val.confirmation_status === action.payload.statusId : val) };
    case PayGroupActionTypes.LOAD_PAY_GROUP_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingData: action.payload };
    case PayGroupActionTypes.LOAD_CONFIRMATION_STATUS_DATA_SUCCESS:
      return { ...state, confirmationStatus: action.payload };
    case PayGroupActionTypes.LOAD_ROLE_DATA_SUCCESS:
      return { ...state, roles: action.payload };
    case PayGroupActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, payrollSelectOption: action.payload };
    case PayGroupActionTypes.LOAD_GRADE_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, gradeSelectOption: action.payload };
    case PayGroupActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, currencySelectOption: action.payload };
    case PayGroupActionTypes.HAS_PAYGROUP_ADMIN_ROLE:
      return { ...state, hasPaygroupAdminRole: action.payload };
    default: {
      return state;
    }
  }
}
