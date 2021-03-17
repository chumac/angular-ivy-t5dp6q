import { initialReboardGeneralState, IReboardGeneralState } from './reboard-general.state';
import { ReboardGeneralActions, ReboardGeneralActionTypes } from './reboard-general.actions';

export function reboardGeneralReducer(
  state = initialReboardGeneralState,
  action: ReboardGeneralActions
): IReboardGeneralState {
  switch (action.type) {
    case ReboardGeneralActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardGeneralActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardGeneralActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardGeneralActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardGeneralActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardGeneralActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardGeneralActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardGeneralActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardGeneralActionTypes.LOAD_BIRTH_STATES_READY:
      return {
        ...state,
        birthStateList: action.payload.birthStateList,
        birthCityList: []
      };
    case ReboardGeneralActionTypes.LOAD_BIRTH_CITIES_READY:
      return { ...state, birthCityList: action.payload.birthCityList };
    case ReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN_READY:
      return {
        ...state,
        stateOfOriginList: action.payload.stateOfOriginList,
        lgaList: []
      };
    case ReboardGeneralActionTypes.LOAD_LGAs_READY:
      return { ...state, lgaList: action.payload.lgaList };
    default: {
      return state;
    }
  }
}
