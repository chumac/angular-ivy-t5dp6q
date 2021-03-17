import { initialTransactionState, ITransactionState } from './transaction.state';
import { TransactionActions, TransactionActionTypes } from './transaction.actions';

export function transactionReducer(
  state = initialTransactionState,
  action: TransactionActions
): ITransactionState {
  switch (action.type) {
    case TransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TransactionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case TransactionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case TransactionActionTypes.LOAD_EXCLUSION_TRANSACTION_DATA_SUCCESS:
      return { ...state, exlusionTransactions: action.payload };
    case TransactionActionTypes.LOAD_EXCLUSION_SCOPE_DATA_SUCCESS:
      return { ...state, exlusionScope: action.payload };
    case TransactionActionTypes.LOAD_EXCLUSION_ACTIVE_EMPLOYEE_DATA_SUCCESS:
      return { ...state, exlusionActiveEmployee: action.payload };
    case TransactionActionTypes.LOAD_EXCLUSION_REASON_DATA_SUCCESS:
      return { ...state, exlusionReason: action.payload };
    case TransactionActionTypes.LOAD_EXCLUSION_TYPE_DATA_SUCCESS:
      return { ...state, exlusionType: action.payload };
    case TransactionActionTypes.LOAD_EXCLUSION_ITEM_TYPE_DATA_SUCCESS:
      return { ...state, exlusionItemType: action.payload };
    case TransactionActionTypes.LOAD_EDIT_CONFIGURE_DATA_SUCCESS:
      return { ...state, getconfigureTransactionEdit: action.payload };
    case TransactionActionTypes.SHOW_EXCLUSION_TRANSACTION_EDITOR:
      return { ...state, showEditor: true };
    case TransactionActionTypes.HIDE_EXCLUSION_TRANSACTION_EDITOR:
      return { ...state, showEditor: false };
    case TransactionActionTypes.SHOW_CLOSE_EDITOR:
      return { ...state, showCloseEditor: true };
    case TransactionActionTypes.HIDE_CLOSE_EDITOR:
      return { ...state, showCloseEditor: false };
    case TransactionActionTypes.LOAD_GET_EXCLUSION_TRANSACTION_DATA_SUCCESS:
      return { ...state, getExclusionData: action.payload };



    case TransactionActionTypes.LOAD_CAN_RUN_DATA_SUCCESS:
      return { ...state, canRun: action.payload };

    case TransactionActionTypes.SHOW_EXCLUSION_TRANSACTION_EDITOR:
      return { ...state, showEditor: true };
    case TransactionActionTypes.HIDE_EXCLUSION_TRANSACTION_EDITOR:
      return { ...state, showEditor: false };
    case TransactionActionTypes.SHOW_CLOSE_EDITOR:
      return { ...state, showCloseEditor: true };
    case TransactionActionTypes.HIDE_CLOSE_EDITOR:
      return { ...state, showCloseEditor: false };
    case TransactionActionTypes.SHOW_CONFIGURE_TRANSACTION_EDITOR:
      return { ...state, showConfigure: true };
    case TransactionActionTypes.HIDE_CONFIGURE_TRANSACTION_EDITOR:
      return { ...state, showConfigure: false };
    case TransactionActionTypes.SHOW_EDITOR_CONFIGURE_TRANSACTION_CREATE:
      return { ...state, showConfigureCreate: true };
    case TransactionActionTypes.HIDE_EDITOR_CONFIGURE_TRANSACTION_CREATE:
      return { ...state, showConfigureCreate: false };
    case TransactionActionTypes.LOAD_CONFIGURE_TRANSACTION_DATA_SUCCESS:
      return { ...state, configureTransaction: action.payload };
    default: {
      return state;
    }
  }
}
