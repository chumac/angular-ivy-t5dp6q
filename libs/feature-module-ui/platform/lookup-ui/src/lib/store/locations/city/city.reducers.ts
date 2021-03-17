import { initialCityState, ICityState } from './city.state';
import { CityActions, CityActionTypes } from './city.actions';

export function cityReducer(
  state = initialCityState,
  action: CityActions
): ICityState {
  switch (action.type) {
    case CityActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CityActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CityActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CityActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CityActionTypes.LOAD_CITY_DATA_SUCCESS:
      return { ...state, cityData: action.payload };
    case CityActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationality: action.payload };
    case CityActionTypes.LOAD_STATE_DATA_SUCCESS:
      return { ...state, stateData:action.payload };
    case CityActionTypes.CLEAR:
      return { ...state, cityData: [] };
    case CityActionTypes.CLEAR_STATE:
      return { ...state, stateData: [] };
      default: {
      return state;
    }
  }
}
