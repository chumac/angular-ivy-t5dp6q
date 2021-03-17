import { initialReboardBeneficiaryState, IReboardBeneficiaryState } from './reboard-beneficiary.state';
import { ReboardBeneficiaryActions, ReboardBeneficiaryActionTypes } from './reboard-beneficiary.actions';

export function reboardBeneficiaryReducer(
  state = initialReboardBeneficiaryState,
  action: ReboardBeneficiaryActions
): IReboardBeneficiaryState {
  switch (action.type) {
    case ReboardBeneficiaryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardBeneficiaryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardBeneficiaryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardBeneficiaryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardBeneficiaryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardBeneficiaryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardBeneficiaryActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ReboardBeneficiaryActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ReboardBeneficiaryActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardBeneficiaryActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case ReboardBeneficiaryActionTypes.LOAD_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case ReboardBeneficiaryActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case ReboardBeneficiaryActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, photo: null };
    default: {
      return state;
    }
  }
}
