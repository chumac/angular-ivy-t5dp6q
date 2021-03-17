import { initialBankState, IBankState } from './bank.state';
import { BankActions, BankActionTypes } from './bank.actions';

export function bankReducer(
  state = initialBankState,
  action: BankActions
): IBankState {
  switch (action.type) {
    case BankActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case BankActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case BankActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case BankActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case BankActionTypes.LOADING:
      return { ...state, isLoading: true };
    case BankActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case BankActionTypes.LOAD_BANK_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case BankActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationality: action.payload};
    case BankActionTypes.LOAD_STATE_DATA_SUCCESS:
      return { ...state, stateData:action.payload };
    default: {
      return state;
    }
  }
}
