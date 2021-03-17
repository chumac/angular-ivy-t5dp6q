import { initialBusinessTypeState, IBusinessTypeState } from './business-type.state';
import { BusinessTypeActions, BusinessTypeActionTypes } from './business-type.actions';

export function businessTypeReducer(
  state = initialBusinessTypeState,
  action: BusinessTypeActions
): IBusinessTypeState {
  switch (action.type) {
    case BusinessTypeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case BusinessTypeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case BusinessTypeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case BusinessTypeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case BusinessTypeActionTypes.LOAD_BUSINESS_TYPE_DATA_SUCCESS:
      return { ...state, businessData: action.payload };
    default: {
      return state;
    }
  }
}
