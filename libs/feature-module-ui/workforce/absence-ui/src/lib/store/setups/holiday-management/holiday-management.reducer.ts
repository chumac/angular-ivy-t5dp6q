import {
  initialPublicHolidayState,
  IPublicHolidayState
} from './holiday-management.state';
import {
  PublicHolidayActionTypes, PublicHolidayActions
} from './holiday-management.actions';

export function publicHolidayReducer(
  state = initialPublicHolidayState,
  action: PublicHolidayActions
): IPublicHolidayState {
  switch (action.type) {
    case PublicHolidayActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PublicHolidayActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PublicHolidayActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PublicHolidayActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PublicHolidayActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PublicHolidayActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PublicHolidayActionTypes.LOAD_HOLIDAY_DATA_SUCCESS:
      return {...state, holidayData: action.payload};
    default: {
      return state;
    }
  }
}
