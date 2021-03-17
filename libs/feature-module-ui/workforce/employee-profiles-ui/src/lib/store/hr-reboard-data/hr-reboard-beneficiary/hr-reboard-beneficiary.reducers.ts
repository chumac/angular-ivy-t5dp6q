import { initialHrReboardBeneficiaryState, IHrReboardBeneficiaryState } from './hr-reboard-beneficiary.state';
import { HrReboardBeneficiaryActions, HrReboardBeneficiaryActionTypes } from './hr-reboard-beneficiary.actions';

export function hrReboardBeneficiaryReducer(
  state = initialHrReboardBeneficiaryState,
  action: HrReboardBeneficiaryActions
): IHrReboardBeneficiaryState {
  switch (action.type) {
    case HrReboardBeneficiaryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardBeneficiaryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardBeneficiaryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardBeneficiaryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardBeneficiaryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardBeneficiaryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardBeneficiaryActionTypes.LOADING:
      return { ...state, isLoading: true };
    case HrReboardBeneficiaryActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case HrReboardBeneficiaryActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardBeneficiaryActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case HrReboardBeneficiaryActionTypes.LOAD_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case HrReboardBeneficiaryActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case HrReboardBeneficiaryActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, photo: null };
    default: {
      return state;
    }
  }
}
