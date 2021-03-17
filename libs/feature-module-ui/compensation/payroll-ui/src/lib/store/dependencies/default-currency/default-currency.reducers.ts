import { initialDefaultCurrencyState, IDefaultCurrencyState } from './default-currency.state';
import { DefaultCurrencyActions, DefaultCurrencyActionTypes } from './default-currency.actions';

export function defaultCurrencyReducer(
  state = initialDefaultCurrencyState,
  action: DefaultCurrencyActions
): IDefaultCurrencyState {
  switch (action.type) {
    case DefaultCurrencyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DefaultCurrencyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DefaultCurrencyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DefaultCurrencyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DefaultCurrencyActionTypes.LOADING:
      return { ...state, isLoading: true };
    case DefaultCurrencyActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case DefaultCurrencyActionTypes.LOAD_DEFAULT_CURRENCY_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}
