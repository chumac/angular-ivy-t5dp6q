import { initialCurrencyState, ICurrencyState } from './payment-currency.state';
import { CurrencyActions, CurrencyActionTypes } from './payment-currency.actions';

export function currencyReducer(
  state = initialCurrencyState,
  action: CurrencyActions
): ICurrencyState {
  switch (action.type) {
    case CurrencyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CurrencyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CurrencyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CurrencyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CurrencyActionTypes.LOADING:
      return { ...state, isLoading: true };
    case CurrencyActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case CurrencyActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}
