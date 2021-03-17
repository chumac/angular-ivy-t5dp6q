import { initialHrReboardGeneralState, IHrReboardGeneralState } from './hr-reboard-general.state';
import { HrReboardGeneralActions, HrReboardGeneralActionTypes } from './hr-reboard-general.actions';

export function hrReboardGeneralReducer(
  state = initialHrReboardGeneralState,
  action: HrReboardGeneralActions
): IHrReboardGeneralState {
  switch (action.type) {
    case HrReboardGeneralActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardGeneralActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardGeneralActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardGeneralActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardGeneralActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardGeneralActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardGeneralActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardGeneralActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardGeneralActionTypes.LOAD_BIRTH_STATES_READY:
      return {
        ...state,
        birthStateList: action.payload.birthStateList,
        birthCityList: []
      };
    case HrReboardGeneralActionTypes.LOAD_BIRTH_CITIES_READY:
      return { ...state, birthCityList: action.payload.birthCityList };
    case HrReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN_READY:
      return {
        ...state,
        stateOfOriginList: action.payload.stateOfOriginList,
        lgaList: []
      };
    case HrReboardGeneralActionTypes.LOAD_LGAs_READY:
      return { ...state, lgaList: action.payload.lgaList };
    default: {
      return state;
    }
  }
}
